import Link from "next/link";
const tabs = [
	{
		href: "/explore",
		label: "Explore Professionals",
	},
	{
		href: "/pros",
		label: "For Professionals",
	},
];

export default function MenuItems({ divClass, handleClick }) {
	return (
		<div className={divClass}>
			{tabs.map((tab, i) => (
				<Link href={tab.href} key={i}>
					<div
						className="flex align-center py-3 text-base md:py-4 md:px-4 cursor-pointer border-b border-gray-300 md:border-none"
						onClick={() => handleClick(tab.href)}
					>
						<div className="my-auto px-4 text-white font-thin">{tab.label}</div>
					</div>
				</Link>
			))}
		</div>
	);
}
