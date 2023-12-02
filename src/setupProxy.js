const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://api4.binance.com',
      changeOrigin: true,
      pathRewrite: {
        '^/api': '/api/v3',
      },
    })
  );
};