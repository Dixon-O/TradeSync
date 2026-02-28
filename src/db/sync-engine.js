/**
 * DukaImara Sync Engine
 * CRDT-based conflict resolution with field-level merging,
 * vector clocks, and hybrid logical clock ordering.
 */
import { compare as hlcCompare, merge as hlcReceive } from '../utils/hlc.js';
import { delta as computeDelta } from '../utils/compression.js';
import { addSyncLog } from './database.js';

/**
 * Compare two vector clocks.
 * Returns:
 *  'lt' if a < b (a is older)
 *  'gt' if a > b (a is newer)
 *  'concurrent' if neither dominates
 *  'equal' if identical
 */
export function compareVectorClocks(a, b) {
    const allKeys = new Set([...Object.keys(a || {}), ...Object.keys(b || {})]);
    let aGreater = false;
    let bGreater = false;

    for (const key of allKeys) {
        const av = (a && a[key]) || 0;
        const bv = (b && b[key]) || 0;
        if (av > bv) aGreater = true;
        if (bv > av) bGreater = true;
    }

    if (aGreater && bGreater) return 'concurrent';
    if (aGreater) return 'gt';
    if (bGreater) return 'lt';
    return 'equal';
}

/**
 * Merge two vector clocks by taking max of each entry.
 */
export function mergeVectorClocks(a, b) {
    const merged = { ...(a || {}) };
    for (const [key, val] of Object.entries(b || {})) {
        merged[key] = Math.max(merged[key] || 0, val);
    }
    return merged;
}

/**
 * Field-level CRDT merge.
 * For concurrent edits on different fields, both are kept.
 * For same-field conflicts, LWW (Last-Writer-Wins) via HLC ordering.
 */
export function mergeRecords(local, remote) {
    const vcResult = compareVectorClocks(local._vectorClock, remote._vectorClock);

    // If one dominates, take that version
    if (vcResult === 'gt') {
        return { merged: local, conflict: false, winner: 'local' };
    }
    if (vcResult === 'lt') {
        return { merged: remote, conflict: false, winner: 'remote' };
    }
    if (vcResult === 'equal') {
        return { merged: local, conflict: false, winner: 'equal' };
    }

    // Concurrent — field-level merge needed
    const merged = { ...local };
    const conflicts = [];

    const skipFields = new Set(['id', '_hlc', '_vectorClock', '_lastModified', '_deviceId', '_tombstone', '_syncMeta']);

    for (const key of Object.keys(remote)) {
        if (skipFields.has(key)) continue;

        const localVal = JSON.stringify(local[key]);
        const remoteVal = JSON.stringify(remote[key]);

        if (localVal !== remoteVal) {
            // Same field changed on both sides — use HLC to pick winner
            const hlcResult = hlcCompare(local._hlc || '0:0:', remote._hlc || '0:0:');
            if (hlcResult < 0) {
                // Remote is newer
                merged[key] = remote[key];
                conflicts.push({ field: key, localVal: local[key], remoteVal: remote[key], winner: 'remote' });
            } else {
                // Local is newer or equal
                conflicts.push({ field: key, localVal: local[key], remoteVal: remote[key], winner: 'local' });
            }
        }
    }

    // Merge vector clocks
    merged._vectorClock = mergeVectorClocks(local._vectorClock, remote._vectorClock);
    // Receive remote HLC to update local clock
    if (remote._hlc) {
        merged._hlc = hlcReceive(remote._hlc);
    }

    // Handle tombstone: if either is tombstoned, tombstone wins
    if (remote._tombstone || local._tombstone) {
        merged._tombstone = true;
    }

    return {
        merged,
        conflict: conflicts.length > 0,
        conflicts,
        winner: 'merge'
    };
}

/**
 * Process an incoming sync payload from the server.
 * Returns actions to apply to local DB.
 */
export async function processIncoming(localRecords, remoteRecords) {
    const actions = [];

    const localMap = new Map(localRecords.map(r => [r.id, r]));

    for (const remote of remoteRecords) {
        const local = localMap.get(remote.id);

        if (!local) {
            // New record from server
            actions.push({ type: 'insert', record: remote });
            await addSyncLog('RECEIVED', remote._table || 'unknown', remote.id, 'New record from server');
            continue;
        }

        const result = mergeRecords(local, remote);

        if (result.winner === 'equal') continue;

        if (result.conflict) {
            actions.push({ type: 'update', record: result.merged, conflicts: result.conflicts });
            await addSyncLog('CONFLICT_RESOLVED', remote._table || 'unknown', remote.id,
                `${result.conflicts.length} field(s) conflicted`);
        } else if (result.winner === 'remote') {
            actions.push({ type: 'update', record: result.merged });
            await addSyncLog('UPDATED', remote._table || 'unknown', remote.id, 'Remote version applied');
        }
        // If winner is 'local', no action needed
    }

    return actions;
}

/**
 * Extract records that need syncing (changed since last sync).
 */
export function extractOutgoingDeltas(records, lastSyncTimestamp = 0) {
    return records
        .filter(r => (r._lastModified || 0) > lastSyncTimestamp)
        .map(r => ({
            id: r.id,
            _hlc: r._hlc,
            _vectorClock: r._vectorClock,
            _tombstone: r._tombstone,
            _deviceId: r._deviceId,
            delta: computeDelta(null, r) // Full record as delta for outgoing
        }));
}
