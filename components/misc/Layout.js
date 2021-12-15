import Navbar from "../navbar/Navbar";
import Footer from "./Footer";
import { FiltersContextProvider } from "../../contexts/FiltersContext";
import { SnackbarContextProvider } from "../../contexts/SnackbarContext";
import Head from "next/head";

function Layout({ children }) {
	return (
		<div className="bg-black w-full h-max flex flex-col justify-center">
			<Head>
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1, maximum-scale=1, viewport-fit=cover"
				></meta>
			</Head>
			<SnackbarContextProvider>
				<Navbar />
				<FiltersContextProvider>{children}</FiltersContextProvider>
			</SnackbarContextProvider>
			<Footer />
		</div>
	);
}

export default Layout;
