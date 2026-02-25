/**
 * Network & Battery awareness utilities.
 * Monitors online/offline state and battery level for smart sync.
 */

const listeners = new Set();
let _isOnline = navigator.onLine;
let _battery = null;
let _connectionType = 'unknown';

export function isOnline() { return _isOnline; }
export function getBattery() { return _battery; }
export function getConnectionType() { return _connectionType; }

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

function notifyListeners() {
    listeners.forEach(cb => cb({ online: _isOnline, battery: _battery, connectionType: _connectionType }));
}

// Initialize
window.addEventListener('online', () => {
    _isOnline = true;
    notifyListeners();
});

window.addEventListener('offline', () => {
    _isOnline = false;
    notifyListeners();
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
