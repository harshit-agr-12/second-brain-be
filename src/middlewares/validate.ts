import { ZodSchema } from "zod";

export function validate(schema : ZodSchema){
    return (req : any , res : any , next : any) => {
        if(!req.body){
            return res.status(400).json({
                message : "Request body is missing"
            })
        }
        if(req.userId){
            console.log("User ID found in request:", req.userId);
            req.body.userId = req.userId;
        }
        const result = schema.safeParse(req.body);
        if(!result.success){
            return res.status(400).json({
                message : "Validation error",

                //@ts-ignore
                errors : result.error.errors
            })
        }
        next();
    }
}