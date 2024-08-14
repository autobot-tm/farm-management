/**
 * Save a value to local storage.
 *
 * @param {string} key - The key under which the value is stored.
 * @param {*} value - The value to be stored.
 */
export const save = (key, value) => {
    const valueJson = JSON.stringify(value);
    localStorage.setItem(key, valueJson);
};

/**
 * Load a value from local storage.
 *
 * @param {string} key - The key under which the value is stored.
 * @returns {*} The value retrieved from local storage, or null if no value is found.
 */
export const load = key => {
    const valueJson = localStorage.getItem(key);
    if (valueJson) {
        const value = JSON.parse(valueJson);
        return value;
    }
    return undefined;
};

/**
 * Remove a value from local storage.
 *
 * @param {string} key - The key under which the value is stored.
 */
export const remove = key => {
    const valueJson = localStorage.getItem(key);
    if (valueJson) {
        localStorage.removeItem(key);
    }
};