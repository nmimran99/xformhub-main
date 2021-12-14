export default function FilterMobileButton({ toggle }) {
	return (
		<button
			className="bg-black border border-gray-300 w-max rounded-full flex py-2.5 pl-1 pr-5"
			onClick={toggle}
		>
			<img src="/icons/Funnel.svg" className="w-5 mx-2" />
			<div className="text-gray-300 text-sm">Filter Results</div>
		</button>
	);
}
