import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    items:[
        {
            productId:{
            type: mongoose.Schema.Types.ObjectId,
            required: true
            },
            productType:{
                type:String,
                enum:["Plant", "Pot"],
                required: true
            },
            quantity:{
                type: Number,
                required: true
            },
            price:{
                type: Number,
                required: true
            }
        }
    ],
    totalAmount:{
        type: Number,
        required: true
    },
    orderStatus:{
        type: String,
        enum: ["confirmed", "packed", "shipped", "delivered", "cancelled"],
        default: "confirmed"
    }
}, {timestamps: true});

const Order = mongoose.model("Order", orderSchema);
export default Order;