export const extractYoutubeVideoId = (url: string): string | null => {
    try {
        const parsedUrl = new URL(url);

        if (parsedUrl.hostname.includes("youtube.com")) {
            return parsedUrl.searchParams.get("v");
        }

        if (parsedUrl.hostname.includes("youtu.be")) {
            return parsedUrl.pathname.split("/")[1];
        }

        return null;
    } catch {
        return null;
    }
};