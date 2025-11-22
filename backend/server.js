import "dotenv/config"
import express from 'express'
import connectDb from "./db/connectDb.js";
import userRoutes from './routes/user.routes.js'

const app = express();

const port = process.env.PORT || 5000;
connectDb();

app.use(express.json());
app.use(express.urlencoded({extendend: true}));


// routes
app.use('/api/v1/auth' , userRoutes);

app.listen(port, () =>{
    console.log(`server is listening on port: ${port}`);
});