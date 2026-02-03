
export interface MicrolinkResponse {
    status: string
    data: {
      title?: string
      description?: string
      image?: {
        url: string
        width: number
        height: number
      }
      logo?: {
        url: string
      }
      url: string
      lang?: string
      author?: string
      date?: string
      publisher?: string,
      type?: string
    }
  }

export async  function webMetaData(url : string){
    try{
    const micrLinkUrl =  `https://api.microlink.io/?url=${encodeURIComponent(url)}&screenshot=true&meta=true&insights=false`

    const response =  await fetch(micrLinkUrl,{
        headers :{
            Accept : "application/json"
        }
    })

    if(!response.ok){
        throw new Error(`Failed to fetch metadata for url: ${url}`);
    }

    const parsedData : MicrolinkResponse = await response.json();
    const urlObject = new URL(url);
    let type;
    const hostname = urlObject.hostname;
    if(hostname.includes("youtube.com") || hostname.includes("youtu.be")){
        type = "youtube";
    }else if(hostname.includes("github.com")){
        type = "github";
    }else if(hostname.includes("medium.com") || hostname.includes("dev.to")){
        type = "article";
    }else if(hostname.includes("x.com") || hostname.includes("twitter.com")){
        type = "twitter";
    }else{
        type = "website";
    }
    return {
      "title" : parsedData.data.title || "",
      "description" : parsedData.data.description || "",
      "thumbnail" : parsedData.data.image?.url || "",
      "type" : type
    };

  }catch(error){
    throw new Error(`Error fetching metadata: ${error}`);
  }
} 