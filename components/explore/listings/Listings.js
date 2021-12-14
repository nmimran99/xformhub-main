import axios from "axios";
import { useContext, useState } from "react";
import useSWR from "swr";
import { FiltersContext } from "../../../contexts/FiltersContext";
import ListingItem from "./ListingItem";
import queryString from "query-string";

const fetcher = (url) => axios.get(url).then((res) => res.data);

export default function Listings({}) {
	const { filters } = useContext(FiltersContext);
	const [page, setPage] = useState(0);

	const { data } = useSWR(
		`/api/listings?page=${page}&${queryString.stringify(filters)}`,
		fetcher
	);

	return (
		<div
			className="w-max h-max mx-auto grid grid-cols-1 gap-3 place-items-center my-8 
			md:grid-cols-2 md:gap-6
			lg:grid-cols-3 lg:gap-8
			
		"
		>
			{!!data && data.map((l, i) => <ListingItem key={i} data={l} />)}
		</div>
	);
}
