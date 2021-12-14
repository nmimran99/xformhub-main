import mongoose from "mongoose";
var Schema = mongoose.Schema;

const userSchema = new Schema(
	{
		email: String,
		firstName: String,
		lastName: String,
		avatar: String,
		isVerified: { type: Boolean, default: false },
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model("User", userSchema);
