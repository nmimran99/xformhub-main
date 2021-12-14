import mongoose from "mongoose";
var Schema = mongoose.Schema;

const mediaSchema = new Schema(
	{
		url: String,
		type: String,
		format: String,
		trainer: { type: Schema.Types.ObjectId, ref: "Trainer" },
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.models.Media || mongoose.model("Media", mediaSchema);
