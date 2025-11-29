import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';


const userSchema = new mongoose.Schema({
    name:{
        type:String,
        trim:true,
        index: true,
    },
    email:{
        type: String,
        unique:true,
        lowercase:true,
        trim:true,
        sparse: true,
    },
    phone:{
        type: String,
        minlength:10,
        maxlength:10,
        index: true,
        sparse: true,
        unique:true,
    },
    password:{
        type: String,
        select: false,
    },
    image:{
        url:{
            type: String,
        },
        imageId:{
            type: String,
        }
    },
    role:{
        type: String,
        enum:['user', 'admin'],
        default:'user',
    },
    refreshToken:{
        type: String,
        select: false,
    }
}, {timestamps: true});


userSchema.methods.generateAccessToken = function(){
    return jwt.sign(
        {
        _id: this._id,
        role: this.role
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRES
        }
)};

userSchema.methods.generateRefreshToken = function(){
    return jwt.sign(
        {
        _id: this._id,
        role: this.role
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRES
        }
)};




const User = mongoose.model("User", userSchema);
export default User;