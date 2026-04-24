import { Router } from "express";
import { getPodcast } from "../controllers/podcasts-controller";

const router = Router();

router.get("/podcasts", getPodcast);

export default router;