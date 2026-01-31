import { DynamicTool } from "@langchain/core/tools";
import { TavilySearch } from "./tavily";

export const tavilyTool = new DynamicTool({
  name: "tavily_search",
  description: "Searches for volunteer organizations. Input must be a valid JSON string with a 'mission' and optional 'location'. Example: { \"mission\": \"help animals\", \"location\": \"San Francisco\" }",
  func: async (input: string) => {
    try {
      console.log("🛠️ Agent calling Tavily Tool with:", input);
      
      let params;
      try {
        params = JSON.parse(input);
      } catch (e) {
        // If agent sends raw text instead of JSON, handle gracefully
        params = { mission: input };
      }

      const results = await TavilySearch({
        mission: params.mission,
        location: params.location
      });

      return JSON.stringify(results);
    } catch (error: any) {
      console.error("Tool execution error:", error);
      return "Error searching Tavily. Please make sure input is valid JSON.";
    }
  },
});
