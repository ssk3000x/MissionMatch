import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { searchOrganizations } from "./places";
import { SystemMessage, HumanMessage } from "@langchain/core/messages";
import "dotenv/config";
import { createAgent, createMiddleware } from "langchain";
import { z } from "zod";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// ai agent begins
const contextSchema = z.object({
  user_name: z.string(),
  systemPrompt: z.string().optional(),
});

const personalizedPromptMiddleware = createMiddleware({
  name: "PersonalizedPromptMiddleware",
  contextSchema,
  wrapModelCall: async (request, handler) => {
    const user_name = request.runtime.context.user_name;
    const customPrompt = request.runtime.context.systemPrompt || "You are an expert community service initiative expert. You answer in 3 sentences max. You will simply look for places to get resources and places to help this specific project.";
    return handler({
      ...request,
      systemMessage: request.systemMessage.concat(customPrompt),
    });
  },
});

const agent = createAgent({
  model: "anthropic:claude-sonnet-4-20250514",
  tools: [],
  middleware: [personalizedPromptMiddleware],
  contextSchema,
});

function getSummary(response: any): string | null {
  if (response?.messages) {
    const messages = [...response.messages].reverse();
    for (const msg of messages) {
      if (msg._getType?.() === "ai" || msg.constructor?.name === "AIMessage") {
        if (typeof msg.content === "string") {
          return msg.content;
        }
      }
    }
  }
  return null;
}

// ai agent ends 

app.post("/api/agents/refine", async (req, res) => {
  try {
    const { mission, location, timestamp } = req.body || {};

    // Basic validation
    if (!mission) {
      return res.status(400).json({ error: "mission is required" });
    }

    // Print what we received to the server console for debugging
    console.log("/api/agents/refine received:", JSON.stringify({ mission, location, timestamp }, null, 2));

    // Create the system prompt from the operation data
    const systemPrompt = `You are a volunteer opportunity search assistant. Be extremely concise and direct.

Location: ${location || "Not specified"}
Mission: ${mission}

CRITICAL INSTRUCTIONS:
- Keep responses under 3 sentences
- NO introductions, NO fluff, NO politeness
- Get straight to the point
- Only output actionable information
- Use bullet points when listing things`;

    // Call Claude agent with the operation data as system prompt
    const agentResponse = await agent.invoke(
      { 
        messages: [{ 
          role: "user", 
          content: `Analyze this volunteer request and output ONLY: refined search query, and places they can look for institutions or resources that can help. Mission: ${mission}. Location: ${location || "unspecified"}.` 
        }] 
      },
      { 
        context: { 
          user_name: "Volunteer",
          systemPrompt: systemPrompt
        }
      }
    );

    const agentSummary = getSummary(agentResponse);
    console.log("Claude Response:", agentSummary);

    return res.json({ 
      ok: true, 
      received: { mission, location, timestamp },
      agentResponse: agentSummary 
    });
  } catch (err: any) {
    console.error("refine error", err?.message || err);
    return res.status(500).json({ error: "internal_error" });
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Backend listening on http://localhost:${PORT}`);
});
