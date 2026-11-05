import mongoose from "mongoose";

const enquirySchema = new mongoose.Schema(
  {
    reference: {
      type: String,
      required: true,
      unique: true,
    },

    customer: {
      name: { type: String, required: true, trim: true },
      email: { type: String, required: true, lowercase: true, trim: true },
      phone: { type: String, required: true, trim: true },
    },

    trip: {
      packageName: { type: String, trim: true, default: "" },
      tripType: { type: String, default: "" },
      destination: { type: String, default: "" },
      travelDate: { type: Date, default: null },
      travellers: { type: Number, required: true, min: 1 },
      departureCity: { type: String, default: "" },
      requests: { type: String, default: "" },
    },

    price: {
      indicativeAmount: { type: Number, default: null },
      basis: { type: String, default: "" },
    },

    internalNotes: [
      {
        text: { type: String, required: true, trim: true },
        author: { type: String, default: "Admin" },
        createdAt: { type: Date, default: Date.now },
      },
    ],

    status: {
      type: String,
      enum: ["new", "contacted", "quoted", "confirmed", "cancelled"],
      default: "new",
    },
  },
  { timestamps: true }
);

const Enquiry = mongoose.model("Enquiry", enquirySchema);

export default Enquiry;

