import "./browseTags.css";

import { Link as RouterLink } from "react-router-dom";
import useVideos from "../hooks/useVideos";

import {
  Alert,
  Button,
  CircularProgress,
  Container,
  Stack,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import React, { useMemo, useState } from "react";
import type { TagEntry, TagSortOrder } from "../utils/tagCatalog";
import { buildTagCatalog, filterAndSortTags } from "../utils/tagCatalog";

type TagSectionProps = {
  title: string;
  entries: TagEntry[];
  kind: "category" | "topic";
};

const TagSection = ({ title, entries, kind }: TagSectionProps) => {
  const isCategory = kind === "category";

  return (
    <section aria-label={title}>
      <h2 className="tag-browser__section-title">
        {title}
        <span className="tag-browser__section-count">{entries.length}</span>
      </h2>

      <ul className="tag-browser__tags">
        {entries.map((entry) => (
          <li key={entry.id}>
            <RouterLink
              className={"tag-browser__tag tag-browser__tag--" + kind}
              to={
                "/learning?" +
                (isCategory ? "category=" : "tag=") +
                encodeURIComponent(entry.id)
              }
            >
              <span className="tag-browser__tag-label">{entry.label}</span>

              <span className="tag-browser__video-count">
                {entry.videoCount} {entry.videoCount === 1 ? "video" : "videos"}
              </span>
            </RouterLink>
          </li>
        ))}
      </ul>
    </section>
  );
};

const BrowseTags = () => {
  const { getVideos } = useVideos();
  const { videos, loading, error, fetch } = getVideos();

  const [query, setQuery] = useState("");
  const [sortOrder, setSortOrder] = useState<TagSortOrder>("videoCount");

  const catalog = useMemo(() => buildTagCatalog(videos ?? []), [videos]);

  const categories = filterAndSortTags(catalog.categories, query, sortOrder);
  const topics = filterAndSortTags(catalog.topics, query, sortOrder);

  const totalCount = catalog.categories.length + catalog.topics.length;
  const visibleCount = categories.length + topics.length;

  return (
    <Container
      className="tag-browser"
      maxWidth="xl"
      sx={{ py: { xs: 3, md: 4 } }}
    >
      <h1 className="tag-browser__title">Browse tags</h1>

      {loading ? (
        <Stack direction="row" alignItems="center" spacing={2} role="status">
          <CircularProgress size={24} aria-hidden="true" />
          <Typography>Loading tags…</Typography>
        </Stack>
      ) : error ? (
        <Alert
          severity="error"
          action={
            <Button
              color="inherit"
              size="small"
              onClick={() => {
                void fetch();
              }}
            >
              Retry
            </Button>
          }
        >
          We couldn’t load the tags. Please try again.
        </Alert>
      ) : (
        <Stack spacing={2}>
          <p className="tag-browser__intro">
            Explore videos by category or topic. Search using a tag name or ID.
          </p>

          <div className="tag-browser__controls">
            <div>
              <label
                className="tag-browser__search-label"
                htmlFor="browse-tags-search"
              >
                Search tags
              </label>

              <div className="tag-browser__search-row">
                <TextField
                  id="browse-tags-search"
                  className="tag-browser__search"
                  fullWidth
                  size="small"
                  type="search"
                  placeholder="Search by name or ID"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                />

                <button
                  className="tag-browser__clear"
                  type="button"
                  disabled={!query}
                  onClick={() => setQuery("")}
                >
                  Clear
                </button>
              </div>
            </div>

            <div className="tag-browser__sort-row">
              <span>Sort by</span>

              <ToggleButtonGroup
                className="tag-browser__sort"
                exclusive
                size="small"
                value={sortOrder}
                aria-label="Tag sorting"
                onChange={(_, nextOrder: TagSortOrder | null) => {
                  if (nextOrder !== null) {
                    setSortOrder(nextOrder);
                  }
                }}
              >
                <ToggleButton value="videoCount">Most videos</ToggleButton>
                <ToggleButton value="alphabetical">A–Z</ToggleButton>
              </ToggleButtonGroup>
            </div>
          </div>

          <p role="status">
            Showing {visibleCount} of {totalCount} tags and categories.
          </p>

          {visibleCount === 0 ? (
            <p>No tags match your search. Try another name or tag ID.</p>
          ) : (
            <>
              {categories.length > 0 && (
                <TagSection
                  title="Video categories"
                  entries={categories}
                  kind="category"
                />
              )}
              {topics.length > 0 && (
                <TagSection title="Topics" entries={topics} kind="topic" />
              )}
            </>
          )}
        </Stack>
      )}
    </Container>
  );
};

export default BrowseTags;
