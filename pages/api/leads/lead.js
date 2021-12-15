import Lead from "../../../models/lead";
import dbConnect from "../../../utils/dbConnect";
import { sendMail } from "../../../utils/mail";

export default async function handler(req, res) {
	const { method } = req;
	await dbConnect();

	if (method === "POST") {
		const { firstName, lastName, email, phone, expertise, planId, trainer } =
			req.body;

		let lead = new Lead({
			firstName,
			lastName,
			email,
			phone,
			planId,
			trainer,
			expertise,
		});

		try {
			const savedLead = await lead.save();
			await sendMail({
				from: "nmimran99@gmail.com",
				to: "nmimran99@gmail.com",
				subject: `XFormhub - ${firstName} ${lastName} `,
				text: savedLead._id,
			});
			res.status(200).json(savedLead);
		} catch (e) {
			console.log(e.message);
			res.status(500).json({ err: e.message });
		}
	}
}
