import { useEffect } from "react";

export default function FormControls({
	toggle,
	handleSubmit,
	applyText,
	closeText,
	isLoading,
}) {
	return (
		<div
			className="w-screen h-16 fixed bottom-0 border-t border-white border-opacity-50
			md:w-full md:rounded-b-lxl md:h-12

		"
		>
			<div className="h-full flex text-white text-sm justify-evenly">
				<button
					className="bg-blue-600 text-center w-1/2 pb-4 md:rounded-bl-xl md:pb-0"
					onClick={handleSubmit}
					disabled={isLoading}
				>
					{isLoading ? (
						<div className="animate-pulse">Submitting...</div>
					) : (
						applyText
					)}
				</button>
				<button
					onClick={toggle}
					className="text-center w-1/2 pb-4 bg-black md:rounded-br-xl md:pb-0"
				>
					{closeText}
				</button>
			</div>
		</div>
	);
}
