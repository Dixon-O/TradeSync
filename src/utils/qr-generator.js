/**
 * DukaImara QR Code Generator
 * Pure JavaScript QR code generation — no external dependencies.
 * Supports byte mode encoding, Reed-Solomon error correction,
 * alignment patterns, format/version info, and data masking.
 */

// ========== Reed-Solomon GF(256) ==========
const EXP_TABLE = new Uint8Array(512);
const LOG_TABLE = new Uint8Array(256);
(function initGalois() {
    let x = 1;
    for (let i = 0; i < 255; i++) {
        EXP_TABLE[i] = x;
        LOG_TABLE[x] = i;
        x = (x << 1) ^ (x & 0x80 ? 0x11d : 0);
    }
    EXP_TABLE[255] = EXP_TABLE[0];
    // Extend for convenience
    for (let i = 256; i < 512; i++) {
        EXP_TABLE[i] = EXP_TABLE[i - 255];
    }
})();

function gfMul(a, b) {
    if (a === 0 || b === 0) return 0;
    return EXP_TABLE[LOG_TABLE[a] + LOG_TABLE[b]];
}

function rsGenPoly(nsym) {
    let gen = [1];
    for (let i = 0; i < nsym; i++) {
        const next = new Array(gen.length + 1).fill(0);
        for (let j = 0; j < gen.length; j++) {
            next[j] ^= gen[j];
            next[j + 1] ^= gfMul(gen[j], EXP_TABLE[i]);
        }
        gen = next;
    }
    return gen;
}

function rsEncode(data, nsym) {
    const gen = rsGenPoly(nsym);
    const res = new Array(data.length + nsym).fill(0);
    for (let i = 0; i < data.length; i++) res[i] = data[i];
    for (let i = 0; i < data.length; i++) {
        const coef = res[i];
        if (coef !== 0) {
            for (let j = 1; j < gen.length; j++) {
                res[i + j] ^= gfMul(gen[j], coef);
            }
        }
    }
    return res.slice(data.length);
}

// ========== QR Version Configs (EC Level L) ==========
// totalCodewords = dataCodewords + ecCodewordsPerBlock * numBlocks
const QR_VERSIONS = [
    null, // index 0 unused
    { size: 21, totalData: 19, ecPerBlock: 7, blocks: 1, alignment: [] },
    { size: 25, totalData: 34, ecPerBlock: 10, blocks: 1, alignment: [18] },
    { size: 29, totalData: 55, ecPerBlock: 15, blocks: 1, alignment: [22] },
    { size: 33, totalData: 80, ecPerBlock: 20, blocks: 1, alignment: [26] },
    { size: 37, totalData: 108, ecPerBlock: 26, blocks: 1, alignment: [30] },
    { size: 41, totalData: 136, ecPerBlock: 18, blocks: 2, alignment: [34] },
    { size: 45, totalData: 156, ecPerBlock: 20, blocks: 2, alignment: [6, 22, 38] },
    { size: 49, totalData: 194, ecPerBlock: 24, blocks: 2, alignment: [6, 24, 42] },
    { size: 53, totalData: 232, ecPerBlock: 30, blocks: 2, alignment: [6, 26, 46] },
    { size: 57, totalData: 274, ecPerBlock: 18, blocks: 2, alignment: [6, 28, 50] },
];
const MAX_VERSION = QR_VERSIONS.length - 1;

// ========== Format Info Lookup (Mask 0-7, EC Level L=01) ==========
// Pre-computed BCH(15,5) codes for format: ECC=L (01), mask 0-7
const FORMAT_STRINGS = [
    0x77c4, // L, mask 0
    0x72f3, // L, mask 1
    0x7daa, // L, mask 2
    0x789d, // L, mask 3
    0x662f, // L, mask 4
    0x6318, // L, mask 5
    0x6c41, // L, mask 6
    0x6976, // L, mask 7
];

function selectVersion(dataLen) {
    for (let v = 1; v <= MAX_VERSION; v++) {
        const lengthBits = v <= 9 ? 8 : 16;
        const bitsNeeded = 4 + lengthBits + dataLen * 8;
        if (QR_VERSIONS[v].totalData * 8 >= bitsNeeded) return v;
    }
    return MAX_VERSION;
}

