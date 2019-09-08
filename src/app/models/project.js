const mongoose = require("../../db");
const bcrypt = require("bcryptjs");

const Schema = mongoose.Schema;

const ProjectSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User"
  },
  tasks: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Task"
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Project = mongoose.model("Projects", ProjectSchema);

module.exports = Project;
