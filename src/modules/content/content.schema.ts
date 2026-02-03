import {z} from "zod";

export const addContentSchema = z.object({
    title : z.string().min(1 ,{"message" : "Title is required"}),
    link : z.string().url("Invalid URL format"),
    tags : z.array(z.string()).optional().nullable(),
    type : z.string().optional(),
    userId : z.string().min(1, {"message" : "UserId is required"}),
    thumbnail : z.string().url("Invalid URL format").optional(),
    description : z.string().optional()
})

export const getAllContentSchema = z.object({
    userId : z.string().min(1, {"message" : "UserId is required"})
})

// export const getContentByTypeSchema = z.object({
//     type : z.string().min(1, {"message" : "Type is required"})
// })

export const getMetaDataSchema = z.object({
    link : z.string().url("Invalid URL format")
})

export const removeContentSchema = z.object({
    id : z.string().min(1, {"message" : "Content ID is required"})
})