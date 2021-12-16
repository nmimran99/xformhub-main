import { useCallback, useEffect, useState } from "react";
import { getFullName } from "../../../utils/helper";
import cookieCutter from "cookie-cutter";
import useSnackbar from "../../hooks/useSnackbar";
import Modal from "../../misc/Modal";
import FormControls from "../actions/filters/FormControls";
import axios from "axios";
import { getCookies, setCookies } from "../../../utils/helper/cookies";

const MAX_LENGTH_TEXTAREA = 250;

const dataFields = [
	{
		name: "firstName",
		label: "First Name",
		type: "text",
		placeHolder: "Your first name...",
	},
	{
		name: "lastName",
		label: "Last Name",
		type: "text",
		placeHolder: "Your last name...",
	},
	{
		name: "email",
		label: "Email Address",
		type: "email",
		placeHolder: "email@gmail.com",
	},
];

export default function AddReviewModal({
	trainer,
	handleAddReview,
	handleClose,
}) {
	const [errors, setErrors] = useState([]);
	const [details, setDetails] = useState({
		firstName: "",
		lastName: "",
		email: "",
		rating: 0,
		content: "",
	});
	const { setSnackbar } = useSnackbar();

	useEffect(() => {
		let info = getCookies(["firstName", "lastName", "email"]);
		setDetails({
			...details,
			...info,
		});
	}, []);

	const handleChange = (field) => (e) => {
		setDetails({
			...details,
			[field]: e.target.value,
		});
		setErrors(errors.filter((e) => e.field !== field));
	};

	const handleChangeRating = (value) => (event) => {
		setDetails({
			...details,
			rating: value,
		});
		setErrors(errors.filter((e) => e.field !== "rating"));
	};

	const handleSubmit = async () => {
		setErrors([]);
		let isValid = await validateFields();
		if (!isValid) return;

		const res = await axios.post("/api/reviews/review", {
			...details,
			trainer: trainer._id,
		});

		setCookies({
			firstName: details.firstName,
			lastName: details.lastName,
			email: details.email,
		});

		setSnackbar({
			result: "success",
			text: "Your review was submitted! Thank you!",
		});

		handleClose();
	};

	const validateFields = async () => {
		let tempErrors = [];
		Object.entries(details).forEach((dt) => {
			let [field, value] = dt;

			if (field === "rating" && value === 0) {
				tempErrors.push({
					field: "rating",
					text: `Please rate by clicking the stars`,
				});
			}

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
		<Modal hideControls>
			<div
				className="w-screen h-screen bg-white bg-opacity-10 backdrop-filter backdrop-blur-3xl
				md:w-3/4 md:h-5/6 md:border md:border-ray-300 md:rounded-xl md:my-auto
				lg:w-1/2
				xl:w-1/3
			"
			>
				<button
					className="absolute right-8 top-8
					md:top-4
					xl:top-8
				"
					onClick={handleClose}
				>
					<img src="/icons/close.svg" className="w-8" />
				</button>
				<div className="p-4 text-3xl mt-24">
					Give {getFullName(trainer)} a feedback
				</div>

				<div className="">
					<div className="flex w-5/6 justify-evenly mx-auto">
						{[5, 4, 3, 2, 1].map((i) => (
							<button
								className={`text-5xl ${
									details.rating >= i ? "text-yellow-200" : "text-gray-600"
								}`}
								key={i}
								onClick={handleChangeRating(i)}
							>
								&#9734;
							</button>
						))}
					</div>
					<Error field={"rating"} />
				</div>

				<div className="p-4">
					{dataFields.map((field, i) => (
						<div className="my-3 mr-3 w-min" key={i}>
							<div className="text-xs text-gray-300 py-1">{field.label}</div>
							<input
								type="text"
								className={`rounded-full h-8 w-60 text-xs px-4 text-black  ${
									errors && getError(field.name) && "border-2 border-red-600"
								}`}
								value={details[field.name]}
								onChange={handleChange(field.name)}
								placeholder={field.placeHolder}
							/>
							<Error field={field.name} />
						</div>
					))}
					<div className="my-3 mr-3 w-full">
						<div className="flex justify-between">
							<div className="text-xs text-gray-300 py-1">Feedback</div>
							<div className="flex text-xs px-2 py-1 text-gray-300">
								{MAX_LENGTH_TEXTAREA - (details?.content?.length || 0)}
								<div className="px-1">Characters left</div>
							</div>
						</div>

						<textarea
							rows={6}
							type="text"
							className={`rounded-xl w-full text-xs p-4 text-black ${
								errors && getError("content") && "border-2 border-red-600"
							}`}
							value={details.content}
							onChange={handleChange("content")}
							placeholder={"How was your experience?"}
							maxLength={MAX_LENGTH_TEXTAREA}
						/>
						<Error field={"content"} />
					</div>
				</div>

				<div>
					<FormControls
						applyText="Submit Feedback"
						closeText="Cancel"
						toggle={handleClose}
						handleSubmit={handleSubmit}
					/>
				</div>
			</div>
		</Modal>
	);
}
