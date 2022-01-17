require("dotenv").config();
const express = require("express");
const app = express();
const Razorpay = require("razorpay");
const PORT = process.env.PORT || 3001;
const path = require("path");
const { nanoid } = require("nanoid");

app.use(require("cors")());
app.use(express.json());

const rzpInstance = new Razorpay({
	key_id: process.env.RAZORPAY_KEY_ID,
	key_secret: process.env.RAZORPAY_KEY_SECRET,
});

if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "client", "build")));

	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
	});
}

app.post("/razorpay", async (req, res) => {
	const amount = req.body.price;
	const currency = "INR";
	const receipt = nanoid(10);

	const result = await rzpInstance.orders.create({
		amount: amount * 100,
		currency,
		receipt,
	});
	res.json({ orderId: result.id });
});

app.listen(PORT, () => {
	console.log(`Server Alive: http://localhost:${PORT}`);
});
