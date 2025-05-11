const mongoose = require("mongoose");

const userModel = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Username must be required"],
  },
  username: {
    type: String,
    required: [true, "Username must be required"],
    unique: [true, "The Username has already exists.Try Another One"],
    minLength: [3, "Username must be at least 3 characters long"],
    maxLength: [20, "Username cannot exceed 20 characters"]
  },
  email:{
    type: String,
    required: [true, "Email must be required"],
    unique: [true, "The Email has already exists.Try Another One"],
  },
  password:{
    type: String,
    required: [true, "Password must be required"],
    minLength: [3, "Username must be at least 3 characters long"],
  },
  otp:{
    type:String
  },
  otpCreatedAt: {
  type: Date,
},
  role:{
    type: String,
    enum: ["user", "admin"],
    default:"user"
  },
  isVerified:{
    type:"Boolean",
    default:false
  },
  phone:{
    type: String,
    required: [true, "Phone Number must be required"],
    unique: [true, "The Phone Number has already exists.Try Another One"],
    minLength: [10, "Phone Number must be at least 10 digit long"],
    maxLength: [15, "Phone Number cannot exceed 15 characters"]
  },
  address:{
    type: String,
  },
  city:{
    type: String,
  },
  country:{
    type: String,
  },
},
{timestamps:true}
);

module.exports = mongoose.model("User",userModel );
