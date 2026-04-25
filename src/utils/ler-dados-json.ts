import { PodcastModel } from "../models/podcast-model";
import fs from "fs/promises";
import { UserModel } from "../models/user-model";

const bdPodcast = "./src/data/podcasts.json";
const bdUsers = "./src/data/users.json";

export const readData = async (): Promise<PodcastModel[]> => {
    try {
        const rawData = await fs.readFile(bdPodcast, "utf-8");
        return JSON.parse(rawData);
    } catch (error) {
        return []; 
    }
};

export const readData2 = async (): Promise<UserModel[]> => {
    try {
        const rawData = await fs.readFile(bdUsers, "utf-8");
        return JSON.parse(rawData);
    } catch (error) {
        return []; 
    }
}