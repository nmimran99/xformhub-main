import Carousel from "../../misc/Carousel";
import Contact from "./Contact";
import Introduction from "./introduction";

export default function MediaSection({ data, introduction, handleContact }) {
	return (
		<div
			className="p-2 relative
            md:w-1/2 md:max-w-lg md:mx-auto
			lg:w-3/4 md:max-w-xl
		
        "
		>
			<Carousel images={data} />
			<Introduction data={introduction} />

			<div className="hidden md:block w-full">
				<Contact handleClick={handleContact} />
			</div>
		</div>
	);
}
