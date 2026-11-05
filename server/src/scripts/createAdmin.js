import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import Admin from "../models/Admin.js";

dotenv.config({ path: "server/.env" });

async function createAdmin() {
  try {
    const {
      ADMIN_NAME,
      ADMIN_EMAIL,
      ADMIN_PASSWORD,
      MONGODB_URI,
    } = process.env;

    if (!ADMIN_NAME || !ADMIN_EMAIL || !ADMIN_PASSWORD || !MONGODB_URI) {
      throw new Error("Missing admin or database environment variables.");
    }

    await mongoose.connect(MONGODB_URI);

    const email = ADMIN_EMAIL.trim().toLowerCase();
    const hashedPassword = await bcrypt.hash(ADMIN_PASSWORD, 12);

    const existingAdmin = await Admin.findOne({ email });

    if (existingAdmin) {
      existingAdmin.password = hashedPassword;
      existingAdmin.name = ADMIN_NAME;
      await existingAdmin.save();

      console.log("Existing admin credentials updated successfully!");
    } else {
      await Admin.create({
        name: ADMIN_NAME,
        email,
        password: hashedPassword,
      });

      console.log("Admin account created successfully!");
    }
  } catch (error) {
    console.error("Admin setup failed:", error.message);
  } finally {
    await mongoose.disconnect();
  }
}

createAdmin();