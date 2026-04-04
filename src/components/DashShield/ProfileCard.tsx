import { User, MapPin, Bike, IndianRupee, Star, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const ProfileCard = () => (
  <section className="card-shadow rounded-xl bg-card p-5 animate-fade-in-up">
    <div className="flex items-center gap-3 mb-4">
      <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center ring-2 ring-primary/20">
        <User className="w-7 h-7 text-primary" />
      </div>
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <h2 className="font-heading font-semibold text-foreground">Ravi Kumar</h2>
          <Badge className="bg-success/15 text-success border-0 text-[10px]">Verified</Badge>
        </div>
        <p className="text-sm text-muted-foreground">Delivery Partner · Since Jan 2024</p>
        <div className="flex items-center gap-1 mt-0.5">
          {[1,2,3,4].map(i => <Star key={i} className="w-3 h-3 fill-warning text-warning" />)}
          <Star className="w-3 h-3 text-warning" />
          <span className="text-[11px] text-muted-foreground ml-1">4.2 · 1,847 deliveries</span>
        </div>
      </div>
    </div>
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      {[
        { icon: Bike, label: "Platform", value: "Zomato" },
        { icon: MapPin, label: "Zone", value: "Nayapalli, BBSR" },
        { icon: IndianRupee, label: "Avg Daily", value: "₹700" },
        { icon: Clock, label: "Active Hours", value: "10am – 10pm" },
      ].map(({ icon: Icon, label, value }) => (
        <div key={label} className="bg-muted rounded-lg p-2.5 text-center">
          <Icon className="w-4 h-4 text-muted-foreground mx-auto mb-1" />
          <p className="text-[11px] text-muted-foreground">{label}</p>
          <p className="text-sm font-semibold font-heading text-foreground">{value}</p>
        </div>
      ))}
    </div>
  </section>
);

export default ProfileCard;
