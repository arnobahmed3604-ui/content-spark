// AI Content Generation Service
// Powered by Google Gemini API + n8n + Supadata YouTube Transcript

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

const GEMINI_API_KEY = 'AIzaSyBOy7xbKj2kHp6LXopERPzGiRNeqWa_bfs';
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`;
const N8N_WEBHOOK_URL =
  'https://server3.automationlearners.pro/webhook/youtube-transcript';

function generateId(): string {
  return Math.random().toString(36).substring(2, 15);
}

// ─── YouTube Helpers ──────────────────────────────────────────────────────────

function extractYouTubeVideoId(url: string): string | null {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/v\/)([a-zA-Z0-9_-]{11})/,
    /youtube\.com\/shorts\/([a-zA-Z0-9_-]{11})/,
  ];
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }
  return null;
}

function isYouTubeUrl(input: string): boolean {
  return /(?:youtube\.com|youtu\.be)/.test(input.trim());
}

async function fetchTranscriptFromN8N(videoId: string): Promise<string> {
  const response = await fetch(N8N_WEBHOOK_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ videoId }),
  });

  if (!response.ok) {
    throw new Error(`Transcript fetch failed: ${response.statusText}`);
  }

  const data = await response.json();
  return data?.transcript || '';
}

// ─── Gemini Helpers ───────────────────────────────────────────────────────────

function buildPrompt(
  input: string,
  format: OutputFormat,
  isTranscript: boolean,
): string {
  const context = isTranscript
    ? 'The following is a transcript from a YouTube video. Use it to create the content below.'
    : 'Use the following content to create the output below.';

  const formatInstructions: Record<OutputFormat, string> = {
    tweets: `Generate 3 engaging tweets.
Each tweet must:
- Be under 280 characters
- Be separated by "---"
- Include relevant emojis
- Have a hook or call to action
- Be standalone (no thread numbering)
Return ONLY the 3 tweets separated by "---", nothing else.`,

    summary: `Write a 3–5 sentence summary.
- Capture the key points
- Be clear and concise
- Be written in third person
- Highlight the main takeaway
Return ONLY the summary paragraph, nothing else.`,

    blog: `Write a full blog post.
- Have a compelling H1 title using markdown (#)
- Include 2–3 sections with H2 headings (##)
- Be 300–500 words
- Use markdown formatting
Return ONLY the blog post in markdown format, nothing else.`,

    linkedin: `Write a LinkedIn post.
- Start with a strong hook
- Use short paragraphs and line breaks
- Include 3–5 bullet points with → arrows
- End with a question to drive engagement
- Include 3–5 relevant hashtags
Return ONLY the LinkedIn post, nothing else.`,
  };

  return `${context}

Content:
${input}

Task: ${formatInstructions[format]}`;
}

async function callGemini(prompt: string): Promise<string> {
  const response = await fetch(GEMINI_API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: { temperature: 0.8, maxOutputTokens: 1024 },
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(
      `Gemini API error: ${error?.error?.message || response.statusText}`,
    );
  }

  const data = await response.json();
  const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) throw new Error('No content returned from Gemini API.');
  return text.trim();
}

// ─── Main Export ──────────────────────────────────────────────────────────────

export async function generateContent(
  request: GenerateRequest,
): Promise<GenerateResponse> {
  const contentInput = request.input.trim();
  const isYT = isYouTubeUrl(contentInput);

  let finalInput = contentInput;
  let isTranscript = false;

  if (isYT) {
    const videoId = extractYouTubeVideoId(contentInput);
    if (!videoId) {
      throw new Error(
        'Could not extract video ID from the YouTube URL. Please check the URL and try again.',
      );
    }

    try {
      const transcript = await fetchTranscriptFromN8N(videoId);
      if (transcript && transcript.length > 50) {
        finalInput = transcript;
        isTranscript = true;
      } else {
        throw new Error('Empty transcript received.');
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      throw new Error(
        `Could not fetch transcript for this video. Make sure the video has captions enabled. (${message})`,
      );
    }
  }

  const results: GeneratedContent[] = await Promise.all(
    request.formats.map(async format => {
      const prompt = buildPrompt(finalInput, format, isTranscript);
      const content = await callGemini(prompt);
      return {
        id: generateId(),
        format,
        content,
        createdAt: new Date().toISOString(),
      };
    }),
  );

  return { results };
}

// ─── History Management ───────────────────────────────────────────────────────

const HISTORY_KEY = 'repurpose_history';

export interface HistoryEntry {
  id: string;
  input: string;
  results: GeneratedContent[];
  createdAt: string;
}

export function saveToHistory(
  input: string,
  results: GeneratedContent[],
): void {
  const history = getHistory();
  history.unshift({
    id: generateId(),
    input,
    results,
    createdAt: new Date().toISOString(),
  });
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
