import { useState, useEffect } from "react";
import { Calculator, Zap, SlidersHorizontal, ChevronDown, ChevronUp, IndianRupee } from "lucide-react";

const PLANS = [
  { label: "Basic", coverage: 150, premium: 10, days: 7 },
  { label: "Standard", coverage: 300, premium: 20, days: 7 },
  { label: "Premium", coverage: 500, premium: 32, days: 7 },
  { label: "Elite", coverage: 750, premium: 45, days: 7 },
];

const PremiumCalculator = () => {
  const [mode, setMode] = useState<"auto" | "manual">("auto");
  const [hoursPerDay, setHoursPerDay] = useState(8);
  const [zone, setZone] = useState("urban");
  const [selectedPlan, setSelectedPlan] = useState(1); // default Standard
  const [expanded, setExpanded] = useState(false);

  // Auto-calc logic: derive recommended plan based on hours + zone
  const autoPlan = (() => {
    let score = hoursPerDay;
    if (zone === "urban") score += 2;
    if (zone === "suburban") score += 1;
    if (score <= 6) return 0;
    if (score <= 9) return 1;
    if (score <= 11) return 2;
    return 3;
  })();

  const activePlan = mode === "auto" ? autoPlan : selectedPlan;
  const plan = PLANS[activePlan];

  const monthlyPremium = Math.round((plan.premium / plan.days) * 30);
  const annualPremium = monthlyPremium * 12;
  const expectedClaims = zone === "urban" ? 4 : zone === "suburban" ? 2.5 : 1.5;
  const expectedPayout = Math.round(plan.coverage * expectedClaims);

  return (
    <section className="card-shadow rounded-xl bg-card p-5 animate-fade-in-up" style={{ animationDelay: "0.05s" }}>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
            <Calculator className="w-4 h-4 text-primary" />
          </div>
          <div>
            <h2 className="font-heading font-semibold text-foreground">Premium Calculator</h2>
            <p className="text-[11px] text-muted-foreground">Estimate your ideal coverage</p>
          </div>
        </div>
        {/* Mode toggle */}
        <div className="flex items-center gap-1.5 bg-muted rounded-lg p-1">
          <button
            onClick={() => setMode("auto")}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
              mode === "auto"
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Zap className="w-3 h-3" /> Auto
          </button>
          <button
            onClick={() => setMode("manual")}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
              mode === "manual"
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <SlidersHorizontal className="w-3 h-3" /> Manual
          </button>
        </div>
      </div>

      {/* Inputs */}
      <div className="space-y-3 mb-4">
        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="text-xs text-muted-foreground">Hours on road per day</label>
            <span className="text-xs font-semibold text-foreground">{hoursPerDay}h</span>
          </div>
          <input
            type="range"
            min={2}
            max={16}
            value={hoursPerDay}
            onChange={e => setHoursPerDay(Number(e.target.value))}
            className="w-full accent-primary"
          />
          <div className="flex justify-between text-[10px] text-muted-foreground mt-0.5">
            <span>2h</span><span>16h</span>
          </div>
        </div>

        <div>
          <label className="text-xs text-muted-foreground block mb-1">Delivery zone</label>
          <div className="flex gap-2">
            {[
              { key: "urban", label: "Urban" },
              { key: "suburban", label: "Suburban" },
              { key: "rural", label: "Rural" },
            ].map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setZone(key)}
                className={`flex-1 py-2 rounded-lg text-xs font-medium border transition-all ${
                  zone === key
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border bg-muted text-muted-foreground hover:text-foreground"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Plan selector (manual only) */}
      {mode === "manual" && (
        <div className="grid grid-cols-4 gap-2 mb-4">
          {PLANS.map((p, i) => (
            <button
              key={p.label}
              onClick={() => setSelectedPlan(i)}
              className={`rounded-lg p-2 text-center border transition-all ${
                selectedPlan === i
                  ? "border-primary bg-primary/10"
                  : "border-border bg-muted hover:border-primary/40"
              }`}
            >
              <p className={`text-xs font-semibold ${selectedPlan === i ? "text-primary" : "text-foreground"}`}>{p.label}</p>
              <p className="text-[10px] text-muted-foreground mt-0.5">₹{p.premium}/wk</p>
            </button>
          ))}
        </div>
      )}

      {/* Auto suggestion chip */}
      {mode === "auto" && (
        <div className="flex items-center gap-2 text-[11px] text-primary bg-primary/5 rounded-lg px-3 py-2 mb-4">
          <Zap className="w-3 h-3 shrink-0" />
          Auto-selected <strong>{plan.label}</strong> based on your profile
        </div>
      )}

      {/* Result card */}
      <div className="bg-gradient-to-br from-primary/10 to-success/5 rounded-xl p-4 border border-primary/10">
        <div className="grid grid-cols-3 gap-3 text-center">
          <div>
            <p className="text-[10px] text-muted-foreground">Weekly Premium</p>
            <p className="text-lg font-bold font-heading text-foreground flex items-center justify-center gap-0.5">
              <IndianRupee className="w-4 h-4" />{plan.premium}
            </p>
          </div>
          <div>
            <p className="text-[10px] text-muted-foreground">Daily Coverage</p>
            <p className="text-lg font-bold font-heading text-success flex items-center justify-center gap-0.5">
              <IndianRupee className="w-4 h-4" />{plan.coverage}
            </p>
          </div>
          <div>
            <p className="text-[10px] text-muted-foreground">Est. Monthly</p>
            <p className="text-lg font-bold font-heading text-foreground flex items-center justify-center gap-0.5">
              <IndianRupee className="w-4 h-4" />{monthlyPremium}
            </p>
          </div>
        </div>

        {/* Expand details */}
        <button
          onClick={() => setExpanded(v => !v)}
          className="w-full flex items-center justify-center gap-1 text-[11px] text-primary mt-3 hover:underline"
        >
          {expanded ? <><ChevronUp className="w-3 h-3" /> Hide details</> : <><ChevronDown className="w-3 h-3" /> Show yearly breakdown</>}
        </button>

        {expanded && (
          <div className="mt-3 pt-3 border-t border-primary/10 space-y-1.5 animate-fade-in-up">
            <div className="flex justify-between text-xs">
              <span className="text-muted-foreground">Annual premium</span>
              <span className="font-semibold text-foreground">₹{annualPremium}</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-muted-foreground">Expected claims/yr ({zone})</span>
              <span className="font-semibold text-foreground">{expectedClaims.toFixed(1)}×</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-muted-foreground">Expected annual payout</span>
              <span className="font-semibold text-success">₹{expectedPayout}</span>
            </div>
            <div className="flex justify-between text-xs pt-1 border-t border-primary/10">
              <span className="text-muted-foreground font-medium">Net benefit</span>
              <span className={`font-bold ${expectedPayout - annualPremium > 0 ? "text-success" : "text-danger"}`}>
                ₹{expectedPayout - annualPremium > 0 ? "+" : ""}{expectedPayout - annualPremium}
              </span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default PremiumCalculator;
