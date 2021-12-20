import Lead from "../../../models/lead";
import Plan from "../../../models/plan";
import Trainer from "../../../models/trainer";
import dbConnect from "../../../utils/dbConnect";
import { getFullName } from "../../../utils/helper";
import { sendMail } from "../../../utils/mail/mail";
import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

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
			await sendLeadEmail(savedLead);

			res.status(200).json(savedLead);
		} catch (e) {
			console.log(e.message);
			res.status(500).json({ err: e.message });
		}
	}
}

const sendLeadEmail = async (savedLead) => {
	try {
		const plan = await Plan.findOne({ _id: savedLead.planId }).lean();
		const trainer = await Trainer.findOne({ _id: savedLead.trainer }).lean();

		const message = {
			from: "support@xformhub.com",
			to: "niv@xformhub.com",
			templateId: "d-8bc2dd24b8a145de8ccd5cb381eaac3b",
			dynamicTemplateData: {
				lead_create_date: savedLead.createdAt,
				lead_id: savedLead._id.toString(),
				lead_name: getFullName(savedLead),
				lead_email: savedLead.email,
				lead_phone_number: savedLead.phone,
				lead_expertise: savedLead.expertise.join(", "),
				trainer_id: trainer._id.toString(),
				trainer_name: getFullName(trainer),
				trainer_link: `https://www.xformhub.com/explore/${trainer._id.toString()}`,
				plan_id: plan?._id.toString() || "No Plan",
				plan_name: plan?.title || "No Plan",
				plan_price: plan?.price || "No Plan",
			},
		};

		await sgMail.send(message);
	} catch (e) {
		console.log(e.message);
	}
};
