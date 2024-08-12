const { createProxyMiddleware } = require("http-proxy-middleware");
module.exports = app => {
  app.use(
    createProxyMiddleware("/api", {
      target: "http://eastflare.iptime.org:8080",
      changeOrigin: true,
    })
  );
};
