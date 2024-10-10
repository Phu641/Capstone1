//OTP

export const GenerateOtp = () => {

    const OTP = Math.floor(100000 + Math.random() * 900000);
    let expiry = new Date();
    expiry.setTime(new Date().getTime() + (30 * 60 * 10000));

    return {OTP, expiry}

}

export const onRequestOTP = async(otp: number, toPhoneNumber: string) => {

    const accountSid = 'AC3e5bca8b875907a4711aa5e774f33e4a';
    const authToken = '4884230a092dd80c444a3bcb479a90e5';
    const client = require('twilio')(accountSid, authToken);

    const response = await client.messages.create({
        body: `Your OTP is ${otp}`,
        to: toPhoneNumber,
        from: '+12564726910',
    });

    return response;

}