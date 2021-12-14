import axios from "axios";
import { useEffect, useState } from "react";

export default function FilterGender({ handleUpdate, initialValue }) {
	const [gender, setGender] = useState(initialValue);

	useEffect(() => {
		handleUpdate("gender", gender);
	}, [gender]);

	const switchValues = (val) => (event) => {
		setGender(val);
	};

	return (
		<div className="relative m-2 h-14 w-60">
			<div className="text-xs text-gray-300 py-0.5">Gender</div>
			<div className="bg-white w-full flex rounded-full h-9 px-1 relative text-xs justify-evenly">
				<div
					className={`absolute bg-blue-600 h-7 w-20 rounded-full my-1 ${
						gender === "Any" ? "left-1" : gender === "Male" ? "" : "right-1"
					}`}
				></div>
				<button
					gender="button"
					className={`relative z-10 w-1/3 ${
						gender === "Any" ? "text-white" : "text-black"
					}`}
					onClick={switchValues("Any")}
				>
					Any
				</button>
				<button
					gender="button"
					className={`relative z-10 w-1/3   ${
						gender === "Male" ? "text-white" : "text-black"
					}`}
					onClick={switchValues("Male")}
				>
					Male
				</button>
				<button
					gender="button"
					className={`relative z-10 w-1/3  ${
						gender === "Female" ? "text-white" : "text-black"
					}`}
					onClick={switchValues("Female")}
				>
					Female
				</button>
			</div>
		</div>
	);
}
