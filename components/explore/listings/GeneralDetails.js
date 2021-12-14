import { getAverageRating, getCity, getFullName } from "../../../utils/helper";

export default function GeneralDetails({ data, reviews }) {
	return (
		<div
			className="flex flex-col items-center my-8 text-gray-200
		md:w-2/5 md:mx-auto
		xl:w-1/3
		"
		>
			<div className="relative">
				<img
					src={data.avatar}
					className="w-48 rounded-full my-6 ring-1 ring-blue-500 ring-offset-2 ring-offset-transparent border-2 border-white"
				/>
				<img
					src="/icons/Verified.svg"
					className="absolute bottom-3 transform translate-x-1/2 w-24"
				/>
			</div>
			<div className="text-lg">{getFullName(data)}</div>
			<div className="text-sm">{getCity(data)}</div>
			<div className="flex items-center border border-gray-400 px-4 py-1.5 rounded-full my-6 text-sm">
				{reviews.length ? (
					<>
						<img src="/icons/star.svg" className="w-5" />
						<div className="px-1">{getAverageRating(reviews)}</div>
						<div className="px-1">{`(${reviews.length} Reviews)`}</div>
					</>
				) : (
					<div className="text-gray-300">No reviews yet</div>
				)}
			</div>
			<div className="flex flex-wrap w-5/6 justify-center">
				{data.expertise.map((e, i) => (
					<div
						key={i}
						className="border border-gray-400 rounded-sm text-xs whitespace-nowrap py-1 px-4 m-1"
					>
						{e}
					</div>
				))}
			</div>
		</div>
	);
}
