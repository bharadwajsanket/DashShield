import { Code2, Brain, Palette, Github } from "lucide-react";

const members = [
  {
    icon: Code2,
    name: "Sanket Bharadwaj",
    github: "bharadwajsanket",
    role: "Backend + System Logic",
    contributions: [
      "Designed parametric trigger engine with multi-API polling",
      "Built disruption detection with IMD + OpenWeatherMap integration",
      "Created confidence scoring and zone-level risk assessment",
    ],
  },
  {
    icon: Brain,
    name: "Swayam Jethi",
    github: "Swayam42",
    role: "AI + Decision Engine",
    contributions: [
      "Built explainable AI decision system",
      "Designed 6-signal fraud detection (Isolation Forest + XGBoost)",
      "Defined Contextual Authenticity Score (anti-GPS spoofing)",
    ],
  },
  {
    icon: Palette,
    name: "Uttam Patnaik",
    github: "UttamPatnaik",
    role: "Frontend + UX",
    contributions: [
      "Designed responsive dashboard UI",
      "Built simulation interaction flow and animations",
      "Implemented rider consensus visualization",
    ],
  },
];

const TeamSection = () => (
  <section className="card-shadow rounded-xl bg-card p-5 animate-fade-in-up" style={{ animationDelay: "0.25s" }}>
    <h2 className="font-heading font-semibold text-foreground mb-1">Team & Contributions</h2>
    <p className="text-xs text-muted-foreground mb-4">
      Built with a focus on real-world decision logic, field research with 25+ delivery workers in Bhubaneswar, and adversarial defense against coordinated fraud.
    </p>
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
      {members.map(({ icon: Icon, name, github, role, contributions }) => (
        <div key={name} className="bg-muted rounded-lg p-4">
          <div className="flex items-center gap-2.5 mb-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Icon className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">{name}</p>
              <p className="text-[11px] text-muted-foreground">{role}</p>
            </div>
          </div>
          <ul className="space-y-1.5 mb-3">
            {contributions.map((c) => (
              <li key={c} className="text-xs text-muted-foreground flex items-start gap-1.5">
                <span className="w-1 h-1 rounded-full bg-primary mt-1.5 shrink-0" />
                {c}
              </li>
            ))}
          </ul>
          <a
            href={`https://github.com/${github}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-[11px] text-primary hover:underline"
          >
            <Github className="w-3 h-3" />@{github}
          </a>
        </div>
      ))}
    </div>
  </section>
);

export default TeamSection;
