import { type ReactNode, useState } from "react";
import { useLocation } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";

interface LayoutProps {
	children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
	const { pathname } = useLocation();
	const [current, setCurrent] = useState(pathname);

	if (current !== pathname) {
		window.scrollTo(0, 0);
		setCurrent(pathname);
	}

	return (
		<div className="flex flex-col min-h-screen">
			<Header />
			<main className="flex-grow pt-16">{children}</main>
			<Footer />
		</div>
	);
}
