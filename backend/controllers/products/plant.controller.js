import asyncHandler from '../../utils/asyncHandler.js'
import {ApiError} from '../../utils/ApiError.js'
import Plant from '../../models/plant.model.js';
import { ApiResponse } from '../../utils/ApiResponse.js';
import mongoose from 'mongoose';




const getAllPlants = asyncHandler( async(req,res) =>{

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    let query= {};

    const { search, available, featured, category ,size, price} = req.query;

    if(search){
       query.$or = [
            { name: { $regex: search, $options: "i" } },
            { category: { $regex: search, $options: "i" }},
            { description: { $regex: search, $options: "i"}}
       ]
    }

    if(available){
        query.available = available === "true";
    }

    if(category){
        query.category = category;
    }

    if(size){
        query.size = size;
    }

    if(price){
        query.price = { $lte: Number(price) }
    }

    if(featured){
        query.isFeatured = featured === "true";
    }

    const pipeline = [
        { $match: query},
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




export {
    getAllPlants,
    getSinglePlant
}