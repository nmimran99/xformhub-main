const functionalities = [
	{
		icon: "icons/Search.svg",
		content: "Look for exactly what you need",
	},
	{
		icon: "icons/Chat.svg",
		content: "View client feedbacks and ratings",
	},
	{
		icon: "icons/Wallet.svg",
		content: "Meet your budget",
	},
	{
		icon: "icons/Crosshair.svg",
		content: "Stay within your area",
	},
];

const points = [
	{
		icon: "icons/Barbell.svg",
		header: "Improve Physique and Mentality",
		content: "Find suitable help to take your body and mind to the next step.",
	},
	{
		icon: "icons/Brain.svg",
		header: "Change Patterns and Habits",
		content:
			"Educate yourself from the most reliable sources for better quality of life.",
	},
	{
		icon: "icons/Leaf.svg",
		header: "Adopt and Adapt",
		content:
			"Build a sustainable formula that coexists alongside your vices, proportionately.",
	},
];

export default function Points({}) {
	return (
		<div
			className="
        md:flex md:my-16 md:w-11/12 md:mx-auto
        lg:w-3/4 lg:my-16
        xl:my-32
        "
		>
			<div
				className="w-5/6 mx-auto
                sm:w-3/4
                md:w-2/5 
                xl:w-1/3
            "
			>
				<div
					className="text-white text-center text-lg font-light
                md:text-left
                "
				>
					TransformHub is designed to connect you to professionals and together,
					transform thought into reality.
				</div>
				<div className="my-8">
					{functionalities.map((p, i) => (
						<div className="flex align-center p-1" key={i}>
							<img src={p.icon} className="w-6" />
							<div className="text-white text-sm text-gray-300 px-4">
								{p.content}
							</div>
						</div>
					))}
				</div>
			</div>
			<div
				className="text-gray-300 w-5/6 mx-auto rounded-xl px-4 py-6 bg-gray-100 bg-opacity-10
                sm:w-3/4
                md:w-2/5
                xl:w-1/3 xl:p-6

            "
			>
				{points.map((po, i) => (
					<div className="flex align-top">
						<img src={po.icon} className="w-7 mr-4" />
						<div className="py-2.5">
							<div className="text-sm font-bold py-0.5">{po.header}</div>
							<div className="text-xs">{po.content}</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
