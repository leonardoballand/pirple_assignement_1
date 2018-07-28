/**
 * PIRPLE ASSIGNEMENT #1
 * Author: Leonardo BALLAND
 * Contact: balland.leonardo@gmail.com
 */

const http = require("http");
const url = require("url");
const { StringDecoder } = require("string_decoder");

const routes = require("./routes");

const server = http
  .createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);

    const reqPath = parsedUrl.pathname.replace(/^\/+|\/+$/g, ""); // trim / characters from request url

    const decoder = new StringDecoder();
    let buffer = "";

    req.on("data", data => (buffer += decoder.write(data)));

    req.on("end", () => {
      buffer += decoder.end();

      const routeToLoad =
        typeof routes[reqPath] !== "undefined"
          ? routes[reqPath]
          : routes.notFound;

      const data = {
        payload: buffer,
        method: req.method,
        path: reqPath
      };

      routeToLoad(data, (statusCode, payload) => {
        const status = typeof statusCode == "number" ? statusCode : 200;
        const data = typeof payload == "object" ? payload : {};

        res.setHeader("Content-Type", "application/json");
        res.writeHead(status);
        res.end(JSON.stringify(data));
      });
    });
  })
  .listen(3000, () => console.log("Server running on port 3000"));
