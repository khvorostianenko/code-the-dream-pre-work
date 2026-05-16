const DEFAULT_TTL_MS = 5 * 60 * 1000;

const store = new Map();

function isFresh(entry, ttlMs) {
    if (!entry) {
        return false;
    }

    const ageMs = Date.now() - entry.ts;

    return ageMs < ttlMs;
}

export function getCached(key, { ttl = DEFAULT_TTL_MS } = {}) {
    const entry = store.get(key);
    if (!isFresh(entry, ttl)) {
        if (entry) store.delete(key);
        return undefined;
    }
    return entry.data;
}

export function setCached(key, data) {
    store.set(key, { data, ts: Date.now() });
}

export function clearCache() {
    store.clear();
}
