/**
 * UUID v4 generator — no external dependency.
 */
export function uuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
        const r = (Math.random() * 16) | 0;
        const v = c === 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
}

/**
 * Generate a short device ID for this browser/device.
 * Persists to localStorage so it survives reloads.
 */
export function getDeviceId() {
    let id = localStorage.getItem('tradesync_device_id');
    if (!id) {
        id = 'dev_' + uuid().substring(0, 8);
        localStorage.setItem('tradesync_device_id', id);
    }
    return id;
}
