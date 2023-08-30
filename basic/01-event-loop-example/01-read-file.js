const {readFile} = require('fs');

console.log("started a first task!");
// Check file path
readFile("../folder/first.txt", "utf-8", (error, result) => {
  if(error) {
    console.log(error);
    return;
  }
  console.log(result);
  console.log("completed first task");
})

console.log("starting next task!");