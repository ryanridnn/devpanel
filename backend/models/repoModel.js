import mongoose from "mongoose";
import { PATH_SOURCES } from "../constants.js";

const repoSchema = new mongoose.Schema({
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
			required: true,
			enum: [PATH_SOURCES.LOCAL, PATH_SOURCES.GITHUB],
		},
		url: {
			type: String,
			required: true,
		},
	},
	tags: {
		type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Tag" }],
		required: true,
	},
	createdAt: {
		type: Date,
		default: new Date(),
	},
});

export default mongoose.model("Repo", repoSchema);
