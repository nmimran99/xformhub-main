import axios from "axios";
import { useEffect, useState } from "react";
import useToggle from "../../../../hooks/useToggle";

const options = ["Any", "Carnivore", "Pescatarian", "Vegan", "Vegetarian"];

export default function FilterDiet({ handleUpdate, initialValue }) {
	const [diet, setDiet] = useState(initialValue);
	const [state, toggle] = useToggle(false);

	useEffect(() => {
		handleUpdate("diet", diet);
	}, [diet]);

	const handleChoose = (type) => (event) => {
		setDiet(type);
		toggle();
	};

	return (
		<div className="relative m-2 w-40 h-14 relative">
			<div className="text-xs text-gray-300 py-0.5">Dietary Preference</div>
			<button
				className="bg-white w-full flex rounded-full h-9 px-2 my-auto"
				type="button"
				onClick={toggle}
			>
				<img src="/icons/local_dining.svg" className="w-5 my-auto" />
				<div className="text-xs px-3 my-auto">{diet}</div>
				<img
					src="/icons/arrow_down.svg"
					className="ml-auto mr-1 w-5 my-auto pt-1"
				/>
			</button>
			{state && (
				<div className="w-36 h-max bg-white text-black text-xs rounded-md p-2 absolute top-14 z-10 my-1">
					{options.map((o, i) => (
						<button
							key={i}
							className="flex align-center cursor-pointer py-1 h-8 w-max"
							onClick={handleChoose(o)}
							type="button"
						>
							<div className="text-xs w-5/6 my-auto">{o}</div>
						</button>
					))}
				</div>
			)}
		</div>
	);
}
