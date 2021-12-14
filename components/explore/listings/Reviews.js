import { getFullName } from "../../../utils/helper";
import Review from "./Review";
import SlideControls from "./SlideControls";

export default function Reviews({ data, firstName }) {
	const handleClick = (dir) => (event) => {
		let reviewDoc = document.getElementById("reviews");
		reviewDoc.scrollTo({
			left: reviewDoc.scrollLeft + (dir === "left" ? -300 : 300),
			behavior: "smooth",
		});
	};

	return (
		<div
			className="w-full relative my-16
            md:w-5/6 md:mx-auto md:shadow-inner
            lg:w-11/12 lg:ml-8 lg:mr-auto
            xl:w-5/6 xl:mx-auto
        "
		>
			<div className="text-2xl p-3">Reviews</div>
			{data.length ? (
				<>
					<div
						className="flex w-full overflow-x-auto scroll-smooth"
						id="reviews"
					>
						{data.map((r, i) => (
							<Review data={r} key={i} />
						))}
					</div>

					<SlideControls handleClick={handleClick} size={12} offeset={16} />
				</>
			) : (
				<div className="text-gray-300 border border-gray-300 rounded-lg p-8 w-min whitespace-nowrap text-sm bg-white bg-opacity-10 mx-3">
					<div className="">
						This professional has no reviews at the moment.
					</div>
					<div className="py-3">
						Be the first one to give {firstName} a feedback and help other{" "}
						<br /> users in their research.{" "}
					</div>
					<button className="bg-blue-500 rounded-full text-white py-1.5 px-6 border border-gray-300 mt-2">
						Add a Comment Now
					</button>
				</div>
			)}
		</div>
	);
}
