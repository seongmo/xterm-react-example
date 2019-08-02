const proxy = require("http-proxy-middleware");

module.exports = function(app) {
  app.use(proxy("/terminals", { target: "http://localhost:7000/", ws: true }));
};
