const EventEmitter = require("events");
const customEmitter = new EventEmitter();

customEmitter.on("response", (name, id) => {
  console.log(`data received, name = ${name}, id = ${id}`);
});

customEmitter.on("response", () => {
  console.log(`runs some logic`);
});

customEmitter.emit("response", "Hien", 10);
