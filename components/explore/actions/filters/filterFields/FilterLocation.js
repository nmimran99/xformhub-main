import axios from "axios";
import { useEffect, useState } from "react";

export default function FilterLocation({ handleUpdate, initialValue }) {
	const [value, setValue] = useState(initialValue);
	const [searchText, setSearchText] = useState("");
	const [suggestions, setSuggestions] = useState([]);

	useEffect(() => {
		if (!searchText) {
			setSuggestions([]);
			return;
		}
		getSuggestions(searchText);
	}, [searchText]);

	useEffect(() => {
		handleUpdate("location", value);
	}, [value]);

	const handleChange = (e) => {
		setValue("");
		setSearchText(e.target.value);
	};

	const handleChoose = (sg) => (event) => {
		setValue(sg);
		setSearchText("");
	};

	const getSuggestions = async (value) => {
		const res = await axios.get(`/api/suggestions?input=${value}`);
		if (res.status === 200) {
			setSuggestions(
				res.data.predictions.map((p) =>
					p.description.split(",").slice(0, 2).join(", ")
				)
			);
		}
	};

	return (
		<div className="relative m-2 w-60 h-14">
			<div className="text-xs text-gray-300 py-0.5">Location</div>
			<div className="bg-white flex rounded-full h-9 px-2">
				<img src="/icons/location_on.svg" className="w-5" />
				<input
					onChange={handleChange}
					className="text-black text-xs font-medium px-2 w-52 focus:outline-none h-5/6 my-auto"
					value={value || searchText}
				/>
				<input className="hidden" value={searchText} onChange={() => {}} />
			</div>

			{!!suggestions.length && (
				<div className="h-auto w-72 bg-white rounded-md my-1 py-4 px-2 absolute top-14 left-0 border border-gray-300 z-10">
					{suggestions.map((sg, i) => (
						<button
							key={i}
							className="flex align-center cursor-pointer py-1 h-8 "
							onClick={handleChoose(sg)}
						>
							<img src="/icons/location_on.svg" className="w-5 mx-2" />
							<div className="text-xs w-5/6 my-auto truncate overflow-ellipsis">
								{sg}
							</div>
						</button>
					))}
				</div>
			)}
		</div>
	);
}
