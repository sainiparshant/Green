import mongoose from "mongoose";

const connectDb = async() =>{
    try {
        const conn = await mongoose.connect(`${process.env.MONGO_URI}/greenland`);
        console.log("MongoDb is connected Successfully");
    } catch (error) {
        console.error(`MongoDb connection Error: ${error.message}`);
        process.exit(1);
    }
}

export default connectDb;