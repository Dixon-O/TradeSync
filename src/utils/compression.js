/**
 * Delta compression utilities.
 * Computes minimal diffs between objects for efficient sync payloads.
 */

/**
 * Compute a delta between old and new objects.
 * Returns only the changed fields.
 */
export function computeDelta(oldObj, newObj) {
    const delta = {};
    let hasChanges = false;

    for (const key of Object.keys(newObj)) {
        if (key === 'id' || key === '_hlc' || key === '_vectorClock' || key === '_syncMeta') continue;

        const oldVal = oldObj ? oldObj[key] : undefined;
        const newVal = newObj[key];

        if (JSON.stringify(oldVal) !== JSON.stringify(newVal)) {
            delta[key] = newVal;
            hasChanges = true;
        }
    }

    return hasChanges ? delta : null;
}

/**
 * Apply a delta to a base object.
 */
export function applyDelta(base, delta) {
    if (!delta) return base;
    return { ...base, ...delta };
}

/**
 * Compress an array of sync operations by merging consecutive ops on the same record.
 */
export function compressOps(ops) {
    const merged = new Map();

    for (const op of ops) {
        const key = `${op.table}:${op.id}`;
        if (merged.has(key)) {
            const existing = merged.get(key);
            existing.delta = { ...existing.delta, ...op.delta };
            existing.hlc = op.hlc; // Use latest HLC
        } else {
            merged.set(key, { ...op });
        }
    }

    return Array.from(merged.values());
}
