import mongoose from "mongoose";

import Repo from "../models/repoModel.js";
import { isAllNotNull } from "../utils/index.js";

export const getAllRepos = async (req, res) => {
  try {
    const repos = await Repo.find().populate("tags");
    return res.status(200).json({ repos });
  } catch (e) {
    return res.status(400).json({ message: "Something went wrong!" });
  }
};

export const getReposByTag = async (req, res) => {
  const tagId = req.params.tagId;

  if (!mongoose.Types.ObjectId.isValid(tagId))
    return res.status(400).json({ message: "No document with that ID!" });

  try {
    const repos = await Repo.find({ tags: tagId }).populate("tags");
    return res.status(200).json({ repos });
  } catch (e) {
    return res.status(400).json({ message: "Something went wrong!" });
  }
};

export const addRepo = async (req, res) => {
  const {
    name,
    desc,
    path: { source, url },
    tags,
  } = req.body;

  if (!isAllNotNull([name, desc, source, url, tags]))
    return res.status(400).json({ message: "Not enough parameters!" });

  try {
    let repo = await Repo.create(req.body);
    repo = await repo.populate("tags");
    return res.status(201).json({ repo, message: "Repo is created!" });
  } catch (e) {
    return res.status(400).json({ message: "Something went wrong!" });
  }
};

export const deleteRepo = async (req, res) => {
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(400).json({ message: "No document with that ID!" });

  try {
    await Repo.findByIdAndRemove(id);
    return res.status(200).json({ message: "Repo is deleted!" });
  } catch (e) {
    return res.status(400).json({ message: "Something went wrong!" });
  }
};

export const updateRepo = async (req, res) => {
  const { _id: id, ...rest } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(400).json({ message: "No document with that ID!" });
  try {
    let repo = await Repo.findByIdAndUpdate(id, rest, { new: true });
    repo = await repo.populate("tags");
    return res.status(200).json({ repo, message: "Repo is updated!" });
  } catch (e) {
    return res.status(400).json({ message: "Something went wrong!" });
  }
};
