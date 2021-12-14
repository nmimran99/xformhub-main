import axios from "axios";
import { useEffect, useState } from "react";

export default function FilterBudget({ handleUpdate, initialValue }) {
	const [budget, setBudget] = useState(initialValue);

	useEffect(() => {
		handleUpdate("budget", budget);
	}, [budget]);

	const handleChangeBudget = (e) => {
		const re = /^[0-9\b]+$/;
		if (e.target.value === "" || re.test(e.target.value)) {
			setBudget(e.target.value);
		}
	};

	return (
		<div className="relative m-2 w-60 h-14">
			<div className="text-xs text-gray-300 py-0.5">Pay up to</div>
			<div className="bg-white w-full flex rounded-full h-9 px-2 my-auto">
				<img src="/icons/attach_money.svg" className="w-5" />
				<input
					onChange={handleChangeBudget}
					className="w-1/3 text-black text-xs font-medium px-2 w-full focus:outline-none appearance-none"
					value={budget}
					placeholder="Any..."
				/>
				<div className="text-xs whitespace-nowrap my-auto mx-2 text-gray-700">
					A Month
				</div>
			</div>
		</div>
	);
}
