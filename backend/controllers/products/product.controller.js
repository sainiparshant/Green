import asyncHandler from '../../utils/asyncHandler.js'
import {ApiError} from '../../utils/ApiError.js'
import { ApiResponse } from '../../utils/ApiResponse.js';
import mongoose from 'mongoose';
import Product from '../../models/product.model.js';


const globalSearch = asyncHandler( async (req,res) =>{

    const { query } = req.query;
    if(!query){
        throw new ApiError(400, "Search query required")
    }

    const products = await Product.find({
        $or:[
            { name: { $regex: query, $options: "i" } },
            { title: {$regex: query, $options: "i"}},
            { description: { $regex: query, $options: "i"}}
        ]
    })
    .limit(10)
    .select("name title price productType thumbnail");

    return res.status(200)
    .json(
        new ApiResponse(
            200,
            "Products fetched successfully",
            true,
            products
        )
    );

});

//plant controller

const getAllPlants = asyncHandler( async(req,res) =>{

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const { search, available, category ,size, price} = req.query;

    let query= {};
    let productMatch = { productType: "Plant" };

    if(search){
       productMatch.$or = [
            { name: { $regex: search, $options: "i" } },
            { title: { $regex: search, $options: "i" }},
            { description: { $regex: search, $options: "i"}}
       ]
    }

    if(available){
        productMatch.available = available === "true";
    }

    
    if(size){
        productMatch.size = size;
    }

    if(price){
        productMatch.price = { $lte: Number(price) }
    }


    if(category){
        query["plantDetails.category"] = {
            $regex: category,
            $options: "i"
        };
    }

    const pipeline = [

        { $match: productMatch },
        {
            $lookup: {
                from: "plants",
                localField:"_id",
                foreignField:"productId",
                as: "plantDetails"
            }
        },

        { $unwind: "$plantDetails"},

        {$match: query},

        { $sort: {createdAt: -1}}
    ]

    
    const options = {
        page,
        limit
    }

    const result = await Product.aggregatePaginate(pipeline, options); 

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


    const plant = await Product.aggregate([
        { $match: {_id : new mongoose.Types.ObjectId(id)} },
        {
            $lookup: {
                from:"plants",
                localField: "_id",
                foreignField: "productId",
                as:"plantDetails"
            }
        },

        {$unwind : "$plantDetails"}
    ]);


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


// pot controller
const getAllPots = asyncHandler( async(req,res) =>{

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const { search, available, featured, shape,material ,size, price} = req.query;

    let query= {};
    let productMatch = { productType: "Pot" };

    if(search){
       productMatch.$or = [
            { name: { $regex: search, $options: "i" } },
            { title: { $regex: search, $options: "i" }},
            { description: { $regex: search, $options: "i"}}
       ]
    }

    if(available){
        productMatch.available = available === "true";
    }

    
    if(size){
        productMatch.size = size;
    }

    if(price){
        productMatch.price = { $lte: Number(price) }
    }

    if(featured){
        productMatch.isFeatured = featured === "true";
    }

    if(shape){
        query["potDetails.shape"] = {
            $regex: shape,
            $options: "i"
        };
    }

     if(material){
        query["potDetails.material"] = {
            $regex: material,
            $options: "i"
        };
    }

    const pipeline = [

        { $match: productMatch },
        {
            $lookup: {
                from: "pots",
                localField:"_id",
                foreignField:"productId",
                as: "potDetails"
            }
        },

        { $unwind: "$potDetails"},

        {$match: query},

        { $sort: {createdAt: -1}}
    ]

    
    const options = {
        page,
        limit
    }

    const result = await Product.aggregatePaginate(pipeline, options); 

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


    const pot = await Product.aggregate([
        { $match: {_id : new mongoose.Types.ObjectId(id)} },
        {
            $lookup: {
                from:"pots",
                localField: "_id",
                foreignField: "productId",
                as:"potDetails"
            }
        },

        {$unwind : "$potDetails"}
    ]);


    if(!pot){
        throw new ApiError(404,"No Pot found")
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

export {
    getAllPlants,
    getSinglePlant,
    getAllPots,
    getSinglePot,
    globalSearch
}