import User from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import bcrypt from 'bcrypt'
import { generateAccessAndRefreshToken } from "./user.controller.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { imagekit } from "../config.js/imageKit.js";



const adminLogin = asyncHandler( async(req,res) =>{

    const { email, password } = req.body;
    if(!email || !password){
        throw new ApiError(404, "All fields are required");
    }

    const user = await User.findOne({email}).select("password");
    if(!user){
        throw new ApiError(401, "Invalid crediential");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch){
        throw new ApiError(401, "Invalid Password");
    }

    const { refreshToken, accessToken } = await generateAccessAndRefreshToken(user._id);

    const loggedInUser = await User.findById(user._id);

    const options = {
        httpOnly: true,
        secure: true,
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

const getAdminProfile = asyncHandler(async(req,res) =>{

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

const changePassword = asyncHandler( async(req,res) =>{

    const {oldPassword, newPassword} = req.body;
    if(!oldPassword || !newPassword) {
        throw new ApiError(404, "All fields are required!");
    }

    const user = await User.findById(req.user._id).select("+password");
    if(!user){
        throw new ApiError(404, "No user found");
    }

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if(!isMatch){
        throw new ApiError(401, "Invalid Password");
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    
    user.password = hashedPassword;
    await user.save();

    return res.status(200).json(
        new ApiResponse(
            200,
            "Password Changed successfully",
            true,
            {}
        )
    );

});
 
const addPhoto = asyncHandler( async (req, res) =>{

    if (!req.file){
        throw new ApiError(400, "Image is required");
    }
        
    const response = await imagekit.upload({
        file: req.file.buffer,
        fileName: Date.now() + ".jpg",
    });

    const imageUrl = response.url;

    const user = await User.findByIdAndUpdate(
        req.user._id,
        {image: imageUrl},
        { new: true}
    );

    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            "Image uploaded",
            true,
            user
        )
    );
      
});


export {
    adminLogin,
    adminLogout,
    getAdminProfile,
    changePassword,
    addPhoto
}