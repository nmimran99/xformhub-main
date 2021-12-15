export default function Contact({ handleClick }) {
	return (
		<button
			className="w-full text-white bg-blue-500 h-full border border-gray-300
            md:rounded-md md:py-2 
            "
			onClick={handleClick}
		>
			Connect Now
		</button>
	);
}
