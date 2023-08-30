const express = require("express");
const path = require("path");
const app = express();

app.use(express.static("./public"));

// app.get("/", (req, res) => {
//   const resource = path.resolve(__dirname, "./navbar-app/index.html");
//   res.sendFile(resource);
//   Sol 1: Add to static assets
//   SSR
// });

app.all("*", (req, res) => {
  res.status(404).send("Not Found");
});

app.listen(5000, () => {
  console.log("Server is listening on port 5000");
});
