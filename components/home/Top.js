import Link from "next/link";

export default function Top({}) {
	return (
		<div
			className="mt-24 mb-8 mx-auto flex flex-col justify-center
            lg:w-3/4
            xl:w-3/5 xl:mt-48 xl:mb-32
        "
		>
			<div
				className="flex flex-col justify-center relative
                md:flex-row md:justify-start 
            "
			>
				<div
					className="z-10 h-auto
                    md:mx-16 md:my-8
                    lg:mx-8
                "
				>
					<div
						className="text-white text-3xl text-center p-8
                        md:text-left
                    "
					>
						<div className="whitespace-nowrap">
							Plan For <b>Greatness</b>
						</div>
						<div className="whitespace-nowrap">
							<b>Own</b> The Process
						</div>
					</div>
					<div
						className="text-white text-3xl text-center p-8
                        md:text-left
                    "
					>
						<div className="whitespace-nowrap">Your Transformation</div>
						<div className="whitespace-nowrap">
							<b>Starts Now</b>
						</div>
					</div>
					<div
						className="z-10 w-min mx-auto my-12
                md:flex md:mx-6 md:my-0
                
            "
					>
						<Link href="/explore">
							<div
								className="bg-blue-700 text-white py-2 px-8 rounded-full text-md w-min whitespace-nowrap my-2 mx-auto cursor-pointer shadow-lg border border-gray-300
                                    md:mx-2 
                                "
							>
								Get Started
							</div>
						</Link>
						<Link href="/pros">
							<div className="bg-black text-white py-2 px-8 rounded-full text-md border border-gray-300 whitespace-nowrap my-2 mx-auto cursor-pointer shadow-lg">
								For Professionals
							</div>
						</Link>
					</div>
				</div>

				<img
					src="images/mind.jpg"
					className="filter brightness-50 absolute -top-8 w-96 left-1/2 transform -translate-x-1/2 
                         md:w-1/3 md:brightness-100 md:m-0 md:right-8 md:top-0 md:-translate-x-0
                         lg:w-1/2 lg:right-4
                         xl:w-2/5
                    "
				/>
			</div>
		</div>
	);
}
