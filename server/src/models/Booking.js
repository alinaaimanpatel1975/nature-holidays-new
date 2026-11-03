
import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    // Customer details
    customerName: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },

    phone: {
      type: String,
      required: true,
      trim: true,
    },

    // Tour details
    packageName: {
      type: String,
      required: true,
      trim: true,
    },

    travelDate: {
      type: Date,
      required: true,
    },

    travellers: {
      type: Number,
      required: true,
      min: 1,
    },

    // Payment details
    totalAmount: {
      type: Number,
      required: true,
      min: 0,
    },

    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed", "refunded"],
      default: "pending",
    },

    paymentMethod: {
  type: String,
  enum: ["simulation", "razorpay"],
  default: "simulation",
},

paymentOrderId: {
  type: String,
  default: null,
},

paymentId: {
  type: String,
  default: null,
},

paymentSignature: {
  type: String,
  default: null,
},

    // Booking management
    bookingStatus: {
      type: String,
      enum: ["pending", "confirmed", "cancelled"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

const Booking = mongoose.model("Booking", bookingSchema);

export default Booking;
