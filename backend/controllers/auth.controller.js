import twilio from "twilio";
import asyncHandler from "../utils/asyncHandler.js";
const { RestException } = twilio;
import otpGenerator from "otp-generator";
import UserOtp from "../models/userOtp.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import User from "../models/user.model.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const generateAccessAndRefreshToken = async (user_id) => {
  try {
    const user = await User.findById(user_id);

    const accessToken = await user.generateAccessToken();
    const refreshToken = await user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save();
    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(500, "Error occured while generating the tokens");
  }
};

const registerUser = asyncHandler(async (req, res) => {
  const { phone } = req.body;

  if (!phone) {
    throw new ApiError(400, "Phone number is required");
  }

  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const client = twilio(accountSid, authToken);

  const otp = otpGenerator.generate(6, {
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

  return res
    .status(201)
    .json(new ApiResponse(201, "Otp sent Successfully!", true));
});

const verifyOtp = asyncHandler(async (req, res) => {
  const { phone, otp } = req.body;
  if (!phone || !otp) {
    throw new ApiError(401, "All fields are required!");
  }

  const record = await UserOtp.findOne({ phone });
  if (!record) {
    throw new ApiError(401, "Otp is expired or not found");
  }

  if (record.otp !== otp) {
    throw new ApiError(400, "Invalid otp");
  }

  await UserOtp.deleteMany({ phone });

  let user = await User.findOne({ phone });
  if (!user) {
    user = await User.create({ phone });
  }

  const { refreshToken, accessToken } = await generateAccessAndRefreshToken(
    user._id
  );

  const options = {
    httpOnly: true,
    secure: true,
    sameSite: 'none'
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200, 
        "Login Successfully", 
        true,
        user,
       )
    );
});



const logoutUser = asyncHandler(async (req, res) => {

  await User.findByIdAndUpdate(
    req.user._id,
    {
      $set: { refreshToken: null },
    },
    { new: true }
  );

  const options = {
    httpOnly: true,
    secure: true,
    sameSite: 'none'
  };

  return res
    .status(200)
    .clearCookie("accessToken",  options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, "logout successfully", true, {}));

});

const regenrateAccessToken = asyncHandler( async(req,res) => {

  const incomingRefreshToken = req.cookies?.refreshToken;
  if(!incomingRefreshToken){
    throw new ApiError(401, "Refresh Token not found");
  }
  
   let decodedToken;
  try {
    decodedToken = jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );
  } catch {
    throw new ApiError(401, "Invalid refresh token");
  }

  const user = await User.findById(decodedToken._id).select("refreshToken");
  if(!user || incomingRefreshToken !== user.refreshToken){
    throw new ApiError(401, "Refresh token mismatch");
  }

  const {accessToken, refreshToken} = await generateAccessAndRefreshToken(user._id);

  const options = {
    httpOnly: true,
    secure: true,
    sameSite:'none'
  }

  return res
  .status(200)
  .cookie("accessToken" , accessToken, options)
  .cookie("refreshToken" , refreshToken, options)
  .json(
    new ApiResponse(
      200,
      "Access token refreshed",
      true,
    )
  )

});

const adminLogin = asyncHandler( async(req,res) =>{

    const { email, password } = req.body;
    if(!email || !password){
        throw new ApiError(400, "All fields are required");
    }

    const user = await User.findOne({email}).select("password");
    if (!user) {
    return res.status(401).json({
        success: false,
        message: "Invalid email or password",
    });
}


    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
    return res.status(401).json({
        success: false,
        message: "Invalid email or password",
    });
}


    const { refreshToken, accessToken } = await generateAccessAndRefreshToken(user._id);

    const loggedInUser = await User.findById(user._id);

    const options = {
        httpOnly: true,
        secure: true,
        sameSite: 'none'
    }

    return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken" , refreshToken, options)
    .json(
        new ApiResponse(
            200,
            "Admin Login Successfully",
            true,
            loggedInUser,
        )
    );

});

const authCheck = asyncHandler( async(req,res) =>{
    return res
    .status(200)
    .json(
      new ApiResponse(
          200,
          "Profile fetched",
          "true",
          req.user,
      )
    );
});



const adminLogout = asyncHandler(async (req, res) => {

  await User.findByIdAndUpdate(
    req.user._id,
    {
      $set: { refreshToken: null },
    },
    { new: true }
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, "logout successfully", true, {}));
});

export { 
  registerUser, 
  verifyOtp, 
  logoutUser,
  adminLogin,
  regenrateAccessToken,
  adminLogout,
  authCheck
};
