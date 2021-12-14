import Link from "next/link";

export default function Footer({}) {
	return (
		<div className="py-8 mb-16">
			<img src="/images/xfhlogo.png" className="mx-auto w-32 py-4" />
			<div className="flex flex-col align-center text-gray-300 text-center text-xs">
				<Link href="/about">
					<div className="p-2">About us</div>
				</Link>
				<Link href="/contact">
					<div className="p-2">Contact Us</div>
				</Link>
				<Link href="/pros">
					<div className="p-2">For Professionals</div>
				</Link>
			</div>
		</div>
	);
}
