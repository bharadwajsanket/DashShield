import { useState } from "react";
import { Brain, ChevronRight, Sparkles, AlertTriangle, ShieldCheck } from "lucide-react";

const explanations: Record<string, { title: string; icon: typeof Brain; text: string }> = {
  approved: {
    title: "Why was my claim approved?",
    icon: Sparkles,
    text: "Your claim was auto-approved based on 3 independent signals:\n\n1. Rainfall at your registered zone (Nayapalli) measured 72mm — exceeding the 50mm parametric threshold by 44%.\n\n2. Your GPS location matched your registered delivery zone at the time of the event.\n\n3. 8 out of 10 nearby riders independently confirmed rain disruption, yielding an 80% consensus score (threshold: 60%).\n\nYour fraud score was 0.12 (well below the 0.55 flag threshold), and your Contextual Authenticity Score was 0.94. Combined, these factors triggered an automatic payout of ₹280.",
  },
  parametric: {
    title: "How does parametric insurance work?",
    icon: ShieldCheck,
    text: "Traditional insurance requires you to file a claim, provide proof, and wait for processing. Parametric insurance flips this entirely.\n\nWhen you enroll, your policy defines measurable triggers — like rainfall exceeding 50mm, or an IMD Red Alert in your zone. Our system monitors these triggers using OpenWeatherMap, IMD RSS feeds, NASA EONET, and AQICN APIs every 15 minutes.\n\nWhen a trigger fires in your zone, the system checks your location, validates via rider consensus, runs fraud detection, and — if everything checks out — sends money to your UPI within 60 seconds. No forms. No calls. No waiting.",
  },
  fraud: {
    title: "How is fraud prevented?",
    icon: AlertTriangle,
    text: "DashShield uses a 6-signal defense system designed to catch coordinated spoofing attacks:\n\n• Platform activity gap: Were you actively delivering before the event?\n• Zone cohort analysis: Is 95%+ of your zone claiming within 5 minutes? (Syndicate pattern)\n• Multi-API confirmation: GPS can be faked, but it can't make it rain on OpenWeatherMap.\n• Cell tower vs GPS: Carrier-level location can't be spoofed by apps.\n• 48-hour policy window: Policies bought right before a storm are flagged.\n• Timestamp clustering: Telegram-coordinated submissions show identical timing.\n\nHonest workers flagged by mistake get 50% partial payout immediately, with a 2-hour review SLA.",
  },
};

const AIDecisionAssistant = () => {
  const [active, setActive] = useState<string | null>(null);

  return (
    <section className="card-shadow rounded-xl bg-card p-5 animate-slide-in" style={{ animationDelay: "0.1s" }}>
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
          <Brain className="w-4 h-4 text-primary" />
        </div>
        <div>
          <h2 className="font-heading font-semibold text-foreground">AI Decision Assistant</h2>
          <p className="text-[11px] text-muted-foreground">Explainable AI — understand every decision</p>
        </div>
      </div>

      <div className="space-y-2">
        {Object.entries(explanations).map(([key, { title, icon: Icon }]) => (
          <button
            key={key}
            onClick={() => setActive(active === key ? null : key)}
            className={`w-full flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-all text-left ${
              active === key
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-foreground hover:bg-muted/80"
            }`}
          >
            <Icon className="w-4 h-4 shrink-0" />
            <span className="flex-1">{title}</span>
            <ChevronRight className={`w-4 h-4 shrink-0 transition-transform ${active === key ? "rotate-90" : ""}`} />
          </button>
        ))}
      </div>

      {active && (
        <div className="mt-4 p-4 bg-primary/5 rounded-lg border border-primary/10 animate-fade-in-up">
          <p className="text-sm text-foreground leading-relaxed whitespace-pre-line">
            {explanations[active].text}
          </p>
        </div>
      )}
    </section>
  );
};

export default AIDecisionAssistant;
