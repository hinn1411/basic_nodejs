const http = require("http");
const { readFileSync } = require("fs");
const homePage = readFileSync("./navbar-app/index.html");
const homeStyles = readFileSync("./navbar-app/styles.css");
const homeLogic = readFileSync("./navbar-app/browser-app.js");
const homeImage = readFileSync("./navbar-app/logo.svg");

const server = http.createServer((req, res) => {
  const url = req.url;
  if (url === "/") {
    res.writeHead(200, { "content-type": "text/html" });
    res.write(homePage);
  } else if (url === "/about") {
    res.writeHead(200, { "content-type": "text/html" });
    res.write("<a>About page</a>");
  } else if (url === "/styles.css") {
    res.writeHead(200, { "content-type": "text/css" });
    res.write(homeStyles);
  } else if (url === "/browser-app.js") {
    res.writeHead(200, { "content-type": "text/javascript" });
    res.write(homeLogic);
  } else if (url === "/logo.svg") {
    res.writeHead(200, { "content-type": "image/svg+xml" });
    res.write(homeImage);
  } else {
    res.writeHead(404, { "content-type": "text/html" });
    res.write("<p>Not found!</p>");
  }

  res.end();
});

// WARN: check for your port connection
server.listen(5000);
