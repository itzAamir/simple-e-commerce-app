import { useEffect, useState } from "react";
import Navbar from "./Components/Navbar";
import ProductCard from "./Components/ProductCard";
import axios from "axios";
import "./index.css";

export default function App() {
	const [products, setProducts] = useState([]);
	const [searchedTerm, setSearchedTerm] = useState("");
	const [cartProducts, setCartProducts] = useState([]);

	useEffect(() => {
		const getData = async () => {
			const { data } = await axios.get("https://fakestoreapi.com/products");
			setProducts(data);
		};
		getData();
	}, []);

	const handleAddToCart = (prod) => {
		const newCartProds = [...cartProducts];
		newCartProds.push(prod);
		setCartProducts(newCartProds);
	};

	const handleRemoveToCart = (prodId) => {
		const newCartProds = [...cartProducts];
		setCartProducts(newCartProds.filter((prod) => prod.id !== prodId));
	};

	return (
		<>
			<Navbar
				searchedTerm={searchedTerm}
				onSearchChange={(e) => setSearchedTerm(e.target.value)}
				cartProducts={cartProducts}
				onPurchase={() => setCartProducts([])}
			/>
			<main className="py-6 bg-gradient-to-r from-indigo-300 to-indigo-400 min-h-screen">
				<section className="flex flex-wrap gap-6 lg:justify-start justify-center items-stretch w-4/5 mx-auto">
					{products
						.filter((prod) =>
							prod.title.toLowerCase().includes(searchedTerm.toLowerCase())
						)
						.map((product) => (
							<ProductCard
								key={product.id}
								data={product}
								onAddToCart={handleAddToCart}
								cartProducts={cartProducts}
								onRemoveCart={handleRemoveToCart}
							/>
						))}
				</section>
			</main>
		</>
	);
}
