import { Router } from "express";
import * as PodcastController from "../controllers/podcasts-controller";

const router = Router();

router.get("/podcasts", PodcastController.getPodcast);
router.post("/podcasts", PodcastController.createPodcast);

router.get("/podcasts/:id", PodcastController.getPodcastById);


export default router;