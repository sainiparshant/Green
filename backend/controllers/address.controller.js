import { ApiError } from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import Address from "../models/address.model.js";
import mongoose from "mongoose";

const addAddress = asyncHandler(async (req, res) => {
  const userId = req.user?._id;
  const {
    fullName,
    phone,
    address,
    city,
    state,
    pinCode,
    country,
    addressType,
    isDefault,
  } = req.body;

  if (!userId) {
    throw new ApiError(401, "unauthorised Access");
  }

  if (
    !fullName ||
    !phone ||
    !address ||
    !city ||
    !state ||
    !country ||
    !pinCode
  ) {
    throw new ApiError(400, "All fields are required");
  }

  if (isDefault) {
    await Address.updateMany(
      { user: userId, isDefault: true },
      { isDefault: false }
    );
  }

  const addr = await Address.create({
    user: userId,
    fullName,
    phone,
    address,
    city,
    state,
    pinCode,
    country,
    addressType,
    isDefault,
  });

  return res
    .status(200)
    .json(new ApiResponse(200, "Address added successfully", true, addr));
});

const getAddress = asyncHandler(async (req, res) => {
  const userId = req.user?._id;
  if (!userId) {
    throw new ApiError(401, "Unauthorized Access");
  }

  const addresses = await Address.find({ user: userId })
    .sort({ isDefault: -1, createdAt: -1 })
    .lean();

  if (!addresses || !addresses.length === 0) {
    throw new ApiError(404, "Address not found");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, "Addresses fetched successfully", true, addresses)
    );
});

const deleteAddress = asyncHandler(async (req, res) => {
  const userId = req.user?._id;
  const { id } = req.params;

  if (!userId) {
    throw new ApiError(401, "unauthorised Access");
  }

  if (!id) {
    throw new ApiError(400, "Address Id is required");
  }

  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ApiError(404, "Invalid addressId");
  }

  const address = await Address.find({
    _id: id,
    user: userId,
  });

  if (!address) {
    throw new ApiError(404, "Address not Found");
  }

  const wasDefault = address.isDefault;

  await Address.deleteOne({ _id: id });

  if (wasDefault) {
    const nextAddress = await Address.findOne({ user: userId }).sort({
      createdAt: -1,
    });
    if (nextAddress) {
      nextAddress.isDefault = true;
      await nextAddress.save();
    }
  }

  return res
    .status(200)
    .json(new ApiResponse(200, "Address deleted successfully", true));
});

const updateAddress = asyncHandler(async (req, res) => {
  const userId = req.user?._id;
  const { id } = req.params;

  if (!userId) {
    throw new ApiError(401, "unauthorised Access");
  }

  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ApiError(409, "Invalid Address Id");
  }

  const {
    fullName,
    phone,
    address,
    city,
    state,
    pinCode,
    country,
    addressType,
    isDefault,
  } = req.body;

  const updateData = {};
  if (fullName) updateData.fullName = fullName;
  if (phone) updateData.phone = phone;
  if (address) updateData.address = address;
  if (city) updateData.city = city;
  if (state) updateData.state = state;
  if (pinCode) updateData.pinCode = pinCode;
  if (country) updateData.country = country;
  if (addressType) updateData.addressType = addressType;
  if (typeof isDefault === "boolean") updateData.isDefault = isDefault;

  if (isDefault) {
    await Address.updateMany(
      { user: userId, isDefault: true },
      { isDefault: false }
    );
  }

  const updatedAddress = await Address.findOneAndUpdate(
    { _id: id, user: userId },
    updateData,
    { new: true }
  );

  return res
    .status(200)
    .json(
      new ApiResponse(200, "Address Updated Successfully", true, updatedAddress)
    );
});

const setDefaultAddress = asyncHandler(async (req, res) => {
  const userId = req.user?._id;
  const { id } = req.params;

  if (!userId) {
    throw new ApiError(401, "Unauthorized Access");
  }

  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ApiError(400, "Invalid Address Id");
  }

  const { isDefault } = req.body;

  if (typeof isDefault !== "boolean") {
    throw new ApiError(400, "Invlaid value or missing");
  }

  if (isDefault === true) {
    await Address.updateMany(
      { user: userId, isDefault: true },
      { isDefault: false }
    );
  }

  const updatedAddr = await Address.findOneAndUpdate(
    { _id: id, user: userId },
    { isDefault },
    { new: true }
  );

  return res
    .status(200)
    .json(new ApiResponse(200, "Default Address changed", true, updatedAddr));
});

export {
  addAddress,
  getAddress,
  deleteAddress,
  updateAddress,
  setDefaultAddress,
};
