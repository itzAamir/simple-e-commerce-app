import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

export default function CartModal({ isOpen, onClose, cartProducts }) {
	const handleClose = (e) => {
		if (e.target.id === "overlay") {
			onClose();
		}
	};

	return (
		<div
			id="overlay"
			className={`absolute top-0 left-0 right-0 h-screen bg-black/50 ${
				isOpen ? "flex" : "hidden"
			} justify-center items-center`}
			onClick={handleClose}
		>
			<div className="relative bg-white p-4 h-[30rem] w-96 rounded-lg shadow-md shadow-black mx-4">
				<div className="modal-title flex justify-between items-center">
					<h1 className="text-xl font-semibold">Cart Items</h1>
					<button onClick={onClose}>
						<FontAwesomeIcon icon={faTimes} color="gray" />
					</button>
				</div>
				<div className="modal-body mt-4 h-4/5 overflow-auto">
					{cartProducts.length > 0 ? (
						<ul>
							{cartProducts.map((prod) => (
								<li
									key={prod.id}
									className="flex items-center justify-between bg-gray-200 p-3 my-3"
								>
									<div className="flex items-center">
										<img
											src={prod.image}
											alt={prod.title}
											className="h-10 mr-3"
										/>
										<h2 className="text-md text-slate-800">{prod.title}</h2>
									</div>
									<p className="text-slate-600">${prod.price}</p>
								</li>
							))}
						</ul>
					) : (
						<div className="text-2xl text-center flex items-center justify-center h-full">
							No items in cart
						</div>
					)}
				</div>
				<div className="modal-footer w-full absolute bottom-0 left-0 flex justify-center">
					{cartProducts.length > 0 ? (
						<>
							<Link to="/cart" state={cartProducts} className="w-11/12">
								<button
									// onClick={handleCheckout}
									className="my-3 mx-auto font-semibold bg-green-700 hover:bg-green-600 text-white w-full py-3 rounded-sm shadow-lg shadow-green-700/70"
								>
									CHECKOUT
								</button>
							</Link>
						</>
					) : (
						<button
							onClick={onClose}
							className="my-3 mx-auto font-semibold bg-red-500 hover:bg-red-600 text-white w-11/12 py-3 rounded-sm shadow-lg shadow-indigo-500"
						>
							CLOSE
						</button>
					)}
				</div>
			</div>
		</div>
	);
}
