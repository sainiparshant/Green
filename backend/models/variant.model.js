import mongoose from 'mongoose';

const variantSchema =  new mongoose.Schema({
    productId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
        index: true
    },
    color:{
        type: String,
        index: true
    },
    price:{
        type: Number,
        required: true
    },
    stock:{
        type: Number,
        required: true
    },
    size:{
        type: String,
        enum:["Small", "Medium", "Large", "Extra_Large"],
        default:"Small",
    },
    height:{
        type: Number,
    },
    width:{
        type: Number,
    },
    diameter:{
        type: Number,
    },
    available:{
        type: Boolean,
        default: true
    }
});


const Variant = mongoose.model("Variant", variantSchema);
export default Variant;