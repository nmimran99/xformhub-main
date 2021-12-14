import { useEffect } from "react";

export default function ApplyMobileFilters({ toggle, handleApply }) {
	return (
		<div className="w-screen h-16 fixed bottom-0 border-t border-white border-opacity-50">
			<div className="h-full flex text-white text-sm justify-evenly">
				<button
					className="bg-blue-600 text-center w-1/2 pb-4"
					onClick={handleApply}
				>
					Apply Filters
				</button>
				<button onClick={toggle} className="text-center w-1/2 pb-4 bg-black">
					Cancel
				</button>
			</div>
		</div>
	);
}
