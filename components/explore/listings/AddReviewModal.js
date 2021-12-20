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

const tags = [
	"Responsive",
	"Caring",
	"Flexible",
	"Detail Oriented",
	"Kind",
	"Educating",
	"Motivating",
	"Understanding",
	"Creative",
	"Dependable",
	"Friendly",
	"Patient",
	"Positive",
	"Nurturing",
];

export default function AddReviewModal({
	trainer,
	handleAddReview,
	handleClose,
}) {
	const [isLoading, setIsLoading] = useState(false);
	const [errors, setErrors] = useState([]);
	const [details, setDetails] = useState({
		firstName: "",
		lastName: "",
		email: "",
		rating: 0,
		content: "",
		tags: [],
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
		setIsLoading(true);
		setErrors([]);

		let isValid = await validateFields();

		if (!isValid) {
			setIsLoading(false);
			return;
		}

		const savedReview = await axios.post("/api/reviews/review", {
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

	const handleClickTag = (tag) => (event) => {
		setDetails({
			...details,
			tags: details.tags.find((t) => t == tag)
				? details.tags.filter((t) => t !== tag)
				: [...details.tags, tag],
		});
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
				"
					onClick={handleClose}
				>
					<img src="/icons/close.svg" className="w-8" />
				</button>
				<div
					className="p-4 h-screen overflow-y-auto
					md:h-full md:overflow-y-auto md:p-8
				"
				>
					<div className="p-4 text-3xl mt-12">
						Give {getFullName(trainer)} a feedback
					</div>

					<div className="">
						<div className="flex w-5/6 justify-evenly mx-auto">
							{[1, 2, 3, 4, 5].map((i) => (
								<button
									className={`text-3xl text-gray-600`}
									key={i}
									onClick={handleChangeRating(i)}
								>
									{details.rating >= i ? `\u2B50` : `\u2606`}
								</button>
							))}
						</div>
						<Error field={"rating"} />
					</div>

					<div
						className="p-4 mb-40
					md:flex md:flex-wrap
					"
					>
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
						<div className="mt-3 mr-3 w-full">
							<div className="">
								<div className="text-xs text-gray-300 py-1">Tags</div>
							</div>
							<div className=" flex flex-wrap">
								{tags.map((t, i) => (
									<button
										className={`text-xs border border-gray-300 rounded-sm py-1 px-4 m-1 ${
											details.tags.find((tag) => t === tag)
												? "bg-blue-600 text-white"
												: "bg-gray-400 bg-opacity-50 text-gray-300"
										}`}
										onClick={handleClickTag(t)}
										key={i}
										disabled={
											!details.tags.find((tag) => tag === t) &&
											details.tags.length === 5
										}
									>
										{t}
									</button>
								))}
							</div>
							<div className="text-xs text-gray-400 py-1">
								Please choose up to 5 tags that describe {trainer.firstName} the
								best
							</div>
						</div>
					</div>
				</div>

				<div>
					<FormControls
						applyText="Submit Feedback"
						closeText="Cancel"
						toggle={handleClose}
						handleSubmit={handleSubmit}
						isLoading={isLoading}
					/>
				</div>
			</div>
		</Modal>
	);
}
