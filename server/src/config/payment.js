import dotenv from "dotenv";
import Razorpay from "razorpay";

dotenv.config({ path: "server/.env" });

const paymentMode = process.env.PAYMENT_MODE || "simulation";

if (!["simulation", "razorpay"].includes(paymentMode)) {
  throw new Error("Invalid PAYMENT_MODE in server/.env");
}

let razorpay = null;

if (paymentMode === "razorpay") {
  if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
    throw new Error("Razorpay credentials are missing.");
  }

  razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  });
}

export { paymentMode, razorpay };