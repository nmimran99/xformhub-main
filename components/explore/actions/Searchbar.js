export default function Serachbar({}) {
	return (
		<div
			className="w-3/4 px-2
		md:w-1/2 md:mx-auto my-4
		lg:w-1/3
		xl:w-1/4
		"
		>
			<div className="bg-gray-200 rounded-full mx-auto py-1.5 px-3 flex">
				<img src="/icons/searchicon.svg" className="px-1" />
				<input
					type="text"
					placeholder="Search professional by name..."
					className="text-xs w-11/12 text-gray-700 bg-gray-200"
				/>
			</div>
		</div>
	);
}
