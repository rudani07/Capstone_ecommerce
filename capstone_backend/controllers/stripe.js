const User = require("../models/user");
const Cart = require("../models/cart");
const Product = require("../models/product");
const Coupon = require("../models/coupon");
const coupon = require("../models/coupon");

const STRIPE_SECRET =
  "sk_test_51NX4kpHevWicPNmpe7EVohbcgPk7cGCJcfP3PErH4Ezq1Y1A8N2e7sxRcCFZQNuu7HizldGIy2a8CQoGBQnt8noY00UkxxCR1b";
const stripe = require("stripe")(STRIPE_SECRET);
exports.createPaymentIntent = async (req, res) => {
  const { couponApplied } = req.body;

  const user = await User.findOne({ email: req.user.email }).exec();
  const { cartTotal, totalAfterDiscount } = await Cart.findOne({
    orderdBy: user._id,
  }).exec();

  let finalAmount = 0;

  if (couponApplied && totalAfterDiscount) {
    finalAmount = Math.round(totalAfterDiscount * 100); // Convert to cents and round off
  } else {
    finalAmount = Math.round(cartTotal * 100); // Convert to cents and round off
  }

  const paymentIntent = await stripe.paymentIntents.create({
    amount: finalAmount,
    currency: "usd",
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
    cartTotal,
    totalAfterDiscount,
    payable: finalAmount,
  });
};
