/**
 * Network & Battery awareness utilities v2.
 * Monitors online/offline state with actual connectivity checks.
 */

const listeners = new Set();
let _isOnline = navigator.onLine;
let _battery = null;
let _connectionType = 'unknown';
let _lastOnlineTimestamp = parseInt(localStorage.getItem('ts_lastOnline') || '0');
let _healthCheckTimer = null;

export function isOnline() { return _isOnline; }
export function getBattery() { return _battery; }
export function getConnectionType() { return _connectionType; }
export function getLastOnlineTimestamp() { return _lastOnlineTimestamp; }

export function getOfflineDuration() {
    if (_isOnline || !_lastOnlineTimestamp) return 0;
    return Date.now() - _lastOnlineTimestamp;
}

export function getOfflineDurationText() {
    const ms = getOfflineDuration();
    if (ms === 0) return '';
    const hours = Math.floor(ms / 3600000);
    const days = Math.floor(hours / 24);
    if (days > 0) return `${days} day${days > 1 ? 's' : ''} offline`;
    if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} offline`;
    return 'Recently offline';
}

export function isLowBattery() {
    return _battery && !_battery.charging && _battery.level < 0.15;
}

export function isSaveData() {
    const conn = navigator.connection;
    if (conn) {
        return conn.saveData || conn.effectiveType === '2g' || conn.effectiveType === 'slow-2g';
    }
    return false;
}

export function onNetworkChange(callback) {
    listeners.add(callback);
    return () => listeners.delete(callback);
}

function setOnline(online) {
    const changed = _isOnline !== online;
    _isOnline = online;
    if (online) {
        _lastOnlineTimestamp = Date.now();
        localStorage.setItem('ts_lastOnline', String(_lastOnlineTimestamp));
    }
    if (changed) {
        notifyListeners();
    }
}

function notifyListeners() {
    listeners.forEach(cb => cb({
        online: _isOnline,
        battery: _battery,
        connectionType: _connectionType,
        offlineDuration: getOfflineDuration()
    }));
}

// Actual connectivity check — ping server health endpoint
async function checkConnectivity() {
    if (!navigator.onLine) {
        setOnline(false);
        return;
    }
    try {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 5000);
        const response = await fetch('/api/health', {
            method: 'GET',
            cache: 'no-store',
            signal: controller.signal
        });
        clearTimeout(timeout);
        setOnline(response.ok);
    } catch (e) {
        // Server might not be running but we're on a network
        // Use navigator.onLine as fallback
        setOnline(navigator.onLine);
    }
}

// Start periodic connectivity checks
export function startHealthChecks(intervalMs = 10000) {
    stopHealthChecks();
    checkConnectivity();
    _healthCheckTimer = setInterval(checkConnectivity, intervalMs);
}

export function stopHealthChecks() {
    if (_healthCheckTimer) {
        clearInterval(_healthCheckTimer);
        _healthCheckTimer = null;
    }
}

// Initialize
window.addEventListener('online', () => {
    setOnline(true);
    // Double check with actual connectivity
    setTimeout(checkConnectivity, 1000);
});

window.addEventListener('offline', () => {
    setOnline(false);
});

// Connection type monitoring
if (navigator.connection) {
    _connectionType = navigator.connection.effectiveType || 'unknown';
    navigator.connection.addEventListener('change', () => {
        _connectionType = navigator.connection.effectiveType || 'unknown';
        notifyListeners();
    });
}

// Battery API
if (navigator.getBattery) {
    navigator.getBattery().then(batt => {
        _battery = batt;
        batt.addEventListener('levelchange', notifyListeners);
        batt.addEventListener('chargingchange', notifyListeners);
    }).catch(() => { });
}

// Initial last online tracking
if (_isOnline) {
    _lastOnlineTimestamp = Date.now();
    localStorage.setItem('ts_lastOnline', String(_lastOnlineTimestamp));
}
