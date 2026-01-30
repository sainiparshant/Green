import { ApiResponse } from "../utils/ApiResponse.js";
import { imagekit } from "../config.js/imageKit.js";
import bcrypt from 'bcrypt'
import User from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import uploadImages from "../services/uploads.service.js";
import Pot from "../models/potDetail.model.js";
import Product from "../models/product.model.js";
import Plant from "../models/plantDetail.model.js";
import Order from "../models/order.model.js";


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

const getProducts = asyncHandler( async(req,res) =>{

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 15;

    const {search, available, isFeatured, productType, size} = req.query;

    let query = {};
    if(search){
        query.$or = [
            { name: { $regex: search, $options: "i" } },
            { title: { $regex: search, $options: "i" }},
            { description: { $regex: search, $options: "i"}},
            {size: { $regex: search, $options: "i"}}
       ]
    }
    if(available) query.available = available === "true";
    if(isFeatured) query.isFeatured  = isFeatured === "true";
    if(productType) query.productType = productType;
    if(size) query.size = size;

    const pipeline = [
        {$match: query},
        {$sort: {createdAt: -1}}
    ]

    const options = {
        page,
        limit
    }

    const result = await Product.aggregatePaginate(pipeline, options);
    
    return res.status(200)
    .json(
        new ApiResponse(
            200,
            "All products fetched",
            true,
            result
        )
    );
    


});

const getOrders = asyncHandler( async( req,res) =>{

    const page = req.query.page || 1;
    const limit = req.query.limit || 15;

    const { orderStatus, paymentMethod, paymentStatus, search } = req.query;
    let query = {};

    if(search){
        query.$or = [
           { orderNumber: { $regex: search, $options: "i" } },
           { orderNumber: {$regex : search, $options: "i"}}
        ]
    }

    if(orderStatus) query.orderStatus = orderStatus;
    if(paymentMethod) query.paymentMethod = paymentMethod;
    if(paymentStatus) query.paymentStatus = paymentStatus;

    const pipeline = [
        {
            $lookup: {
                from:"users",
                localField: "user",
                foreignField: "_id",
                as:"user_detail"
            }
        },
        {$unwind: "$user_detail"},
        {
            $project:{
                _id:1,
                orderNumber:1,
                totalAmount:1,
                orderStatus:1,
                paymentMethod:1,
                paymentStatus:1,
                createdAt: 1,
                user_detail:{
                    name:1
                }
            }
        },
        { $match: query },
        { $sort: { createdAt: -1}}
    ]

    const options = {
        page,
        limit
    }

    const result = await Order.aggregatePaginate(pipeline, options);
    return res.status(200)
    .json(
        new ApiResponse(
            200,
            "All orders fetched",
            true,
            result
        )
    )
});

const getMonthlyRevenue = asyncHandler( async( req,res) =>{

    const year = new Date().getFullYear();

    const data = await Order.aggregate([
        {
            $match:{
                orderStatus: "delivered",
                paymentStatus: "paid",
                createdAt:{
                    $gte: new Date(`${year}-01-01`),
                    $lte: new Date(`${year+1}-01-01`)
                }
            }
        },
        {
            $group:{
                _id:{
                    month:{$month: "$createdAt"}
                },
                revenue:{$sum: "$totalAmount"}
            }
        },
        {
            $project:{
                _id:0,
                month: "$_id.month",
                revenue: 1,
            }
        },
        { $sort: {"month": 1}}
    ]);

    return res.status(200)
    .json(
        new ApiResponse(
            200,
            "data fetched",
            true,
            data
        )
    )
});

const dashboardData = asyncHandler( async(req,res) =>{

    const stats = await Order.aggregate([
        {
            $match:{
                paymentStatus:"paid",
                orderStatus: "delivered"
            }
        },
        {
            $group:{
                _id:null ,
                total:{ $sum: "$totalAmount"},
                count: {$sum: 1}
        }
        }

    ]);

    let stat = stats[0] || { total: 0, count: 0};

    const recentOrders = await Order.find()
    .sort({ createdAt: -1})
    .select("orderNumber createdAt totalAmount orderStatus")
    .limit(10);

    const totalProduct = await Product.countDocuments();
    const totalCustomer = await User.countDocuments();

    return res.status(200)
    .json(
        new ApiResponse(
            200,
            "data fetched",
            true,
            {stat ,recentOrders, totalProduct, totalCustomer}
        )
    )
});






export {
    changePassword,
    addPhoto,
    addProduct,
    getProducts,
    getOrders,
    getMonthlyRevenue,
    dashboardData

}