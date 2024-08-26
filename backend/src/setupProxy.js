const { createProxyMiddleware } = require('http-proxy-middleware');

const backendHost = process.env.BACKEND_HOST || 'localhost';

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: `http://${backendHost}:5000`,
      changeOrigin: true,
    })
  );
};