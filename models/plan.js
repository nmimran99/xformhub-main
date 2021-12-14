import mongoose from "mongoose";
var Schema = mongoose.Schema;

const planSchema = new Schema(
	{
		trainer: { type: Schema.Types.ObjectId, ref: "Trainer" },
		title: String,
		price: Number,
		points: [String],
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.models.Plan || mongoose.model("Plan", planSchema);
