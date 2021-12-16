import { getFullName } from "../../../utils/helper";

export default function Review({ data }) {
	return (
		<div className="border border-gray-400 rounded-lg m-2 p-2 flex flex-col justify-between bg-white bg-opacity-10">
			<div className="flex">
				<div className="flex flex-col items-center">
					<img
						src={data.user.avatar || "/icons/UserCircle.svg"}
						className="w-12 h-12 rounded-full m-2"
					/>
					<div className="flex">
						<img src="/icons/star.svg" className="w-5" />
						<div className="text-gray-200 text-sm px-1">{data.rating}</div>
					</div>
				</div>

				<div className="w-64 px-2 py-1">
					<div className="text-sm py-1 font-semibold text-gray-200">
						{getFullName(data.user)}
					</div>
					<div className="text-xs font-light h-40">{data.description}</div>
				</div>
			</div>
			<div className="flex flex-wrap">
				{data.tags.map((t, i) => (
					<div
						key={i}
						className="text-xs rounded-sm border border-gray-300 m-1 whitespace-nowrap px-2 py-1"
					>
						{t}
					</div>
				))}
			</div>
		</div>
	);
}
