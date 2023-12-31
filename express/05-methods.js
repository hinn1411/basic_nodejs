const express = require("express");
const app = express();
let { people } = require("./data");

// use static assets.
app.use(express.static("./methods-public"));
// parse form data
app.use(express.urlencoded({ extended: false }));
// parse json
app.use(express.json());

app.get("/api/people", (req, res) => {
  return res.status(200).json({ success: true, data: people });
});

app.post("/api/people", (req, res) => {
  const { name } = req.body;
  console.log(`name = ${name}`);
  if (!name) {
    return res
      .status(400)
      .json({ success: false, msg: "Please provide name value" });
  }
  return res.status(201).send({ success: true, person: name });
});

app.post("/api/postman/people", (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res
      .status(400)
      .json({ success: false, msg: "Please provide name value" });
  }
  return res.status(201).send({ success: true, person: [...people, name] });
});

app.post("/login", (req, res) => {
  const { name } = req.body;
  if (name) {
    return res.status(200).send(`Welcome ${name}!`);
  }
  return res.status(401).send("Please provide credentials");
});

app.put("/api/people/:id", (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  console.log(`id = ${id}, name = ${name}`);
  const selectedPerson = people.find((person) => person.id === +id);
  if (!selectedPerson) {
    return res
      .status(404)
      .json({ success: false, msg: "no person matchs provided id!" });
  }
  const newPeople = people.map((person) => {
    if (person.id === +id) {
      person.name = name;
    }
    return person;
  });
  return res.status(200).json({ success: true, data: newPeople });
});

app.delete("/api/people/:id", (req, res) => {
  const { id } = req.params;
  const selectedPerson = people.find((person) => person.id === +id);
  if (!selectedPerson) {
    return res
      .status(404)
      .json({ success: false, msg: "Person id does not exist!" });
  }
  const newPeople = people.filter((person) => person.id !== +id);
  return res.status(200).json({ success: true, data: newPeople });
});

app.listen(5000, () => {
  console.log(`Server is listening on port 5000`);
});
