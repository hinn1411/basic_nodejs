const { readFile, writeFile, read, write } = require("fs");

console.log('begin task');
readFile("./folder/first.txt", "utf-8", (error, result) => {
  if (error) {
    console.log(error);
    return;
  }
  const first = result;
  readFile("./folder/second.txt", "utf-8", (error, result) => {
    if (error) {
      console.log(error);
      return;
    }
    const second = result;
    writeFile(
      "./folder/result-async.txt",
      `Here is the result: ${first}, ${second}`,
      (error, result) => {
        if (error) {
          console.log(error);
          return;
        } else {
          console.log('done with this task');
        }
      }
    );
  });
});

console.log('starting next task');
