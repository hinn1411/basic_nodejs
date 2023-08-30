const Product = require("../models/product");

const getAllProductsStatic = async (req, res) => {
  const products = await Product.find({
    price: {
      $gt: 30,
    },
  })
    .sort("price")
    .select("name price");
  // throw new Error("testing async errors");
  return res.status(200).json({ len: products.length, products });
};

const getAllProducts = async (req, res) => {
  const { featured, company, name, sort, fields, numericFilters } = req.query;
  const queryObject = {};
  if (featured) {
    queryObject.featured = featured === "true" ? true : false;
  }
  if (company) {
    queryObject.company = company;
  }
  if (name) {
    queryObject.name = {
      $regex: name,
      $options: "i",
    };
  }

  if (numericFilters) {
    const operatorMap = {
      ">": "$gt",
      ">=": "$gte",
      "=": "$eq",
      "<": "$lt",
      "<=": "$lte",
    };
    const regEx = /\b(<|<=|=|>|>=)\b/g;
    const options = ["price", "rating"];
    let filters = numericFilters.replace(
      regEx,
      (match) => `-${operatorMap[match]}-`
    );
    console.log(filters);
    filters = filters.split(",").forEach((item) => {
      const [field, operator, value] = item.split("-");
      if (options.includes(field)) {
        queryObject[field] = {
          [operator]: +value,
        };
      }
    });
  }
  console.log(queryObject);
  let result = Product.find(queryObject);

  //sort
  if (sort) {
    const sortList = sort.replace(",", " ");
    console.log(sortList);
    result = result.sort(sortList);
  } else {
    result = result.sort("createdAt");
  }

  //fields
  if (fields) {
    const fieldsList = fields.replace(",", " ");
    result = result.select(fieldsList);
  }

  //page
  const page = +req.query.page || 1;
  const limit = +req.query.limit || 10;
  const skip = (page - 1) * limit;
  result = result.skip(skip).limit(limit);
  const products = await result;
  return res.status(200).json({ len: products.length, products });
};

module.exports = {
  getAllProducts,
  getAllProductsStatic,
};
