import mongoose from "mongoose";
import {config} from "./env";

export async function connectDb(){
  return mongoose.connect(config.mongoURI).then(() => {
    if(!config.isProduction)
      console.log("mongodb is connected");
  }).catch((error)=>{
    console.error("Error connecting to MongoDB:", error.message);
  })
}