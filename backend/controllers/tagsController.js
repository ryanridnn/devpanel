import mongoose from "mongoose";

import Tag from "../models/tagModel.js";
import { isMenuExist } from "../utils/index.js";

export const getTags = async (req, res) => {
  const menu = req.params.menu;
  if (!isMenuExist(menu)) {
    return res.status(400).json({ message: "Menu is not existed" });
  }

  try {
    const tags = await Tag.find({ menu });
    return res.status(200).json({ tags });
  } catch (e) {
    return res.status(400).json({ message: "Something went wrong!" });
  }
};

export const addTag = async (req, res) => {
  const { menu, name } = req.body;

  if (!menu || !name) {
    return res.status(400).json({ message: "Not enough paramaters" });
  } else if (!isMenuExist(menu)) {
    return res.status(400).json({ message: "Menu is not existed" });
  }

  try {
    const tag = await Tag.create({ name, menu });
    return res.status(201).json({ tag });
  } catch (e) {
    return res.status(400).json({ message: "Something went wrong!" });
  }
};

export const deleteTag = async (req, res) => {
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(400).json({ message: "No document with that ID!" });

  try {
    await Tag.findByIdAndRemove(id);
    res.status(200).json({ message: "Tag is deleted" });
  } catch (e) {
    return res.status(400).json({ message: "Something went wrong!" });
  }
};

export const updateTagName = async (req, res) => {
  const { _id: id, name } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(400).json({ message: "No document with that ID!" });

  try {
    const tag = await Tag.findByIdAndUpdate(id, { name }, { new: true });
    return res.status(200).json({ tag, message: "Tag is updated!" });
  } catch (e) {
    return res.status(400).json({ message: "Something went wrong!" });
  }
};
