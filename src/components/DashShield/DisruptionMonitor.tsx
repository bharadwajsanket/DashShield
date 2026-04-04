import { useState, useEffect, useMemo } from "react";
import { CloudRain, AlertTriangle, Droplets, Wind, Eye, Thermometer, CloudSnow, Flame, Cloud, CloudLightning, Zap } from "lucide-react";

const DISRUPTION_TYPES = [
  {
    icon: CloudRain,
    dropIcon: Droplets,
    title: "Heavy Rain Detected",
    location: "Nayapalli, Bhubaneswar",
    unit: "mm",
    baseValue: 72,
    min: 65,
    max: 85,
    threshold: "Threshold: 50mm",
    triggerText: "Rainfall exceeds protection trigger — auto-claim eligible",
    stats: [
      { icon: Wind, label: "Wind", value: "45 km/h" },
      { icon: Eye, label: "Visibility", value: "1.2 km" },
      { icon: Thermometer, label: "Temp", value: "24°C" },
    ],
  },
  {
    icon: Wind,
    dropIcon: Zap,
    title: "Cyclone Alert — Orange",
    location: "Puri Coastal Belt, Odisha",
    unit: "km/h",
    baseValue: 94,
    min: 85,
    max: 105,
    threshold: "Threshold: 80 km/h",
    triggerText: "Cyclone alert exceeds trigger — pre-emptive payout active",
    stats: [
      { icon: CloudRain, label: "Rainfall", value: "38mm" },
      { icon: Eye, label: "Visibility", value: "0.6 km" },
      { icon: Thermometer, label: "Temp", value: "29°C" },
    ],
  },
  {
    icon: CloudSnow,
    dropIcon: Eye,
    title: "Dense Fog Advisory",
    location: "Bhubaneswar Ring Road",
    unit: "m",
    baseValue: 40,
    min: 20,
    max: 60,
    threshold: "Threshold: 50m visibility",
    triggerText: "Visibility below threshold — fog disruption claim eligible",
    stats: [
      { icon: Wind, label: "Wind", value: "8 km/h" },
      { icon: Thermometer, label: "Temp", value: "16°C" },
      { icon: CloudRain, label: "Humidity", value: "96%" },
    ],
  },
  {
    icon: Cloud,
    dropIcon: AlertTriangle,
    title: "Hazardous AQI Spike",
    location: "Chandrasekharpur, Bhubaneswar",
    unit: "AQI",
    baseValue: 318,
    min: 290,
    max: 340,
    threshold: "Threshold: AQI 300",
    triggerText: "Air quality hazardous — health disruption payout eligible",
    stats: [
      { icon: Wind, label: "Wind", value: "12 km/h" },
      { icon: Eye, label: "Visibility", value: "2.4 km" },
      { icon: Thermometer, label: "Temp", value: "31°C" },
    ],
  },
  {
    icon: CloudLightning,
    dropIcon: Zap,
    title: "Thunderstorm — IMD Red",
    location: "Saheed Nagar, Bhubaneswar",
    unit: "mm",
    baseValue: 58,
    min: 50,
    max: 70,
    threshold: "Threshold: 50mm",
    triggerText: "Thunderstorm + hail confirmed — claim auto-eligible",
    stats: [
      { icon: Wind, label: "Gusts", value: "62 km/h" },
      { icon: Eye, label: "Visibility", value: "0.8 km" },
      { icon: Thermometer, label: "Temp", value: "22°C" },
    ],
  },
  {
    icon: Flame,
    dropIcon: Thermometer,
    title: "Extreme Heat Warning",
    location: "Cuttack National Highway",
    unit: "°C",
    baseValue: 47,
    min: 45,
    max: 49,
    threshold: "Threshold: 46°C",
    triggerText: "Extreme heat exceeds safety trigger — payout activated",
    stats: [
      { icon: Wind, label: "Wind", value: "18 km/h" },
      { icon: Eye, label: "UV Index", value: "11 (Ext)" },
      { icon: CloudRain, label: "Humidity", value: "22%" },
    ],
  },
  {
    icon: AlertTriangle,
    dropIcon: Droplets,
    title: "Flash Flood Detected",
    location: "Mahanadi Basin, Cuttack",
    unit: "mm/hr",
    baseValue: 85,
    min: 75,
    max: 95,
    threshold: "Threshold: 64mm/hr (NASA EONET)",
    triggerText: "Flash flood trigger fired — instant payout initiated",
    stats: [
      { icon: Wind, label: "Wind", value: "38 km/h" },
      { icon: Eye, label: "Visibility", value: "0.4 km" },
      { icon: Thermometer, label: "Temp", value: "27°C" },
    ],
  },
];

const DisruptionMonitor = () => {
  const disruption = useMemo(
    () => DISRUPTION_TYPES[Math.floor(Math.random() * DISRUPTION_TYPES.length)],
    []
  );

  const [displayValue, setDisplayValue] = useState(disruption.baseValue);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setDisplayValue(prev => {
        const delta = (Math.random() - 0.4) * (disruption.max - disruption.min) * 0.05;
        return Math.round(Math.max(disruption.min, Math.min(disruption.max, prev + delta)));
      });
      setTick(t => t + 1);
    }, 3000);
    return () => clearInterval(interval);
  }, [disruption]);

  const timeAgo = `${Math.max(1, Math.floor((tick * 3) / 60))} min ago`;
  const MainIcon = disruption.icon;
  const DropIcon = disruption.dropIcon;

  return (
    <section className="card-shadow rounded-xl bg-card p-5 border-l-4 border-l-danger animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-danger" />
          <h2 className="font-heading font-semibold text-foreground">Disruption Monitor</h2>
        </div>
        <span className="text-[11px] text-muted-foreground">Updated {tick < 1 ? "just now" : timeAgo}</span>
      </div>
      <div className="flex items-center gap-4 bg-danger/5 rounded-lg p-4">
        <div className="relative">
          <MainIcon className="w-10 h-10 text-danger shrink-0" />
          <DropIcon className="w-3 h-3 text-danger/60 absolute -bottom-1 -right-1 animate-rain" />
        </div>
        <div className="flex-1">
          <p className="font-semibold text-foreground">{disruption.title}</p>
          <p className="text-sm text-muted-foreground mt-0.5">{disruption.location} · Live</p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold font-heading text-danger transition-all">
            {displayValue}<span className="text-sm font-normal">{disruption.unit}</span>
          </p>
          <p className="text-[11px] text-muted-foreground">{disruption.threshold}</p>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-2 mt-3">
        {disruption.stats.map(({ icon: Icon, label, value }) => (
          <div key={label} className="bg-muted rounded-lg p-2 text-center">
            <Icon className="w-3.5 h-3.5 text-muted-foreground mx-auto mb-0.5" />
            <p className="text-[10px] text-muted-foreground">{label}</p>
            <p className="text-xs font-semibold text-foreground">{value}</p>
          </div>
        ))}
      </div>
      <div className="mt-3 flex items-center gap-2 text-xs text-danger font-medium">
        <span className="w-2 h-2 rounded-full bg-danger animate-pulse-dot" />
        {disruption.triggerText}
      </div>
    </section>
  );
};

export default DisruptionMonitor;
