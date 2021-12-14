export default function Plans({ data }) {
	return (
		<div
			className="my-8 w-full relative
        md:w-full md:mx-auto md:shadow-inner
        lg:w-full lg:ml-4 lg:mr-auto
        xl:w-5/6 xl:mx-auto"
		>
			<div className="text-2xl p-3">Plans</div>
			<div
				className="flex w-full overflow-x-auto scroll-smooth gap-4 px-4 justify-start
                xl:justify-center
            "
			>
				{data.map((plan, i) => (
					<div
						key={i}
						className={`bg-white bg-opacity-10 rounded-lg my-4 w-min h-5/6 ${
							i % 2 == 1 ? "ring-4 ring-blue-500" : ""
						}`}
					>
						<div
							className={`${
								i % 2 == 1
									? "bg-blue-500 rounded-t-sm"
									: "bg-gray-300 rounded-t-lg"
							} w-80 h-2 `}
						></div>
						<div className="p-8">
							<div className="text-xl font-semibold">{plan.title}</div>
							<div className="my-12 text-xl w-min text-left whitespace-nowrap">
								{`$${plan.price} CAD`}
							</div>
							<div className="mr-auto">
								{plan.points.map((pp, i) => (
									<div className="flex py-1.5" key={i}>
										<img src="/icons/Done.svg" className="" />
										<div className="px-2 text-sm">{pp}</div>
									</div>
								))}
							</div>
							<button className="px-6 py-1.5 text-md text-white bg-blue-500 border border-gray-300 mt-16 rounded-full">
								Choose Offer
							</button>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
