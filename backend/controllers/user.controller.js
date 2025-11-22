import twilio from "twilio";
import asyncHandler from "../utils/asyncHandler.js";
const { RestException } = twilio;
import otpGenerator from "otp-generator";
import UserOtp from "../models/userOtp.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import User from '../models/user.model.js'


const generateAccessAndRefreshToken = async(user_id) =>{
    try {

        const user = await User.findById(user_id);

        const accessToken = await user.generateAccessToken();
        const refreshToken = await user.generateRefreshToken();

        user.refreshToken = refreshToken;
        await user.save();
        return {accessToken, refreshToken};
    } catch (error) {
         throw new ApiError(500, "Error occured while generating the tokens")
    }
}

const registerUser = asyncHandler(async (req, res) => {
  const { phone } = req.body;

  if (!phone) {
    throw new ApiError(400, "Phone number is required");
  }

  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const client = twilio(accountSid, authToken);

  const otp = otpGenerator.generate(4, {
    digits: true,
    upperCaseAlphabets: false,
    lowerCaseAlphabets: false,
    specialChars: false,
  });

  try {
    await client.messages.create({
      body: `Use OTP ${otp} to log in to Greenland.This code expires in 2 minutes. Keep it confidential.`,
      messagingServiceSid: process.env.TWILIO_SERVICE_ID,
      to: `+91${phone}`,
    });
  } catch (error) {
    if (error instanceof RestException) {
      throw new ApiError(500, `Twilio error: ${error.message}`);
    } else {
      throw new ApiError(500, `Failed to send Otp`);
    }
  }

  await UserOtp.findOneAndUpdate(
    { phone },
    { otp },
    { upsert: true, new: true }
  );

  return res.status(201).json(new ApiResponse(
    201,
    "Otp sent Successfully!",
    true,
));

});

const verifyOtp = asyncHandler( async (req,res) =>{

    const {phone, otp} = req.body;
    if(!phone || !otp){
        throw new ApiError(401, "All fields are required!");
    }

    const record = await UserOtp.findOne({phone});
    if(!record){
        throw new ApiError(401, "Otp is expired or not found")
    }

    if(record.otp !== otp){
        throw new ApiError(400, "Invalid otp");
    }

    await UserOtp.deleteMany({phone});

    let user = await User.findOne({phone});
    if(!user){
        user =  await User.create({phone})
    }

    const {refreshToken, accessToken} = await generateAccessAndRefreshToken(user._id);

    const options = {
        httpOnly:true,
        secure:true,
    }

    return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        "Login Successfully",
        true,
        {
          user,
          accessToken,
        },
      )
    );
    

});

const getUserProfile = asyncHandler( (req,res) => {
    
})

export { registerUser , verifyOtp};
