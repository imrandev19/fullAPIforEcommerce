async function otpVerify(email, otp) {
  const user = await userModel.findOne({ email });

  if (!user || !user.otp) {
    return { success: false, message: "OTP not found or already verified" };
  }

  const otpExpiryMinutes = 1;
  const now = new Date();
  const diff = (now - user.otpCreatedAt) / 1000 / 60;

  if (diff > otpExpiryMinutes) {
    return { success: false, message: "OTP expired" };
  }

  if (user.otp !== otp) {
    return { success: false, message: "Incorrect OTP" };
  }

  // OTP is valid
  user.otp = null;
  user.otpCreatedAt = null;
  await user.save();

  return { success: true, message: "OTP verified successfully" };
}

module.exports = otpVerify;const userModel = require("../models/userModel");

async function otpVerify(email, otp) {
  const user = await userModel.findOne({ email });

  if (!user || !user.otp) {
    return { success: false, message: "OTP not found or already verified" };
  }

  const otpExpiryMinutes = 1;
  const now = new Date();
  const diff = (now - user.otpCreatedAt) / 1000 / 60;

  if (diff > otpExpiryMinutes) {
    return { success: false, message: "OTP expired" };
  }

  if (user.otp !== otp) {
    return { success: false, message: "Incorrect OTP" };
  }

  // OTP is valid
  user.otp = null;
  user.otpCreatedAt = null;
  await user.save();

  return { success: true, message: "OTP verified successfully" };
}

module.exports = otpVerify;