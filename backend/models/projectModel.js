import mongoose from "mongoose";
import { PATH_SOURCES } from "../constants.js";

const projectSchema = new mongoose.Schema({
	avatar: String,
	name: {
		type: String,
		required: true,
	},
	desc: {
		type: String,
		required: true,
	},
	path: {
		source: {
			type: String,
			enum: [PATH_SOURCES.LOCAL, PATH_SOURCES.GITHUB],
			required: true,
		},
		url: {
			type: String,
			required: true,
		},
	},
	deployed: {
		isDeployed: {
			type: Boolean,
			required: true,
		},
		url: {
			type: String,
		},
	},
	tags: {
		type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Tag" }],
	},
	createdAt: {
		type: Date,
		default: new Date(),
	},
});

export default mongoose.model("Project", projectSchema);
