const dotenv = require('dotenv');


//OTP
export const GenerateOtp = () => {

    const OTP = Math.floor(100000 + Math.random() * 900000);
    let otpExpiry = new Date();
    otpExpiry.setTime(new Date().getTime() + (7 * 60 * 60 * 1000) + (30 * 60 * 1000));

    return {OTP, otpExpiry}

}
