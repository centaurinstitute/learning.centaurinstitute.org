import Video from "../models/Video";
import express from "express";
import platform from "@canmingir/link-express";

const router = express.Router();

router.get("/", async (req, res) => {
  const { event, limit } = req.query;

  const videos = await Video.findAll({
    ...(event ? { where: { event } } : {}),
    ...(limit ? { limit: parseInt(limit as string) } : {}),
  });

  res.status(200).json(videos);
});

router.get("/:id", async (req, res) => {
  const video = await Video.findByPk(req.params.id);

  res.status(200).json(video);
});

export default router;
