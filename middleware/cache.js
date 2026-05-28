const cacheStore = new Map();

const cache = (durationSeconds = 300) => {
  return (req, res, next) => {
    const key = `${req.method}:${req.originalUrl}`;
    const cachedResponse = cacheStore.get(key);

    if (cachedResponse && cachedResponse.expiresAt > Date.now()) {
      return res.status(cachedResponse.statusCode).json({
        ...cachedResponse.body,
        cached: true,
      });
    }

    const originalJson = res.json.bind(res);

    res.json = (body) => {
      if (res.statusCode >= 200 && res.statusCode < 300) {
        cacheStore.set(key, {
          body,
          statusCode: res.statusCode,
          expiresAt: Date.now() + durationSeconds * 1000,
        });
      }

      return originalJson(body);
    };

    next();
  };
};

const clearCache = () => {
  cacheStore.clear();
};

export { cache, clearCache };
