import mongoose from 'mongoose';
import aggregatePaginate from 'mongoose-aggregate-paginate-v2';

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        index: true
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
        enum: ["confirmed", "pending", "shipped", "delivered", "cancelled"],
        default: "confirmed",
        index: true
    },
    paymentMethod: {
      type: String,
      enum: ["cod", "online"],
      default: "cod"
    },
    shippingAddress: {
      fullName: { type: String },
      phone: { type: String },
      address: { type: String },
      city: { type: String },
      state: { type: String },
      pinCode: { type: String },
      country: { type: String, default: "India" }
    },
    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed", "refunded"],
      default: "pending"
    },
    paymentDetails: {
      razorpayPaymentId: String,
      razorpayOrderId: String
    }
}, {timestamps: true});

orderSchema.plugin(aggregatePaginate);

const Order = mongoose.model("Order", orderSchema);
export default Order;