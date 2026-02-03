import jwt, { JwtPayload } from "jsonwebtoken"
import { Request, Response , NextFunction } from "express"
import { config } from "../config/env"


export const userMiddleware  = (req : Request,res : Response ,next : NextFunction)=>{
    try{
    const jwtSecret = config.jwtSecret;
    const token = req.headers["authorization"]?.split(" ")[1];
    if(!token){
        res.status(403).json({
            message : "you are not login"
        })
        return;
    }   
    const decoded = jwt.verify(token as string,jwtSecret as string);
    if(decoded){
        req.userId = (decoded as JwtPayload).userId;
        next();
    } else {
        res.status(403).json({
            message : "you are not login"
        })
        return;
    }
    } catch(err){
        res.status(403).json({
            message : "you are not login"
        })
        return;
    }
}