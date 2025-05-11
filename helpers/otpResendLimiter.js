const rateLimit = require("express-rate-limit");

const otpResendLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 1, // Limit each IP to 1 request per `windowMs`
  message: {
    success: false,
    message: "Too many OTP requests. Please try again after 1 minute.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

module.exports = otpResendLimiter;