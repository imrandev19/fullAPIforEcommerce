const emailcheck = require("../helpers/emailAddressValidation");
const otpVerify = require("../helpers/otpVerify");
const sendEmail = require("../helpers/sendEmail");
const sendOtp = require("../helpers/sendOTP");
const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");

async function signupController(req, res) {
  let { name, username, email, password, phone, address, city, country } =
    req.body;
  const otp = sendOtp();
  try {
    if (!emailcheck(email)) {
      return res.status(400).send("Email is not Valid");
    } else {
      const existingUser = await userModel.findOne({ email });
      if (existingUser) {
        return res
          .status(400)
          .json({ success: false, message: "Email already registered" });
      }
      bcrypt.hash(password, 10, async function (err, hash) {
        if (err) {
          return res.status(500).json({ success: false, message: err });
        }
        const signupUser = new userModel({
          name,
          username,
          email,
          password: hash,
          phone,
          address,
          city,
          country,
          otp,
          otpCreatedAt: new Date(),
        });
        await signupUser.save();
        sendEmail(email, otp, name);

        const userResponse = await userModel
          .findOne({ email })
          .select("-password -otp");
        return res.status(200).json({
          success: true,
          message: "User Created Successfully",
          data: userResponse,
        });
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Something Went Wrong",
    });
  }
}
async function otpVerifyController(req, res) {
  try {
    let { email, otp } = req.body;
    const result = await otpVerify(email, otp);
    if (!result.success) {
      return res.status(400).json(result);
    } else {
      await userModel.findOneAndUpdate(
        { email },
        { isVerified: true },
        { new: true }
      );
      
      return res.status(200).json({ success: true, message: "OTP Verified" });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}
async function loginController(req, res) {
  res.send("login");
}



const resendOtpController = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const now = new Date();
    const lastSent = user.otpCreatedAt || new Date(0); // fallback to a very old date
    const diffInMinutes = (now - lastSent) / 1000 / 60;

    if (diffInMinutes < 1) {
      const secondsRemaining = Math.ceil(60 - (now - lastSent) / 1000);
      return res.status(429).json({
        success: false,
        message: `Please wait ${secondsRemaining} seconds before requesting another OTP.`,
      });
    }

    const newOtp = sendOtp();
    user.otp = newOtp;
    user.otpCreatedAt = new Date();
    await user.save();

    await sendEmail(email, newOtp, user.name);

    return res.status(200).json({
      success: true,
      message: "OTP resent successfully. Please check your email.",
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Something went wrong",
    });
  }
};

module.exports = resendOtpController;


module.exports = { signupController, loginController, otpVerifyController, resendOtpController };
