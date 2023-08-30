const { readFileSync, writeFileSync } = require("fs");

console.log("begin task");
const first = readFileSync("./folder/first.txt", "utf-8");
const second = readFileSync("./folder/second.txt", "utf-8");

console.log(first, second);

writeFileSync(
  "./folder/result-sync.txt",
  `Here is the result: ${first}, ${second}`,
  { flag: "a" }
);

console.log('end task');
console.log('start next task');
