import axios from "axios";
import { useContext, useEffect, useRef, useState } from "react";
import { useSWRInfinite } from "swr/infinite";
import { FiltersContext } from "../../../contexts/FiltersContext";
import ListingItem from "./ListingItem";
import queryString from "query-string";
import useInfiniteQuery from "../../hooks/useInfiniteQuery";
import { isInViewport } from "../../../utils/helper";
import { useDebouncedCallback } from "use-debounce";

const fetcher = (url) => axios.get(url).then((res) => res.data);

export default function Listings({}) {
	const moreRef = useRef();
	const { filters } = useContext(FiltersContext);

	const {
		data,
		error,
		isReachingEnd,
		fetchNextPage,
		isFetchingInitialData,
		isFetchingNextPage,
	} = useInfiniteQuery(`/api/listings?${queryString.stringify(filters)}`, null);

	return (
		<div className="flex flex-col items-center">
			<div
				className="w-max h-max mx-auto grid grid-cols-1 gap-3 place-items-center my-8 
			md:grid-cols-2 md:gap-6
			lg:grid-cols-3 lg:gap-8
			
		"
			>
				{data?.map((l, i) => (
					<ListingItem key={i} data={l} />
				))}
				{isFetchingInitialData ? (
					<div className="text-white">...loading</div>
				) : null}
			</div>
			{!isReachingEnd && (
				<button
					onClick={fetchNextPage}
					className="text-white bg-blue-600 rounded-md py-2 px-6 text-sm border border-white"
					disabled={isFetchingInitialData}
				>
					{isFetchingInitialData ? "...Loading" : "Load more..."}
				</button>
			)}
		</div>
	);
}
