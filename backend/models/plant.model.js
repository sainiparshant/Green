import mongoose from 'mongoose';

const plantSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim: true,
        index: true
    },
    category:{
        type: String,
        required: true,
    },
    price:{
        type:Number,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    thumbnail:{
        type:String,
        required: true,
    },
    images:{
        type: [String],
        required: true,
        validate:{
            validator: arr => arr.length > 0,
            message: "At least 1 image is required"
        }
    },
    stock:{
        type: Number,
        required: true,
        min: 0
    },
    height:{
        type: Number,
        required: true
    },
    available:{
        type: Boolean,
        default: true
    },
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    ratingCount: {
      type: Number,
      default: 0,
    },
    isFeatured:{
        type: String,
        default: true
    }
},{timestamps: true});


const Plant = mongoose.model("Plant", plantSchema);
export default Plant;