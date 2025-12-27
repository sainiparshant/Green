import "dotenv/config"
import express from 'express'
import cors from "cors";
import connectDb from "./db/connectDb.js";
import authRoutes from './routes/auth.routes.js'
import cookieParser from "cookie-parser";
import adminRoutes from "./routes/admin.routes.js"
import adminCreate from "./scripts/adminCreate.js";
import productRoutes from "./routes/product.routes.js"



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

app.listen(port, () =>{
    console.log(`server is listening on port: ${port}`);
});