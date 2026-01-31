import axios from "axios";

const TAVILY_API_KEY: string | undefined = process.env.TAVILY_API_KEY;

if (!TAVILY_API_KEY) {
  console.warn("TAVILY_API_KEY not set — Tavily search will fail until configured.");
}

export interface TavilySearchParams {
  mission: string;
  location?: string;
}

export interface TavilyResult {
  title: string;
  url: string;
  content: string;
  score?: number;
}

/**
 * Search for volunteer organizations using Tavily API
 * @param params Object containing mission and optional location
 * @returns Array of search results with organization information
 */
export async function TavilySearch(params: TavilySearchParams): Promise<TavilyResult[]> {
  if (!TAVILY_API_KEY) {
    throw new Error("TAVILY_API_KEY not set in environment variables");
  }

  const { mission, location } = params;

  // Construct search query optimized for volunteer organizations
  const searchQuery = `volunteer organizations ${mission} ${location ? `near ${location}` : ""}`.trim();

  console.log("Tavily Search Query:", searchQuery);

  try {
    const response = await axios.post(
      "https://api.tavily.com/search",
      {
        api_key: TAVILY_API_KEY,
        query: searchQuery,
        max_results: 5,
        search_depth: "basic",
        include_domains: [],
        exclude_domains: []
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
        timeout: 10000,
      }
    );

    if (response.data && Array.isArray(response.data.results)) {
      return response.data.results.map((result: any) => ({
        title: result.title || "N/A",
        url: result.url || "N/A",
        content: result.content || result.snippet || "N/A",
        score: result.score || 0,
      }));
    }

    return [];
  } catch (error: any) {
    console.error("Tavily API Error:", error?.response?.data || error?.message);
    throw new Error(`Tavily search failed: ${error?.response?.data?.error || error?.message}`);
  }
}
