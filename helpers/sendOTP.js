const numberGenerator = require("number-generator");
const aleaRNGFactory = require("number-generator/lib/aleaRNGFactory");
const sendOtp = ()=>{
    const generator1 = aleaRNGFactory(Date.now()).uFloat32();
    const otp = Math.floor(generator1 * 900000) + 100000;
    return otp
}
module.exports = sendOtp