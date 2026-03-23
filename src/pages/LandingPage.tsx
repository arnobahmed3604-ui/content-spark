import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { AnimatedSection } from "@/components/AnimatedSection";
import { GlassCard } from "@/components/GlassCard";
import { Sparkles, Zap, BarChart3, RefreshCw, ArrowRight, Twitter, FileText, Linkedin, BookOpen } from "lucide-react";

const features = [
  { icon: Twitter, title: "Tweet Threads", desc: "Transform long content into viral tweet threads instantly" },
  { icon: FileText, title: "Blog Posts", desc: "Generate SEO-optimized blog articles from any content" },
  { icon: Linkedin, title: "LinkedIn Posts", desc: "Create professional LinkedIn content that drives engagement" },
  { icon: BookOpen, title: "Summaries", desc: "Distill complex content into clear, concise summaries" },
  { icon: Zap, title: "Instant Generation", desc: "Get results in seconds with our AI-powered engine" },
  { icon: RefreshCw, title: "Regenerate", desc: "Not satisfied? Regenerate with a single click" },
];

const stats = [
  { value: "2.4M+", label: "Pieces Generated" },
  { value: "18K+", label: "Active Users" },
  { value: "4.9/5", label: "User Rating" },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background overflow-hidden">
      {/* Nav */}
      <nav className="fixed top-0 w-full z-50 glass-card border-b border-border/30 rounded-none">
        <div className="container flex items-center justify-between h-16 px-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg gradient-bg flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-bold text-lg gradient-text">Repurpose AI</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Features</a>
            <Link to="/pricing" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Pricing</Link>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/login">
              <Button variant="ghost" size="sm">Log in</Button>
            </Link>
            <Link to="/signup">
              <Button variant="gradient" size="sm">Get Started</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-20 px-6 relative">
        {/* Background glow */}
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full bg-primary/10 blur-[120px] animate-pulse_glow pointer-events-none" />
        <div className="absolute top-40 left-1/4 w-[300px] h-[300px] rounded-full bg-accent/8 blur-[100px] pointer-events-none" />

        <div className="container max-w-4xl mx-auto text-center relative z-10">
          <AnimatedSection>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm mb-8">
              <Sparkles className="w-3.5 h-3.5" />
              AI-Powered Content Repurposing
            </div>
          </AnimatedSection>

          <AnimatedSection delay={100}>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.05] text-balance mb-6">
              One input.{" "}
              <span className="gradient-text">Infinite content.</span>
            </h1>
          </AnimatedSection>

          <AnimatedSection delay={200}>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed text-balance">
              Paste your text or YouTube link and instantly generate tweets, blog posts, LinkedIn content, and summaries — all optimized for each platform.
            </p>
          </AnimatedSection>

          <AnimatedSection delay={300}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/signup">
                <Button variant="gradient" size="lg" className="text-base px-8 h-12">
                  Start Creating Free
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </Link>
              <Link to="/dashboard">
                <Button variant="glass" size="lg" className="text-base px-8 h-12">
                  View Demo
                </Button>
              </Link>
            </div>
          </AnimatedSection>

          {/* Stats */}
          <AnimatedSection delay={450}>
            <div className="flex items-center justify-center gap-12 mt-16">
              {stats.map(s => (
                <div key={s.label} className="text-center">
                  <div className="text-2xl font-bold gradient-text">{s.value}</div>
                  <div className="text-sm text-muted-foreground mt-1">{s.label}</div>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 px-6">
        <div className="container max-w-6xl mx-auto">
          <AnimatedSection>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 text-balance">
                Everything you need to <span className="gradient-text">repurpose content</span>
              </h2>
              <p className="text-muted-foreground text-lg max-w-xl mx-auto">
                Powerful AI tools designed to multiply your content output without multiplying your effort.
              </p>
            </div>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((f, i) => (
              <AnimatedSection key={f.title} delay={i * 80}>
                <GlassCard className="h-full group hover:border-primary/30 hover:glow-purple cursor-default">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <f.icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{f.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{f.desc}</p>
                </GlassCard>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6">
        <div className="container max-w-3xl mx-auto">
          <AnimatedSection>
            <GlassCard glow className="text-center p-12 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 pointer-events-none" />
              <div className="relative z-10">
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">Ready to 10x your content?</h2>
                <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                  Join thousands of creators who are already saving hours every week.
                </p>
                <Link to="/signup">
                  <Button variant="gradient" size="lg" className="text-base px-8 h-12">
                    Get Started — It's Free
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                </Link>
              </div>
            </GlassCard>
          </AnimatedSection>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/30 py-8 px-6">
        <div className="container flex items-center justify-between text-sm text-muted-foreground">
          <span>© 2026 Repurpose AI. All rights reserved.</span>
          <div className="flex gap-6">
            <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
            <a href="#" className="hover:text-foreground transition-colors">Terms</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
