import { ApiResponse } from "../utils/ApiResponse.js";
import { imagekit } from "../config.js/imageKit.js";
import bcrypt from "bcrypt";
import User from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import uploadImages from "../services/uploads.service.js";
import Pot from "../models/potDetail.model.js";
import Product from "../models/product.model.js";
import Plant from "../models/plantDetail.model.js";
import Order from "../models/order.model.js";
import mongoose from "mongoose";
import Variant from "../models/variant.model.js";
import deleteImages from "../helper/imageDelete.js";

const changePassword = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  if (!oldPassword || !newPassword) {
    throw new ApiError(404, "All fields are required!");
  }

  const user = await User.findById(req.user._id).select("+password");
  if (!user) {
    throw new ApiError(404, "No user found");
  }

  const isMatch = await bcrypt.compare(oldPassword, user.password);
  if (!isMatch) {
    throw new ApiError(401, "Invalid Password");
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);

  user.password = hashedPassword;
  await user.save();

  return res
    .status(200)
    .json(new ApiResponse(200, "Password Changed successfully", true, {}));
});

const addPhoto = asyncHandler(async (req, res) => {
  if (!req.file) {
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
      image: {
        url: imageUrl,
        imageId,
      },
    },
    { new: true },
  );

  return res
    .status(200)
    .json(new ApiResponse(200, "Image uploaded", true, user));
});

const addProduct = asyncHandler(async (req, res) => {
  const { name, description, title, productType } = req.body;
  let { variants, details } = req.body;

  if (typeof details === "string") {
    details = JSON.parse(details);
  }

  if (typeof variants === "string") {
    variants = JSON.parse(variants);
  }

  if (!name || !description || !title || !productType) {
    throw new ApiError(400, "All fields are required");
  }

  if (!Array.isArray(variants) || variants.length === 0) {
    throw new ApiError(400, "At least one variant is required");
  }

  if (!req.files || !req.files.images || req.files.images.length === 0) {
    throw new ApiError(400, "Images are required");
  }

  const uploadResults = await uploadImages(req.files.images);
  const images = uploadResults.map((img) => ({
    url: img.url,
    imageId: img.fileId,
  }));

  const imageIds = images.map((img) => img.imageId);
  const thumbnail = images[0];

  const session = await mongoose.startSession();
  session.startTransaction();

  let product;

  try {
    const newProduct = await Product.create(
      [
        {
          name,
          description,
          thumbnail,
          images,
          title,
          productType,
        },
      ],
      { session },
    );

    product  = newProduct[0];
    const productId = product._id;

    const variantsData = variants.map((v) => ({
      productId,
      size: v.size,
      price: v.price,
      stock: v.stock,
      color: v.color,
      height: v.height,
      width: v.width,
      diameter: v.diameter,
    }));

    await Variant.insertMany(variantsData, { session });

    if (productType === "Plant") {
      await Plant.create(
        [
          {
            productId,
            ...details,
          },
        ],
        { session },
      );
    }

    if (productType === "Pot") {
      await Pot.create(
        [
          {
            productId,
            ...details,
          },
        ],
        { session },
      );
    }

    await session.commitTransaction();
    session.endSession();
  } catch (error) {
    await session.abortTransaction();
    session.endSession();

    await deleteImages(imageIds);
    throw error;
  }

  return res
    .status(200)
    .json(new ApiResponse(200, "Product Added successfully", true, product));
});

const getProducts = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 15;

  const { search, available, isFeatured, productType, size } = req.query;

  let query = {};
  if (search) {
    query.$or = [
      { name: { $regex: search, $options: "i" } },
      { title: { $regex: search, $options: "i" } },
      { description: { $regex: search, $options: "i" } },
      { size: { $regex: search, $options: "i" } },
    ];
  }
  if (available) query.available = available === "true";
  if (isFeatured) query.isFeatured = isFeatured === "true";
  if (productType) query.productType = productType;
  if (size) query.size = size;

  const pipeline = [{ $match: query }, { $sort: { createdAt: -1 } }];

  const options = {
    page,
    limit,
  };

  const result = await Product.aggregatePaginate(pipeline, options);

  return res
    .status(200)
    .json(new ApiResponse(200, "All products fetched", true, result));
});

const getOrders = asyncHandler(async (req, res) => {
  const page = req.query.page || 1;
  const limit = req.query.limit || 15;

  const { orderStatus, paymentMethod, paymentStatus, search } = req.query;
  let query = {};

  if (search) {
    query.$or = [
      { orderNumber: { $regex: search, $options: "i" } },
      { orderStatus: { $regex: search, $options: "i" } },
    ];
  }

  if (orderStatus) query.orderStatus = orderStatus;
  if (paymentMethod) query.paymentMethod = paymentMethod;
  if (paymentStatus) query.paymentStatus = paymentStatus;

  const pipeline = [
    {
      $lookup: {
        from: "users",
        localField: "user",
        foreignField: "_id",
        as: "user_detail",
      },
    },
    { $unwind: "$user_detail" },
    {
      $project: {
        _id: 1,
        orderNumber: 1,
        totalAmount: 1,
        orderStatus: 1,
        paymentMethod: 1,
        paymentStatus: 1,
        createdAt: 1,
        user_detail: {
          name: 1,
        },
      },
    },
    { $match: query },
    { $sort: { createdAt: -1 } },
  ];

  const options = {
    page,
    limit,
  };

  const result = await Order.aggregatePaginate(pipeline, options);
  return res
    .status(200)
    .json(new ApiResponse(200, "All orders fetched", true, result));
});

