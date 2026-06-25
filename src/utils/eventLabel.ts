const eventTypeLabels: Record<string, string> = {
  SS: "Summer School",
  WW: "Winter Workshop",
};

const getEventLabel = (event?: string | null): string => {
  if (!event) return "";
  const match = /^([A-Za-z]+)(\d{4})$/.exec(event);
  if (!match) return event;
  const [, prefix, year] = match;
  const label = eventTypeLabels[prefix.toUpperCase()];
  return label ? `${label} ${year}` : event;
};

export { getEventLabel };
