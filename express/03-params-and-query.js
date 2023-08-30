const express = require("express");
const app = express();
const { products } = require("./data");
app.get("/", (req, res) => {
  res.send(`<h1>Home page</h1> <a href="/api/products">products</a>`);
});
app.get("/api/products", (req, res) => {
  const newProducts = products.map((item) => {
    const { id, name, image } = item;
    return { id, name, image };
  });
  return res.json(newProducts);
});

app.get("/api/products/:productId", (req, res) => {
  const { productId } = req.params;
  const selectedProduct = products.find((item) => item.id === +productId);
  if (!selectedProduct) {
    res.status(404).send("Product does not exist");
  }
  return res.json(selectedProduct);
});

app.get("/api/v1/query", (req, res) => {
  console.log(req.query);
  const { search, limit } = req.query;
  let sortedProducts = [...products];
  if (search) {
    sortedProducts = sortedProducts.filter((item) =>
      item.name.startsWith(search)
    );
  }
  if (limit) {
    sortedProducts = sortedProducts.slice(0, +limit);
  }
  if (sortedProducts.length < 1) {
    return res.status(200).send(`No products matched your search`);
  }
  return res.status(200).json(sortedProducts);
});

app.listen(5000, () => {
  console.log(`Server is listening on port 5000`);
});
