import mongoose from "mongoose";

import Material from "../models/MaterialModel.js";
import { isAllNotNull } from "../utils/index.js";

export const getAllMaterials = async (req, res) => {
  try {
    const materials = await Material.find().populate("tags");
    return res.status(200).json({ materials });
  } catch (e) {
    res.status(400).json({ message: "Something went wrong!" });
  }
};

export const getMaterialsByTag = async (req, res) => {
  const tagId = req.params.tagId;

  if (!mongoose.Types.ObjectId.isValid(tagId))
    return res.status(400).json({ message: "No document with that ID!" });

  try {
    const materials = await Material.find({ tags: tagId }).populate("tags");
    return res.status(200).json({ materials });
  } catch (e) {
    res.status(400).json({ message: "Something went wrong!" });
  }
};

export const addMaterial = async (req, res) => {
  const { name, url, tags } = req.body;

  if (!isAllNotNull([name, url, tags]))
    return res.status(400).json({ message: "Not enough parameters!" });

  try {
    let material = await Material.create({ name, url, tags });
    material = await material.populate("tags");
    return res.status(201).json({ material, message: "Material is created!" });
  } catch (e) {
    return res.status(400).json({ message: "Something went wrong!" });
  }
};

export const deleteMaterial = async (req, res) => {
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(400).json({ message: "No document with that ID!" });

  try {
    await Material.findByIdAndRemove(id);
    return res.status(200).json({ message: "Material is deleted!" });
  } catch (e) {
    return res.status(400).json({ message: "Something went wrong!" });
  }
};

export const updateMaterial = async (req, res) => {
  const { _id: id, ...rest } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(400).json({ message: "No document with that ID!" });

  try {
    let material = await Material.findByIdAndUpdate(id, rest, {
      new: true,
    });
    material = await material.populate("tags");
    return res.status(200).json({ material, message: "Material is updated!" });
  } catch (e) {
    return res.status(400).json({ message: "Something went wrong!" });
  }
};
