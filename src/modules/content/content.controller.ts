import { contentService } from "./content.service";
import { storeEmbedding } from "../../services/storeEmbeddings";
import { getYtTranscript, getWebContent }  from "../../services/getLinkContent";
import { webMetaData } from "../../lib/webMetaData";
import { ytMetaData } from "../../lib/ytMetaData";

export async function getAllContentController(req:any , res:any){
    const userId =  req.userId;

    if(!userId){
        res.status(403).json({
            message : "forbidden"
        });
        return;
    }

    try{
        const contents = await contentService.fetchContentByUserId(userId);
        if(!contents){
            res.status(404).json({
                message : "No content found"
            });
            return;
        }
        res.status(200).json({
            message : "Contents fetched successfully",
            data : contents
        })
    }catch(err){
        res.status(500).json({
            message : "Internal server error"
        })
    }
}

export async function addContentController(req:any , res:any){
      try{
      const data =req.body;
      if(typeof(data)=== 'undefined' ) return

    
      // let body:string ;
      // switch(type?.trim().toLowerCase()) {
      //   case 'youtube' : body = await getYtTranscript(link) ;break;
      //   case 'article' : body = await getWebContent(link) ; break;
      //   case 'web' : body = await getWebContent(link) ; break;
    
      //   default : body = `this is the link i can't find the content so provided user the query they ask based on what the link contains link =  ${link}` ; break;
      // }
    
      const content = await contentService.createContent(data);
    
      // storeEmbedding(body, { contentId: content._id.toString(), userId, link });
      
      res.json({
        data : content,
        message: "content added",
      });
      }catch(err){
        res.json({
          message : "Internal server error"
        }).status(500)
        console.log("error while adding content", err);
    }
}

export async function removeContentController(req:any , res:any){
    const contentId = req.params.id;
    const userId = req.userId;

    if(!userId){
        res.status(403).json({
            message : "forbidden"
        });
        return;
    }

    try{
        const result = await contentService.deleteContentByIdAndUserId(contentId, userId);
        res.status(200).json({
            message : "Content removed successfully",
            data : result
        })
    }catch(err){
        res.status(500).json({
            message : "Internal server error"
        })
    }
}

export async function getMetaDataController(req:any , res:any){
    if(!req.userId){
    res.status(403).json({
      message : "forbidden"
    });
    return;
  }
  const link  = (req.body as { link?: string }).link as string;
  if(!link){
    res.status(400).json({
      error : "Link is required"
    })
    return;
  }

  try{
    const urlObject = new URL(link);
    // if(urlObject.hostname === 'www.youtube.com' || urlObject.hostname === 'youtube.com' || urlObject.hostname === 'youtu.be'){
    //   const resObj = await ytMetaData(link);
    //   res.status(200).json(resObj);
    //   return;
    // }
    const response = await webMetaData(link);

    if(!response || !response.title){
      res.status(404).json({
        error : "Could not fetch metadata"
      });
      return;
    }
    res.status(200).json({
      title : response.title,
      description : response.description,
      thumbnail : response.thumbnail,
      type : response.type
    });

  }catch(error){
    res.status(500).json({
      error : "could not fetch title"
    });
  }
}

export async function getContentByTypeController(req:any , res:any){
    const userId = req.userId;
    const type = req.params.type;

    try{
        if(!userId){
            res.status(403).json({
                message : "forbidden"
            });
            return;
        }
        const content = await contentService.fetchContentByTypeAndUserId(type, userId);
        res.status(200).json({
            content: content,
        });
    }catch(error){
        res.status(500).json({
            message : "Internal server error"
        })
    }
}