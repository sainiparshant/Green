import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    orderNumber:{
        type: String,
        required: true,
        unique: true
    },
    items:[
        {
            productId:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: true
            },
            quantity:{
                type: Number,
                required: true
            },
            name:{
                type: String,
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
    },
    paymentMethod: {
      type: String,
      enum: ["cod", "online"],
      default: "cod"
    },
    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed", "refunded"],
      default: "pending"
    },
}, {timestamps: true});

const Order = mongoose.model("Order", orderSchema);
export default Order;