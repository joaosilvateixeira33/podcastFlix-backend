import { Router } from "express";
import * as PodcastController from "../controllers/podcasts-controller";

const router = Router();

router.get("/podcasts", PodcastController.getPodcast);
router.post("/podcasts", PodcastController.createPodcast);
router.get("/podcasts/:id", PodcastController.getPodcastById);
router.delete("/podcasts/:id", PodcastController.deletePodcast);
router.patch("/podcasts/:id", PodcastController.updatePodcast);


export default router;