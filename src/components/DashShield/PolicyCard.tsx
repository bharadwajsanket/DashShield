import { ShieldCheck, Calendar, TrendingDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const PolicyCard = () => (
  <section className="card-shadow rounded-xl bg-card p-5 animate-fade-in-up" style={{ animationDelay: "0.05s" }}>
    <div className="flex items-center justify-between mb-3">
      <div className="flex items-center gap-2">
        <ShieldCheck className="w-5 h-5 text-primary" />
        <h2 className="font-heading font-semibold text-foreground">Income Protection Policy</h2>
      </div>
      <Badge className="bg-success/15 text-success border-0 font-medium text-xs">ACTIVE</Badge>
    </div>
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      <div className="bg-muted rounded-lg p-3">
        <p className="text-[11px] text-muted-foreground">Weekly Premium</p>
        <p className="text-lg font-bold font-heading text-foreground">₹20</p>
      </div>
      <div className="bg-muted rounded-lg p-3">
        <p className="text-[11px] text-muted-foreground">Coverage</p>
        <p className="text-lg font-bold font-heading text-foreground">₹300<span className="text-sm font-normal text-muted-foreground">/day</span></p>
      </div>
      <div className="bg-muted rounded-lg p-3">
        <div className="flex items-center gap-1 mb-1">
          <Calendar className="w-3 h-3 text-muted-foreground" />
          <p className="text-[11px] text-muted-foreground">Enrolled</p>
        </div>
        <p className="text-sm font-semibold font-heading text-foreground">12 Jan 2024</p>
      </div>
      <div className="bg-muted rounded-lg p-3">
        <div className="flex items-center gap-1 mb-1">
          <TrendingDown className="w-3 h-3 text-muted-foreground" />
          <p className="text-[11px] text-muted-foreground">Claims</p>
        </div>
        <p className="text-sm font-semibold font-heading text-foreground">3 <span className="text-[11px] font-normal text-muted-foreground">past 90d</span></p>
      </div>
    </div>
    <div className="mt-3 text-[11px] text-muted-foreground">
      Policy ID: <span className="font-mono text-foreground">DS-BBSR-2024-00471</span> · Auto-renews every Monday
    </div>
  </section>
);

export default PolicyCard;
