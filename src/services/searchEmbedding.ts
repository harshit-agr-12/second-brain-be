import { vectorStore } from "../config/pinconeDB";

export async function searchEmbedding(query: string) {  
    const vs =  vectorStore;
    const  similaritySearchResult = await vs.similaritySearch(query, 5);
    const result = similaritySearchResult.map((doc) => doc.pageContent).join("\n---\n"); 

    return result;
}