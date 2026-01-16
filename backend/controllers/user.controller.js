import mongoose from "mongoose";
import asyncHandler from "../utils/asyncHandler.js";
import User from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { imagekit } from "../config.js/imageKit.js";



const updateProfileInfo = asyncHandler(async (req,res) =>{

    const userId = req.user?._id;
    const {name, email, gender} = req.body;

    if(!mongoose.Types.ObjectId.isValid(userId)){
        throw new ApiError(409, "Invalid UserId")
    }

    const updateData = {};
    if(name) {
        updateData.name = name;
    }

    if(email){
        const emailRegix = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!emailRegix.test(email)){
            throw new ApiError(400, "Invalid Email Address")
        }

        const emailExist = await User.findOne({
            email,
           _id: {$ne : userId}
        });

        if(emailExist){
            throw new ApiError(400, "Email already in use");
        }

        updateData.email = email;
    }

    if(gender){
        if(!["Male", "Female", "Other"].includes(gender)){
            throw new ApiError(400, "Invalid Gender Value")
        }

        updateData.gender = gender;
    }


    const updatedUser = await User.findByIdAndUpdate(
        {_id: userId},
        {$set: updateData},
        {new: true, runValidators: true}
    ).select("-password -refreshToken");

    if(!updatedUser){
        throw new ApiError(404, "User not found");
    }

    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            "Profile updated successfully",
            true,
            updatedUser
        )
    );
});

const addProfileImage = asyncHandler (async (req, res) => {
    const userId = req.user?._id;
    if(!mongoose.Types.ObjectId.isValid(userId)){
        throw new ApiError(409, "Invalid UserId")
    }
    
    if (!req.file){
        throw new ApiError(400, "Image is required");
    }
            
    const response = await imagekit.upload({
        file: req.file.buffer,
        fileName: Date.now() + ".jpg",
    });
    
    const imageUrl = response.url;
    const imageId = response.fileId;

    const user = await User.findByIdAndUpdate(
        userId,
        {
            image:{
                url:imageUrl,
                imageId
            }
        },
        { new: true}
    ).select("-password -refreshToken");
    
    if(!user){
        throw new ApiError(404, "User not found");
    }

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

const deleteProfileImage = asyncHandler (async (req, res) => {
    const userId = req.user?._id;
    if(!mongoose.Types.ObjectId.isValid(userId)){
        throw new ApiError(409, "Invalid UserId")
    }

    const user = await User.findById(userId);
    if(!user){
        throw new ApiError(404, "User not found");
    }
    if(user.image?.imageId){
        await imagekit.deleteFile(user.image.imageId);
    }   
    user.image = undefined;
    await user.save();

    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            "Image deleted successfully",
            true,
            user
        )
    );
});






export {
    updateProfileInfo,
    addProfileImage,
    deleteProfileImage 
}