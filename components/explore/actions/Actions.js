import { useContext, useEffect } from "react";
import { FiltersContext } from "../../../contexts/FiltersContext";
import useToggle from "../../hooks/useToggle";
import FilterMobileButton from "./filters/FilterMobileButton";
import Filters from "./filters/Filters";
import FiltersMobile from "./filters/FiltersMobile";

export default function Actions({}) {
	const { filters, setFilters } = useContext(FiltersContext);
	const [state, toggle] = useToggle(false);

	useEffect(() => {
		console.log(filters);
	}, [filters]);
	const updateFilters = (data) => {
		setFilters(data);
	};

	return (
		<div
			className="flex justify-center 
			md:flex-col
		"
		>
			{/* <Serachbar /> */}
			<div
				className="hidden border border-gray-300
			md:block md:mx-auto md:bg-white md:bg-opacity-10 md:rounded-xl md:w-11/12 md:p-4
			xl:w-3/4
			"
			>
				<div className="hidden md:block">
					<Filters updateFilters={updateFilters} filters={filters} />
				</div>
			</div>
			<div className="fixed z-50 bottom-8 md:hidden">
				<FilterMobileButton toggle={toggle} />
			</div>
			{state && (
				<FiltersMobile
					filters={filters}
					updateFilters={updateFilters}
					toggle={toggle}
				/>
			)}
		</div>
	);
}
