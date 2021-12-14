import mongoose from "mongoose";
var Schema = mongoose.Schema;

const trainerSchema = new Schema(
	{
		email: String,
		firstName: String,
		lastName: String,
		country: String,
		province: String,
		state: String,
		city: String,
		handles: {
			instagram: String,
			twitter: String,
			youtube: String,
			linkedin: String,
			website: String,
			facebook: String,
		},
		expertise: [String],
		avatar: String,
		isVerified: { type: Boolean, default: false },
		introduction: String,
	},
	{
		timestamps: true,
	}
);

module.exports =
	mongoose.models.Trainer || mongoose.model("Trainer", trainerSchema);
