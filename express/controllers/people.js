const {people} = require('../data');

const getPeople = (req, res) => {
  return res.status(200).json({ success: true, data: people });
};

const createPerson = (req, res) => {
  const { name } = req.body;
  console.log(`name = ${name}`);
  if (!name) {
    return res
      .status(400)
      .json({ success: false, msg: "Please provide name value" });
  }
  return res.status(201).send({ success: true, person: name });
};

const createPersonPostman = (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res
      .status(400)
      .json({ success: false, msg: "Please provide name value" });
  }
  return res.status(201).send({ success: true, person: [...people, name] });
};

const updatePerson = (req, res) => {
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
};

const deletePerson = (req, res) => {
  const { id } = req.params;
  const selectedPerson = people.find((person) => person.id === +id);
  if (!selectedPerson) {
    return res
      .status(404)
      .json({ success: false, msg: "Person id does not exist!" });
  }
  const newPeople = people.filter((person) => person.id !== +id);
  console.log("delete OK!");
  return res.status(200).json({ success: true, data: newPeople });
};

module.exports = {
  getPeople,
  createPerson,
  createPersonPostman, 
  updatePerson, 
  deletePerson
}