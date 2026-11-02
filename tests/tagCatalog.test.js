import { tagLabels } from "../src/utils/tagLabels.ts";
import {
  buildTagCatalog,
  filterAndSortTags,
} from "../src/utils/tagCatalog.ts";
import { expect, test } from "bun:test";

test("includes known categories and topics with zero counts", () => {
  const catalog = buildTagCatalog();

  expect(catalog.categories).toHaveLength(5);
  expect(catalog.topics).toHaveLength(Object.keys(tagLabels).length);
  expect(
    [...catalog.categories, ...catalog.topics].every(
      (entry) => entry.videoCount === 0,
    ),
  ).toBe(true);
});

test("counts distinct video IDs, not repeated tags or records", () => {
  const video = {
    id: "video-1",
    category: "Tutorial",
    tags: ["atp", "atp"],
  };

  const catalog = buildTagCatalog([
    video,
    video,
    { id: "video-2", category: "Tutorial", tags: ["atp"] },
  ]);

  expect(
    catalog.topics.find((entry) => entry.id === "atp"),
  ).toEqual({
    id: "atp",
    label: "Automated Theorem Proving",
    videoCount: 2,
  });

  expect(
    catalog.categories.find((entry) => entry.id === "Tutorial")
      ?.videoCount,
  ).toBe(2);
});

test("includes unknown metadata values and preserves topic IDs", () => {
  const catalog = buildTagCatalog([
    {
      id: "video-1",
      category: "Workshop",
      tags: ["new_topic", "future_of_AI"],
    },
  ]);

  expect(
    catalog.topics.find((entry) => entry.id === "new_topic"),
  ).toEqual({
    id: "new_topic",
    label: "new_topic",
    videoCount: 1,
  });

  expect(
    catalog.topics.find((entry) => entry.id === "future_of_AI")
      ?.label,
  ).toBe("Future of AI");

  expect(
    catalog.categories.find((entry) => entry.id === "Workshop")
      ?.videoCount,
  ).toBe(1);
});

test("handles missing, null, and blank metadata", () => {
  const catalog = buildTagCatalog([
    { id: "video-1" },
    { id: "video-2", tags: null, category: null },
    { id: "video-3", tags: ["", " "], category: " " },
  ]);

  expect(
    [...catalog.categories, ...catalog.topics].every(
      (entry) => entry.videoCount === 0,
    ),
  ).toBe(true);
});

const entries = [
  { id: "zulu", label: "Zulu", videoCount: 3 },
  { id: "atp", label: "Automated Theorem Proving", videoCount: 1 },
  { id: "nlp", label: "Natural Language Processing", videoCount: 3 },
];

test("searches IDs and readable names without case sensitivity", () => {
  expect(
    filterAndSortTags(entries, " ATP ", "alphabetical").map(
      (entry) => entry.id,
    ),
  ).toEqual(["atp"]);

  expect(
    filterAndSortTags(
      entries,
      "AUTOMATED THEOREM",
      "alphabetical",
    ).map((entry) => entry.id),
  ).toEqual(["atp"]);
});

test("sorts alphabetically by readable label", () => {
  expect(
    filterAndSortTags(entries, "", "alphabetical").map(
      (entry) => entry.id,
    ),
  ).toEqual(["atp", "nlp", "zulu"]);
});

test("sorts by video count with alphabetical tie-breaking", () => {
  expect(
    filterAndSortTags(entries, "", "videoCount").map(
      (entry) => entry.id,
    ),
  ).toEqual(["nlp", "zulu", "atp"]);
});

test("returns empty results without changing the source entries", () => {
  const original = JSON.stringify(entries);

  filterAndSortTags(entries, "", "alphabetical");

  expect(
    filterAndSortTags(entries, "no matching tag", "videoCount"),
  ).toEqual([]);
  expect(JSON.stringify(entries)).toBe(original);
});
