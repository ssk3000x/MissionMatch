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
  phone: string;
  address?: string;
}

/**
 * Extract phone number from text using regex
 */
function extractPhoneNumber(text: string): string | undefined {
  // Match common US phone number formats
  const phoneRegex = /(\+?1[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/;
  const match = text.match(phoneRegex);
  return match ? match[0].trim() : undefined;
}

/**
 * Extract address from text using regex
 */
function extractAddress(text: string): string | undefined {
  // Match common address patterns (street number + street name + optional unit)
  const addressRegex = /\d+\s+[A-Za-z0-9\s,.-]+(Street|St|Avenue|Ave|Road|Rd|Boulevard|Blvd|Lane|Ln|Drive|Dr|Court|Ct|Way|Parkway|Pkwy|Circle|Cir|Place|Pl)[.,\s]*/i;
  const match = text.match(addressRegex);
  return match ? match[0].trim() : undefined;
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

  // Construct search query optimized for volunteer organizations with contact info
  const searchQuery = `volunteer organizations ${mission} ${location ? `near ${location}` : ""} contact phone`.trim();

  console.log("Tavily Search Query:", searchQuery);

  try {
    const response = await axios.post(
      "https://api.tavily.com/search",
      {
        api_key: TAVILY_API_KEY,
        query: searchQuery,
        max_results: 15,
        search_depth: "advanced",
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
      const resultsWithPhone = response.data.results
        .map((result: any) => {
          const content = result.content || result.snippet || "N/A";
          const phone = extractPhoneNumber(content);
          const address = extractAddress(content);
          
          return {
            title: result.title || "N/A",
            url: result.url || "N/A",
            content,
            score: result.score || 0,
            phone,
            address,
          };
        })
        .filter((result: any) => result.phone !== undefined)
        .slice(0, 5);
      
      return resultsWithPhone;
    }

    return [];
  } catch (error: any) {
    console.error("Tavily API Error:", error?.response?.data || error?.message);
    throw new Error(`Tavily search failed: ${error?.response?.data?.error || error?.message}`);
  }
}
