import Razorpay from "razorpay";
import asyncHandler from "../utils/asyncHandler";
import  razorpayInstance  from "../config.js/razorpay";
import Cart from "../models/cart.model";
import Address from "../models/address.model";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";

const createOrder = asyncHandler( async(req,res) =>{

    const { addressId } = req.body;
    const userId = req.user?._id;

    if(!addressId){
        throw new ApiError(400,"addressId is required" )
    }

    const cart = await Cart.find({user: userId})
    .populate({
        path: "items.productId",
        select: "name price"
    });

    if(!cart || cart.length === 0){
        throw new ApiError(400, "Cart is empty")
    } 

    const address = await Address.findOne({
        _id: addressId,
        user: userId
    });

    if(!address){
        throw new ApiError(404, "Address not found")
    }

    let total = 0;

    cart.items.forEach( item =>{
        total += item.productId.price * item.quantity
    });

    const options = {
        amount: total * 100,
        currency: "INR",
        receipt: `rcpt_${Date.now()}`
    }

    const order = await razorpayInstance.orders.create(options);

    return res.status(200).json(
    new ApiResponse(
      200,
      "Razorpay order created",
      true,
      order
     )
    );

});

export {
    createOrder
}