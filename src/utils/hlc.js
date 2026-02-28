/**
 * Hybrid Logical Clock (HLC)
 * Provides causally-ordered timestamps for CRDT operations.
 */

let _counter = 0;
let _lastTimestamp = 0;
let _deviceId = '';

export function initHLC(deviceId) {
    _deviceId = deviceId || '';
}

export function now() {
    const physical = Date.now();
    if (physical > _lastTimestamp) {
        _lastTimestamp = physical;
        _counter = 0;
    } else {
        _counter++;
    }
    return `${_lastTimestamp.toString(36)}-${_counter.toString(36)}`;
}

export function compare(a, b) {
    if (!a && !b) return 0;
    if (!a) return -1;
    if (!b) return 1;
    return a < b ? -1 : a > b ? 1 : 0;
}

export function merge(remote) {
    if (!remote) return now();
    const parts = remote.split('-');
    const remoteTs = parseInt(parts[0], 36);
    const remoteCounter = parseInt(parts[1] || '0', 36);
    const local = Date.now();

    _lastTimestamp = Math.max(local, remoteTs, _lastTimestamp);
    if (_lastTimestamp === remoteTs && _lastTimestamp === local) {
        _counter = Math.max(_counter, remoteCounter) + 1;
    } else if (_lastTimestamp === remoteTs) {
        _counter = remoteCounter + 1;
    } else if (_lastTimestamp === local) {
        _counter = 0;
    } else {
        _counter++;
    }

    return `${_lastTimestamp.toString(36)}-${_counter.toString(36)}`;
}
