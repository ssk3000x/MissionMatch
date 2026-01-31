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
  description?: string;
  rawContent?: string;
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

  // Construct search query optimized for volunteer organizations with contact info and location
  const locationPart = location ? `in ${location} ` : "";
  const searchQuery = `volunteer ${mission} organizations ${locationPart}local community service contact phone address`.trim();

  console.log("Tavily Search Query:", searchQuery);

  try {
    const response = await axios.post(
      "https://api.tavily.com/search",
      {
        api_key: TAVILY_API_KEY,
        query: searchQuery,
        max_results: 30,
        search_depth: "advanced",
        include_domains: [],
        exclude_domains: [
          "guidestar.org",
          "greatnonprofits.org",
          "charitynavigator.org",
          "idealist.org",
          "volunteermatch.org",
          "211.org",
          "unitedway.org",
          "facebook.com",
          "linkedin.com",
          "indeed.com",
          "glassdoor.com"
        ]
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
        timeout: 15000,
      }
    );

    if (response.data && Array.isArray(response.data.results)) {
      const resultsWithPhone = response.data.results
        .map((result: any) => {
          const content = result.content || result.snippet || "N/A";
          const phone = extractPhoneNumber(content);
          const address = extractAddress(content);
          const url = result.url || "N/A";
          
          return {
            title: result.title || "N/A",
            url,
            content,
            score: result.score || 0,
            phone,
            address,
          };
        })
        // Filter out PDFs, aggregate lists, and directory sites
        .filter((result: any) => {
          const url = result.url.toLowerCase();
          const title = result.title.toLowerCase();
          const content = result.content.toLowerCase();
          
          // Exclude PDFs
          if (url.includes('.pdf') || title.includes('[pdf]')) return false;
          
          // Exclude aggregate/directory keywords
          const aggregateKeywords = [
            'list of',
            'directory of',
            'database of',
            'find organizations',
            'search organizations',
            'nonprofit directory',
            'volunteer opportunities',
            'resource guide',
            'service directory'
          ];
          
          if (aggregateKeywords.some(keyword => title.includes(keyword) || content.includes(keyword))) {
            return false;
          }
          
          return result.phone !== undefined;
        })
        .slice(0, 15);
      
      return resultsWithPhone;
    }

    return [];
  } catch (error: any) {
    console.error("Tavily API Error:", error?.response?.data || error?.message);
    throw new Error(`Tavily search failed: ${error?.response?.data?.error || error?.message}`);
  }
}
