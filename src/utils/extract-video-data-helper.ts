export const getYoutubeVideoData = async (videoUrl: string) => {
    try {
        const oembedUrl = `https://www.youtube.com/oembed?url=${encodeURIComponent(videoUrl)}&format=json`;

        const response = await fetch(oembedUrl);

        if (!response.ok) return null;

        const data = await response.json();

        return {
            title: data.title,
            channelTitle: data.author_name
        };
    } catch {
        return null;
    }
};