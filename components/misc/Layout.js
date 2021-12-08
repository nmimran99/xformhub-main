import Navbar from "../navbar/Navbar";
import Footer from "./Footer";

function Layout({ children }) {
	return (
		<div className="bg-black w-full h-max flex flex-col justify-center">
			<Navbar />
			{children}
			<Footer />
		</div>
	);
}

export default Layout;
