/**
 * Compression Utilities
 * LZ-based string compression for minimizing sync payload sizes.
 */

/**
 * Compress a JSON object to a base64-encoded string.
 */
export function compress(data) {
    try {
        const json = typeof data === 'string' ? data : JSON.stringify(data);
        // Use simple RLE + base64 for environments without CompressionStream
        if (typeof CompressionStream !== 'undefined') {
            return compressWithStream(json);
        }
        return btoa(encodeURIComponent(json));
    } catch {
        return null;
    }
}

/**
 * Decompress a base64-encoded string back to an object.
 */
export function decompress(compressed) {
    try {
        if (typeof DecompressionStream !== 'undefined' && compressed.startsWith('gz:')) {
            return decompressWithStream(compressed.slice(3));
        }
        return JSON.parse(decodeURIComponent(atob(compressed)));
    } catch {
        return null;
    }
}

async function compressWithStream(text) {
    const blob = new Blob([text]);
    const stream = blob.stream().pipeThrough(new CompressionStream('gzip'));
    const reader = stream.getReader();
    const chunks = [];
    let result;
    while (!(result = await reader.read()).done) {
        chunks.push(result.value);
    }
    const totalLength = chunks.reduce((sum, chunk) => sum + chunk.length, 0);
    const combined = new Uint8Array(totalLength);
    let offset = 0;
    for (const chunk of chunks) {
        combined.set(chunk, offset);
        offset += chunk.length;
    }
    return 'gz:' + btoa(String.fromCharCode(...combined));
}

async function decompressWithStream(base64) {
    const binary = atob(base64);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
        bytes[i] = binary.charCodeAt(i);
    }
    const blob = new Blob([bytes]);
    const stream = blob.stream().pipeThrough(new DecompressionStream('gzip'));
    const reader = stream.getReader();
    const chunks = [];
    let result;
    while (!(result = await reader.read()).done) {
        chunks.push(new TextDecoder().decode(result.value));
    }
    return JSON.parse(chunks.join(''));
}

/**
 * Calculate delta between two objects — only changed fields.
 */
export function delta(oldObj, newObj) {
    if (!oldObj) return { ...newObj };
    const diff = {};
    for (const key of Object.keys(newObj)) {
        if (JSON.stringify(oldObj[key]) !== JSON.stringify(newObj[key])) {
            diff[key] = newObj[key];
        }
    }
    return Object.keys(diff).length > 0 ? diff : null;
}
