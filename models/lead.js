import mongoose from "mongoose";
var Schema = mongoose.Schema;

const leadSchema = new Schema(
	{
		user: { type: Schema.Types.ObjectId, ref: "User" },
		trainer: { type: Schema.Types.ObjectId, ref: "Trainer" },
		planId: { type: Schema.Types.ObjectId, ref: "Plan" },
		firstName: String,
		lastName: String,
		email: String,
		phone: String,
		expertise: [String],
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.models?.Lead || mongoose.model("Lead", leadSchema);
