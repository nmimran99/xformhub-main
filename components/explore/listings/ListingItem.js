import Link from "next/link";
import { getFullName, getCity, getAverageRating } from "../../../utils/helper";

export default function ListingItem({ data, key }) {
	return (
		<Link href={`/explore/${data._id}`}>
			<div
				className="text-gray-200 bg-white bg-opacity-10 rounded-xl flex flex-col items-center p-4 w-full max-w-xl transition-all duration-150 cursor-pointer border border-gray-300
                md:hover:bg-blue-700
        "
			>
				<div className="relative">
					<img
						src={`https://picsum.photos/500/500?random=${key}`}
						className="w-48 h-48 rounded-full my-6 border-2 border-white ring-4 ring-blue-600"
					/>
					{data.isVerified && (
						<img
							src="/icons/Verified.svg"
							className="absolute right-1/2 transform translate-x-1/2 bottom-2"
						/>
					)}
				</div>

				<div className="text-center">
					<div className="text-xl pt-3">{getFullName(data)}</div>
					<div className="">{getCity(data)}</div>
					<div className="flex content-center w-max mx-auto text-sm border border-gray-500 rounded-full py-2 px-8 my-4">
						{data.reviews?.length ? (
							<>
								<img src="/icons/star.svg" className="w-5" />
								<div className="my-auto px-1">
									{getAverageRating(data.reviews)}
								</div>
								<div className="my-auto">{`(${data.reviews.length} Reviews)`}</div>
							</>
						) : (
							"No reviews yet"
						)}
					</div>
					<div className="h-28">
						<div className="flex flex-wrap gap-2 justify-center my-4 w-72 ">
							{data.expertise?.map((e, i) => (
								<div
									className="border border-gray-200 rounded-md px-4 py-1.5 text-xs whitespace-nowrap w-min h-8"
									key={i}
								>
									{e}
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</Link>
	);
}
