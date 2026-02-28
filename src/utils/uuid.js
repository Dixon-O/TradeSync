/**
 * UUID v4 generator + Device ID persistence.
 */

export function uuid() {
    if (typeof crypto !== 'undefined' && crypto.randomUUID) {
        return crypto.randomUUID();
    }
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
        const r = Math.random() * 16 | 0;
        const v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

export function getDeviceId() {
    let id = localStorage.getItem('ts_deviceId');
    if (!id) {
        id = `device-${uuid().slice(0, 8)}`;
        localStorage.setItem('ts_deviceId', id);
    }
    return id;
}
