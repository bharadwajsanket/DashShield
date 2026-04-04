import { useState, useEffect } from "react";
import { CheckCircle2, XCircle, Users, MapPin } from "lucide-react";

const riderData = [
  { name: "Arjun D.", zone: "Nayapalli", confirmed: true, time: "2m ago" },
  { name: "Priya S.", zone: "Patia", confirmed: true, time: "3m ago" },
  { name: "Rahul M.", zone: "Saheed Nagar", confirmed: true, time: "1m ago" },
  { name: "Sneha K.", zone: "Nayapalli", confirmed: true, time: "4m ago" },
  { name: "Vikram P.", zone: "Jaydev Vihar", confirmed: true, time: "2m ago" },
  { name: "Anita R.", zone: "Chandrasekharpur", confirmed: true, time: "5m ago" },
  { name: "Deepak T.", zone: "Nayapalli", confirmed: true, time: "1m ago" },
  { name: "Meera L.", zone: "Khandagiri", confirmed: true, time: "3m ago" },
  { name: "Suresh B.", zone: "Unit 4", confirmed: false, time: "6m ago" },
  { name: "Kavita N.", zone: "Master Canteen", confirmed: false, time: "7m ago" },
];

const ConsensusValidation = () => {
  const [visibleCount, setVisibleCount] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setVisibleCount(prev => {
        if (prev >= riderData.length) {
          clearInterval(timer);
          return prev;
        }
        return prev + 1;
      });
    }, 200);
    return () => clearInterval(timer);
  }, []);

  const confirmedCount = riderData.slice(0, visibleCount).filter(r => r.confirmed).length;
  const pct = visibleCount > 0 ? Math.round((confirmedCount / visibleCount) * 100) : 0;

  return (
    <section className="card-shadow rounded-xl bg-card p-5 animate-fade-in-up" style={{ animationDelay: "0.15s" }}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Users className="w-5 h-5 text-primary" />
          <h2 className="font-heading font-semibold text-foreground">Rider Consensus Validation</h2>
        </div>
        <span className="text-[11px] text-muted-foreground">{visibleCount}/{riderData.length} signals</span>
      </div>

      <div className="space-y-1.5 mb-4">
        {riderData.slice(0, visibleCount).map((rider, i) => (
          <div
            key={i}
            className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm animate-fade-in-up ${
              rider.confirmed ? "bg-success/5" : "bg-danger/5"
            }`}
            style={{ animationDuration: "0.3s" }}
          >
            {rider.confirmed ? (
              <CheckCircle2 className="w-4 h-4 text-success shrink-0" />
            ) : (
              <XCircle className="w-4 h-4 text-danger shrink-0" />
            )}
            <span className="font-medium text-foreground text-xs">{rider.name}</span>
            <span className="flex items-center gap-0.5 text-[11px] text-muted-foreground">
              <MapPin className="w-3 h-3" />{rider.zone}
            </span>
            <span className="text-[11px] text-muted-foreground ml-auto">{rider.time}</span>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-3 mb-4">
        <div className="flex-1 bg-muted rounded-full h-3 overflow-hidden">
          <div
            className="h-full bg-success rounded-full transition-all duration-700"
            style={{ width: `${pct}%` }}
          />
        </div>
        <span className="text-sm font-bold font-heading text-success min-w-[40px] text-right">{pct}%</span>
      </div>

      <p className="text-sm font-medium text-foreground mb-1">
        {pct >= 70 ? "✓ Majority confirms disruption" : "Collecting rider signals…"}
      </p>
      <p className="text-xs text-muted-foreground leading-relaxed">
        This system solves the <strong className="text-foreground">last-100-meter problem</strong> by using rider consensus to validate real-world conditions beyond city-level weather APIs. Each rider's GPS, zone, and active delivery status are cross-verified.
      </p>
    </section>
  );
};

export default ConsensusValidation;
