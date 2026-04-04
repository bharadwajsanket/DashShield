import { Shield, Github } from "lucide-react";

const Footer = () => (
  <footer className="text-center py-8 border-t border-border mt-2">
    <div className="flex items-center justify-center gap-1.5 mb-2">
      <Shield className="w-4 h-4 text-primary" />
      <span className="font-heading font-semibold text-foreground">DashShield</span>
    </div>
    <p className="text-xs text-muted-foreground mb-3">Built for Guidewire DevTrails Hackathon 2026</p>
    <a
      href="https://github.com/bharadwajsanket/DashShield"
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1.5 text-xs text-primary hover:underline"
    >
      <Github className="w-3.5 h-3.5" />
      View on GitHub
    </a>
  </footer>
);

export default Footer;
