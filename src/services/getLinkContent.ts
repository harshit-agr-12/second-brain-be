import { YoutubeLoader  } from "@langchain/community/document_loaders/web/youtube";

import {CheerioWebBaseLoader} from "@langchain/community/document_loaders/web/cheerio"


//youtube
export async function getYtTranscript(link:string){
  const loader = YoutubeLoader.createFromUrl(link, {
  language: "en",
  addVideoInfo: true,
  });

  const docs = await loader.load();

  const transcript:string = docs.map((doc) => doc.pageContent).join("\n"); 
  console.log(transcript)

  return transcript;
}


//webcontent
export async function getWebContent(link:string){
  const newLink = "https://r.jina.ai/"+link;
  const loader = new CheerioWebBaseLoader(newLink);
  const docs = await loader.load();

  const content:string = docs.map((doc) => doc.pageContent).join("\n"); 
  console.log(content)

  return content;
}


