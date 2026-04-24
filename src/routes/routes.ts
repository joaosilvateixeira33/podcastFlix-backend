import { Router } from "express";
import { getPodcast, getPodcastById } from "../controllers/podcasts-controller";

const router = Router();

router.get("/podcasts", getPodcast);
router.get("/podcasts/:id", getPodcastById);

export default router;