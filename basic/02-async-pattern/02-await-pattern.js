const { readFile, writeFile } = require("fs").promises;
// const util = require("util");

// const readFilePromise = util.promisify(readFile);
// const writeFilePromise = util.promisify(writeFile);
// const getText = (path) => {
//   return new Promise((resolve, reject) => {
//     readFile(path, "utf-8", (error, data) => {
//       if (error) {
//         reject(error);
//       }
//       resolve(data);
//     });
//   });
// };

const start = async () => {
  try {
    const first = await readFile("./folder/first.txt", "utf-8");
    const second = await readFile("./folder/second.txt", "utf-8");
    await writeFile(
      "./folder/result-mind-grenade.txt",
      `This is awesome: ${first} ${second} `,
      { flag: "a" }
    );
    console.log(first, second);
  } catch (err) {
    console.log(err);
  }
};

start();
// getText("./folder/first.txt")
//   .then((result) => console.log(result))
//   .catch((err) => console.log(err));