function encodeData(text) {
    let bytes = new TextEncoder().encode(text);
    const version = selectVersion(bytes.length);
    const cfg = QR_VERSIONS[version];
    const totalDataBits = cfg.totalData * 8;
    const lengthBits = version <= 9 ? 8 : 16;

    // Truncate if needed
    const maxBytes = Math.floor((totalDataBits - 4 - lengthBits) / 8);
    if (bytes.length > maxBytes) bytes = bytes.slice(0, maxBytes);

    // Build bit string: mode(0100) + length + data + terminator + pad
    let bits = '0100';
    bits += bytes.length.toString(2).padStart(lengthBits, '0');
    for (const b of bytes) bits += b.toString(2).padStart(8, '0');
    bits += '0'.repeat(Math.min(4, totalDataBits - bits.length));
    while (bits.length % 8 !== 0 && bits.length < totalDataBits) bits += '0';
    const pads = ['11101100', '00010001'];
    let pi = 0;
    while (bits.length < totalDataBits) { bits += pads[pi++ % 2]; }
    bits = bits.substring(0, totalDataBits);

    // Convert to codewords
    const dataCodewords = [];
    for (let i = 0; i < bits.length; i += 8) {
        dataCodewords.push(parseInt(bits.substr(i, 8), 2));
    }

    // Split into blocks and compute EC for each
    const blockSize = Math.ceil(dataCodewords.length / cfg.blocks);
    const allData = [];
    const allEC = [];
    for (let b = 0; b < cfg.blocks; b++) {
        const start = b * blockSize;
        const block = dataCodewords.slice(start, Math.min(start + blockSize, dataCodewords.length));
        // Pad block if needed
        while (block.length < blockSize) block.push(0);
        allData.push(block);
        allEC.push(rsEncode(block, cfg.ecPerBlock));
    }

    // Interleave data codewords then EC codewords
    const result = [];
    for (let i = 0; i < blockSize; i++) {
        for (let b = 0; b < cfg.blocks; b++) {
            if (i < allData[b].length) result.push(allData[b][i]);
        }
    }
    for (let i = 0; i < cfg.ecPerBlock; i++) {
        for (let b = 0; b < cfg.blocks; b++) {
            if (i < allEC[b].length) result.push(allEC[b][i]);
        }
    }

    return { version, cfg, codewords: result };
}

// ========== Matrix Construction ==========

function createMatrix(size) {
    return {
        modules: Array.from({ length: size }, () => Array(size).fill(false)),
        reserved: Array.from({ length: size }, () => Array(size).fill(false)),
        size
    };
}

function setModule(m, row, col, dark, reserve = true) {
    if (row >= 0 && row < m.size && col >= 0 && col < m.size) {
        m.modules[row][col] = dark;
        if (reserve) m.reserved[row][col] = true;
    }
}

function drawFinderPattern(m, row, col) {
    for (let r = -1; r <= 7; r++) {
        for (let c = -1; c <= 7; c++) {
            const mr = row + r, mc = col + c;
            if (mr < 0 || mr >= m.size || mc < 0 || mc >= m.size) continue;
            let dark;
            if (r === -1 || r === 7 || c === -1 || c === 7) {
                dark = false; // white separator
            } else if (r === 0 || r === 6 || c === 0 || c === 6) {
                dark = true;  // outer ring
            } else if (r >= 2 && r <= 4 && c >= 2 && c <= 4) {
                dark = true;  // center 3x3
            } else {
                dark = false; // inner white
            }
            setModule(m, mr, mc, dark);
        }
    }
}

function drawAlignmentPattern(m, row, col) {
    // Don't overlap with finder patterns
    for (let r = -2; r <= 2; r++) {
        for (let c = -2; c <= 2; c++) {
            const mr = row + r, mc = col + c;
            if (mr < 0 || mr >= m.size || mc < 0 || mc >= m.size) continue;
            if (m.reserved[mr][mc]) return; // overlaps finder — skip entirely
        }
    }
    for (let r = -2; r <= 2; r++) {
        for (let c = -2; c <= 2; c++) {
            const mr = row + r, mc = col + c;
            const dark = Math.abs(r) === 2 || Math.abs(c) === 2 || (r === 0 && c === 0);
            setModule(m, mr, mc, dark);
        }
    }
}

