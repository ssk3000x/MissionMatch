# VolunteerConnect
## Inspiration
As seniors in high school, we've seen our peers (us included!) create non-profits and service-oriented projects. However, one of the most **difficult** parts of it is building it up - getting partnerships, finding places to hold local events, raising funding, etc. Additionally, having to call and reach out to all of these places is incredibly tedious. 

Flat out, we've seen these hurdles discourage people from creating organizations and ideas that, otherwise, could have made real impact in our communities. 

So we built MissionMatch.
## What it does
MissionMatch uses a series of AI agents to help businesses and non-profits find the necessary resources **they need** to thrive. 

First, the user inputs the location in which the project is based out of. Then, they input a "mission statement" - or a brief summary on what it intends to do. MissionMatch then analyzes this, and asks some follow-up questions about what the organization needs help with. Using all of this information, MissionMatch uses reasoning to come up with potential resources that could partner with or help the user's organization. 

Afterwards, a tandem of agents scrape the internet for relevant organizations, which are then aggregated into a **dashboard UI** that's easy for the user to see. The user then has the option to deploy conversational voice AI agents that can **automatically call these outside organizations**, and set up meeting times or just establish a connection with them. This can be done immediately, or scheduled for a different time.

Finally, MissionMatch analyzes the call transcripts and extracts **key information** (meeting times, point of contact for these outside organizations, etc.) to be displayed for the user.

## How we built it

**Frontend**
- Next.js 16 (App Router) + React 19 for framework
- Tailwind CSS 4 and Framer Motion for UI

**Backend**
- Node.js + Express + TypeScript
- LangChain / Agent Scaffold + Anthropic Claude model integrated for LLM agents
- Tavily search wrapper
- VAPI used for voice AI agent orchestration
- ElevenLabs TTS integrated for natural voice generation
- Supabase for storing call summaries

## Challenges we ran into
The voice agent was a bit tough to implement. Normally, ElevenLabs is implemented with Twilio, but we had to eventually pivot to Vapi, which required time to integrate. Additionally, it was our first time working with agents, so working with LangChain and tools took some time to get used to, but we were able to persist through and build them out.
## Accomplishments that we're proud of
We're proud that we were able to integrate voice agents into this project, as we both feel it's a really powerful implementation of AI. Beyond that, we're proud that we addressed a really pressing issue that we have felt throughout high school, and one that we've heard countless friends talking about when creating their own non-profits or businesses. It's also beneficial for local communities, because strengthened initiatives ultimately means more social impact for those who need it the most.
## What we learned
We learned that it's important to familiarize ourselves with as many APIs and AI-powered tools as possible. There's so much powerful technology out there, and and the Vapi pivot was a prime example of that.
## What's next for MissionMatch
We plan to expand MissionMatch for more broad use-cases and industries. Further, if we receive more demand, we might even develop it into a company and powerful product that can help businesses worldwide.
