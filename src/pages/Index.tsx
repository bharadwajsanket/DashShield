import { useState } from "react";
import { Zap, Loader2, RotateCcw } from "lucide-react";
import Header from "@/components/DashShield/Header";
import ProfileCard from "@/components/DashShield/ProfileCard";
import PolicyCard from "@/components/DashShield/PolicyCard";
import DisruptionMonitor from "@/components/DashShield/DisruptionMonitor";
import ConsensusValidation from "@/components/DashShield/ConsensusValidation";
import ClaimResult from "@/components/DashShield/ClaimResult";
import AIDecisionAssistant from "@/components/DashShield/AIDecisionAssistant";
import UPIPayment from "@/components/DashShield/UPIPayment";
import PremiumCalculator from "@/components/DashShield/PremiumCalculator";
import TeamSection from "@/components/DashShield/TeamSection";
import Footer from "@/components/DashShield/Footer";

const Index = () => {
  const [simState, setSimState] = useState<"idle" | "loading" | "done">("idle");

  const handleSimulate = () => {
    if (simState !== "idle") return;
    setSimState("loading");
    setTimeout(() => setSimState("done"), 2200);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="max-w-5xl mx-auto px-4 py-6">
        {/* Top row: Profile + Policy side by side on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <ProfileCard />
          <PolicyCard />
        </div>

        {/* Premium Calculator — full width */}
        <div className="mb-4">
          <PremiumCalculator />
        </div>

        {/* Monitor + Consensus side by side on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <DisruptionMonitor />
          <ConsensusValidation />
        </div>

        {/* Action button */}
        <div className="mb-4">
          {simState === "idle" && (
            <button
              onClick={handleSimulate}
              className="w-full py-4 rounded-xl bg-primary text-primary-foreground font-heading font-semibold text-base flex items-center justify-center gap-2 transition-all hover:opacity-90 active:scale-[0.98] card-shadow"
            >
              <Zap className="w-5 h-5" />
              Simulate Disruption Event
            </button>
          )}

          {simState === "loading" && (
            <div className="w-full py-8 rounded-xl bg-card card-shadow flex flex-col items-center gap-3 animate-fade-in-up">
              <Loader2 className="w-8 h-8 text-primary animate-spin" />
              <p className="text-sm font-medium text-foreground">Verifying disruption signals…</p>
              <p className="text-[11px] text-muted-foreground">Cross-referencing weather APIs, rider consensus, and fraud engine</p>
              <div className="w-64 h-1.5 rounded-full bg-muted overflow-hidden">
                <div className="h-full bg-primary rounded-full animate-shimmer" />
              </div>
            </div>
          )}

          {simState === "done" && (
            <button
              onClick={() => setSimState("idle")}
              className="flex items-center gap-1.5 text-xs text-primary hover:underline ml-auto"
            >
              <RotateCcw className="w-3 h-3" />
              Reset Simulation
            </button>
          )}
        </div>

        {/* Results */}
        {simState === "done" && (
          <div className="space-y-4 mb-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <ClaimResult />
              <UPIPayment />
            </div>
            <AIDecisionAssistant />
          </div>
        )}

        <TeamSection />
        <Footer />
      </main>
    </div>
  );
};

export default Index;
