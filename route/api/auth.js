    const express = require("express")
const { signupController, loginController, otpVerifyController, resendOtpController } = require("../../controllers/authController")
const otpResendLimiter = require("../../helpers/otpResendLimiter")
    const router = express.Router()
    // http://localhost:5000/api/v1/auth/signup
    router.post("/signup", signupController )
      // http://localhost:5000/api/v1/auth/otpverify
    router.post("/otpverify", otpVerifyController )
    // http://localhost:5000/api/v1/auth/resend-otp
    router.post("/resend-otp", otpResendLimiter, resendOtpController);
    // http://localhost:5000/api/v1/auth/login
    router.post("/login", loginController)


    module.exports = router