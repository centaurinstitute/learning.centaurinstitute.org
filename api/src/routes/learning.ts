import Video from "../models/Video";
import airtable from "../lib/airtable";
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

router.post("/:id/tag-suggestions", async (req, res) => {
  const video = await Video.findByPk(req.params.id);
  if (!video) {
    return res.status(404).json({ message: "Video not found" });
  }

  const { tags, name, email, identityProvider } = req.body;

  if (
    !Array.isArray(tags) ||
    tags.length === 0 ||
    tags.some((tag) => typeof tag !== "string" || !tag.trim())
  ) {
    return res
      .status(400)
      .json({ message: "tags must be a non-empty array of strings" });
  }

  const cleanTags = [
    ...new Set(tags.map((tag: string) => tag.trim())),
  ].slice(0, 10);

  try {
    await airtable.appendTagSuggestion({
      videoId: video.id,
      videoTitle: video.title,
      tags: cleanTags,
      name: typeof name === "string" && name.trim() ? name.trim() : "Unknown",
      email: typeof email === "string" && email.trim() ? email.trim() : null,
      identityProvider:
        typeof identityProvider === "string" && identityProvider
          ? identityProvider
          : "UNKNOWN",
    });
    res.status(201).json({ message: "Tag suggestion recorded" });
  } catch (error) {
    console.error("Failed to record tag suggestion:", error);
    res
      .status(502)
      .json({ message: "Failed to save suggestion, please try again later" });
  }
});

export default router;
