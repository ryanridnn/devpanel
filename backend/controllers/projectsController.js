import mongoose from "mongoose";
import path from "path";
import sharp from "sharp";
import { v4 } from "uuid";
import fs from "fs";

import Project from "../models/projectModel.js";
import { isAllNotNull } from "../utils/index.js";

export const getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find().populate("tags");
    return res.status(200).json({ projects });
  } catch (e) {
    return res.status(400).json({ message: "Something went wrong!" });
  }
};

export const getProjectsByTag = async (req, res) => {
  const tagId = req.params.tagId;

  if (!mongoose.Types.ObjectId.isValid(tagId))
    return res.status(400).json({ message: "No document with that ID!" });

  try {
    const projects = await Project.find({ tags: tagId }).populate("tags");
    return res.status(200).json({ projects });
  } catch (e) {
    return res.status(400).json({ message: "Something went wrong!" });
  }
};

export const addProject = async (req, res) => {
  const {
    avatar,
    tags,
    name,
    desc,
    pathSource,
    pathUrl,
    isDeployed,
    deployedUrl,
  } = req.body;

  if (!isAllNotNull([tags, name, desc, pathSource, pathUrl, isDeployed]))
    return res.status(400).json({ message: "Not enough parameters!" });
  else if (isDeployed && !deployedUrl) {
    return res.status(400).json({
      message:
        "No deployed url provided when the project is deployed input is set to true!",
    });
  }

  const avatarName = v4() + ".webp";

  if (req.file) {
    const { path: avatarPath } = req.file;

    try {
      await sharp(avatarPath)
        .resize(200)
        .webp()
        .toFile(path.resolve("./backend/storage/avatars/", avatarName));

      fs.unlinkSync(avatarPath);
    } catch (e) {
      return res.status(500).json({ message: "Something went wrong!" });
    }
  }

  const payload = {
    avatar: req.file ? "/storage/avatars/" + avatarName : null,
    name,
    desc,
    path: {
      source: pathSource,
      url: pathUrl,
    },
    deployed: {
      isDeployed: isDeployed === "true",
      url: deployedUrl || null,
    },
    tags,
  };

  try {
    const project = await Project.create(payload);
    return res.status(201).json({ project, message: "Project is created!" });
  } catch (e) {
    return res.status(400).json({ message: "Something went wrong!" });
  }
};

export const deleteProject = async (req, res) => {
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(400).json({ message: "No document with that ID!" });

  try {
    await Project.findByIdAndRemove(id);
    return res.status(200).json({ message: "Project is deleted!" });
  } catch (e) {
    return res.status(400).json({ message: "Something went wrong!" });
  }
};

export const updateProject = async (req, res) => {
  const {
    _id,
    avatar,
    tags,
    name,
    desc,
    pathSource,
    pathUrl,
    isDeployed,
    deployedUrl,
  } = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(400).json({ message: "No document with that ID!" });
  else if (isDeployed && !deployedUrl) {
    return res.status(400).json({
      message:
        "No deployed url provided when the project is deployed input is set to true!",
    });
  }

  const avatarName = v4() + ".webp";

  if (req.file) {
    const { path: avatarPath } = req.file;

    try {
      await sharp(avatarPath)
        .resize(200)
        .webp()
        .toFile(path.resolve("./backend/storage/avatars/", avatarName));

      fs.unlinkSync(avatarPath);
    } catch (e) {
      return res.status(500).json({ message: "Something went wrong!" });
    }
  }

  const payload = {
    name,
    desc,
    path: {
      source: pathSource,
      url: pathUrl,
    },
    deployed: {
      isDeployed: isDeployed === "true",
      url: deployedUrl || null,
    },
    tags: tags ? tags : [],
  };

  if (req.file) {
    payload.avatar = "/storage/avatars/" + avatarName;
  }

  try {
    let project = await Project.findByIdAndUpdate(_id, payload, {
      new: true,
    });
    project = await project.populate("tags");
    return res.status(200).json({ project, message: "Project is updated!" });
  } catch (e) {
    return res.status(400).json({ message: "Something went wrong!" });
  }
};
