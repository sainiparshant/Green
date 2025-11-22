import mongoose from "mongoose";

export const userOtpSchema = new mongoose.Schema({
    phone:{
        type: String,
        minlength:10,
        maxlength:10,
        required: true,
    },
    otp:{
        type: String,
        minlength:4,
        maxlength:4,
        required: true,
    },
    createdAt:{
        type: Date,
        default: Date.now,
        expires: 180,
    }
});

const UserOtp = mongoose.model("UserOtp", userOtpSchema);
export default UserOtp;