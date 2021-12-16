import Lead from "../../../models/lead";
import Plan from "../../../models/plan";
import Trainer from "../../../models/trainer";
import dbConnect from "../../../utils/dbConnect";
import { getFullName } from "../../../utils/helper";
import { sendMail } from "../../../utils/mail/mail";

export default async function handler(req, res) {
	const { method } = req;
	await dbConnect();

	if (method === "POST") {
		console.log(req.body);
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
			sendLeadEmail(savedLead);

			res.status(200).json(savedLead);
		} catch (e) {
			console.log(e.message);
			res.status(500).json({ err: e.message });
		}
	}
}

const sendLeadEmail = async (savedLead) => {
	try {
		const planDoc = await Plan.findOne({ _id: savedLead.planId }).lean();
		const trainerDoc = await Trainer.findOne({ _id: savedLead.trainer }).lean();

		await sendMail({
			from: "nmimran99@gmail.com",
			to: "nmimran99@gmail.com",
			subject: `XFormhub - ${savedLead.firstName} ${savedLead.lastName} `,
			template: "leadEmail",
			context: {
				leadId: savedLead._id,
				fullName: getFullName(savedLead),
				phoneNumber: savedLead.phone,
				email: savedLead.email,
				expertise: savedLead.expertise.join(", "),
				planId: savedLead.planId || "No Plan",
				planName: planDoc?.title || "No Plan",
				trainerId: savedLead.trainer || "Trainer details were not found",
				trainerName:
					getFullName(trainerDoc) || "Trainer details were not found",
			},
		});
	} catch (e) {
		console.log(e.message);
	}
};
