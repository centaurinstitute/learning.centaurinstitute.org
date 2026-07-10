import axios from "axios";

async function appendTagSuggestion({
  videoId,
  videoTitle,
  tags,
  name,
  email,
  identityProvider,
}: {
  videoId: string;
  videoTitle: string;
  tags: string[];
  name: string;
  email: string | null;
  identityProvider: string;
}) {
  const apiKey = process.env.AIRTABLE_API_KEY;
  const baseId = process.env.AIRTABLE_BASE_ID;
  const table = process.env.AIRTABLE_TABLE_NAME || "TagSuggestions";

  if (!apiKey || !baseId) {
    throw new Error("AIRTABLE_API_KEY or AIRTABLE_BASE_ID is not configured");
  }

  await axios.post(
    `https://api.airtable.com/v0/${baseId}/${encodeURIComponent(table)}`,
    {
      records: [
        {
          fields: {
            Timestamp: new Date().toISOString(),
            "Video ID": videoId,
            "Video Title": videoTitle,
            Tags: tags.join(", "),
            Name: name,
            Email: email || "",
            Provider: identityProvider,
          },
        },
      ],
    },
    {
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
    },
  );
}

export default { appendTagSuggestion };
