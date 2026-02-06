import mongoose from 'mongoose';
import aggregatePaginate from 'mongoose-aggregate-paginate-v2';

const productSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim: true,
        index: true
    },
    title:{
        type:String,
        required: true,
    },
    productType:{
        type: String,
        required: true,
        index: true
    },
    description:{
        type: String,
        required: true
    },
    thumbnail:{
        url:{
            type: String,
            required: true,
        },
        imageId:{
            type: String,
            required: true,
        }
    },
     images: [
    {
      url: {
        type: String,
        required: true
      },
      imageId: {
        type: String,
        required: true
      }
    }
  ],
    avgRating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    totalReview: {
      type: Number,
      default: 0,
    },
    isFeatured:{
        type: Boolean,
        default: true
    }
},{timestamps: true});

productSchema.index({ name: "text" }); 
productSchema.plugin(aggregatePaginate);


const Product = mongoose.model("Product", productSchema);
export default Product;