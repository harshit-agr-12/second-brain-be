const YouTube = require("youtube-sr").default;

async function ytMetaData(url:string) : Promise<Object> {
    try {
        // 1. Validate the URL first
        if (!YouTube.validate(url, "VIDEO")) {
            throw new Error("Invalid YouTube Video URL");
        }

        // 2. Fetch video information
        const video = await YouTube.getVideo(url);

        // 3. Construct and return the JSON object
        return {
            title: video.title,
            description: video.description || "No description available",
            thumbnail: video.thumbnail.url,
            type: "youtube"
        };
    } catch (error) {
        console.error("Error in ytMetaData:", (error as Error).message);
        return {
            error: true,
            message: (error as Error).message
        };
    }
}

export { ytMetaData };