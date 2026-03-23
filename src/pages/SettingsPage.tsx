import { DashboardLayout } from "@/components/DashboardLayout";
import { GlassCard } from "@/components/GlassCard";
import { AnimatedSection } from "@/components/AnimatedSection";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export default function SettingsPage() {
  const handleSave = () => toast.success("Settings saved");

  return (
    <DashboardLayout>
      <div className="max-w-2xl mx-auto space-y-8">
        <AnimatedSection>
          <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
          <p className="text-muted-foreground mt-1">Manage your account and preferences.</p>
        </AnimatedSection>

        <AnimatedSection delay={100}>
          <GlassCard>
            <h2 className="font-semibold text-lg mb-6">Profile</h2>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-1.5 block">Display Name</label>
                <Input defaultValue="Alex Rivera" className="bg-secondary/30 border-border/50" />
              </div>
              <div>
                <label className="text-sm font-medium mb-1.5 block">Email</label>
                <Input defaultValue="alex@example.com" className="bg-secondary/30 border-border/50" />
              </div>
              <Button variant="gradient" onClick={handleSave}>Save Changes</Button>
            </div>
          </GlassCard>
        </AnimatedSection>

        <AnimatedSection delay={200}>
          <GlassCard>
            <h2 className="font-semibold text-lg mb-4">Subscription</h2>
            <div className="flex items-center justify-between p-4 rounded-lg bg-secondary/30">
              <div>
                <p className="font-medium">Free Plan</p>
                <p className="text-sm text-muted-foreground">10 generations / month</p>
              </div>
              <Button variant="outline" size="sm" onClick={() => toast.info("Upgrade flow would open here")}>
                Upgrade
              </Button>
            </div>
          </GlassCard>
        </AnimatedSection>

        <AnimatedSection delay={300}>
          <GlassCard>
            <h2 className="font-semibold text-lg mb-4">Danger Zone</h2>
            <Button variant="destructive" size="sm" onClick={() => toast.info("Account deletion would happen here")}>
              Delete Account
            </Button>
          </GlassCard>
        </AnimatedSection>
      </div>
    </DashboardLayout>
  );
}
