import express from "express";
import { signupController ,  signinController } from "./auth.controller";
import {  signUpSchema , signInSchema } from "./auth.schema";
import { validate } from "../../middlewares/validate";

const router  = express.Router();

router.post('/signup'  , validate(signUpSchema) ,  signupController);

router.post('/signin' , validate(signInSchema) , signinController);

export default router;