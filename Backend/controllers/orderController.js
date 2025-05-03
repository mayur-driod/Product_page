const Razorpay = require("razorpay");
const crypto = require("crypto");
const Order = require("../models/Order");
require("dotenv").config();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

exports.createOrder = async (req, res) => {
  const { contact, address, items, totalAmount } = req.body;
  try {
    const options = {
      amount: totalAmount * 100, // INR to paisa
      currency: "INR",
      receipt: "order_rcptid_" + Date.now(),
    };

    const razorpayOrder = await razorpay.orders.create(options);

    const newOrder = await Order.create({
      contact,
      address,
      items,
      totalAmount,
      razorpayOrderId: razorpayOrder.id,
    });

    res.json({
      orderId: razorpayOrder.id,
      amount: razorpayOrder.amount,
      currency: razorpayOrder.currency,
      key: process.env.RAZORPAY_KEY_ID,
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to create order", error: err.message });
  }
};

exports.verifyPayment = async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    req.body;

  const generatedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(razorpay_order_id + "|" + razorpay_payment_id)
    .digest("hex");

  if (generatedSignature === razorpay_signature) {
    const order = await Order.findOneAndUpdate(
      { razorpayOrderId: razorpay_order_id },
      { status: "PAID", razorpayPaymentId: razorpay_payment_id },
      { new: true },
    );
    res.json({ message: "Payment verified successfully", order });
  } else {
    res.status(400).json({ message: "Payment verification failed" });
  }
};
