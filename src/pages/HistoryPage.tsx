import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { GlassCard } from "@/components/GlassCard";
import { AnimatedSection } from "@/components/AnimatedSection";
import { Button } from "@/components/ui/button";
import { getHistory, clearHistory, type HistoryEntry } from "@/lib/ai-service";
import { Trash2, Clock, FileText } from "lucide-react";
import { toast } from "sonner";

export default function HistoryPage() {
  const [history, setHistory] = useState<HistoryEntry[]>(getHistory());

  const handleClear = () => {
    clearHistory();
    setHistory([]);
    toast.success("History cleared");
  };

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-8">
        <AnimatedSection>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">History</h1>
              <p className="text-muted-foreground mt-1">Your previous content generations.</p>
            </div>
            {history.length > 0 && (
              <Button variant="ghost" size="sm" onClick={handleClear} className="text-destructive hover:text-destructive">
                <Trash2 className="w-4 h-4 mr-2" /> Clear All
              </Button>
            )}
          </div>
        </AnimatedSection>

        {history.length === 0 ? (
          <AnimatedSection delay={100}>
            <GlassCard className="text-center py-16">
              <Clock className="w-10 h-10 mx-auto text-muted-foreground/40 mb-4" />
              <p className="text-muted-foreground">No generation history yet.</p>
            </GlassCard>
          </AnimatedSection>
        ) : (
          <div className="space-y-4">
            {history.map((entry, i) => (
              <AnimatedSection key={entry.id} delay={i * 60}>
                <GlassCard>
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div className="min-w-0">
                      <p className="font-medium truncate">{entry.input.slice(0, 120)}</p>
                      <div className="flex items-center gap-3 mt-1.5 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {new Date(entry.createdAt).toLocaleString()}</span>
                        <span className="flex items-center gap-1"><FileText className="w-3 h-3" /> {entry.results.length} format{entry.results.length > 1 ? 's' : ''}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {entry.results.map(r => (
                      <span key={r.id} className="text-xs px-2.5 py-1 rounded-md bg-primary/10 text-primary font-medium uppercase tracking-wider">
                        {r.format}
                      </span>
                    ))}
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
