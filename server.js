const express = require("express");
const app = express();
const Razorpay = require("razorpay");
const PORT = process.env.PORT || 3001;
const { nanoid } = require("nanoid");

app.use(require("cors")());
app.use(express.json());

const rzpInstance = new Razorpay({
	key_id: "rzp_test_uzQtS3K7kR9tJT",
	key_secret: "1kyHqTAQsSgrReMcvdepJ4Vw",
});

app.get("/", (req, res) => {
	res.send("ok");
});

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
