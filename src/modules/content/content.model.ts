import mongoose, {Schema, model } from "mongoose"

export interface IContent {
        title : string;
        link : string;
        userId : string;
        tags? : string[] | undefined;
        type? : string | undefined;
        thumbnail? : string | undefined;
        description? : string | undefined;
} 

const ContentSchema = new Schema({
    title : {
        type : String,
        required : true
    },
    link : {
        type : String,
        required : true
    },
    thumbnail : {
        type : String,
        required : false
    },
    description : {
        type : String,
        required : false  
    },
    tags : [String],
    type : {
        type : String
    },
    userId : {
        type : mongoose.Types.ObjectId,
        ref : 'User',
        required : true
    }
})

const ContentModel = model('Content' , ContentSchema);

async function addContent(data:IContent){
    try{
        return await ContentModel.create(data);
    }catch(err){
        console.error("Error adding content:", err);
        throw err;
    }
}

async function getContentByUserId(userId:string){
    try{
        return await ContentModel.find({userId : userId}).populate("userId", "userName");
    }catch(err){
        console.error("Error fetching content by userId:", err);
        throw err;
    }
}

async function getContentByTypeAndUserId(type:string, userId:string){
    try{
        return await ContentModel.find({
            userId: userId,
        type : type
      }).populate("userId", "userName");
    }catch(err){
        console.error("Error fetching content by type and userId:", err);
        throw err;
    }
}

async function deleteContentById(contentId:string){
    try{
        return await ContentModel.findByIdAndDelete(contentId);
    }catch(err){
        console.error("Error deleting content by id:", err);
        throw err;
    }
}

async function deleteContentByIdAndUserId(contentId:string, userId:string){
    try{
        return await ContentModel.findOneAndDelete({_id:contentId, userId:userId});
    }catch(err){
        console.error("Error deleting content by id and userId:", err);
        throw err;
    }
}

export const contentModel = {
    addContent,
    getContentByUserId,
    getContentByTypeAndUserId, 
    deleteContentById,
    deleteContentByIdAndUserId
}   