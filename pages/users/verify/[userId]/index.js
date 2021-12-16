import Link from "next/link";
import { useEffect } from "react";
import useVerify from "../../../../components/hooks/useVerify";
import { getFullName } from "../../../../utils/helper";

export default function VerifyUser({ userId }) {
	const { isVerified, user } = useVerify(userId);

	return (
		<div className="mt-24 text-white w-full">
			{isVerified ? (
				<div className="bg-white bg-opacity-10 w-5/6 rounded-xl p-8 mx-auto text-gray-300 ">
					<div className="text-xs">
						Thank you for verifying your Email address.
					</div>
					<div className="flex items-center border-2 borde-gray-300 w-max py-1.5 px-1.5 rounded-full mx-auto my-4">
						<img src="/icons/Verified.svg" />
						<div className="px-4">{user && getFullName(user)}</div>
					</div>
				</div>
			) : (
				<div className="bg-white bg-opacity-10 w-5/6 rounded-xl p-8 mx-auto ">
					<div className="">
						We could not verify your Email address at this time.
					</div>
					<div className="">
						Please try again later or contact us with your details.
					</div>
					<Link href="/contact">
						<div className="py-2 px-4 text-center rounded-full border border-gray-300 w-52 mx-auto mt-6">
							Contact us
						</div>
					</Link>
				</div>
			)}
			<Link href="/explore">
				<div className="bg-blue-600 py-2 px-4 text-center rounded-md border border-gray-300 w-72 mx-auto my-6">
					Explore Professionals Now
				</div>
			</Link>
		</div>
	);
}

export const getServerSideProps = (context) => {
	return {
		props: {
			userId: context.params.userId,
		},
	};
};
