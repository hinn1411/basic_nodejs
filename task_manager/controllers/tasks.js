const asyncWrapper = require("../middleware/async");
const Task = require("../models/Task");
const {createCustomError} = require('../errors/customError'); 
const getAllTasks = asyncWrapper(async (req, res) => {
  const tasks = await Task.find({});
  return res.status(200).json({ tasks: tasks });
});

/*
    const tasks = await Task.find({});
    return res.status(200).json({ tasks: tasks });
*/

const createTask = asyncWrapper(async (req, res) => {
  const task = await Task.create(req.body);
  return res.status(201).json({ task: task });
});

const getTask = asyncWrapper(async (req, res, next) => {
  const { id } = req.params;
  const task = await Task.findOne({ _id: id });
  if (!task) {
    return next(createCustomError("Not found", 404));
  }
  return res.status(200).json({ task: task });
});

const deleteTask = asyncWrapper(async (req, res, next) => {
  const { id } = req.params;
  const task = await Task.findOneAndRemove({ _id: id });
  if (!task) {
    return next(createCustomError("Not found", 404));
  }
  return res.status(200).json({ task: task });
});

const updateTask = asyncWrapper(async (req, res, next) => {
  const { id } = req.params;
  const task = await Task.findOneAndUpdate({ _id: id }, req.body, {
    new: true,
    runValidators: true,
  });
  if (!task) {
    return next(createCustomError("Not found", 404));
  }
  return res.status(200).json({ task: task });
});

const editTask = asyncWrapper(async (req, res, next) => {
  const { id } = req.params;
  const task = await Task.findOneAndUpdate({ _id: id }, req.body, {
    new: true,
    runValidators: true,
    overwrite: true,
  });
  if (!task) {
    return next(createCustomError("Not found", 404));
  }
  return res.status(200).json({ task: task });
});

module.exports = {
  getAllTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
  editTask,
};
