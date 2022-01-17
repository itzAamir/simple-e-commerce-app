import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import CartForm from "../Components/CartForm";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Cart() {
	const location = useLocation();
	const [cartProducts, setCartProducts] = useState([]);
	const [totalCartPrice, setTotalCartPrice] = useState(0);

	useEffect(() => {
		if (!location.state) return setCartProducts([]);
		if (!location.state.length === 0) return setCartProducts([]);
		setCartProducts(location.state);
	}, [location.state]);

	useEffect(() => {
		const totalPrice = cartProducts.reduce((total, prod) => {
			return total + prod.price;
		}, 0);
		setTotalCartPrice(totalPrice);
	}, [cartProducts]);

	const loadScript = (src) => {
		return new Promise((resolve) => {
			const script = document.createElement("script");
			script.src = src;
			document.body.appendChild(script);
			script.onload = () => {
				resolve(true);
			};
			script.onerror = () => {
				resolve(false);
			};
		});
	};

	const getOptions = (order_id) => {
		return {
			key: "rzp_test_uzQtS3K7kR9tJT",
			amount: "50000",
			currency: "INR",
			name: "itzAamir's Store",
			description: "Test Transaction",
			image:
				"https://p7.hiclipart.com/preview/8/373/133/shopping-bags-trolleys-shopping-cart-logo-clip-art-online-shop.jpg",
			order_id,
			handler: function (response) {
				console.log(response);
			},
			prefill: {
				name: "Aamir Khan",
				email: "amirpc190320@gmail.com",
				contact: "9827238321",
			},
			notes: {
				address: "Aamir's Office",
			},
			theme: {
				color: "#818cf8",
			},
		};
	};

	const createOrder = async (price) => {
		const { data } = await axios.post("/razorpay", {
			price,
		});
		return data;
	};

	const handlePayment = async (e) => {
		e.preventDefault();
		const res = await loadScript(
			"https://checkout.razorpay.com/v1/checkout.js"
		);
		if (!res) return;

		const data = await createOrder(totalCartPrice);
		const rzp1 = new window.Razorpay(getOptions(data.orderId));
		rzp1.open();
	};

	const handleProductDelete = (prodId) => {
		const products = [...cartProducts];
		const newProducts = products.filter((item) => item.id !== prodId);
		setCartProducts(newProducts);
	};

	if (cartProducts.length === 0) {
		return (
			<div className="h-screen flex justify-center items-center">
				<h1 className="text-3xl">No cart</h1>
			</div>
		);
	}

	return (
		<div>
			<main className="p-10 md:p-20">
				<section className="md:grid md:grid-cols-3 gap-10">
					<div>
						<h1 className="text-2xl font-semibold">Shopping Cart</h1>
						<div className="mt-4 max-h-[65vh] overflow-auto">
							{cartProducts.map((product) => (
								<ShopCard
									key={product.id}
									item={product}
									onClose={handleProductDelete}
								/>
							))}
						</div>
						<div className="mt-4 flex justify-between">
							<h3 className="text-xl font-bold">Total</h3>
							<h3 className="text-xl font-bold">
								${totalCartPrice.toFixed(2)}
							</h3>
						</div>
					</div>
					<hr className="border-gray-400 mt-4 sm:hidden block" />
					<div className="col-span-2 md:w-4/5 md:mt-0 mt-8">
						<CartForm onPayment={handlePayment} />
					</div>
				</section>
			</main>
		</div>
	);
}

const ShopCard = ({ item, onClose }) => {
	return (
		<div className="p-4 my-5 bg-white  rounded-md shadow-lg border-[1px] border-gray-300">
			<div className="flex justify-between items-center">
				<div className="flex items-center">
					<img src={item.image} alt="..." className="w-[3rem] h-[3rem] mr-3" />
					<h1 className="text-lg">{item.title}</h1>
				</div>
				<FontAwesomeIcon
					icon={faTimesCircle}
					onClick={() => onClose(item.id)}
				/>
			</div>
			<div className="mt-4 flex justify-between">
				<div>
					<label htmlFor="qty-inp">Qty: </label>
					<select id="qty-inp">
						<option value="1">1</option>
						<option value="2">2</option>
						<option value="3">3</option>
						<option value="4">4</option>
						<option value="5">5</option>
					</select>
				</div>
				<p>${item.price}</p>
			</div>
		</div>
	);
};
