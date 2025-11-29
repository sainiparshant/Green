import { ApiResponse } from "../utils/ApiResponse.js";
import { imagekit } from "../config.js/imageKit.js";
import bcrypt from 'bcrypt'
import User from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import Plant from "../models/plant.model.js";
import mongoose from "mongoose";
import uploadImages from "../services/uploads.service.js";



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

const addPlant = asyncHandler( async(req, res) =>{
    const {name, category, price, description, stock} = req.body;

    if(!name || !category || !price || !description || !stock ){
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

    const plant = await Plant.create({
        name,
        category,
        price,
        description,
        stock,
        thumbnail: images[0],
        images
    });

    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            "Plant Added successfully",
            true,
            plant
        )
    );

});

const toggleAvailable = asyncHandler( async(req,res) =>{

    const { id } = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
        throw new ApiError(400, "Invalid Id");
    }

    const plant = await Plant.findByIdAndUpdate(
        id,
        [{ $set: { available: { $not: "$available" }}}],
        { new: true}
    );

    if(!plant){
        throw new ApiError(404, "No Plant Found");
    }

    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            "Plant availability changed",
            true,
            plant
        )
    );

});

const toggleFeatured = asyncHandler( async(req,res) =>{

    const { id } = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
        throw new ApiError(400, "Invalid Id");
    }

    const plant = await Plant.findByIdAndUpdate(
        id,
        [{ $set: { isFeatured: { $not: "$isFeatured" }}}],
        { new: true}
    );

    if(!plant){
        throw new ApiError(404, "No Plant Found");
    }

    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            "Plant availability changed",
            true,
            plant
        )
    );

});

const updatePlantDetail = asyncHandler( async( req,res) =>{
    
    const {id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
        throw new ApiError(404, "Invalid Id");
    }

    const {name, category, price, description, stock,size} = req.body;
    if(!name || !category || !price || !description || !stock ){
        throw new ApiError(400, "All fields are required")
    }

    const existedPlant = await Plant.findByIdAndUpdate(
        id,
        {
            name,
            category,
            price,
            description,
            stock,
            size
        },
        {new: true, runValidators: true}
    );

    if(!existedPlant){
        throw new ApiError(404, "No Plant Found")
    }

    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            "Plant Updated Successfully",
            true,
            existedPlant
        )
    );

});

const getSinglePlant = asyncHandler( async (req,res) =>{

    const {id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
        throw new ApiError(400, "Invalid plant id");
    }

    const plant = await Plant.findById(id);
    if(!plant){
        throw new ApiError(404,"No Plant found")
    }

    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            "Plant fetched Successfully",
            true,
            plant
        )
    );

    
});

const deletePlant = asyncHandler( async(req,res) =>{

    const { id } = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
        throw new ApiError(400, "Invalid plant id");
    }
    
    const plant = await Plant.findById(id);
    if(!plant){
        throw new ApiError(404, "No Plant Found");
    }
    

    const deleteOperation = plant.images.map((img) =>
       imagekit.deleteFile(img.imageId)
    );
    

    await Promise.all(deleteOperation);

    await Plant.findByIdAndDelete(id);

    return res.status(200).json(
    new ApiResponse(
      200,
      "Plant  deleted successfully",
      true,
      {}
    )
  );


});

export {
    changePassword,
    addPhoto,
    addPlant,
    toggleAvailable,
    toggleFeatured,
    updatePlantDetail,
    getSinglePlant,
    deletePlant

}