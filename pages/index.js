import Bottom from "../components/home/Bottom";
import Points from "../components/home/Points";
import Top from "../components/home/Top";

export default function Home() {
	return (
		<div className="bg-black w-full h-full">
			<Top />
			<Points />
			<Bottom />
		</div>
	);
}
