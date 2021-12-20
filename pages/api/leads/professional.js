import sgMail from "@sendgrid/mail";
import dbConnect from "../../../utils/dbConnect";

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export default async function handler(req, res) {
	const { method } = req;
	await dbConnect();

	if (method === "POST") {
		try {
			await sendProEmail(req.body);

			res.status(200).json(true);
		} catch (e) {
			console.log(e.message);
			res.status(500).json({ err: e.message });
		}
	}
}

const sendProEmail = async (details) => {
	try {
		const message = {
			from: "niv@xformhub.com",
			to: details.email,
			templateId: "d-af8d7e70ea4d45b68f9a0ba23fa9cdea",
			dynamicTemplateData: {
				fullName: details.fullName,
			},
		};

		await sgMail.send(message);
	} catch (e) {
		console.log(e.message);
	}
};