function drawTimingPatterns(m) {
    for (let i = 8; i < m.size - 8; i++) {
        const dark = i % 2 === 0;
        if (!m.reserved[6][i]) setModule(m, 6, i, dark);
        if (!m.reserved[i][6]) setModule(m, i, 6, dark);
    }
}

function reserveFormatAreas(m) {
    // Around top-left finder
    for (let i = 0; i < 9; i++) {
        if (!m.reserved[8][i]) { m.reserved[8][i] = true; }
        if (!m.reserved[i][8]) { m.reserved[i][8] = true; }
    }
    // Around top-right finder
    for (let i = 0; i < 8; i++) {
        const col = m.size - 1 - i;
        if (!m.reserved[8][col]) { m.reserved[8][col] = true; }
    }
    // Around bottom-left finder
    for (let i = 0; i < 7; i++) {
        const row = m.size - 1 - i;
        if (!m.reserved[row][8]) { m.reserved[row][8] = true; }
    }
    // Dark module (always present)
    setModule(m, m.size - 8, 8, true);
}

function placeDataBits(m, codewords) {
    const bits = [];
    for (const cw of codewords) {
        for (let b = 7; b >= 0; b--) bits.push((cw >> b) & 1);
    }

    let idx = 0;
    let upward = true;
    for (let col = m.size - 1; col >= 0; col -= 2) {
        if (col === 6) col = 5; // skip timing column
        const rows = upward
            ? Array.from({ length: m.size }, (_, i) => m.size - 1 - i)
            : Array.from({ length: m.size }, (_, i) => i);
        for (const row of rows) {
            for (const c of [col, col - 1]) {
                if (c < 0 || c >= m.size) continue;
                if (m.reserved[row][c]) continue;
                m.modules[row][c] = idx < bits.length ? bits[idx++] === 1 : false;
            }
        }
        upward = !upward;
    }
}

// ========== Masking ==========
const MASK_FUNCTIONS = [
    (r, c) => (r + c) % 2 === 0,
    (r, c) => r % 2 === 0,
    (r, c) => c % 3 === 0,
    (r, c) => (r + c) % 3 === 0,
    (r, c) => (Math.floor(r / 2) + Math.floor(c / 3)) % 2 === 0,
    (r, c) => (r * c) % 2 + (r * c) % 3 === 0,
    (r, c) => ((r * c) % 2 + (r * c) % 3) % 2 === 0,
    (r, c) => ((r + c) % 2 + (r * c) % 3) % 2 === 0,
];

function applyMask(m, maskIdx) {
    const fn = MASK_FUNCTIONS[maskIdx];
    for (let r = 0; r < m.size; r++) {
        for (let c = 0; c < m.size; c++) {
            if (!m.reserved[r][c] && fn(r, c)) {
                m.modules[r][c] = !m.modules[r][c];
            }
        }
    }
}

function penaltyScore(m) {
    let penalty = 0;
    const s = m.size;
    // Rule 1: runs of 5+ same-color modules
    for (let r = 0; r < s; r++) {
        let run = 1;
        for (let c = 1; c < s; c++) {
            if (m.modules[r][c] === m.modules[r][c - 1]) {
                run++;
            } else {
                if (run >= 5) penalty += run - 2;
                run = 1;
            }
        }
        if (run >= 5) penalty += run - 2;
    }
    for (let c = 0; c < s; c++) {
        let run = 1;
        for (let r = 1; r < s; r++) {
            if (m.modules[r][c] === m.modules[r - 1][c]) {
                run++;
            } else {
                if (run >= 5) penalty += run - 2;
                run = 1;
            }
        }
        if (run >= 5) penalty += run - 2;
    }
    // Rule 2: 2x2 blocks
    for (let r = 0; r < s - 1; r++) {
        for (let c = 0; c < s - 1; c++) {
            const v = m.modules[r][c];
            if (v === m.modules[r][c + 1] && v === m.modules[r + 1][c] && v === m.modules[r + 1][c + 1]) {
                penalty += 3;
            }
        }
    }
    return penalty;
}

