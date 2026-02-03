import { Request , Response } from "express";
import authService from "./auth.service";

export async function signupController(req : Request,res: Response){
    console.log("Signup controller invoked with body:", req.body);
    const { email , password , fullName } = req.body;

    try{
        const user = await authService.signup(email, password , fullName)
        if(user === null){
            res.status(400).json({
                message : "User already exists"
            })
            return;
        }
        res.status(201).json({
            message : "User created successfully",
        })
    }catch(err){
        res.status(500).json({
            message : "Internal server error"
        })
    }
}

export async function signinController(req : Request,res: Response){
    const { email , password } = req.body;

    try{
        const data = await authService.signin(email, password)
        if(data ===   null || data.existingUser === null){
            res.status(400).json({
                message : "Invalid credentials"
            })
            return;
        }
        res.status(200).json({
            message : "Signin successful",
            token : data.token
        })
    }catch(err){
        res.status(500).json({
            message : "Internal server error"
        })
    }
}