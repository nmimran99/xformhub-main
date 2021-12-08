export default function MobileMenu({ toggle, children }) {
	return (
		<div className="absolute w-screen h-screen bg-black fixed top-0 left-0 z-50 animate-fadeIn mt-14">
			<div className="p-4">
				<div className="text-start px-2">{children}</div>
			</div>
		</div>
	);
}
