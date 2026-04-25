import { PodcastModel } from "../models/podcast-model";
import fs from "fs/promises";

const FILE_PATH = "./src/data/podcasts.json";

export const readData = async (): Promise<PodcastModel[]> => {
    try {
        const rawData = await fs.readFile(FILE_PATH, "utf-8");
        return JSON.parse(rawData);
    } catch (error) {
        return []; 
    }
};