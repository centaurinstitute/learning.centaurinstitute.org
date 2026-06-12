import Video from "../models/Video";
import express from "express";
import platform from "@canmingir/link-express";
const router = express.Router();

router.get("/", async (req, res) => {
  const { event, limit, tags } = req.query;

  let videos = await Video.findAll({
    ...(event ? { where: { event } } : {}),
    ...(limit ? { limit: parseInt(limit as string) } : {}),
  });

  if (tags) {
    const tag = (tags as string).toLowerCase();
    videos = videos.filter((v) =>
      Array.isArray(v.tags)
        ? v.tags.some((t: string) => t.toLowerCase() === tag)
        : false,
    );
  }

  res.status(200).json(videos);
});

router.get("/:id", async (req, res) => {
  const video = await Video.findByPk(req.params.id);

  res.status(200).json(video);
});

export default router;
