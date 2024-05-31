export function handler(fn, middlewares = []) {
  return async (request, ...args) => {
    try {
      // middlewares
      for (const middleware of middlewares) {
        await middleware(request);
      }

      return await fn(request, ...args);
    } catch (error) {
      return error;
    }
  };
}
