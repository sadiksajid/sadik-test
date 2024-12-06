function cacheData(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

function getCachedData(key) {
    const cachedData = localStorage.getItem(key);
    return cachedData ? JSON.parse(cachedData) : null;
}