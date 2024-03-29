import Review from "../../../models/review";
import User from "../../../models/user";
import dbConnect from "../../../utils/dbConnect";
import { sendUserVerification } from "../users/verify";

export default async function handler(req, res) {
	const { method } = req;
	await dbConnect();

	if (method === "POST") {
		const { firstName, lastName, email, content, trainer, rating, tags } =
			req.body;
		let userData = await User.findOne({ email });

		if (!userData) {
			const user = new User({
				firstName,
				lastName,
				email,
				avatar: null,
				phoneNumber: null,
				isVerified: false,
			});

			userData = await user.save();
		}

		if (!userData.isVerified) {
			sendUserVerification(userData);
		}

		let review = new Review({
			user: userData._id,
			trainer,
			firstName,
			lastName,
			email,
			description: content,
			rating,
			tags,
		});

		try {
			const savedReview = await review.save();
			res.status(200).json(savedReview);
		} catch (e) {
			console.log(e.message);
			res.status(500).json({ err: e.message });
		}
	}
}
