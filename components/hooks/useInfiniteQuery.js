import axios from "axios";
import useSWRInfinite from "swr/infinite";

const fetcher = (url) => axios.get(url).then((res) => res.data);

export default function useInfiniteQuery(queryKey, initialData) {
	const { data, error, size, setSize } = useSWRInfinite(
		(pageIndex, previousPageData) => {
			if (previousPageData?.length === 0) return null;
			if (pageIndex === 0) return queryKey;

			return `${queryKey}&page=${encodeURIComponent(
				JSON.stringify(pageIndex)
			)}`;
		},
		fetcher,
		initialData
	);

	const fetchNextPage = () => {
		setSize(size + 1);
	};

	const flattenPages = data
		? data.reduce((total, item) => [...total, ...item], [])
		: [];
	const isEmpty = data?.[0]?.length === 0;
	const isReachingEnd = isEmpty || (data && data[data.length - 1]?.length < 6);
	const isFetchingInitialData = !data && !error;
	const isFetchingNextPage =
		isFetchingInitialData ||
		(size > 0 && data && typeof data[size - 1] === "undefined");

	return {
		data: flattenPages,
		error,
		isReachingEnd,
		fetchNextPage,
		isFetchingInitialData,
		isFetchingNextPage,
	};
}
