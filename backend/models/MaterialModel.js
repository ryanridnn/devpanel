import mongoose from "mongoose";

const materialSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	url: {
		type: String,
		required: true,
	},
	tags: {
		type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Tag" }],
	},
	createdAt: {
		type: Date,
		default: new Date(),
	},
});

export default mongoose.model("Material", materialSchema);
