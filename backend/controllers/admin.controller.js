import { ApiResponse } from "../utils/ApiResponse.js";
import { imagekit } from "../config.js/imageKit.js";
import bcrypt from 'bcrypt'
import User from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import Plant from "../models/plant.model.js";
import mongoose from "mongoose";
import uploadImages from "../services/uploads.service.js";
import Pot from "../models/pot.model.js";


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


// plant controller
const addPlant = asyncHandler( async(req, res) =>{
    const {name, category, price, description, stock, size} = req.body;

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
        images,
        size
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

const getAllPlants = asyncHandler( async(req,res) =>{

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    let query = {};

    const {search, category, featured, available} = req.query;

    if (search) {
    query.$or = [
        { name: { $regex: search, $options: "i" } },
        { category: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } }
    ];
}

    if(category){
        query.category = category;
    }

    if(featured){
        query.isFeatured = featured === "true" ;
    }

    if(available){
        query.available = available === "true" ;
    }

    const pipeline = [
        {$match: query},
        { $sort: {createdAt: -1}}
    ]

    const options = {
        page,
        limit
    }

    const result = await Plant.aggregatePaginate(pipeline, options);

    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            "All plants fetched successfully",
            true,
            result
        )
    )
});

const featuredPlants = asyncHandler( async(req,res) =>{

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const pipeline = [
        { $match: {isFeatured: true}},
        { $sort: {createdAt: -1}}
    ]

    const options = {
        page,
        limit
    }

    const result = await Plant.aggregatePaginate(pipeline, options);

    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            "All featured plants fetched successfully",
            true,
            result
        )
    )
});

const availablePlants = asyncHandler( async(req,res) =>{

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const pipeline = [
        { $match: {available: false}},
        { $sort: {createdAt: -1}}
    ]

    const options = {
        page,
        limit
    }

    const result = await Plant.aggregatePaginate(pipeline, options);

    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            "All Available plants fetched successfully",
            true,
            result
        )
    )
});


// pot controller
const addPot = asyncHandler( async(req, res) =>{
    const {name, price, description, stock, shape, size, category} = req.body;

    if(!name || !shape || !price || !description || !stock ){
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

    const pot = await Pot.create({
        name,
        shape,
        price,
        description,
        stock,
        thumbnail: images[0],
        images,
        size,
        category
    });

    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            "Pot Added successfully",
            true,
            pot
        )
    );

});

const getAllPots = asyncHandler( async(req,res) =>{

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    let query = {};

    const {search, category, featured, available, shape} = req.query;

    if (search) {
    query.$or = [
        { name: { $regex: search, $options: "i" } },
        { category: { $regex: search, $options: "i" } },
        { shape: { $regex: search, $options: "i" } }
    ];
}

    if(shape){
        query.shape = shape;
    }

    if(category){
        query.category = category;
    }

    if(featured){
        query.isFeatured = featured === "true" ;
    }

    if(available){
        query.available = available === "true" ;
    }

    const pipeline = [
        {$match: query},
        { $sort: {createdAt: -1}}
    ]

    const options = {
        page,
        limit
    }

    const result = await Pot.aggregatePaginate(pipeline, options);

    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            "All pots fetched successfully",
            true,
            result
        )
    )
});

const getSinglePot = asyncHandler( async (req,res) =>{

    const {id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
        throw new ApiError(400, "Invalid pot id");
    }

    const pot = await Pot.findById(id);
    if(!pot){
        throw new ApiError(404,"No pot found")
    }

    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            "Pot fetched Successfully",
            true,
            pot
        )
    );

    
});

const toggleAvailablePot = asyncHandler( async(req,res) =>{

    const { id } = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
        throw new ApiError(400, "Invalid Id");
    }

    const pot = await Pot.findByIdAndUpdate(
        id,
        [{ $set: { available: { $not: "$available" }}}],
        { new: true}
    );

    if(!pot){
        throw new ApiError(404, "No Pot Found");
    }

    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            "Pot availability changed",
            true,
            pot
        )
    );

});

const toggleFeaturedPot = asyncHandler( async(req,res) =>{

    const { id } = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
        throw new ApiError(400, "Invalid Id");
    }

    const pot = await Pot.findByIdAndUpdate(
        id,
        [{ $set: { isFeatured: { $not: "$isFeatured" }}}],
        { new: true}
    );

    if(!pot){
        throw new ApiError(404, "No Pot Found");
    }

    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            "Pot availability changed",
            true,
            pot
        )
    );

});

const updatePotDetail = asyncHandler( async( req,res) =>{
    
    const {id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
        throw new ApiError(404, "Invalid Id");
    }

    const {name, category, price, description, stock,shape} = req.body;
    if(!name  || !price || !description || !stock ){
        throw new ApiError(400, "All fields are required")
    }

    const existedPot = await Pot.findByIdAndUpdate(
        id,
        {
            name,
            category,
            price,
            description,
            stock,
            shape
        },
        {new: true, runValidators: true}
    );

    if(!existedPot){
        throw new ApiError(404, "No Pot Found")
    }

    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            "Pot Updated Successfully",
            true,
            existedPot
        )
    );

});

const deletePot = asyncHandler( async(req,res) =>{

    const { id } = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
        throw new ApiError(400, "Invalid pot id");
    }
    
    const pot = await Pot.findById(id);
    if(!pot){
        throw new ApiError(404, "No pot Found");
    }
    

    const deleteOperation = pot.images.map((img) =>
       imagekit.deleteFile(img.imageId)
    );
    

    await Promise.all(deleteOperation);

    await Pot.findByIdAndDelete(id);

    return res.status(200).json(
    new ApiResponse(
      200,
      "Pot  deleted successfully",
      true,
      {}
    )
  );


});

const featuredPots = asyncHandler( async(req,res) =>{

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const pipeline = [
        { $match: {isFeatured: true}},
        { $sort: {createdAt: -1}}
    ]

    const options = {
        page,
        limit
    }

    const result = await Pot.aggregatePaginate(pipeline, options);

    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            "All featured pots fetched successfully",
            true,
            result
        )
    )
});

const availablePots = asyncHandler( async(req,res) =>{

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const pipeline = [
        { $match: {available: true}},
        { $sort: {createdAt: -1}}
    ]

    const options = {
        page,
        limit
    }

    const result = await Pot.aggregatePaginate(pipeline, options);

    return res
    .status(200)
    .json(
        new ApiResponse(
            200,
            "All pots fetched successfully",
            true,
            result
        )
    )
});

export {
    changePassword,
    addPhoto,
    addPlant,
    toggleAvailable,
    toggleFeatured,
    updatePlantDetail,
    getSinglePlant,
    deletePlant,
    getAllPlants,
    featuredPlants,
    availablePlants,
    addPot,
    getAllPots,
    getSinglePot,
    toggleAvailablePot,
    toggleFeaturedPot,
    updatePotDetail,
    deletePot,
    availablePots,
    featuredPots

}