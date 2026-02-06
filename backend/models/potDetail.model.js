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
    indoorOutdoor:{
        type : String,
        required: true,
        enum:["Indoor", "Outdoor", "Both"]
    }
});


const Pot = mongoose.model("Pot", potSchema);
export default Pot;