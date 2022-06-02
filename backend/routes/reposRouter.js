import express from "express";
import {
	addRepo,
	deleteRepo,
	getAllRepos,
	getReposByTag,
	updateRepo,
} from "../controllers/reposController.js";

const router = express.Router();

router.get("/", getAllRepos);
router.get("/:tagId", getReposByTag);
router.post("/", addRepo);
router.delete("/:id", deleteRepo);
router.patch("/", updateRepo);

export default router;
