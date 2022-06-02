import express from "express";
import multer from "multer";
import path from "path";
import { v4 } from "uuid";

import {
  getAllProjects,
  getProjectsByTag,
  addProject,
  deleteProject,
  updateProject,
} from "../controllers/projectsController.js";

const router = express.Router();

const storage = multer.diskStorage({
  destination: path.resolve("./backend/storage/avatars"),
  filename: function (req, file, cb) {
    const format = file.mimetype.split("/")[1];

    cb(null, v4() + "." + format);
  },
});

const upload = multer({ storage });

router.get("/", getAllProjects);
router.get("/:tagId", getProjectsByTag);
router.post("/", upload.single("avatar"), addProject);
router.delete("/:id", deleteProject);
router.patch("/", upload.single("avatar"), updateProject);

export default router;
