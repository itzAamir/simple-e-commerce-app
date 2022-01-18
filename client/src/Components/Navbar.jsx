import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import CartModal from "./CartModal";

export default function Navbar({ searchedTerm, onSearchChange, cartProducts }) {
	const [isModalOpen, setIsModalOpen] = useState(false);

	const closeModal = () => {
		setIsModalOpen(false);
	};

	return (
		<header className="sticky shadow-lg shadow-indigo-500 top-0 py-4 px-20 sm:px-40 bg-gradient-to-r from-indigo-300 to-indigo-400 flex justify-between items-center">
			<CartModal
				isOpen={isModalOpen}
				onClose={closeModal}
				cartProducts={cartProducts}
			/>
			<div>
				<h1 className="font-bold text-3xl uppercase text-slate-700">
					My-Store
				</h1>
			</div>
			<nav>
				<div className="flex items-center">
					<input
						className="mr-8 py-2 px-2 w-96 rounded-md border-2 focus-within:outline-none focus-within:border-slate-700 hidden lg:block"
						type="search"
						placeholder="Search Here..."
						value={searchedTerm}
						onChange={onSearchChange}
					/>
					<div className="cursor-pointer" onClick={() => setIsModalOpen(true)}>
						<FontAwesomeIcon icon={faShoppingCart} size="lg" color="#334155" />
						<sup className="text-lg text-slate-700">{cartProducts.length}</sup>
					</div>
				</div>
			</nav>
		</header>
	);
}