function writeFormatInfo(m, maskIdx) {
    const formatWord = FORMAT_STRINGS[maskIdx];

    // Bit positions around top-left finder (first copy)
    const pos1 = [];
    for (let i = 0; i <= 5; i++) pos1.push([8, i]);
    pos1.push([8, 7], [8, 8], [7, 8]);
    for (let i = 5; i >= 0; i--) pos1.push([i, 8]);

    // Bit positions second copy (bottom-left + top-right)
    const pos2 = [];
    for (let i = 0; i < 7; i++) pos2.push([m.size - 1 - i, 8]);
    pos2.push([8, m.size - 8]);
    for (let i = 6; i >= 1; i--) pos2.push([8, m.size - i]);

    for (let i = 0; i < 15; i++) {
        const bit = ((formatWord >> (14 - i)) & 1) === 1;
        if (i < pos1.length) {
            const [r, c] = pos1[i];
            if (r >= 0 && r < m.size && c >= 0 && c < m.size) m.modules[r][c] = bit;
        }
        if (i < pos2.length) {
            const [r, c] = pos2[i];
            if (r >= 0 && r < m.size && c >= 0 && c < m.size) m.modules[r][c] = bit;
        }
    }
}

// ========== Public API ==========

/**
 * Generate a QR code as a 2D boolean matrix.
 */
export function generateQRMatrix(text) {
    if (!text || text.length === 0) return [];

    const { version, cfg, codewords } = encodeData(text);
    const m = createMatrix(cfg.size);

    // 1. Finder patterns (top-left, top-right, bottom-left)
    drawFinderPattern(m, 0, 0);
    drawFinderPattern(m, 0, m.size - 7);
    drawFinderPattern(m, m.size - 7, 0);

    // 2. Alignment patterns (version 2+)
    if (cfg.alignment.length > 0) {
        const positions = cfg.alignment;
        // For version 2-6 there is only one alignment position
        // For version 7+ there are multiple — draw at all intersections
        if (positions.length === 1) {
            drawAlignmentPattern(m, positions[0], positions[0]);
        } else {
            for (const r of positions) {
                for (const c of positions) {
                    drawAlignmentPattern(m, r, c);
                }
            }
        }
    }

    // 3. Timing patterns
    drawTimingPatterns(m);

    // 4. Reserve format info areas + dark module
    reserveFormatAreas(m);

    // 5. Place data bits
    placeDataBits(m, codewords);

    // 6. Find best mask (lowest penalty)
    let bestMask = 0;
    let bestPenalty = Infinity;
    // Copy the base modules for each mask attempt
    const baseModules = m.modules.map(row => [...row]);

    for (let mask = 0; mask < 8; mask++) {
        // Reset to base
        m.modules = baseModules.map(row => [...row]);
        applyMask(m, mask);
        writeFormatInfo(m, mask);
        const p = penaltyScore(m);
        if (p < bestPenalty) {
            bestPenalty = p;
            bestMask = mask;
        }
    }

    // Apply best mask
    m.modules = baseModules.map(row => [...row]);
    applyMask(m, bestMask);
    writeFormatInfo(m, bestMask);

    return m.modules;
}

/**
 * Render QR code to a canvas and return as data URL.
 */
export function renderQRToDataURL(text, moduleSize = 4, margin = 4) {
    const matrix = generateQRMatrix(text);
    if (matrix.length === 0) return '';

    const size = matrix.length;
    const canvasSize = (size + margin * 2) * moduleSize;

    const canvas = document.createElement('canvas');
    canvas.width = canvasSize;
    canvas.height = canvasSize;
    const ctx = canvas.getContext('2d');

    // White background
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvasSize, canvasSize);

    // Dark modules
    ctx.fillStyle = '#000000';
    for (let row = 0; row < size; row++) {
        for (let col = 0; col < size; col++) {
            if (matrix[row][col]) {
                ctx.fillRect(
                    (col + margin) * moduleSize,
                    (row + margin) * moduleSize,
                    moduleSize,
                    moduleSize
                );
            }
        }
    }

    return canvas.toDataURL('image/png');
}
