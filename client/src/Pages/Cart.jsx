import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import CartForm from "../Components/CartForm";

export default function Cart() {
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
		const { data } = await axios.post("http://localhost:3001/razorpay", {
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

		const data = await createOrder(100);
		const rzp1 = new window.Razorpay(getOptions(data.orderId));
		rzp1.open();
	};

	return (
		<div>
			<main className="p-20">
				<section className="grid grid-cols-3 gap-2">
					<div>
						<h1 className="text-2xl font-semibold">Shopping Cart</h1>
						<div className="mt-4 max-h-[65vh] overflow-auto">
							<ShopCard />
						</div>
						<div className="mt-4 flex justify-between w-4/5">
							<h3 className="text-xl font-bold">Total</h3>
							<h3 className="text-xl font-bold">$400</h3>
						</div>
						{/* <button
							onClick={handlePayment}
							className="mt-4 bg-indigo-600 text-white font-semibold w-80 py-2 hover:bg-indigo-800 rounded-sm shadow-lg shadow-indigo-400 ease-in-out duration-150"
						>
							Add to cart
						</button> */}
					</div>
					<div className="col-span-2">
						<CartForm onPayment={handlePayment} />
					</div>
				</section>
			</main>
		</div>
	);
}

const ShopCard = () => {
	return (
		<div className="p-4 my-5 bg-white w-4/5 rounded-md shadow-lg border-[1px] border-gray-300">
			<div className="flex justify-between items-center">
				<div className="flex items-center">
					<img
						src="https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg"
						alt="..."
						className="w-[3rem] h-[3rem] mr-3"
					/>
					<h1 className="text-lg">Mens Cotton Jacket</h1>
				</div>
				<FontAwesomeIcon icon={faTimesCircle} />
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
				<p>$191</p>
			</div>
		</div>
	);
};
