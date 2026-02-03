import { generate } from "../../utils/generateToken.js";
import {authModel} from "./auth.model.js";

async function signup(email : string , password : string , fullName : string)  {
    const existingUser = await authModel.existingUser(email);
    if(existingUser){
        return null;
    }
    return await authModel.createUser(email, password, fullName);
}

async function signin(email : string , password : string) {
    const existingUser =  await authModel.existingUser(email);
    if(!existingUser){
        return null;
    }
    const isPasswordValid = await existingUser.comparePassword(password);
    if(!isPasswordValid){
        return null;
    }
    const token = generate({ userId: existingUser._id});
    return { existingUser, token } ;  
}

const authService ={
    signup,
    signin
}

export default authService;