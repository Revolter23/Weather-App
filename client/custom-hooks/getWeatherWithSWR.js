const CACHE_KEY = "weather_cache";
const ttl = 5 * 60 * 1000; // 5 minutes in milliseconds

function getCachedWeather() {
	try {
		const cached = localStorage.getItem(CACHE_KEY);
		if (cached) {
			return JSON.parse(cached);
		}
		return null;
	} catch {
		return null;
	}
}

function setCachedWeather(data, lat, lon) {
	const cacheEntry = {
		data,
		timestamp: Date.now(),
	};
	localStorage.setItem(CACHE_KEY, JSON.stringify(cacheEntry));
}

function isCacheValid(cached) {
	if (!cached.data) return false;
	const now = Date.now();
	return now - cached.timestamp < ttl;
}

export { getCachedWeather, setCachedWeather, isCacheValid };
