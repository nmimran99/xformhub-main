import axios from "axios";
import { useEffect, useState } from "react";

export default function FilterInteraction({ handleUpdate, initialValue }) {
	const [type, setType] = useState(initialValue);

	useEffect(() => {
		handleUpdate("interaction", type);
	}, [type]);

	const switchValues = () => {
		setType((ptype) => (ptype === "In Person" ? "Online" : "In Person"));
	};

	return (
		<div className="relative m-2 h-14 w-48">
			<div className="text-xs text-gray-300 py-0.5">Type of Interaction</div>
			<div className="bg-white w-full flex rounded-full h-9 px-1 relative text-xs justify-evenly">
				<div
					className={`absolute bg-blue-600 h-7 w-24 rounded-full my-1 ${
						type === "In Person" ? "left-1.5" : "right-1.5"
					}`}
				></div>
				<button
					type="button"
					className={`relative z-10 w-1/2 pl-2 ${
						type === "In Person" ? "text-white" : "text-black"
					}`}
					onClick={switchValues}
				>
					In Person
				</button>
				<button
					type="button"
					className={`relative z-10 w-1/2 pr-1.5  ${
						!(type === "In Person") ? "text-white" : "text-black"
					}`}
					onClick={switchValues}
				>
					Online
				</button>
			</div>
		</div>
	);
}
