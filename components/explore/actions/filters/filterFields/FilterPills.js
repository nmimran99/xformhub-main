import { useEffect, useState } from "react";

const pills = [
	"Weight Loss",
	"Muscle Gain",
	"Conditioning",
	"Cardio",
	"Marathons/Triathlons",
	"Accessibility",
	"Physical Therapy",
];

export default function FilterPills({ handleUpdate, initialValue }) {
	const [expertise, setExpertise] = useState(initialValue);

	useEffect(() => {
		handleUpdate("expertise", expertise);
	}, [expertise]);

	const handleChoice = (type) => (event) => {
		if (expertise.includes(type)) {
			setExpertise(expertise.filter((ex) => ex !== type));
			return;
		}
		setExpertise([...expertise, type]);
	};

	return (
		<div className="relative m-2 w-84 h-max relative">
			<div className="text-xs text-gray-300 py-0.5">Expertise</div>
			<div className="flex flex-wrap h-max w-full">
				{pills.map((p, i) => (
					<button
						type="button"
						onClick={handleChoice(p)}
						className={`transition-all duration-300 w-max h-7 bg-gray-300 text-xs py-1 px-6 rounded-full m-1  ${
							expertise.includes(p) ? "text-white bg-blue-600" : "text-gray-700"
						}`}
						key={i}
					>
						{p}
					</button>
				))}
			</div>
		</div>
	);
}
