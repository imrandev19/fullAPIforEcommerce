const emailcheck = require("../helpers/emailAddressValidation");
const sendEmail = require("../helpers/sendEmail");
const sendOtp = require("../helpers/sendOTP");
const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");

const singupController = async (req, res) => {
  let { name, username, email, password, phone, address, city, country } =
    req.body;
  const otp = sendOtp();
  try {
    if (!emailcheck(email)) {
      return res.send("Email is not Valid");
    } else {
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
        });
        await signupUser.save();
        sendEmail(email, otp, name);
        setTimeout(async () => {
          await userModel.findOneAndUpdate(
            { email },
            { otp: null },
            { new: true }
          );
        }, 300000);
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
};

module.exports = singupController;
