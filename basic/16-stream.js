const { createReadStream } = require("fs");
const { set } = require("lodash");

const stream = createReadStream("./folder/bigFile.txt", {
  highWaterMark: 90000,
  encoding: "utf-8",
});

stream.on("data", (res) => {
  console.log(res);
});

stream.on("error", (err) => {
  console.log(err);
});
