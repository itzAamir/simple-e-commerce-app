import InputBox from "./InputBox";

const STATES = [
	"Andhra Pradesh",
	"Arunachal Pradesh",
	"Assam",
	"Bihar",
	"Chhattisgarh",
	"Goa",
	"Gujarat",
	"Haryana",
	"Himachal Pradesh",
	"Jammu and Kashmir",
	"Jharkhand",
	"Karnataka",
	"Kerala",
	"Madhya Pradesh",
	"Maharashtra",
	"Manipur",
	"Meghalaya",
	"Mizoram",
	"Nagaland",
	"Odisha",
	"Punjab",
	"Rajasthan",
	"Sikkim",
	"Tamil Nadu",
	"Telangana",
	"Tripura",
	"Uttarakhand",
	"Uttar Pradesh",
	"West Bengal",
	"Andaman and Nicobar Islands",
	"Chandigarh",
	"Dadra and Nagar Haveli",
	"Daman and Diu",
	"Delhi",
	"Lakshadweep",
	"Puducherry",
];

export default function CartForm(props) {
	return (
		<form onSubmit={props.onPayment}>
			<h1 className="text-2xl font-semibold">Shipping & Delivery</h1>
			<div className="md:grid md:grid-cols-3 font-sans mt-5 gap-4">
				<div className="col-span-2">
					<InputBox
						label="Full Name"
						id="full-name"
						type="text"
						value={props.userInfo.fullName}
						onChange={(text) => props.onUserInfoChange(text, "fullName")}
					/>
				</div>
				<div>
					<InputBox
						label="Phone Number"
						id="phone"
						type="text"
						value={props.userInfo.phone}
						onChange={(text) => props.onUserInfoChange(text, "phone")}
					/>
				</div>
				<div className="col-span-3">
					<InputBox
						label="Address"
						id="address"
						type="text"
						value={props.userInfo.address}
						onChange={(text) => props.onUserInfoChange(text, "address")}
					/>
				</div>
				<div className="col-span-2">
					<InputBox
						label="City"
						id="city"
						type="text"
						value={props.userInfo.city}
						onChange={(text) => props.onUserInfoChange(text, "city")}
					/>
				</div>
				<div>
					<InputBox
						label="Postal Code"
						id="postal-code"
						type="text"
						value={props.userInfo.postalCode}
						onChange={(text) => props.onUserInfoChange(text, "postalCode")}
					/>
				</div>
				<div className="col-span-3">
					<label htmlFor="state">State</label>
					<select
						id="state"
						className="mt-2 border-[2px] border-gray-500 outline-none rounded-md px-3 py-1 w-full focus:border-blue-500 hover:border-gray-400"
						onChange={(e) => props.onUserInfoChange(e.target.value, "state")}
						value={props.userInfo.state}
					>
						{STATES.map((state) => (
							<option value={state} key={state}>
								{state}
							</option>
						))}
					</select>
				</div>
				<div className="col-span-2">
					<button className="mt-4 bg-gray-600 text-white font-semibold w-full py-2 hover:bg-gray-800 rounded-sm shadow-lg ease-in-out duration-150">
						Checkout
					</button>
				</div>
			</div>
		</form>
	);
}
