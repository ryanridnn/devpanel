import express from "express";
const router = express.Router();

import {
	getTags,
	addTag,
	deleteTag,
	updateTagName,
} from "../controllers/tagsController.js";

router.get("/:menu", getTags);
router.post("/", addTag);
router.delete("/:id", deleteTag);
router.patch("/", updateTagName);

export default router;
