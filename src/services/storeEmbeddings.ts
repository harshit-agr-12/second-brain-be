import {Document} from "@langchain/core/documents";
import { vectorStore} from "../config/pinconeDB";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";

//text body and metadata 
export async function storeEmbedding(body : string,metadata:Object){
    const splitter = new RecursiveCharacterTextSplitter({ chunkSize: 200, chunkOverlap: 10 });
    const texts = await splitter.splitText(body);
    const documents:Document<Object>[] = texts.map((text) => new Document({ pageContent: text, metadata:metadata }));
    const vs = vectorStore;
    console.log(documents[0]);
    documents.forEach(async (doc) => {
        await vs.addDocuments([doc]);
    });
}
