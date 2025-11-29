import mongoose from 'mongoose';
import aggregatePaginate from 'mongoose-aggregate-paginate-v2';

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
        index: true
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
        url:{
            type: String,
            required: true
        },
        imageId:{
            type: String,
            required: true
        }
    },
    images:[
    {
        url:{
            type: String,
            required: true
        },
        imageId:{
            type: String,
            required: true
        }
    }
    ],
    stock: {
        type: Number,
        required: true,
        min:0
    },
    available:{
        type:Boolean,
        default: true
    },
    isFeatured: {
        type: Boolean,
        default: true
    },
    rating:{
        type: Number,
        default:0,
        min:0,
        max:5
    },
    ratingCount:{
        type: Number,
        default: 0
    }
}, {timestamps: true});


potSchema.plugin(aggregatePaginate);

const Pot = mongoose.model("Pot", potSchema);
export default Pot;