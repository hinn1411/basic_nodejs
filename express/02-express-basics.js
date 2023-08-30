// const app = require('express')();
const express = require("express");
const app = express();

// app.get
// app.post
// app.put
// app.delete
// app.all
// app.use
// app.listen

app.get("/", (req, res) => {
  console.log("user hit home page!");
  res.status(200).send("Home page");
});

app.get("/about", (req, res) => {
  res.status(200).send("About page");
});

app.all("*", (req, res) => {
  res.status(404).send(`<h1>Not found</h1>`);
});

app.listen(5000, () => {
  console.log(`server is listening on port 5000!`);
});
