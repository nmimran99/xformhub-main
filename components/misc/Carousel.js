import { useState } from "react";
import SlideControls from "../explore/listings/SlideControls";
import Modal from "./Modal";

export default function Carousel({ images }) {
	const [mainImage, setMainImage] = useState(images[0]);
	const [modal, setModal] = useState(false);

	const handleClick = (dir) => (event) => {
		let mediaDoc = document.getElementById("media");
		mediaDoc.scrollTo({
			left: mediaDoc.scrollLeft + (dir === "left" ? -300 : 300),
			behavior: "smooth",
		});
	};

	return (
		<Wrapper modal={modal} setModal={setModal}>
			<div className="my-auto">
				<div className="my-2 cursor-pointer">
					<img
						src={mainImage}
						className={`w-full ${modal ? "h-1/2" : "h-72"} object-cover`}
						onClick={() => setModal(mainImage)}
					/>
				</div>
				{!modal && (
					<>
						<div className="flex w-full overflow-x-auto" id={"media"}>
							{images.map((im, i) => (
								<img
									src={im}
									key={i}
									className={`mx-1 w-28 h-14 ${
										mainImage === im
											? "border-2 border-blue-500 rounded-sm w-28"
											: ""
									}`}
									onClick={() => setMainImage(im)}
								/>
							))}
						</div>
						<SlideControls
							handleClick={handleClick}
							size={8}
							offset={8}
							classList={`md:top-80 md:left-0`}
						/>
					</>
				)}
			</div>
		</Wrapper>
	);
}

const Wrapper = ({ children, modal, setModal }) => {
	if (modal) {
		return <Modal handleClose={() => setModal(false)}>{children}</Modal>;
	}
	return children;
};
