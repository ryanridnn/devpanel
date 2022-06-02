import mongoose from "mongoose";
import { MENUS } from "../constants.js";

const tagSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
  },
  menu: {
    type: String,
    enum: [MENUS.PROJECTS, MENUS.REPOS, MENUS.MATERIALS],
  },
});

export default mongoose.model("Tag", tagSchema);
