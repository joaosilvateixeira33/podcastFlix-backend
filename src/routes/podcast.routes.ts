import { Router } from "express";
import * as PodcastController from "../controllers/podcasts-controller";

const routerPodcast = Router();

routerPodcast.get("/podcasts", PodcastController.getPodcast);
routerPodcast.post("/podcasts", PodcastController.createPodcast);
routerPodcast.get("/podcasts/:id", PodcastController.getPodcastById);
routerPodcast.delete("/podcasts/:id", PodcastController.deletePodcast);
routerPodcast.patch("/podcasts/:id", PodcastController.updatePodcast);


export default routerPodcast;