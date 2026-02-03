import { Pinecone  } from "@pinecone-database/pinecone";
import { PineconeStore } from "@langchain/pinecone";
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";

const pinecone = new Pinecone({
    apiKey: process.env.PINECONE_API_KEY as string,
});

const pineconeIndex = pinecone.Index(process.env.PINECONE_INDEX_NAME as string);

export { pinecone , pineconeIndex };

export const embeddings = new GoogleGenerativeAIEmbeddings({
  model: "text-embedding-004",
});

export const vectorStore = new PineconeStore(embeddings,{
    pineconeIndex ,
    maxConcurrency : 5,
})