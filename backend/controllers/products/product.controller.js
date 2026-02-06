import asyncHandler from '../../utils/asyncHandler.js'
import {ApiError} from '../../utils/ApiError.js'
import { ApiResponse } from '../../utils/ApiResponse.js';
import mongoose from 'mongoose';
import Product from '../../models/product.model.js';


const globalSearch = asyncHandler(async (req, res) => {
  const { query } = req.query;

  if (!query) {
    throw new ApiError(400, "Search query required");
  }

  const products = await Product.aggregate([
    {
      $match: {
        available: true,
        $or: [
          { name: { $regex: query, $options: "i" } },
          { title: { $regex: query, $options: "i" } },
          { description: { $regex: query, $options: "i" } }
        ]
      }
    },
    {
      $lookup: {
        from: "variants",
        localField: "_id",
        foreignField: "productId",
        as: "variants"
      }
    },
    {
      $addFields: {
        price: { $min: "$variants.price" }
      }
    },
    {
      $project: {
        name: 1,
        title: 1,
        productType: 1,
        thumbnail: 1,
        price: 1
      }
    },
    { $limit: 10 }
  ]);

  return res.status(200).json(
    new ApiResponse(
      200,
      "Products fetched successfully",
      true,
      products
    )
  );
});



const getAllPlants = asyncHandler(async (req, res) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;

  const { search, available, category, size, price } = req.query;

  const productMatch = { productType: "Plant" };

  if (search) {
    productMatch.$or = [
      { name: { $regex: search, $options: "i" } },
      { title: { $regex: search, $options: "i" } },
      { description: { $regex: search, $options: "i" } }
    ];
  }


 const pipeline = [
  { $match: productMatch },

  {
    $lookup: {
      from: "plants",
      let: { productId: "$_id" },
      pipeline: [
        {
          $match: {
            $expr: { $eq: ["$productId", "$$productId"] }
          }
        },
        ...(category
          ? [{ $match: { category: { $regex: category, $options: "i" } } }]
          : [])
      ],
      as: "plantDetails"
    }
  },

  { $unwind: "$plantDetails" },

  {
    $lookup: {
      from: "variants",
      let: { productId: "$_id" },
      pipeline: [
        {
          $match: {
            $expr: { $eq: ["$productId", "$$productId"] }
          }
        },
        ...(size ? [{ $match: { size } }] : []),
        ...(price
          ? [{ $match: { price: { $lte: Number(price) } } }]
          : []),
        ...(available !== undefined
          ? [{ $match: { available: available === "true" } }]
          : [])
      ],
      as: "variants"
    }
  },

  { $match: { variants: { $ne: [] } } },

  {
    $addFields: {
      minPrice: { $min: "$variants.price" }
    }
  },

  {
    $project: {
      name: 1,
      thumbnail: 1,
      createdAt: 1,
      productType: 1,
      category: "$plantDetails.category",
      careLevel: "$plantDetails.carelevel",
      price: "$minPrice"
    }
  },

  { $sort: { createdAt: -1 } }
];


  const result = await Product.aggregatePaginate(pipeline, {
    page,
    limit
  });

  return res.status(200).json(
    new ApiResponse(
      200,
      "All plants fetched successfully",
      true,
      result
    )
  );
});

const getSinglePlant = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ApiError(400, "Invalid plant id");
  }

  const result = await Product.aggregate([
    {
      $match: {
        _id: new mongoose.Types.ObjectId(id),
        productType: "Plant"
      }
    },

   
    {
      $lookup: {
        from: "plants",
        localField: "_id",
        foreignField: "productId",
        as: "plantDetails"
      }
    },
    { $unwind: "$plantDetails" },

    
    {
      $lookup: {
        from: "variants",
        localField: "_id",
        foreignField: "productId",
        as: "variants"
      }
    },

    
    {
      $addFields: {
        variants: {
          $sortArray: {
            input: "$variants",
            sortBy: { price: 1 }
          }
        }
      }
    },

    
    {
      $project: {
        name: 1,
        title: 1,
        description: 1,
        images: 1,
        thumbnail: 1,
        plantDetails: 1,
        variants: 1,
        createdAt: 1,
        avgRating:1,
        totalReview:1
      }
    }
  ]);

  if (!result.length) {
    throw new ApiError(404, "No Plant found");
  }

  return res.status(200).json(
    new ApiResponse(
      200,
      "Plant fetched successfully",
      true,
      result[0] 
    )
  );
});


const getAllPots = asyncHandler(async (req, res) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;

  const { search, available, shape, material, price, size } = req.query;

  const productMatch = { productType: "Pot" };

  if (search) {
    productMatch.$or = [
      { name: { $regex: search, $options: "i" } },
      { title: { $regex: search, $options: "i" } },
      { description: { $regex: search, $options: "i" } }
    ];
  }


 const pipeline = [
  { $match: productMatch },

  {
    $lookup: {
      from: "pots",
      let: { productId: "$_id" },
      pipeline: [
        {
          $match: {
            $expr: { $eq: ["$productId", "$$productId"] }
          }
        },
        ...(shape
          ? [{ $match: { shape: { $regex: shape, $options: "i" } } }]
          : []),
        ...(material
          ? [{ $match: { material: { $regex: material, $options: "i" } } }]
          : [])
      ],
      as: "potDetails"
    }
  },

  { $unwind: "$potDetails" },

  {
    $lookup: {
      from: "variants",
      let: { productId: "$_id" },
      pipeline: [
        {
          $match: {
            $expr: { $eq: ["$productId", "$$productId"] }
          }
        },
        ...(size ? [{ $match: { size } }] : []),
        ...(price
          ? [{ $match: { price: { $lte: Number(price) } } }]
          : []),
        ...(available !== undefined
          ? [{ $match: { available: available === "true" } }]
          : [])
      ],
      as: "variants"
    }
  },

  { $match: { variants: { $ne: [] } } },

  {
    $addFields: {
      minPrice: { $min: "$variants.price" }
    }
  },

  {
    $project: {
      name: 1,
      thumbnail: 1,
      createdAt: 1,
      productType: 1,
      shape: "$potDetails.shape",
      material: "$potDetails.material",
      price: "$minPrice"
    }
  },

  { $sort: { createdAt: -1 } }
];


  const result = await Product.aggregatePaginate(pipeline, {
    page,
    limit
  });

  return res.status(200).json(
    new ApiResponse(
      200,
      "All pots fetched successfully",
      true,
      result
    )
  );
});

const getSinglePot = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new ApiError(400, "Invalid pot id");
  }

  const result = await Product.aggregate([
    {
      $match: {
        _id: new mongoose.Types.ObjectId(id),
        productType: "Pot"
      }
    },

   
    {
      $lookup: {
        from: "pots",
        localField: "_id",
        foreignField: "productId",
        as: "potDetails"
      }
    },
    { $unwind: "$potDetails" },

    
    {
      $lookup: {
        from: "variants",
        localField: "_id",
        foreignField: "productId",
        as: "variants"
      }
    },

    
    {
      $addFields: {
        variants: {
          $sortArray: {
            input: "$variants",
            sortBy: { price: 1 }
          }
        }
      }
    },

    
    {
      $project: {
        name: 1,
        title: 1,
        description: 1,
        images: 1,
        thumbnail: 1,
        potDetails: 1,
        variants: 1,
        createdAt: 1,
        avgRating:1,
        totalReview:1
      }
    }
  ]);

  if (!result.length) {
    throw new ApiError(404, "No Pot found");
  }

  return res.status(200).json(
    new ApiResponse(
      200,
      "Pot fetched successfully",
      true,
      result[0] 
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