import { ApiError } from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import Cart from "../models/cart.model.js";
import mongoose from "mongoose";
import Address from "../models/address.model.js";
import Order from "../models/order.model.js";
import Product from "../models/product.model.js";
import Variant from "../models/variant.model.js";

const placeOrder = asyncHandler(async (req, res) => {
  const userId = req.user?._id;

  if (!userId) {
    throw new ApiError(401, "Unauthorized Access");
  }

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const cart = await Cart.findOne({ user: userId })
      .populate("items.productId")
      .populate("items.variantId")
      .session(session);

    if (!cart || cart.items.length === 0) {
      throw new ApiError(404, "Cart is empty");
    }

    const address = await Address.findOne({
      user: userId,
      isDefault: true,
    }).session(session);

    if (!address) {
      throw new ApiError(404, "Default address not found");
    }

    let orderItems = [];
    let subtotal = 0;

    for (const item of cart.items) {
      const product = item.productId;
      const variant = item.variantId;

      if (!product || !product.available) {
        throw new ApiError(404, "Product unavailable");
      }

      if (!variant || variant.stock < item.quantity) {
        throw new ApiError(
          409,
          `Insufficient stock for ${product.name} (${variant.size})`
        );
      }

      orderItems.push({
        productId: product._id,
        variantId: variant._id,
        name: product.name,
        size: variant.size,
        price: variant.price,
        quantity: item.quantity,
      });

      subtotal += variant.price * item.quantity;
    }

    const tax = +(subtotal * 0.18).toFixed(2);
    const shipping = 60;
    const totalAmount = +(subtotal + tax + shipping).toFixed(2);

    const order = await Order.create(
      [
        {
          user: userId,
          orderNumber: `ORD-${Date.now()}`,
          items: orderItems,
          totalAmount,
          shippingAddress: {
            fullName: address.fullName,
            phone: address.phone,
            address: address.address,
            city: address.city,
            state: address.state,
            pinCode: address.pinCode,
            country: address.country,
          },
          paymentMethod: "cod",
          paymentStatus: "pending",
          orderStatus: "confirmed",
        },
      ],
      { session }
    );

    
    for (const item of cart.items) {
      await Variant.findByIdAndUpdate(
        item.variantId._id,
        { $inc: { stock: -item.quantity } },
        { session }
      );
    }

    cart.items = [];
    await cart.save({ session });

    await session.commitTransaction();
    session.endSession();

    return res
      .status(201)
      .json(
        new ApiResponse(201, "Order placed successfully", true, order[0])
      );
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }

});



const getAllOrders = asyncHandler(async (req, res) => {

  const userId = req.user?._id;

  if (!userId) {
    throw new ApiError(401, "Unauthorized Access");
  }

  const orders = await Order.find({ user: userId })
    .select("orderNumber totalAmount orderStatus paymentStatus createdAt")
    .sort({ createdAt: -1 })
    .lean();

  return res
    .status(200)
    .json(new ApiResponse(200,  orders.length ? "Orders fetched successfully" : "No orders found", true, orders));

});

const orderDetails = asyncHandler(async (req, res) => {
  const userId = req.user?._id;
  const { orderId } = req.params;

  if (!userId) {
    throw new ApiError(401, "Unauthorized Access");
  }

  if (!orderId) {
    throw new ApiError(400, "Order Id is required");
  }

  if (!mongoose.Types.ObjectId.isValid(orderId)) {
    throw new ApiError(400, "Invalid order id");
  }

  const order = await Order.findOne({
    user: userId,
    _id: orderId,
  })
    .populate({
      path: "items.productId",
      select: "name title thumbnail",
    })
    .populate({
      path: "items.variantId",
      select: "size",
    })
    .lean();

  if (!order) {
    throw new ApiError(404, "Order not found");
  }

  return res.status(200).json(
    new ApiResponse(
      200,
      "Order details fetched successfully",
      true,
      order
    )
  );
});


export { placeOrder, getAllOrders, orderDetails };