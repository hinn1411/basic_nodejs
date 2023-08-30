require("dotenv").config();
require('express-async-errors')
// async errors
const express = require("express");
const app = express();
const connectDB = require("./db/connection");
const productRouter = require("./routes/product");
const notFound = require("./middleware/notFound");
const errorHandler = require("./middleware/errorHandler");

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// routes
app.get("/", (req, res) => {
  res.send(`<h1>Store API</h1><a href="/api/v1/products">link</a>`);
});
app.use("/api/v1/products", productRouter);
// products route
app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (err) {
    console.log(err);
  }
};

start();
