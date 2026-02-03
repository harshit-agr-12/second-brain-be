import dotenv from "dotenv";
dotenv.config();

export const config = {
    port : process.env.PORT,
    mongoURI : process.env.MONGODB_URI as string,
    isProduction: process.env.NODE_ENV === "production",
    jwtSecret : process.env.JWT_SECRET as string,
    pineconeApiKey : process.env.PINECONE_API_KEY,
    pineconeIndexName : process.env.PINECONE_INDEX_NAME as string,
    geminiApiKey : process.env.GEMINI_API_KEY as string,
}

if(!config.mongoURI){
    throw new Error('mongodb uri not provided in env');
}

if(!config.jwtSecret){
    throw new Error('jwt secret not provided in env');
}



