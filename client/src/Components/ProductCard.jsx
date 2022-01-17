export default function ProductCard({
	data,
	onAddToCart,
	onRemoveCart,
	cartProducts,
}) {
	const isAdded = () => {
		return cartProducts.some((prod) => prod.id === data.id);
	};

	return (
		<div className="bg-white text-slate-700 w-80 rounded-md p-4 flex flex-col">
			<img src={data.image} alt="..." className="h-40 self-center" />
			<h1 className="text-xl my-3 flex-1">{data.title}</h1>
			<p>price: ${data.price}</p>
			<p>rating: {data.rating.rate}/5</p>
			{!isAdded() ? (
				<button
					className="mt-4 bg-indigo-600 text-white font-semibold w-full py-2 hover:bg-indigo-800 rounded-sm shadow-lg shadow-indigo-400 ease-in-out duration-150"
					onClick={() => onAddToCart(data)}
				>
					Add to cart
				</button>
			) : (
				<button
					className="mt-4 bg-red-500 text-white font-semibold w-full py-2 hover:bg-red-600 rounded-sm shadow-lg shadow-red-400 ease-in-out duration-150"
					onClick={() => onRemoveCart(data.id)}
				>
					Remove
				</button>
			)}
		</div>
	);
}
