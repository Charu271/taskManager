const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const task = require("../models/Tasks.js");

router.post("/tasks", auth, async (req, res) => {
  const newTask = new task({ ...req.body, owner: req.User._id });
  try {
    await newTask.save();
    res.status(201).send(newTask);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.get("/tasks", auth, async (req, res) => {
  try {
    //const tasks = await task.find({});
    const match = {};
    const sort = {};
    if (req.query.completed) {
      match.completed = req.query.completed === "true";
    }
    if (req.query.sortBy) {
      const parts = req.query.sortBy.split(":");
      sort[parts[0]] = parts[1] === "desc" ? -1 : 1;
    }
    await req.User.populate({
      path: "tasks",
      match,
      options: {
        limit: parseInt(req.query.limit),
        skip: parseInt(req.query.skip),
        sort,
      },
    }).execPopulate();
    res.send(req.User.tasks);
    // const tasks = await task.find({ owner: req.User._id });
    // res.send(tasks);
  } catch (e) {
    res.status(500).send(e.message);
  }
});
router.get("/tasks/:id", auth, async (req, res) => {
  const _id = req.params.id;
  try {
    //const Task = await task.findById(_id);
    const Task = await task.findOne({ _id, owner: req.User.id });
    if (!Task) {
      return res.status(404).send();
    }
    res.send(Task);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

router.patch("/tasks/:id", auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["description", "completed"];
  const isValidOperation = updates.every((update) => {
    return allowedUpdates.includes(update);
  });
  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid operation" });
  }
  try {
    // const Task = await task.findByIdAndUpdate(req.params.id, req.body, {
    //   new: true,
    //   runValidators: true,
    // });
    //const Task = await task.findById(req.params.id);
    const Task = await task.findOne({
      _id: req.params.id,
      owner: req.User._id,
    });

    if (!Task) {
      return res.status(404).send();
    }
    updates.forEach((update) => (Task[update] = req.body[update]));
    await Task.save();
    res.send(Task);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

router.delete("/tasks/:id", auth, async (req, res) => {
  try {
    //const Task = await task.findByIdAndDelete(req.params.id);
    const Task = await task.findOneAndDelete({
      _id: req.params.id,
      owner: req.User._id,
    });
    if (!Task) {
      return res.status(404).send();
    }
    res.send(Task);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

module.exports = router;
