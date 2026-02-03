import { contentModel, IContent } from "./content.model";


export async function createContent(data : IContent){
    return await contentModel.addContent(data);
}

export async function fetchContentByUserId(userId : string){
    return await contentModel.getContentByUserId(userId);
}

async function fetchContentByTypeAndUserId(type:string, userId:string){
    return await contentModel.getContentByTypeAndUserId(type, userId);
}

async function deleteContentById(contentId:string){
    return await contentModel.deleteContentById(contentId);
}

async function deleteContentByIdAndUserId(contentId:string, userId:string){
    return await contentModel.deleteContentByIdAndUserId(contentId, userId);
}

export const contentService = {
    createContent,
    fetchContentByUserId,
    fetchContentByTypeAndUserId,
    deleteContentById,
    deleteContentByIdAndUserId
}