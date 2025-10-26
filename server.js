const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();

app.use(
  "/",
  createProxyMiddleware({
    target: "https://www.binance.com",
    changeOrigin: true,
    secure: true,
    followRedirects: true,
    headers: {
      "X-Requested-With": "XMLHttpRequest",
    },
    onProxyRes(proxyRes) {
      delete proxyRes.headers["x-frame-options"];
      delete proxyRes.headers["content-security-policy"];
    }
  })
);

app.listen(3000, () => {
  console.log("✅ Binance Proxy aktiv: http://localhost:3000");
});
