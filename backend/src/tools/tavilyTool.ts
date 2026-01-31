import { tavilySearch } from "../tavily";

export const tavilyTool = {
  name: "mcp_tavily_search",
  description:
    "Search Tavily for organizations. Input: JSON string { mission, locationText, lat, lng, radius }. Returns JSON array of top results.",
  call: async (input: string) => {
    try {
      const params = JSON.parse(input || "{}");
      const results = await tavilySearch(params);
      const items = Array.isArray(results) ? results : (results?.results || []);

      const top = (items || []).slice(0, 8).map((r: any) => ({
        id: r.id || r.place_id || r.orgId || null,
        name: r.name || r.title || null,
        address: r.address || r.vicinity || null,
        phone: r.phone || r.telephone || null,
        categories: r.categories || r.types || [],
        snippet: r.description || r.summary || r.snippet || "",
        raw: r,
      }));

      return JSON.stringify(top);
    } catch (err: any) {
      return JSON.stringify({ error: String(err?.message || err) });
    }
  },
};
