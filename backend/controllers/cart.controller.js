import mongoose from "mongoose";
import Cart from "../models/cart.model.js";
import Product from "../models/product.model.js";
import { ApiError } from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import Variant from "../models/variant.model.js";



const addToCart = asyncHandler( async (req,res) => {

    const userId = req.user?._id;
    const { quantity , productId, variantId }  = req.body;

    if(!userId){
        throw new ApiError(401, "Unauthorized");
    }

    if(!quantity || !productId || !variantId){
        throw new ApiError(400, "Quantity, ProductId and VariantId are required");
    }

    const qty = parseInt(quantity);
    if(isNaN(qty) || qty <= 0){
        throw new ApiError(400, "Quantity must be a positive number");
    }

    if(!mongoose.isValidObjectId(productId) || !mongoose.isValidObjectId(variantId)){
        throw new ApiError(400, "Invalid ProductId or VariantId");
    }

    const product = await Product.findOne({
        _id: productId,
        available: true
    }).select("_id");
    
    if(!product){
        throw new ApiError(404, "Product not found or unavialable");
    }

    const variant = await Variant.findOne({
        _id: variantId,
        productId
    });

    if (!variant) {
    throw new ApiError(404, "Variant not found for this product");
    }

    if (qty > variant.stock) {
    throw new ApiError(409, "Requested quantity exceeds available stock");
  }

    let cart = await Cart.findOne({ user: userId  });
    if(!cart){
        cart = new Cart({ 
            user:userId, 
            items: []
        });
    }

    const existingItems = cart.items.find((i) =>  i.variantId.toString() === variantId);

    if(existingItems){

        const newQty = existingItems.quantity + qty;
        if(newQty > variant.stock){
            throw new ApiError(409, "quantity exceeds available stock")
        }

        existingItems.quantity = newQty;
    }else{
        cart.items.push({
            productId,
            variantId,
            quantity: qty
        })
    }

    await cart.save();

    return res.status(200).json(
        new ApiResponse(
            200,
            "Item added to cart",
            true,
            cart
        )
    )

});

const quantityUpdate = asyncHandler(async (req, res) => {
  const userId = req.user?._id;
  const { quantity, productId, variantId } = req.body;

  if (!userId) {
    throw new ApiError(401, "Unauthorized Access");
  }

  if (quantity === undefined || !productId || !variantId) {
    throw new ApiError(
      400,
      "Quantity, ProductID and VariantID are required"
    );
  }

  const qty = Number(quantity);
  if (!Number.isInteger(qty) || qty < 1) {
    throw new ApiError(400, "Quantity must be at least 1");
  }

  if ( !mongoose.Types.ObjectId.isValid(productId) || !mongoose.Types.ObjectId.isValid(variantId)) {
    throw new ApiError(400, "Invalid ProductId or VariantId");
  }

  const cart = await Cart.findOne({ user: userId });
  if (!cart) {
    throw new ApiError(404, "Cart not found");
  }

  const item = cart.items.find(
    (i) =>
      i.variantId.toString() === variantId &&
      i.productId.toString() === productId
  );

  if (!item) {
    throw new ApiError(404, "Item not found in cart");
  }

  const product = await Product.findOne({
    _id: productId,
    available: true
  }).select("_id");

  if (!product) {
    throw new ApiError(404, "Product not available");
  }

  const variant = await Variant.findOne({
    _id: variantId,
    productId
  });

  if (!variant) {
    throw new ApiError(404, "Variant not found for this product");
  }

  if (qty > variant.stock) {
    throw new ApiError(409, "Quantity exceeds available stock");
  }

  item.quantity = qty;
  await cart.save();

  return res.status(200).json(
    new ApiResponse(
      200,
      "Cart updated successfully",
      true,
      cart
    )
  );
});


const removeItem = asyncHandler( async(req,res) =>{

    const userId = req.user?._id;
    const {variantId} = req.body;

    if(!userId){
        throw new ApiError(409, "Unauthorized Access");
    }

    if(!variantId){
        throw new ApiError(400, "VariantId also required");
    }

    if(!mongoose.Types.ObjectId.isValid(variantId)){
        throw new ApiError(400,"Invalid VariantId")
    }

    const cart = await Cart.findOne({user: userId});
    if(!cart){
        throw new ApiError(404, "Cart not Found");
    }

    const itemExist = cart.items.some((i) => i.variantId.toString() === variantId);
    if(!itemExist){
        throw new ApiError(404, "Item not found")
    }

    cart.items = cart.items.filter( 
        (item) => item.variantId.toString() !== variantId
    );

    await cart.save();

    return res.status(200).json(
    new ApiResponse(
      200,
      "Item removed from cart",
      true,
      cart
    )
  );

});

const getCart = asyncHandler( async(req,res) =>{

    const userId = req.user?._id;
    if(!userId){
        throw new ApiError(409, "Unauthorised Access");
    }

    const cart = await Cart.findOne({user: userId})
        .populate({
            path:"items.productId",
            select: "name thumbnail title"
        })
        .populate({
            path:"items.variantId",
            select:"price stock available size"
        })
        .lean();

    
    if(!cart){
        throw new ApiError(404, "Cart not Found");
    }
    

    return res.status(200).json(
        new ApiResponse(
            200,
            "Cart fetched successfully",
            true,
            cart
        )
    );
});

const getPriceSummary = asyncHandler( async(req,res) =>{

    const userId = req.user?._id;

    const cart = await Cart.findOne({user: userId})
    .populate("items.variantId")
    .lean();

    if(!cart || cart.items.length === 0){
        throw new ApiError(400, "Cart is empty");
    }

    let subtotal = 0;
    cart.items.forEach((item) => {
        subtotal += item.variantId.price * item.quantity;
    });

    const shipping = 60;
    const tax = 0.18 * subtotal;
    const totalAmount = Math.round((subtotal + tax+ shipping) * 100)/ 100;

    const result = {
        shipping,
        tax,
        subtotal,
        totalAmount
    }

    return res.status(200)
    .json(
        new ApiResponse(
            200,
            "Price summary fetched",
            true,
            result,
        )
    )
});

export {
    addToCart,
    quantityUpdate,
    removeItem,
    getCart,
    getPriceSummary
}