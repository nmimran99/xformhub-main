const points = [
	{
		content: "Build a strong profile as a point of reference",
		icon: "/icons/UserFocus.svg",
	},
	{
		content: "Provide introduction in various media",
		icon: "/icons/MonitorPlay.svg",
	},
	{
		content: "Showcase previous clients' results",
		icon: "/icons/CheckSquareOffset.svg",
	},
	{
		content: "Get feedback and support from reviews and rating",
		icon: "/icons/ChatTeardropText.svg",
	},
	{
		content: "Lay out your plans and packages, and get quality referals",
		icon: "/icons/Stack.svg",
	},
];

export default function Info({}) {
	return (
		<div className="">
			<div className="p-4 mt-4">
				<div className="text-2xl font-semibold text-left">
					Join us at XFormHub and expand your reach
				</div>
				<div className="text-sm text-left my-4">
					XFormHub is committed to provide the best source of information when
					it comes to fitness professionals.
				</div>
				<div className="text-sm text-left my-4">
					Through comprehensive profiling and accesibility, we aim to help
					clients navigate to the professional that suits their needs.
				</div>
				<div className="w-full rounded-md p-4 mt-4">
					<div className="text-gray-700  text-left text-sm font-semibold">
						Increase your exposure today
					</div>
					<div
						className="text-sm text-left my-4 w-full
                    md:w-3/5
                    "
					>
						{points.map((p, i) => (
							<div className="flex py-2 border-b border-gray-200" key={i}>
								<img src={p.icon} className="w-6" />
								<div className="px-4 text-xs my-auto">{p.content}</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}
