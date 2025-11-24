import mongoose from 'mongoose';

const potSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim: true,
        index: true
    },
    price:{
        type: Number,
        required: true,
    },
    category:{
        type: String,
        enum: ["plastic", "cement", "wooden", "metal"],
        default: "plastic",
    },
    size:{
        type: String,
        enum: ["M", "L", "S", "XL"],
        default: "M"
    },
    shape:{
        type: String,
        required: true,
    },
    description:{
        type: String,
        required: true
    },
    thumbnail:{
        type: String,
        required: true
    },
    images:{
        type: [String],
        required: true,
        validate:{
            validator: arr => arr.length > 0,
            message: "At least 1 image is required"
        }
    },
    stock: {
        type: Number,
        required: true,
        min:0
    },
    isFeatured: {
        type: Boolean,
        default: true
    }
}, {timestamps: true});


const Pot = mongoose.model("Pot", potSchema);
export default Pot;