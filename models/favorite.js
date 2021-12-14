import mongoose from "mongoose";
var Schema = mongoose.Schema;

const favoriteSchema = new Schema(
	{
		user: { type: Schema.Types.ObjectId, ref: "User" },
		trainer: { type: Schema.Types.ObjectId, ref: "Trainer" },
	},
	{
		timestamps: true,
	}
);

module.exports =
	mongoose.models.Favorite || mongoose.model("Favorite", favoriteSchema);
