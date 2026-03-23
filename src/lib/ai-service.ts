// AI Content Generation Service
// Currently uses mock data. Replace generateContent internals with Gemini API call.

export type OutputFormat = 'tweets' | 'summary' | 'blog' | 'linkedin';

export interface GenerateRequest {
  input: string;
  formats: OutputFormat[];
}

export interface GeneratedContent {
  id: string;
  format: OutputFormat;
  content: string;
  createdAt: string;
}

export interface GenerateResponse {
  results: GeneratedContent[];
}

const MOCK_CONTENT: Record<OutputFormat, string[]> = {
  tweets: [
    "🚀 Just discovered something incredible about AI content creation. The future isn't coming — it's already here. Here's what I learned today… 🧵",
    "Hot take: 90% of content creators are spending 10x more time than they need to. Smart repurposing > constant creation. Every. Single. Time.",
    "The gap between good content and great content? Distribution. One piece of content should live in at least 5 places. Here's my framework 👇",
  ],
  summary: [
    "This content explores the transformative impact of AI on modern content creation workflows. Key takeaways include the importance of strategic content repurposing, the efficiency gains from AI-assisted writing, and the growing trend of multi-platform content distribution. The central argument is that quality content, when properly repurposed, can reach 10x more audience without proportional effort increase.",
  ],
  blog: [
    "# The Future of Content Creation: Why AI Repurposing Changes Everything\n\nIn today's digital landscape, content creators face an unprecedented challenge: the demand for fresh, engaging content across multiple platforms has never been higher, yet the time available to create it remains stubbornly finite.\n\n## The Repurposing Revolution\n\nRather than creating unique content for every platform, forward-thinking creators are embracing a new paradigm — intelligent content repurposing. This approach takes a single piece of high-quality content and transforms it into multiple format-specific pieces.\n\n## How AI Makes It Possible\n\nArtificial intelligence has made it possible to automate much of the adaptation process. What once took hours of manual rewriting can now happen in seconds, with AI understanding the nuances of each platform's preferred format and tone.\n\n## Getting Started\n\nThe key is to start with your strongest content — a well-researched article, a compelling presentation, or an insightful video — and let AI help you unlock its full potential across every channel where your audience lives.",
  ],
  linkedin: [
    "I've been thinking a lot about content strategy lately, and I want to share something that completely changed my approach.\n\nFor years, I followed the conventional wisdom: create unique content for every platform. The result? Burnout, inconsistency, and diminishing returns.\n\nThen I discovered the power of strategic repurposing.\n\nHere's what changed:\n→ 3x more content output with less effort\n→ Consistent messaging across all channels\n→ More time for deep thinking and research\n→ Better engagement (because quality went up)\n\nThe game isn't about creating more. It's about distributing smarter.\n\nWhat's your content repurposing strategy? I'd love to hear what's working for you.\n\n#ContentStrategy #AITools #LinkedInTips",
  ],
};

function generateId(): string {
  return Math.random().toString(36).substring(2, 15);
}

/**
 * Generate content using AI.
 * 
 * TO INTEGRATE GEMINI API:
 * 1. Replace the mock delay and content selection below
 * 2. Call your /api/generate endpoint or Gemini SDK directly
 * 3. Parse the response into GeneratedContent[]
 * 
 * Example with Gemini:
 * const model = genAI.getGenerativeModel({ model: "gemini-pro" });
 * const result = await model.generateContent(prompt);
 */
export async function generateContent(request: GenerateRequest): Promise<GenerateResponse> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1500 + Math.random() * 1500));

  const results: GeneratedContent[] = request.formats.map(format => {
    const options = MOCK_CONTENT[format];
    const content = options[Math.floor(Math.random() * options.length)];
    return {
      id: generateId(),
      format,
      content,
      createdAt: new Date().toISOString(),
    };
  });

  return { results };
}

// History management (localStorage simulation)
const HISTORY_KEY = 'repurpose_history';

export interface HistoryEntry {
  id: string;
  input: string;
  results: GeneratedContent[];
  createdAt: string;
}

export function saveToHistory(input: string, results: GeneratedContent[]): void {
  const history = getHistory();
  history.unshift({ id: generateId(), input, results, createdAt: new Date().toISOString() });
  if (history.length > 50) history.pop();
  localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
}

export function getHistory(): HistoryEntry[] {
  try {
    return JSON.parse(localStorage.getItem(HISTORY_KEY) || '[]');
  } catch {
    return [];
  }
}

export function clearHistory(): void {
  localStorage.removeItem(HISTORY_KEY);
}
