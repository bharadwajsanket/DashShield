import { CheckCircle2, CloudRain, TrendingUp, IndianRupee, ShieldCheck, Clock, AlertTriangle, Zap, Wind, CloudSnow, Flame, Cloud, CloudLightning } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useMemo } from "react";

// Multiple disruption scenarios - one is randomly picked per page load
const DISRUPTION_SCENARIOS = [
  {
    badge: "AUTO-APPROVED",
    badgeColor: "bg-success/15 text-success",
    borderColor: "border-l-success",
    event: { icon: CloudRain, label: "Event", value: "Heavy Rain", sub: "72mm recorded", color: "text-danger" },
    confidence: { value: "92%", sub: "High certainty" },
    fraud: { value: "0.12", sub: "No anomalies" },
    processedIn: { value: "< 60s", sub: "Fully automated" },
    payout: 280,
    claimSuffix: "RAIN-0892",
  },
  {
    badge: "AUTO-APPROVED",
    badgeColor: "bg-success/15 text-success",
    borderColor: "border-l-success",
    event: { icon: Wind, label: "Event", value: "Cyclone Alert", sub: "IMD Red Alert", color: "text-orange-500" },
    confidence: { value: "96%", sub: "Very high certainty" },
    fraud: { value: "0.08", sub: "Clean profile" },
    processedIn: { value: "< 45s", sub: "Pre-trigger payout" },
    payout: 450,
    claimSuffix: "CYCL-1142",
  },
  {
    badge: "AUTO-APPROVED",
    badgeColor: "bg-success/15 text-success",
    borderColor: "border-l-success",
    event: { icon: CloudSnow, label: "Event", value: "Dense Fog", sub: "Visibility < 50m", color: "text-sky-400" },
    confidence: { value: "88%", sub: "High certainty" },
    fraud: { value: "0.15", sub: "No anomalies" },
    processedIn: { value: "< 75s", sub: "API cross-check" },
    payout: 300,
    claimSuffix: "FOG-3347",
  },
  {
    badge: "PARTIAL — REVIEW",
    badgeColor: "bg-orange-500/15 text-orange-500",
    borderColor: "border-l-orange-500",
    event: { icon: Cloud, label: "Event", value: "AQI Spike", sub: "AQI > 300 (Hazardous)", color: "text-orange-400" },
    confidence: { value: "74%", sub: "Moderate certainty" },
    fraud: { value: "0.41", sub: "Zone flagged" },
    processedIn: { value: "< 2 hrs", sub: "Manual review SLA" },
    payout: 140,
    claimSuffix: "AQI-5511",
  },
  {
    badge: "AUTO-APPROVED",
    badgeColor: "bg-success/15 text-success",
    borderColor: "border-l-success",
    event: { icon: CloudLightning, label: "Event", value: "Thunderstorm", sub: "Lightning + hail", color: "text-yellow-500" },
    confidence: { value: "91%", sub: "High certainty" },
    fraud: { value: "0.10", sub: "Verified rider" },
    processedIn: { value: "< 55s", sub: "Fully automated" },
    payout: 350,
    claimSuffix: "TSTM-8823",
  },
  {
    badge: "AUTO-APPROVED",
    badgeColor: "bg-success/15 text-success",
    borderColor: "border-l-success",
    event: { icon: Flame, label: "Event", value: "Extreme Heat", sub: "Temp > 46°C (IMD)", color: "text-red-500" },
    confidence: { value: "85%", sub: "High certainty" },
    fraud: { value: "0.22", sub: "No anomalies" },
    processedIn: { value: "< 90s", sub: "Parametric trigger" },
    payout: 200,
    claimSuffix: "HEAT-2290",
  },
  {
    badge: "AUTO-APPROVED",
    badgeColor: "bg-success/15 text-success",
    borderColor: "border-l-success",
    event: { icon: AlertTriangle, label: "Event", value: "Flash Flood", sub: "NASA EONET trigger", color: "text-blue-500" },
    confidence: { value: "94%", sub: "Very high certainty" },
    fraud: { value: "0.07", sub: "GPS + cell matched" },
    processedIn: { value: "< 50s", sub: "Fully automated" },
    payout: 500,
    claimSuffix: "FLDS-7731",
  },
];

const PAYOUT_LABEL = [
  "Instant Payout",
  "Emergency Payout",
  "Weather Payout",
  "Auto Payout",
  "Disruption Payout",
];

const ClaimResult = () => {
  const now = new Date();
  const timeStr = now.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", second: "2-digit" });
  const dateStr = now.toLocaleDateString("en-IN", { day: "2-digit", month: "2-digit", year: "numeric" }).replace(/\//g, "");

  // Stable random pick per mount
  const scenario = useMemo(() => DISRUPTION_SCENARIOS[Math.floor(Math.random() * DISRUPTION_SCENARIOS.length)], []);
  const payoutLabel = useMemo(() => PAYOUT_LABEL[Math.floor(Math.random() * PAYOUT_LABEL.length)], []);
  const claimId = useMemo(() => `CLM-${dateStr}-${scenario.claimSuffix}`, [scenario, dateStr]);

  const EventIcon = scenario.event.icon;

  return (
    <section className={`rounded-xl bg-card p-5 card-shadow border-l-4 ${scenario.borderColor} animate-slide-in`}>
      <div className="flex items-center gap-2 mb-4">
        <CheckCircle2 className="w-5 h-5 text-success" />
        <h2 className="font-heading font-semibold text-foreground">Claim Result</h2>
        <Badge className={`${scenario.badgeColor} border-0 font-medium text-xs ml-auto`}>{scenario.badge}</Badge>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { icon: EventIcon, label: scenario.event.label, value: scenario.event.value, sub: scenario.event.sub, color: scenario.event.color },
          { icon: TrendingUp, label: "Confidence", value: scenario.confidence.value, sub: scenario.confidence.sub, color: "text-primary" },
          { icon: ShieldCheck, label: "Fraud Score", value: scenario.fraud.value, sub: scenario.fraud.sub, color: "text-success" },
          { icon: Clock, label: "Processed In", value: scenario.processedIn.value, sub: scenario.processedIn.sub, color: "text-muted-foreground" },
        ].map(({ icon: Icon, label, value, sub, color }) => (
          <div key={label} className="bg-muted rounded-lg p-3">
            <Icon className={`w-4 h-4 ${color} mb-1`} />
            <p className="text-[11px] text-muted-foreground">{label}</p>
            <p className="text-sm font-semibold font-heading text-foreground">{value}</p>
            <p className="text-[10px] text-muted-foreground">{sub}</p>
          </div>
        ))}
      </div>
      <div className="mt-4 bg-success/5 rounded-lg p-4 flex items-center justify-between">
        <div>
          <p className="text-[11px] text-muted-foreground">{payoutLabel}</p>
          <p className="text-2xl font-bold font-heading text-success flex items-center gap-1">
            <IndianRupee className="w-5 h-5" />{scenario.payout}
          </p>
        </div>
        <div className="text-right">
          <p className="text-xs text-muted-foreground">Processed at {timeStr} IST</p>
          <p className="text-[11px] text-muted-foreground">Claim ID: <span className="font-mono text-foreground">{claimId}</span></p>
        </div>
      </div>
    </section>
  );
};

export default ClaimResult;
