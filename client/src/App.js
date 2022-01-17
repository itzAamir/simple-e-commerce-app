import Home from "./Pages/Home";
import About from "./Pages/About";
import Cart from "./Pages/Cart";
import { Routes, Route } from "react-router-dom";
import "./index.css";

export default function App() {
	return (
		<Routes>
			<Route exact path="/" element={<Home />} />
			<Route exact path="/about" element={<About />} />
			<Route exact path="/cart" element={<Cart />} />
		</Routes>
	);
}
