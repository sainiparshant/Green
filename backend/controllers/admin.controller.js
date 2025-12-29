import { ApiResponse } from "../utils/ApiResponse.js";
import { imagekit } from "../config.js/imageKit.js";
import bcrypt from 'bcrypt'
import User from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import uploadImages from "../services/uploads.service.js";
import Pot from "../models/potDetail.model.js";
import Product from "../models/product.model.js";
import Plant from "../models/PlantDetail.model.js";


// admin dashboard
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
    const imageId = response.fileId;

    const user = await User.findByIdAndUpdate(
        req.user._id,
        {
            image:{
                url:imageUrl,
                imageId
            }
        },
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


// Product Controller
const addProduct = asyncHandler( async(req, res) =>{
    const {name, price, description, stock, size, title, productType} = req.body;


    let { details } = req.body;

    if (typeof details === "string") {
    details = JSON.parse(details);
    }


    if(!name  || !price || !description || !stock || !title || !productType){
        throw new ApiError(400, "All fields are required")
    }


    if (!req.files || !req.files.images || req.files.images.length === 0) {
        throw new ApiError(400, "Images are required");
    }


    const uploadResults = await uploadImages(req.files.images);
    const images = uploadResults.map(img => ({
    url: img.url,
    imageId: img.fileId
    }));

    const product = await Product.create({
        name,
        price,
        description,
        stock,
        thumbnail: images[0],
        images,
        size,
        title,
        productType,
    });

    if(productType === "Plant"){
        await Plant.create({
            productId: product._id,
            ...details
        });
    }

    if(productType === "Pot"){
        await Pot.create({
            productId : product._id,
            ...details
        });
    }


    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            "Product Added successfully",
            true,
            product
        )
    );

});


export {
    changePassword,
    addPhoto,
    addProduct,

}