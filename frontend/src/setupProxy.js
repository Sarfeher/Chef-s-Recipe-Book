const { createProxyMiddleware } = require('http-proxy-middleware');

const backendHost = process.env.BACKEND_HOST || 'localhost';

console.log(backendHost, "- is the backend host");


module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: `http://${backendHost}:4000`,
      changeOrigin: true,
    })
  );
};