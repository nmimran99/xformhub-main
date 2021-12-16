import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { getAverageRating, getCity, getFullName } from "../../../utils/helper";
import { getCookies, setCookies } from "../../../utils/helper/cookies";
import useSnackbar from "../../hooks/useSnackbar";
import Modal from "../../misc/Modal";
import FormControls from "../actions/filters/FormControls";
import ApplyMobileFilters from "../actions/filters/FormControls";

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
	{
		name: "phone",
		label: "Phone Number",
		type: "text",
		placeHolder: "XXX-XXX-XXXX",
	},
];

export default function LeadModal({ handleClose, trainer, offer }) {
	const [details, setDetails] = useState({
		firstName: "",
		lastName: "",
		email: "",
		phone: "",
		expertise: [],
	});

	const { setSnackbar } = useSnackbar();
	const [errors, setErrors] = useState([]);

	useEffect(() => {
		let info = getCookies(["firstName", "lastName", "email", "phone"]);
		setDetails({
			...details,
			...info,
		});
	}, []);

	const handleChange = (field) => (event) => {
		let val = event.target.value;

		if (field === "phone") {
			const re = /^[0-9\b]+$/;
			if (!(val === "" || re.test(val))) return;
		}
		setDetails({
			...details,
			[field]: val,
		});
		setErrors(errors.filter((e) => e.field !== field));
	};

	const handleExpertise = (exp) => (event) => {
		setDetails((dt) => {
			if (dt.expertise.includes(exp)) {
				return {
					...dt,
					expertise: dt.expertise.filter((e) => e !== exp),
				};
			}
			return {
				...dt,
				expertise: [...dt.expertise, exp],
			};
		});
		setErrors(errors.filter((e) => e.field !== "expertise"));
	};

	const validateFields = async () => {
		let tempErrors = [];
		Object.entries(details).forEach((dt) => {
			let [field, value] = dt;
			if (field === "expertise") {
				if (!value.length) {
					tempErrors.push({ field: field, text: "Please choose at least one" });
					return;
				}
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

			if (field === "phone" && value.length < 10) {
				tempErrors.push({
					field: "phone",
					text: "Please enter a valid phone number",
				});
				return;
			}
		});

		setErrors(tempErrors);
		return !tempErrors.length;
	};

	const handleSubmit = async () => {
		setErrors([]);
		let isValid = await validateFields();
		if (!isValid) return;

		const res = await axios.post("/api/leads/lead", {
			...details,
			trainer: trainer._id,
			planId: offer ? offer._id : null,
		});

		setCookies({
			firstName: details.firstName,
			lastName: details.lastName,
			email: details.email,
			phone: details.phone,
		});

		setSnackbar({
			result: "success",
			text: "Your connect request was received.",
		});
		handleClose();
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
				<div
					className="p-4 h-screen overflow-y-auto
					md:h-full md:overflow-y-auto md:p-8
				"
				>
					<div
						className="text-xl py-2 mt-6
					md:mt-0
					"
					>
						Connect with
					</div>
					<div
						className="rounded-xl p-4 flex border border-gray-300 my-2 w-full max-w-sm
						sm:mx-0 
					"
					>
						<img
							src={trainer.avatar}
							className="rounded-full w-20 h-20 border-2 border-white ring ring-blue-600"
						/>
						<div className="my-auto">
							<div className="text-lg px-5">{getFullName(trainer)}</div>
							<div className="text-xs px-5 ">{getCity(trainer)}</div>
							{trainer.isVerified && (
								<img src="/icons/Verified.svg" className="w-24 mx-4 mt-2" />
							)}
						</div>
					</div>
					{offer && (
						<div className="max-w-sm w-full sm:w-96">
							<div className="text-xl py-2 mt-2">Plan</div>
							<div className="text-gray-200 border border-gray-300 rounded-lg p-4 flex items-center justify-between">
								<div className="w-2/3">
									<div className="text-xs">{offer.title}</div>
								</div>
								<div className="py-1 px-4 rounded-full border border-gray-300 h-8 text-sm">{`$${offer.price}`}</div>
							</div>
						</div>
					)}
					<div className=" text-xs text-gray-300 pt-4">
						Please fill in the required details. <br />A representitive will
						contact you shortly.
					</div>
					<div
						className="mb-16 pb-32
						sm:flex sm:flex-wrap
					"
					>
						{dataFields.map((field, i) => (
							<div className="my-3 mr-3 w-min" key={i}>
								<div className="text-xs text-gray-300 py-1">{field.label}</div>
								<input
									type="text"
									className={`rounded-full h-8 w-60 text-xs px-4 text-black ${
										errors && getError(field.name) && "border-2 border-red-600"
									}`}
									value={details[field.name]}
									onChange={handleChange(field.name)}
									placeholder={field.placeHolder}
								/>
								<Error field={field.name} />
							</div>
						))}
						<div className="my-3">
							<div className="text-xs text-gray-300 py-1">Interested in</div>
							{trainer.expertise.map((e, i) => (
								<button
									className={`py-1.5 px-4 text-xs border-2 border-gray-300  rounded-full m-1 ${
										details.expertise.includes(e)
											? "text-white bg-blue-600"
											: " bg-gray-300 text-gray-200 bg-opacity-50"
									}`}
									key={i}
									onClick={handleExpertise(e)}
								>
									{e}
								</button>
							))}
							<Error field={"expertise"} />
						</div>
					</div>
				</div>
				<div>
					<FormControls
						applyText="Submit"
						closeText="Cancel"
						toggle={handleClose}
						handleSubmit={handleSubmit}
					/>
				</div>
			</div>
		</Modal>
	);
}
