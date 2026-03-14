import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs";

const otpSchema = new Schema(
  {
    email: { type: String, unique: true,  required: true, lowercase: true },
    otp: { type: String, required: true,  select: false },
    otpExpires: Date,
  },
  { timestamps: true }
);

otpSchema.methods.setOtp = async function (otp) {
  this.otp = await bcrypt.hash(otp, 10);
  this.otpExpires = Date.now() + 5 * 60 * 1000; // 5 min
};

otpSchema.methods.isOtpValid = async function (otp) {
  if (!this.otp || this.otpExpires < Date.now()) {
    return false;
  }
  return await bcrypt.compare(otp, this.otp);
};

export default mongoose.model("Otp", otpSchema);