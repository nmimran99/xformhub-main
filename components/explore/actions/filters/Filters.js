import { useContext, useEffect, useState } from "react";
import { FiltersContext } from "../../../../contexts/FiltersContext";
import FilterBudget from "./filterFields/FilterBudget";
import FilterDiet from "./filterFields/FilterDiet";
import FilterGender from "./filterFields/FilterGender";
import FilterInteraction from "./filterFields/FilterInteraction";
import FilterLocation from "./filterFields/FilterLocation";
import FilterPills from "./filterFields/FilterPills";

export default function Filters({ updateFilters, filters }) {
	const [tempFilters, setTempFilters] = useState(filters);

	useEffect(() => {
		updateFilters(tempFilters);
	}, [tempFilters]);

	const handleUpdate = (field, value) => {
		setTempFilters({
			...tempFilters,
			[field]: value,
		});
	};

	return (
		<div className="">
			<div
				className="flex flex-col px-8
			sm:flex-row sm:flex-wrap 
			md:px-2
		"
			>
				<FilterLocation
					handleUpdate={handleUpdate}
					initialValue={filters.location}
				/>
				<FilterBudget
					handleUpdate={handleUpdate}
					initialValue={filters.budget}
				/>
				<FilterInteraction
					handleUpdate={handleUpdate}
					initialValue={filters.interaction}
				/>
				<FilterGender
					handleUpdate={handleUpdate}
					initialValue={filters.gender}
				/>
				<FilterDiet handleUpdate={handleUpdate} initialValue={filters.diet} />
				<FilterPills
					handleUpdate={handleUpdate}
					initialValue={filters.expertise}
				/>
			</div>
		</div>
	);
}
