import { createContext, useState } from "react";

export const FiltersContext = createContext();

export const FiltersContextProvider = (props) => {
	const [filters, setFilters] = useState({
		location: null,
		budget: null,
		interaction: "In Person",
		gender: "Any",
		diet: "Any",
		expertise: [],
	});

	return (
		<FiltersContext.Provider value={{ filters, setFilters }}>
			{props.children}
		</FiltersContext.Provider>
	);
};
