import path from "path";
import nodemailer from "nodemailer";
import getConfig from "next/config";
const hbs = require("nodemailer-express-handlebars");

export const sendMail = async (mailOptions) => {
	return new Promise(async (resolve, reject) => {
		return createMailTransporter()
			.then((transporter) => {
				transporter.sendMail(mailOptions, (error, data) => {
					if (error) {
						console.log(error);
						resolve({
							isError: true,
							error,
						});
					} else {
						resolve({
							isError: false,
							data,
							message: "Email sent successfully",
						});
					}
				});
			})
			.catch((error) => {
				console.log(error.message);
				reject({
					isError: true,
					error,
				});
			});
	});
};

export const createMailTransporter = async () => {
	return new Promise((resolve, reject) => {
		try {
			let transport = nodemailer.createTransport({
				service: "Gmail",
				auth: {
					user: "nmimran99@gmail.com",
					pass: "G0nxkC9kpFp",
				},
			});

			transport.use(
				"compile",
				hbs({
					viewEngine: {
						partialsDir: "templates", //your path, views is a folder inside the source folder
						layoutsDir: "templates",
						defaultLayout: "", //set this one empty and provide your template below,
					},
					viewPath: path
						.join(
							getConfig().serverRuntimeConfig.PROJECT_ROOT,
							"/public/templates"
						)
						.toString(),
				})
			);
			resolve(transport);
		} catch (e) {
			console.log(e.message);
			reject({
				message: "Could not create mail transport.",
			});
		}
	});
};
