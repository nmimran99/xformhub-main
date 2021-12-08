import { useRouter } from "next/dist/client/router";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import useToggle from "../hooks/useToggle";
import MenuItems from "./MenuItems";
import MobileMenu from "./MobileMenu";

export default function Navbar() {
	const router = useRouter();
	const [state, toggle] = useToggle();
	const [scrollIsZero, setScrollIsZero] = useState(true);

	useEffect(() => {
		scrollListener();
	}, []);

	const scrollListener = useCallback(() => {
		window.addEventListener("scroll", () => {
			if (window.scrollY !== 0 && scrollIsZero) {
				setScrollIsZero(false);
			} else {
				setScrollIsZero(true);
			}
		});
	});

	const handleClick = (href) => {
		if (state) toggle();
	};

	return (
		<div
			className={`w-full fixed top-0 left-0 flex justify-between z-50 ${
				state && "transition duration-500 bg-primary bg-opacity-100"
			} ${
				!scrollIsZero &&
				"trasnsition-all duration-300 shadow-lg bg-black bg-opacity-60 border-bottom border-gray-500"
			} ${router.asPath !== "/" && "bg-black"}`}
			id="navbar"
		>
			<div className="w-auto inline-flex items-center px-4">
				<Link href="/">
					<img
						src="images/xfhlogo.png"
						className="h-8 lg:h-10 w-auto md:m-4 cursor-pointer"
					/>
				</Link>

				<MenuItems
					divClass="hidden flex-row align-center  text-lg md:flex md:font-thin"
					handleClick={handleClick}
				/>
				{state && (
					<MobileMenu toggle={toggle}>
						<MenuItems
							divClass="flex flex-col align-center pt-1 text-xl"
							handleClick={handleClick}
						/>
					</MobileMenu>
				)}
			</div>
			<div
				className="w-auto m-4 inline-flex items-center hidden
				md:block
			"
			></div>
			{!state ? (
				<button className="inline-block p-4 md:hidden" onClick={toggle}>
					<img src="icons/menuicon.svg" className="h-7" />
				</button>
			) : (
				<button onClick={toggle} className="inline-block p-4 md:hidden">
					<img src="icons/close.svg" className="h-7" />
				</button>
			)}
		</div>
	);
}
