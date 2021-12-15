import mongoose from "mongoose";
var Schema = mongoose.Schema;

const reviewSchema = new Schema(
	{
		user: { type: Schema.Types.ObjectId, ref: "User" },
		trainer: { type: Schema.Types.ObjectId, ref: "Trainer" },
		rating: Number,
		tags: [String],
		description: String,
	},
	{
		timestamps: true,
	}
);

module.exports =
	mongoose.models?.Review || mongoose.model("Review", reviewSchema);
