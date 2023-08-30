const {writeFileSync} = require('fs');

for(let i = 0; i < 100000; i++) {
  writeFileSync('./folder/bigFile.txt', `Hello World ${i + 1}\n`, {flag: 'a'});
}