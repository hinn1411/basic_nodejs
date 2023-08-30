const authorize = (req, res, next) => {
  const { user } = req.query;
  if (user === "Hien") {
    req.user = { name: "Hien", id: 12 };
    next();
  } else {
    return res.status(401).send("Unauthorized");
  }
  // console.log("authorize");
  // next();
};

module.exports = authorize;
