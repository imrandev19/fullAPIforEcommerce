const emailcheck = require("../helpers/emailAddressValidation")
const userModel = require("../models/userModel")

const singupController =async (req,res)=>{
    let {name, username,email,password,phone,address,city,country} = req.body
    try {
      if(!emailcheck(email)) {
        return res.send("Email is not Valid")
      } else{
        const signupUser = new userModel(
            {
                name,username,email,password,phone,address,city,country
            }
            
        )
        await signupUser.save()
        const existingUser = await userModel.findOne({email}).select("-password")
        if(existingUser){
            return res.status(200).json({
                success:true,
                message: "User Created Successfully",
                data: existingUser
            })
        }
      }
        
    } catch (error) {
        return res.status(500).json({
            success:false,
            message: error.message || "Something Went Wrong",
           
        })
    }
}

module.exports = singupController