import { Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Home from "./pages/Home";
import Introduction from "./pages/Introduction";
import Recruitment from "./pages/Recruitment";

function App() {
	return (
		<Layout>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/about" element={<About />} />
				<Route path="/introduction" element={<Introduction />} />
				<Route path="/recruitment" element={<Recruitment />} />
				<Route path="/contact" element={<Contact />} />
			</Routes>
		</Layout>
	);
}

export default App;
