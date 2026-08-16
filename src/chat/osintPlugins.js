/**
 * osintPlugins.js — curated catalog of EXISTING OnDemand plugins wired into the
 * Chat / OSINT tab. NO new plugins/tools are created here — every id below was
 * looked up live against the OnDemand plugin-suggestion index (verified
 * 2026-08-15) and is used exactly as published: `pluginId` goes into the
 * `pluginIds` array on POST /chat/v1/sessions and POST
 * /chat/v1/sessions/{sessionId}/query, per the live OpenAPI spec for the
 * "Use Agent Tools & Submit Query" (submitquery) and "Create Chat Session"
 * (createchatsession) operations (docs base https://api.on-demand.io).
 *
 * Grouped for the composer's plugin-toolkit UI. `default` marks the plugins
 * attached to a fresh OSINT session unless the analyst changes the selection.
 *
 * HARD CAP: the live `submitquery`/`createchatsession` spec documents
 * `pluginIds` as `maxItems: 20`. This catalog is trimmed to exactly 20 entries
 * for that reason — do not add more without also enforcing a client-side cap
 * (see MAX_PLUGIN_IDS below) or the upstream call will 4xx.
 */

export const OSINT_PLUGIN_GROUPS = [
  {
    group: 'Geolocation & imagery',
    items: [
      { pluginId: 'plugin-1757906905', name: 'Google Maps Street View Agent', note: 'Street / satellite view imagery for a place', default: true },
      { pluginId: 'plugin-1756022750', name: 'Google Maps MCP', note: 'Geocode, place search, directions, elevation' },
      { pluginId: 'plugin-1772953290', name: 'Planet Satellite Imagery', note: 'Planet Labs satellite imagery by location/date' },
      { pluginId: 'plugin-1771757909', name: 'Picarta Image Geolocator', note: 'Predict the geographic origin of an image URL' },
    ],
  },
  {
    group: 'X / Twitter',
    items: [
      { pluginId: 'plugin-1751872652', name: 'X Search Agent', note: 'Real-time X search by date range / country / handle', default: true },
      { pluginId: 'plugin-1716326559', name: 'Twitter User Info and Tweets Extracter', note: 'Follower count, bio, profile picture, tweets by handle', default: true },
      { pluginId: 'plugin-1785777296', name: 'X (MCP)', note: 'Search / manage an X account via MCP' },
    ],
  },
  {
    group: 'Instagram',
    items: [
      { pluginId: 'plugin-1716164040', name: 'Instagram User Info Extracter', note: 'Public profile info from an Instagram username', default: true },
      { pluginId: 'plugin-1762980461', name: 'Instagram Content Downloader Tool', note: 'Download public images / video from Instagram', default: true },
    ],
  },
  {
    group: 'Reddit & forums',
    items: [
      { pluginId: 'plugin-1748003575', name: 'Reddit Posts', note: 'Posts, comments and sentiment from any subreddit', default: true },
    ],
  },
  {
    group: 'Political / public-figure social',
    items: [
      { pluginId: 'plugin-1748814579', name: "Trump's Truth Tool", note: "Donald Trump's public Truth Social posts", default: true },
      { pluginId: 'plugin-1748812379', name: 'Truth Social Tool', note: 'Public posts from any Truth Social account' },
    ],
  },
  {
    group: 'Professional / people search',
    items: [
      { pluginId: 'plugin-1718116202', name: 'Linkedin Search', note: 'Find and read a public LinkedIn profile' },
      { pluginId: 'plugin-1754513825', name: 'People Data Labs Agent', note: 'Professional profiles by job title / company / region' },
      { pluginId: 'plugin-1716390194', name: 'Website Contact Details Extractor', note: 'Public phone / email / social links from a domain' },
    ],
  },
  {
    group: 'Web search & news',
    items: [
      { pluginId: 'plugin-1722260873', name: 'Perplexity', note: 'Sourced real-time web search — news, events, trends', default: true },
      { pluginId: 'plugin-1713924030', name: 'Internet', note: 'General web / news / current-events search', default: true },
      { pluginId: 'plugin-1741871229', name: 'GPT Search', note: 'GPT-4o-analyzed research and insight search' },
      { pluginId: 'plugin-1716107632', name: 'UAE Latest News', note: 'Real-time UAE headlines' },
    ],
  },
];

/** Documented ceiling for `pluginIds` on both createChatSession and submitQuery. */
export const MAX_PLUGIN_IDS = 20;

/** Flat list of every plugin id in the catalog (used to build pluginIds[]). */
export const OSINT_ALL_PLUGIN_IDS = OSINT_PLUGIN_GROUPS.flatMap((g) => g.items.map((i) => i.pluginId)).slice(0, MAX_PLUGIN_IDS);

/** Ids pre-selected for a brand-new OSINT chat session. */
export const OSINT_DEFAULT_PLUGIN_IDS = OSINT_PLUGIN_GROUPS.flatMap((g) =>
  g.items.filter((i) => i.default).map((i) => i.pluginId),
);

/** Flat lookup: pluginId -> {name, note, group}. */
export const OSINT_PLUGIN_BY_ID = OSINT_PLUGIN_GROUPS.reduce((acc, g) => {
  for (const item of g.items) acc[item.pluginId] = { ...item, group: g.group };
  return acc;
}, {});
