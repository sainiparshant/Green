import Razorpay from "razorpay";
import asyncHandler from "../utils/asyncHandler.js";
import  razorpayInstance  from "../config.js/razorpay.js";
import Cart from "../models/cart.model.js";
import Address from "../models/address.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import mongoose from "mongoose";
import crypto from 'crypto';
import Order from "../models/order.model.js";
import Product from "../models/product.model.js";

const createOrder = asyncHandler( async(req,res) =>{

    const userId = req.user?._id;

    const cart = await Cart.findOne({user: userId})
    .populate({
        path: "items.productId",
        select: "name price"
    });

    if(!cart || cart.items.length === 0){
        throw new ApiError(400, "Cart is empty")
    } 


    let subTotal = 0;

    cart.items.forEach( item =>{
        subTotal += item.productId.price * item.quantity
    });

    const shipping = 60;
    const tax = 0.18 * subTotal;
    const total = Math.round((subTotal + tax + shipping) * 100) / 100;

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

const verifyPayment = asyncHandler( async(req,res) =>{

    const { razorpayPaymentId, razorpayOrderId, razorpaySignature, addressId } = req.body;

    const userId = req.user._id;

    if(!razorpayPaymentId || !razorpayOrderId || !razorpaySignature){
        throw new ApiError(400, "Payment Detail missing")
    }

    if(!mongoose.Types.ObjectId.isValid(addressId)){
        throw new ApiError(401, "Invalid addressId")
    }

    const body = razorpayOrderId + "|" + razorpayPaymentId;

    const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_SECRET_KEY)
    .update(body.toString())
    .digest("hex");

    if(expectedSignature !== razorpaySignature){
        throw new ApiError(400, "Invalid payment signature");
    }

    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const cart = await Cart.findOne({user: userId})
        .populate("items.productId")
        .session(session);

        if(!cart || cart.items.length === 0){
            throw new ApiError(400, "cart is empty")
        }

        const address = await Address.findOne({
            _id: addressId,
            user: userId
        })
        .session(session);

        if(!address){
            throw new ApiError(404, "Address not found")
        }

        let subTotal = 0;

        for(const item of cart.items){
            const product  = item.productId;

            if(!product.available){
                throw new ApiError(400, `${product.name} is unavailable`);
            }

            if(product.stock < item.quantity){
                throw new ApiError(400, "insufficient stock for product")
            }

            subTotal += product.price * item.quantity;
        }

        const shipping = 60;
        const tax = 0.18 * subTotal;
        const total = Math.round((subTotal + tax + shipping) * 100) / 100;

        const order = await Order.create([
            {
                user: userId,
                orderNumber: `order_no_${Date.now()}`,
                items: cart.items.map((item) =>({
                    productId: item.productId._id,
                    name: item.productId.name,
                    price: item.productId.price,
                    quantity: item.quantity
                })),
                totalAmount: total,
                paymentMethod: "online",
                orderStatus: "confirmed",
                paymentStatus: "paid",
                shippingAddress: {
                    fullName: address.fullName,
                    phone: address.phone,
                    address: address.address,
                    city: address.city,
                    state: address.state,
                    pinCode: address.pinCode,
                    country: address.country
                },
                paymentDetails:{
                    razorpayPaymentId,
                    razorpayOrderId,
                },
            }
        ], {session});

        for(const item of cart.items){
            await Product.findByIdAndUpdate(
                item.productId._id,
                {$inc: { stock: -item.quantity}},
                { session }
            );
        }

        cart.items = [];
        await cart.save({session});

        await session.commitTransaction();
        session.endSession();

        return res.status(200).json(
        new ApiResponse(
            200,
            "Payment verified & order placed successfully",
            true,
            order[0]
        )
        );


    } catch (error) {
        await session.abortTransaction();
        session.endSession();

        throw error;
    }

});

export {
    createOrder,
    verifyPayment

}