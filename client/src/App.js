import Home from "./Pages/Home";
import About from "./Pages/About";
import Cart from "./Pages/Cart";
import { Routes, Route } from "react-router-dom";
import "./index.css";
import axios from "axios";

export default function App() {
	if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
		axios.defaults.baseURL = "http://localhost:3001";
	} else {
		axios.defaults.baseURL = "https://aamirs-shop.herokuapp.com";
	}

	return (
		<Routes>
			<Route exact path="/" element={<Home />} />
			<Route exact path="/about" element={<About />} />
			<Route exact path="/cart" element={<Cart />} />
		</Routes>
	);
}
