import { useState } from "react";
import Info from "../../components/pros/Info";
import Connect from "../../components/pros/Connect";
import Quote from "../../components/pros/Quote";

export default function Pros({}) {
	return (
		<div
			className="h-full w-screen bg-white pt-16 text-gray-700
            lg:pt-24
        "
		>
			<div
				className="w-full
            sm:w-3/4 sm:mx-auto
            md:flex md:flex-wrap md:w-5/6
            lg:w-4/5
            xl:w-3/5
            "
			>
				<div
					className="w[full
                    md:w-2/3
                    lg:w-3/5    
                "
				>
					<Info />
				</div>

				<div
					className="w-11/12 mx-auto
                    sm:w-3/5
                    md:w-1/3 md:my-auto
                "
				>
					<Connect />
				</div>
				<div
					className="w-full
                    md:w-1/2 md:mx-auto
                "
				>
					<Quote />
				</div>
			</div>
		</div>
	);
}
