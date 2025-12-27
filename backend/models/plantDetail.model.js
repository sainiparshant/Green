import mongoose from "mongoose";

const plantSchema = new mongoose.Schema({
    productId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        index: true
    },
    category:{
        type: String,
        required: true,
        index: true
    },
    water:{
        type: String,
        required: true,
        enum:["Light", "Medium", "Heavy"]
    },
    light:{
        type: String,
        required: true,
        enum: ["Low Light", "Bright Sun", "Full Sun"]
    },
    carelevel:{
        type:String,
        required: true,
        enum:["Easy", "Medium", "Difficult"]
    },
    height:{
        type: Number,
        required: true
    },
    potIncluded:{
        type: Boolean,
        default: false
    }
});

const Plant = mongoose.model("Plant", plantSchema);
export default Plant;