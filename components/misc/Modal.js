export default function Modal({ handleClose, children }) {
	return (
		<div className="transition-all duration-500 fixed w-screen h-screen bg-black bg-opacity-70 backdrop-filter backdrop-blur-sm top-0 left-0 z-50 flex justify-center overflow-y-auto inset-0">
			<button
				className="absolute top-8 right-8 bg-black bg-opacity-30 rounded-full p-4"
				onClick={handleClose}
			>
				<img src="/icons/close.svg" />
			</button>
			{children}
		</div>
	);
}
