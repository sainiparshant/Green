import User from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import jwt from 'jsonwebtoken';



const adminAuth = asyncHandler( async(req,res,next) => {

    const token = req.cookies?.accessToken;
    if(!token){
        throw new ApiError(401, "No token found");
    }

    const decodedToken = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    if(!decodedToken){
        throw new ApiError(401, "Invalid Token");
    }

    const user = await User.findById(decodedToken._id);
    if(!user){
        throw new ApiError(404, "User not found");
    }

    // if (user.role !== "admin") {
    // throw new ApiError(403, "Access denied: Admin only");
    // }

    req.user = user;
    next();
});

export default adminAuth;