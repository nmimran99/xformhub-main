import Review from "../../../models/review";
import User from "../../../models/user";
import dbConnect from "../../../utils/dbConnect";
import { getFullName } from "../../../utils/helper";
import { sendMail } from "../../../utils/mail/mail";

export default async function handler(req, res) {
	const { method } = req;
	await dbConnect();

	if (method === "POST") {
		let result = await sendUserVerification({ ...req.query });
		if (result) {
			res.status(200).json({ result });
		}
		res.status(500).json({ result });
	}

	if (method === "GET") {
		const { userId } = req.query;
		try {
			let updated = await User.findOneAndUpdate(
				{ _id: userId },
				{ $set: { isVerified: true } },
				{ new: true }
			);
			res.status(200).json(updated);
		} catch (error) {
			console.log(e.message);
			res.status(500).json({ error });
		}
	}
}

export const sendUserVerification = async (user) => {
	try {
		await sendMail({
			from: "nmimran99@gmail.com",
			to: user.email,
			subject: `XFormhub - Email Verification `,
			template: "emailVerification",
			context: {
				fullName: getFullName(user),
				link: `https://www.xformhub.com/users/verify/${user._id}`,
			},
		});
		return true;
	} catch (e) {
		console.log(e.message);
		return e;
	}
};
