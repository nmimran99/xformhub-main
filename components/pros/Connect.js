import axios from "axios";
import { useCallback, useState } from "react";
import useSnackbar from "../hooks/useSnackbar";

export default function Connect({}) {
	const { snackbar, setSnackbar } = useSnackbar();
	const [errors, setErrors] = useState([]);
	const [submitting, setSubmitting] = useState(false);
	const [details, setDetails] = useState({
		fullName: "",
		email: "",
	});

	const handleChange = (field) => (event) => {
		setDetails({ ...details, [field]: event.target.value });
		setErrors(errors.filter((e) => e.field !== field));
	};

	const handleSubmit = async () => {
		setSubmitting(true);
		const isValid = await validateFields();

		if (!isValid) {
			setSubmitting(false);
			return;
		}

		const res = await axios.post("/api/leads/professional", details);
		if (res.status === 200) {
			setSubmitting(false);
			setSnackbar({
				result: "success",
				text: "Your details were submitted successfully!",
			});
			return;
		}

		setSubmitting(false);
		setSnackbar({ result: "failed", text: "Message failed to be sent." });
	};

	const validateFields = async () => {
		let tempErrors = [];
		Object.entries(details).forEach((dt) => {
			let [field, value] = dt;

			if (!value || value === "") {
				tempErrors.push({ field: field, text: "Field can not be empty" });
				return;
			}

			if (field === "email") {
				const r = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
				if (!r.test(value)) {
					tempErrors.push({
						field: "email",
						text: "Please enter a valid email address",
					});
				}
				return;
			}
		});

		setErrors(tempErrors);
		return !tempErrors.length;
	};

	const getError = useCallback((field) => {
		return errors.find((e) => e.field === field);
	});

	const Error = ({ field }) => {
		return errors && getError(field) ? (
			<div className="text-xs text-red-600 rounded-full py-1 w-max font-semibold px-3">
				{getError(field).text}
			</div>
		) : null;
	};

	return (
		<div className="bg-black bg-opacity-80 shadow-xl rounded-xl p-6 text-gray-200 border border-gray-300">
			{snackbar.result ? (
				snackbar.result === "success" ? (
					<>
						<div className="text-xl pb-2">Thank you for reaching out!</div>
						<div className="text-xs pb-2">
							We are thrilled to connect with you.
						</div>
						<div className="text-xs pb-2">
							We have sent you an email with further introduction and
							instructions.
						</div>
					</>
				) : (
					<>
						<div className="text-xl pb-2">Oh no! Something went wrong</div>
						<div className="text-xs pb-2">
							We were unable to process your request at the moment, but we are
							keen to talk to you!
						</div>
						<div className="text-xs pb-2">
							Please refer to our{" "}
							<a href="/contact" className="underline">
								Contact us
							</a>{" "}
							page or send us an email directly to niv@xformhub.com and we will
							make sure to contact you as soon as possible.
						</div>
					</>
				)
			) : (
				<>
					<div className="text-2xl pb-2">Let&apos;s talk </div>
					<div className="text-xs pb-2">
						Please fill in your contact details and we will reach out as soon as
						possible.
					</div>
					<div className="text-xs py-1">
						<div className="text-gray-5700">Full Name</div>
						<input
							className="w-5/6 border border-gray-600 rounded-full h-8 px-4 text-gray-700"
							value={details.fullName}
							onChange={handleChange("fullName")}
						/>
						<Error field={"fullName"} />
					</div>
					<div className="text-xs py-1">
						<div className="text-gray-5700">Email address</div>
						<input
							className="w-5/6 border border-gray-600 rounded-full h-8 px-4 text-gray-700"
							value={details.email}
							onChange={handleChange("email")}
						/>
						<Error field={"email"} />
					</div>
					<button
						disabled={submitting}
						className="bg-blue-600 text-white py-1.5 px-8 text-sm rounded-full w-max mt-3 border border-gray-300"
						onClick={handleSubmit}
					>
						{submitting ? "Submitting..." : "Submit"}
					</button>
				</>
			)}
		</div>
	);
}
