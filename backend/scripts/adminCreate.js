import bcrypt from 'bcrypt';
import User from '../models/user.model.js';

const adminCreate = async() =>{
    try {

        const password = "Sainiparshant@123";
        const hashedPassword = await bcrypt.hash(password, 10);
        
        await User.create({
            name:"Parshant saini",
            email:"sainiparshant1901@gmail.com",
            password: hashedPassword,
            role:"admin"
        });

        console.log("User created");
        
        
    } catch (error) {
        console.error(error);
    }
}

export default adminCreate;