import Video from "../models/Video";
import airtable from "../lib/airtable";
import axios from "axios";
import express from "express";
import github from "../lib/github";
import platform from "@canmingir/link-express";
const router = express.Router();

router.get("/", async (req, res) => {
  const { event, limit, tags, category, speaker } = req.query;

  for (const [name, value] of Object.entries({
    event,
    limit,
    tags,
    category,
    speaker,
  })) {
    if (value !== undefined && typeof value !== "string") {
      return res.status(400).json({
        message: `${name} must be a single string`,
      });
    }
  }

  const resultLimit = limit === undefined ? undefined : Number(limit);

  if (
    resultLimit !== undefined &&
    (!Number.isSafeInteger(resultLimit) || resultLimit < 1)
  ) {
    return res.status(400).json({
      message: "limit must be a positive integer",
    });
  }

  let videos = await Video.findAll({
    ...(event ? { where: { event } } : {}),
  });

  if (tags) {
    const tag = (tags as string).trim().toLowerCase();

    videos = videos.filter(
      (video) =>
        Array.isArray(video.tags) &&
        video.tags.some((value: string) => value.toLowerCase() === tag),
    );
  }

  if (category) {
    const categoryName = (category as string).trim().toLowerCase();

    videos = videos.filter(
      (video) => video.category?.trim().toLowerCase() === categoryName,
    );
  }

  if (speaker) {
    const speakerName = (speaker as string).trim().toLowerCase();

    videos = videos.filter(
      (video) =>
        Array.isArray(video.authors) &&
        video.authors.some(
          (author: string) => author.trim().toLowerCase() === speakerName,
        ),
    );
  }

  if (resultLimit !== undefined) {
    videos = videos.slice(0, resultLimit);
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

  const cleanTags = [...new Set(tags.map((tag: string) => tag.trim()))].slice(
    0,
    10,
  );

  const provider = identityProvider.toUpperCase();

  let resolvedName = name?.trim() || null;
  let resolvedEmail = email?.trim() || null;

  if (provider === "GITHUB") {
    const providerToken = req.headers["x-refresh-token"] as string;
    if (providerToken) {
      const identity = await github.fetchIdentity(providerToken);
      resolvedName = identity.name || resolvedName;
      resolvedEmail = identity.email || resolvedEmail;
    }
  }

  try {
    await airtable.appendTagSuggestion({
      videoId: video.id,
      videoTitle: video.title,
      tags: cleanTags,
      name: resolvedName || "Unknown",
      email: resolvedEmail || null,
      identityProvider: provider,
    });
    res.status(201).json({ message: "Tag suggestion recorded" });
  } catch (error) {
    console.error(
      "Failed to record tag suggestion:",
      axios.isAxiosError(error) ? error.response?.data : error,
    );
    res
      .status(502)
      .json({ message: "Failed to save suggestion, please try again later" });
  }
});

export default router;
