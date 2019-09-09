const express = require("express");

const authMiddleware = require("../middleares/auth");

const Project = require("../models/project");
const Task = require("../models/task");

const router = express.Router();

router.use(authMiddleware);

router.get("/list", async (req, res) => {
  try {
    const projects = await Project.find().populate(["user", "tasks"]);

    return res.send({ projects });
  } catch (err) {
    return res.status(400).send({ error: `Error ${err} to loading projects` });
  }
});

router.get("/show/:projectId", async (req, res) => {
  try {
    const project = await Project.findById(req.params.projectId).populate([
      "user",
      "tasks"
    ]);

    return res.send({ project });
  } catch (err) {
    return res.status(400).send({ error: `Error ${err} to loading project` });
  }
});

router.post("/create", async (req, res) => {
  try {
    const { title, description, tasks } = req.body;

    const project = await Project.create({
      title,
      description,
      user: req.userId
    });

    await Promise.all(
      tasks.map(async task => {
        const projectTask = new Task({ ...task, project: project._id });

        await projectTask.save();
        project.tasks.push(projectTask);
      })
    );

    await project.save();

    return res.send({ project });
  } catch (err) {
    return res
      .status(400)
      .send({ error: `Error ${err} to create a new project` });
  }
});

router.put("/update/:projectId", async (req, res) => {
  try {
    const { title, description, tasks } = req.body;

    const project = await Project.findByIdAndUpdate(
      req.params.projectId,
      {
        title,
        description
      },
      { new: true }
    );

    project.tasks = [];

    await Task.deleteOne({ project: project._id });

    await Promise.all(
      tasks.map(async task => {
        const projectTask = new Task({ ...task, project: project._id });

        await projectTask.save();
        project.tasks.push(projectTask);
      })
    );

    await project.save();

    return res.send({ project });
  } catch (err) {
    return res.status(400).send({ error: `Error ${err} to updating project` });
  }
});

router.delete("/delete/:projectId", async (req, res) => {
  try {
    await Project.findByIdAndRemove(req.params.projectId);

    return res.send();
  } catch (err) {
    return res.status(400).send({ error: `Error ${err} to deleting project` });
  }
});

module.exports = app => app.use("/projects", router);
