import { PodcastModel } from "../models/podcast-model";
import fs from "fs/promises";

const FILE_PATH = "./src/data/podcasts.json";

export const writeData = async (data: PodcastModel[]): Promise<void> => {
    await fs.writeFile(FILE_PATH, JSON.stringify(data, null, 2), "utf-8");
};