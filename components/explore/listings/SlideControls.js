export default function SlideControls({
	handleClick,
	size,
	offset,
	classList,
}) {
	return (
		<div
			className={`hidden flex justify-between absolute top-1/2 w-full
        md:block
      	${classList}`}
		>
			<button
				className={`absolute ${offset ? `-left-${offset}` : `-left-16`}`}
				onClick={handleClick("left")}
			>
				<img src="/icons/arrow_left.svg" className={`${size && `w-${size}`}`} />
			</button>
			<button
				className={`absolute ${offset ? `-right-${offset}` : `-right-16`}`}
				onClick={handleClick("right")}
			>
				<img
					src="/icons/arrow_right.svg"
					className={`${size && `w-${size}`}`}
				/>
			</button>
		</div>
	);
}
