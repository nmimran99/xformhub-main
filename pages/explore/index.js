import Actions from "../../components/explore/actions/Actions";
import Listings from "../../components/explore/listings/Listings";

export default function Explore({}) {
	return (
		<div
			className="bg-black pt-20 w-full overflow-y-auto
			md:pt-24
		"
		>
			<Actions />
			<Listings />
		</div>
	);
}