const getMonthlyRevenue = asyncHandler(async (req, res) => {
  const year = new Date().getFullYear();

  const data = await Order.aggregate([
    {
      $match: {
        orderStatus: "delivered",
        paymentStatus: "paid",
        createdAt: {
          $gte: new Date(`${year}-01-01`),
          $lte: new Date(`${year + 1}-01-01`),
        },
      },
    },
    {
      $group: {
        _id: {
          month: { $month: "$createdAt" },
        },
        revenue: { $sum: "$totalAmount" },
      },
    },
    {
      $project: {
        _id: 0,
        month: "$_id.month",
        revenue: 1,
      },
    },
    { $sort: { month: 1 } },
  ]);

  return res.status(200).json(new ApiResponse(200, "data fetched", true, data));
});

const dashboardData = asyncHandler(async (req, res) => {
  const stats = await Order.aggregate([
    {
      $match: {
        paymentStatus: "paid",
        orderStatus: "delivered",
      },
    },
    {
      $group: {
        _id: null,
        total: { $sum: "$totalAmount" },
        count: { $sum: 1 },
      },
    },
  ]);

  let stat = stats[0] || { total: 0, count: 0 };

  const recentOrders = await Order.find()
    .sort({ createdAt: -1 })
    .select("orderNumber createdAt totalAmount orderStatus")
    .limit(10);

  const totalProduct = await Product.countDocuments();
  const totalCustomer = await User.countDocuments();

  return res.status(200).json(
    new ApiResponse(200, "data fetched", true, {
      stat,
      recentOrders,
      totalProduct,
      totalCustomer,
    }),
  );
});

const toggleProduct = asyncHandler(async (req, res) => {
  const { productId } = req.params;
  const { field } = req.body;

  const product = await Product.findById(productId);
  if (!product) {
    throw new ApiError(404, "No product found");
  }

  product[field] = !product[field];
  await product.save();

  return res
    .status(200)
    .json(new ApiResponse(200, "Product updated", true, product));
});

const deleteProduct = asyncHandler(async (req, res) => {
  const { productId } = req.params;

  const product = await Product.findByIdAndDelete(productId);

  if (!product) {
    throw new ApiError(404, "Product not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, "Product deleted", true, product));
});

const orderDetail = asyncHandler(async (req, res) => {
  const { orderId } = req.params;

  const order = await Order.aggregate([
    {
      $match: {
        _id: new mongoose.Types.ObjectId(orderId),
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "user",
        foreignField: "_id",
        as: "user_detail",
      },
    },
    { $unwind: "$user_detail" },
    {
      $project: {
        _id: 1,
        orderNumber: 1,
        createdAt: 1,
        paymentStatus: 1,
        paymentMethod: 1,
        orderStatus: 1,
        items: { name: 1, quantity: 1, price: 1 },
        totalAmount: 1,
        user_detail: {
          name: 1,
          email: 1,
          phone: 1,
        },
      },
    },
  ]);

  return res
    .status(200)
    .json(new ApiResponse(200, "Order detail fetched", true, order));
});

const updateOrderStatus = asyncHandler(async (req, res) => {
  const { orderId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(orderId)) {
    throw new ApiError(401, "Invalid orderId");
  }

  const { orderStatus } = req.body;

  const order = await Order.findByIdAndUpdate(
    orderId,
    { orderStatus },
    { new: true },
  ).select("orderStatus orderNumber totalAmount");

  if (!order) {
    throw new ApiError(404, "No order found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, "Order status updated", true, order));
});

const customers = asyncHandler(async (req, res) => {
  const page = req.query.page || 1;
  const limit = req.query.limit || 15;

  const { search } = req.query;
  let query = {
    role: "user",
  };

  if (search) {
    query.$or = [
      { name: { $regex: search, $options: "i" } },
      { email: { $regex: search, $options: "i" } },
    ];
  }

  const pipeline = [
    { $match: query },
    {
      $lookup: {
        from: "orders",
        localField: "_id",
        foreignField: "user",
        as: "orders",
      },
    },
    {
      $project: {
        _id: 1,
        name: 1,
        email: 1,
        phone: 1,
        ordersCount: { $size: "$orders" },
      },
    },
  ];

  const options = {
    page,
    limit,
  };

  const customers = await User.aggregatePaginate(pipeline, options);

  return res
    .status(200)
    .json(new ApiResponse(200, "Customers fetched", true, customers));
});

export {
  changePassword,
  addPhoto,
  addProduct,
  getProducts,
  getOrders,
  getMonthlyRevenue,
  dashboardData,
  toggleProduct,
  deleteProduct,
  orderDetail,
  updateOrderStatus,
  customers,
};
