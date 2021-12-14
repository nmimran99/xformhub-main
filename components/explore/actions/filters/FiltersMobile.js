import { useState } from "react";
import ApplyMobileFilters from "./ApplyMobileFilters";
import Filters from "./Filters";

export default function FiltersMobile({ updateFilters, toggle, filters }) {
	const [tempFilters, setTempFilters] = useState(filters);

	const handleUpdateFilters = (data) => {
		setTempFilters(data);
	};

	const handleApply = () => {
		updateFilters(tempFilters);
		toggle();
	};

	return (
		<div className="bg-black bg-opacity-95 w-screen h-screen fixed top-0 left-0 z-50 animate-fadeIn ">
			<div className="">
				<div className="text-white text-2xl flex justify-between p-8">
					<div className="">Filters</div>
					<button onClick={toggle}>
						<img src="/icons/close.svg" className="w-7" />
					</button>
				</div>
				<div className="">
					<Filters
						updateFilters={handleUpdateFilters}
						toggle={toggle}
						filters={filters}
					/>
					<ApplyMobileFilters toggle={toggle} handleApply={handleApply} />
				</div>
			</div>
		</div>
	);
}
