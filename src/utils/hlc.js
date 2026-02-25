/**
 * Hybrid Logical Clock (HLC) for causal ordering of events.
 * Combines wall-clock time with a logical counter to provide
 * globally unique, monotonically increasing timestamps.
 */

let _state = {
    wallTime: 0,
    counter: 0,
    nodeId: ''
};

export function initHLC(nodeId) {
    _state.nodeId = nodeId;
    _state.wallTime = Date.now();
    _state.counter = 0;
}

/**
 * Generate a new HLC timestamp for a local event.
 * Ensures monotonicity even if wall clock goes backwards.
 */
export function now() {
    const pt = Date.now();
    if (pt > _state.wallTime) {
        _state.wallTime = pt;
        _state.counter = 0;
    } else {
        _state.counter++;
    }
    return pack(_state.wallTime, _state.counter, _state.nodeId);
}

/**
 * Receive a remote HLC timestamp and merge with local.
 * Returns the updated local timestamp.
 */
export function receive(remote) {
    const r = unpack(remote);
    const pt = Date.now();

    if (pt > _state.wallTime && pt > r.wallTime) {
        _state.wallTime = pt;
        _state.counter = 0;
    } else if (r.wallTime > _state.wallTime) {
        _state.wallTime = r.wallTime;
        _state.counter = r.counter + 1;
    } else if (_state.wallTime > r.wallTime) {
        _state.counter++;
    } else {
        // Equal wall times
        _state.counter = Math.max(_state.counter, r.counter) + 1;
    }
    return pack(_state.wallTime, _state.counter, _state.nodeId);
}

/**
 * Compare two HLC timestamps. Returns -1, 0, or 1.
 */
export function compare(a, b) {
    const ua = unpack(a);
    const ub = unpack(b);
    if (ua.wallTime !== ub.wallTime) return ua.wallTime < ub.wallTime ? -1 : 1;
    if (ua.counter !== ub.counter) return ua.counter < ub.counter ? -1 : 1;
    if (ua.nodeId !== ub.nodeId) return ua.nodeId < ub.nodeId ? -1 : 1;
    return 0;
}

/**
 * Pack HLC components into a string: "wallTime:counter:nodeId"
 */
function pack(wallTime, counter, nodeId) {
    return `${wallTime.toString(36)}:${counter.toString(36)}:${nodeId}`;
}

/**
 * Unpack HLC string back to components.
 */
export function unpack(hlcStr) {
    const parts = hlcStr.split(':');
    return {
        wallTime: parseInt(parts[0], 36),
        counter: parseInt(parts[1], 36),
        nodeId: parts[2] || ''
    };
}
