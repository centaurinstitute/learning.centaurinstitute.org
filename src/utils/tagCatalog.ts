import { getTagLabel, tagLabels } from "./tagLabels";

export const VIDEO_CATEGORIES = [
  "Talk",
  "Tutorial",
  "Panel",
  "Fireside Chat",
  "Sponsor Talk",
] as const;

export type TagVideo = {
  id: string;
  tags?: readonly string[] | null;
  category?: string | null;
};

export type TagEntry = {
  id: string;
  label: string;
  videoCount: number;
};

type VideoIdsByTag = Map<string, Set<string>>;

const addVideo = (
  groups: VideoIdsByTag,
  tagId: string,
  videoId: string,
): void => {
  let videoIds = groups.get(tagId);

  if (!videoIds) {
    videoIds = new Set<string>();
    groups.set(tagId, videoIds);
  }

  videoIds.add(videoId);
};

const toEntries = (
  groups: VideoIdsByTag,
  getLabel: (id: string) => string,
): TagEntry[] =>
  Array.from(groups, ([id, videoIds]) => ({
    id,
    label: getLabel(id),
    videoCount: videoIds.size,
  }));

export const buildTagCatalog = (
  videos: readonly TagVideo[] = [],
): { categories: TagEntry[]; topics: TagEntry[] } => {
  const categories: VideoIdsByTag = new Map(
    VIDEO_CATEGORIES.map((category) => [
      category,
      new Set<string>(),
    ]),
  );

  const topics: VideoIdsByTag = new Map(
    Object.keys(tagLabels).map((tagId) => [
      tagId,
      new Set<string>(),
    ]),
  );

  for (const video of videos) {
    const category = video.category?.trim();

    if (category) {
      addVideo(categories, category, video.id);
    }

    for (const tagId of video.tags ?? []) {
      if (tagId.trim()) {
        addVideo(topics, tagId, video.id);
      }
    }
  }

  return {
    categories: toEntries(categories, (category) => category),
    topics: toEntries(topics, getTagLabel),
  };
};



export type TagSortOrder = "alphabetical" | "videoCount";

const labelCollator = new Intl.Collator("en", {
  sensitivity: "base",
  numeric: true,
});

export const filterAndSortTags = (
  entries: readonly TagEntry[],
  query: string,
  order: TagSortOrder,
): TagEntry[] => {
  const search = query.trim().toLowerCase();

  return entries
    .filter(
      (entry) =>
        entry.id.toLowerCase().includes(search) ||
        entry.label.toLowerCase().includes(search),
    )
    .sort((first, second) => {
      const countDifference =
        order === "videoCount"
          ? second.videoCount - first.videoCount
          : 0;

      return (
        countDifference ||
        labelCollator.compare(first.label, second.label) ||
        first.id.localeCompare(second.id, "en")
      );
    });
};
