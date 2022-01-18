import { useState } from "react";
import Navbar from "../Components/Navbar";
import ProductCard from "../Components/ProductCard";
import PRODUCTS from "../utils/products.json";

export default function Home() {
	const [searchedTerm, setSearchedTerm] = useState("");
	const [cartProducts, setCartProducts] = useState([]);

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
			/>
			<main className="py-6 bg-gradient-to-r from-indigo-300 to-indigo-400 min-h-screen">
				<section className="flex flex-wrap gap-6 lg:justify-start justify-center items-stretch w-4/5 mx-auto">
					{PRODUCTS.filter((prod) =>
						prod.title.toLowerCase().includes(searchedTerm.toLowerCase())
					).map((product) => (
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
