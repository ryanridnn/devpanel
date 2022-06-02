import express from "express";

import {
	addMaterial,
	deleteMaterial,
	getAllMaterials,
	getMaterialsByTag,
	updateMaterial,
} from "../controllers/materialsController.js";

const router = express.Router();

router.get("/", getAllMaterials);
router.get("/:tagId", getMaterialsByTag);
router.post("/", addMaterial);
router.delete("/:id", deleteMaterial);
router.patch("/", updateMaterial);

export default router;
