import "dotenv/config"
import express from 'express'
import cors from "cors";
import connectDb from "./db/connectDb.js";
import authRoutes from './routes/auth.routes.js'
import cookieParser from "cookie-parser";
import adminRoutes from "./routes/admin.routes.js"
import adminCreate from "./scripts/adminCreate.js";
import productRoutes from "./routes/product.routes.js"
import cartRoutes from "./routes/cart.routes.js"
import addressRoutes from "./routes/address.routes.js"
import orderRoutes from "./routes/order.routes.js"
import userRoutes from "./routes/user.routes.js"
import contactRoutes from "./routes/contact.routes.js"



const app = express();

const port = process.env.PORT || 5000;
connectDb();

app.use(express.json());
app.use(express.urlencoded({extendend: true}));
app.use(cookieParser());
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
}));



// routes
app.use('/api/v1/auth' , authRoutes);
app.use('/api/v1/products', productRoutes);
app.use('/api/v1/admin', adminRoutes);
app.use('/api/v1/cart', cartRoutes);
app.use('/api/v1/address', addressRoutes);
app.use('/api/v1/order', orderRoutes);
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/contact', contactRoutes);
app.use('/api/v1/payment', paymentRoutes);

app.listen(port, () =>{
    console.log(`server is listening on port: ${port}`);
});