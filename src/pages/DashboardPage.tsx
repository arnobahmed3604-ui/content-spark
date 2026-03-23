import { DashboardLayout } from "@/components/DashboardLayout";
import { GlassCard } from "@/components/GlassCard";
import { AnimatedSection } from "@/components/AnimatedSection";
import { BarChart3, FileText, Wand2, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { getHistory } from "@/lib/ai-service";

const statCards = [
  { icon: FileText, label: "Content Generated", value: "142", change: "+12 this week", color: "text-primary" },
  { icon: Wand2, label: "Generations Left", value: "358", change: "Pro plan", color: "text-accent" },
  { icon: BarChart3, label: "Words Created", value: "48.2K", change: "+3.1K today", color: "text-primary" },
  { icon: TrendingUp, label: "Time Saved", value: "26h", change: "This month", color: "text-accent" },
];

export default function DashboardPage() {
  const history = getHistory().slice(0, 5);

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto space-y-8">
        <AnimatedSection>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
              <p className="text-muted-foreground mt-1">Welcome back. Here's your content overview.</p>
            </div>
            <Link to="/generator">
              <Button variant="gradient">
                <Wand2 className="w-4 h-4 mr-2" /> New Generation
              </Button>
            </Link>
          </div>
        </AnimatedSection>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {statCards.map((s, i) => (
            <AnimatedSection key={s.label} delay={i * 80}>
              <GlassCard className="group hover:glow-purple">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                    <s.icon className={`w-4.5 h-4.5 ${s.color}`} />
                  </div>
                  <span className="text-sm text-muted-foreground">{s.label}</span>
                </div>
                <div className="text-2xl font-bold">{s.value}</div>
                <div className="text-xs text-muted-foreground mt-1">{s.change}</div>
              </GlassCard>
            </AnimatedSection>
          ))}
        </div>

        {/* Recent */}
        <AnimatedSection delay={350}>
          <GlassCard>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-lg">Recent Generations</h2>
              <Link to="/history" className="text-sm text-primary hover:underline">View all</Link>
            </div>
            {history.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                <Wand2 className="w-8 h-8 mx-auto mb-3 opacity-40" />
                <p>No generations yet. Create your first one!</p>
                <Link to="/generator">
                  <Button variant="gradient" size="sm" className="mt-4">Generate Content</Button>
                </Link>
              </div>
            ) : (
              <div className="space-y-3">
                {history.map(entry => (
                  <div key={entry.id} className="flex items-center justify-between p-3 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors">
                    <div className="min-w-0">
                      <p className="text-sm font-medium truncate">{entry.input.slice(0, 80)}…</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{entry.results.length} formats • {new Date(entry.createdAt).toLocaleDateString()}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </GlassCard>
        </AnimatedSection>
      </div>
    </DashboardLayout>
  );
}
