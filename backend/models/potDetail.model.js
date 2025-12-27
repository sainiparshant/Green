import mongoose from "mongoose";


const potSchema = new mongoose.Schema({
    productId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        index: true 
    },
    shape:{
        type: String,
        required: true,
        index: true
    },
    material:{
        type: String,
        required: true,
        index: true
    },
    color: {
        type: String,
        required: true,
        index: true
    },
    diameter:{
        type: String,
        required: true
    },
    height:{
        type:String,
        required: true
    },
    indoorOutdoor:{
        type : String,
        required: true,
        enum:["indoor", "outdoor", "both"]
    },
    weight:{
        type: String,
        required: true,
    }
});


const Pot = mongoose.model("Pot", potSchema);
export default Pot;