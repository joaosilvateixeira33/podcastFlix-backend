import { PodcastModel } from "../models/podcast-model";
import { UserModel } from "../models/user-model";
import fs from "fs/promises";

const bdPodcast = "./src/data/podcasts.json";
const bdUsers = "./src/data/users.json";

export const writeData = async (data: PodcastModel[]): Promise<void> => {
    await fs.writeFile(bdPodcast, JSON.stringify(data, null, 2), "utf-8");
};

export const writeData2 = async (data: UserModel[]): Promise<void> => {
    await fs.writeFile(bdUsers, JSON.stringify(data, null, 2), "utf-8");
};