import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { GlassCard } from "@/components/GlassCard";
import { AnimatedSection } from "@/components/AnimatedSection";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Wand2, Copy, RefreshCw, Twitter, FileText, Linkedin, BookOpen, Loader2, Check } from "lucide-react";
import { generateContent, saveToHistory, type OutputFormat, type GeneratedContent } from "@/lib/ai-service";

const FORMAT_OPTIONS: { id: OutputFormat; label: string; icon: React.ElementType }[] = [
  { id: "tweets", label: "Tweets", icon: Twitter },
  { id: "summary", label: "Summary", icon: BookOpen },
  { id: "blog", label: "Blog Post", icon: FileText },
  { id: "linkedin", label: "LinkedIn", icon: Linkedin },
];

export default function GeneratorPage() {
  const [input, setInput] = useState("");
  const [selectedFormats, setSelectedFormats] = useState<OutputFormat[]>(["tweets"]);
  const [results, setResults] = useState<GeneratedContent[]>([]);
  const [loading, setLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const toggleFormat = (id: OutputFormat) => {
    setSelectedFormats(prev =>
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    );
  };

  const handleGenerate = async () => {
    if (!input.trim()) {
      toast.error("Please enter some content or a YouTube URL");
      return;
    }
    if (selectedFormats.length === 0) {
      toast.error("Select at least one output format");
      return;
    }

    setLoading(true);
    setResults([]);
    try {
      const response = await generateContent({ input, formats: selectedFormats });
      setResults(response.results);
      saveToHistory(input, response.results);
      toast.success("Content generated successfully!");
    } catch {
      toast.error("Generation failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async (id: string, content: string) => {
    await navigator.clipboard.writeText(content);
    setCopiedId(id);
    toast.success("Copied to clipboard");
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleRegenerate = async (format: OutputFormat) => {
    setLoading(true);
    try {
      const response = await generateContent({ input, formats: [format] });
      setResults(prev => prev.map(r => r.format === format ? response.results[0] : r));
      toast.success("Regenerated!");
    } catch {
      toast.error("Regeneration failed.");
    } finally {
      setLoading(false);
    }
  };

  const formatLabel = (f: OutputFormat) => FORMAT_OPTIONS.find(o => o.id === f)?.label || f;

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-8">
        <AnimatedSection>
          <h1 className="text-2xl font-bold tracking-tight">Content Generator</h1>
          <p className="text-muted-foreground mt-1">Paste your content or YouTube URL and select output formats.</p>
        </AnimatedSection>

        {/* Input */}
        <AnimatedSection delay={100}>
          <GlassCard>
            <Textarea
              placeholder="Paste your text or YouTube URL here..."
              className="min-h-[140px] bg-secondary/30 border-border/50 resize-none text-base placeholder:text-muted-foreground/60 focus:ring-primary/40"
              value={input}
              onChange={e => setInput(e.target.value)}
            />

            {/* Format selection */}
            <div className="mt-5">
              <p className="text-sm font-medium mb-3">Output Formats</p>
              <div className="flex flex-wrap gap-3">
                {FORMAT_OPTIONS.map(f => {
                  const selected = selectedFormats.includes(f.id);
                  return (
                    <button
                      key={f.id}
                      onClick={() => toggleFormat(f.id)}
                      className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 active:scale-[0.97] ${
                        selected
                          ? "gradient-bg text-primary-foreground shadow-lg shadow-primary/20"
                          : "bg-secondary/50 text-muted-foreground hover:text-foreground hover:bg-secondary"
                      }`}
                    >
                      <f.icon className="w-4 h-4" />
                      {f.label}
                    </button>
                  );
                })}
              </div>
            </div>

            <Button
              variant="gradient"
              size="lg"
              className="mt-6 w-full h-12 text-base"
              onClick={handleGenerate}
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  Generating...
                </>
              ) : (
                <>
                  <Wand2 className="w-4 h-4 mr-2" />
                  Generate Content
                </>
              )}
            </Button>
          </GlassCard>
        </AnimatedSection>

        {/* Loading skeleton */}
        {loading && results.length === 0 && (
          <div className="space-y-4">
            {selectedFormats.map(f => (
              <GlassCard key={f} className="animate-pulse">
                <div className="h-4 w-24 bg-secondary/60 rounded mb-4" />
                <div className="space-y-2">
                  <div className="h-3 bg-secondary/40 rounded w-full" />
                  <div className="h-3 bg-secondary/40 rounded w-4/5" />
                  <div className="h-3 bg-secondary/40 rounded w-3/5" />
                </div>
              </GlassCard>
            ))}
          </div>
        )}

        {/* Results */}
        {results.length > 0 && (
          <div className="space-y-4">
            {results.map((r, i) => (
              <AnimatedSection key={r.id} delay={i * 100}>
                <GlassCard className="group">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm font-semibold gradient-text uppercase tracking-wider">
                      {formatLabel(r.format)}
                    </span>
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-muted-foreground hover:text-foreground"
                        onClick={() => handleCopy(r.id, r.content)}
                      >
                        {copiedId === r.id ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-muted-foreground hover:text-foreground"
                        onClick={() => handleRegenerate(r.format)}
                        disabled={loading}
                      >
                        <RefreshCw className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="text-sm leading-relaxed whitespace-pre-wrap text-foreground/90">
                    {r.content}
                  </div>
                </GlassCard>
              </AnimatedSection>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
