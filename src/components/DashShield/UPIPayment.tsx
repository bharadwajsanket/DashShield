import { useState } from "react";
import { Wallet, CheckCircle2, Smartphone, History, ChevronDown } from "lucide-react";

// Dummy saved UPI IDs as history options
const SAVED_UPI_ACCOUNTS = [
  {
    id: "arjun.delivery@okicici",
    label: "Arjun's ICICI",
    bank: "ICICI Bank",
    avatar: "A",
  },
  {
    id: "riderpay.sanket@ybl",
    label: "Sanket PhonePe",
    bank: "PhonePe / Yes Bank",
    avatar: "S",
  },
];

// Payout amounts cycle through multiple realistic values
const PAYOUT_AMOUNTS = [280, 450, 300, 140, 350, 200, 500];
const PAYOUT_AMOUNT = PAYOUT_AMOUNTS[Math.floor(Math.random() * PAYOUT_AMOUNTS.length)];

const TX_ID = (() => {
  const now = new Date();
  const d = now.toLocaleDateString("en-IN", { day: "2-digit", month: "2-digit", year: "numeric" }).replace(/\//g, "");
  const rand = Math.floor(1000 + Math.random() * 9000);
  return `TXN-UPI-${d}-${rand}`;
})();

const UPIPayment = () => {
  const [upiId, setUpiId] = useState("");
  const [saved, setSaved] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [paid, setPaid] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [selectedSaved, setSelectedSaved] = useState<typeof SAVED_UPI_ACCOUNTS[0] | null>(null);

  const handlePickSaved = (account: typeof SAVED_UPI_ACCOUNTS[0]) => {
    setSelectedSaved(account);
    setUpiId(account.id);
    setShowHistory(false);
  };

  const handleSave = () => {
    if (!upiId.includes("@")) return;
    setSaved(true);
  };

  const handlePayout = () => {
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      setPaid(true);
    }, 2000);
  };

  return (
    <section className="card-shadow rounded-xl bg-card p-5 animate-slide-in" style={{ animationDelay: "0.15s" }}>
      <div className="flex items-center gap-2 mb-4">
        <Wallet className="w-5 h-5 text-primary" />
        <h2 className="font-heading font-semibold text-foreground">Payout Account</h2>
      </div>

      {!saved ? (
        <div className="space-y-3">
          <p className="text-xs text-muted-foreground">Link your UPI ID to receive instant payouts</p>

          {/* Saved history quick-pick */}
          <div>
            <button
              onClick={() => setShowHistory(v => !v)}
              className="flex items-center gap-2 text-xs text-primary hover:underline mb-2"
            >
              <History className="w-3.5 h-3.5" />
              Choose from saved accounts
              <ChevronDown className={`w-3 h-3 transition-transform ${showHistory ? "rotate-180" : ""}`} />
            </button>

            {showHistory && (
              <div className="space-y-1.5 mb-3 animate-fade-in-up">
                {SAVED_UPI_ACCOUNTS.map(acc => (
                  <button
                    key={acc.id}
                    onClick={() => handlePickSaved(acc)}
                    className={`w-full flex items-center gap-3 rounded-lg px-3 py-2.5 border text-left transition-all hover:border-primary/60 ${
                      selectedSaved?.id === acc.id
                        ? "border-primary bg-primary/5"
                        : "border-border bg-muted"
                    }`}
                  >
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                      <span className="text-sm font-bold text-primary">{acc.avatar}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">{acc.label}</p>
                      <p className="text-[11px] text-muted-foreground truncate">{acc.id}</p>
                    </div>
                    <span className="text-[10px] text-muted-foreground shrink-0">{acc.bank}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Manual input */}
          <div className="flex gap-2">
            <div className="flex-1 relative">
              <Smartphone className="w-4 h-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="yourname@upi"
                value={upiId}
                onChange={e => setUpiId(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 rounded-lg bg-muted text-foreground text-sm border border-border focus:border-primary focus:outline-none transition-colors placeholder:text-muted-foreground"
              />
            </div>
            <button
              onClick={handleSave}
              disabled={!upiId.includes("@")}
              className="px-4 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-medium disabled:opacity-40 transition-all hover:opacity-90"
            >
              Link UPI
            </button>
          </div>
          <p className="text-[11px] text-muted-foreground">Supports GPay, PhonePe, Paytm, BHIM & all UPI apps</p>
        </div>
      ) : (
        <div className="space-y-3">
          <div className="flex items-center gap-3 bg-success/5 rounded-lg p-3">
            <CheckCircle2 className="w-5 h-5 text-success" />
            <div>
              <p className="text-sm font-medium text-foreground">{upiId}</p>
              <p className="text-[11px] text-muted-foreground">UPI linked · Ready for payouts</p>
            </div>
            <button onClick={() => { setSaved(false); setPaid(false); setSelectedSaved(null); }} className="text-[11px] text-primary ml-auto hover:underline">Change</button>
          </div>

          {!paid ? (
            <button
              onClick={handlePayout}
              disabled={processing}
              className="w-full py-3 rounded-lg bg-success text-accent-foreground font-heading font-semibold text-sm flex items-center justify-center gap-2 transition-all hover:opacity-90 disabled:opacity-60"
            >
              {processing ? (
                <>
                  <span className="w-4 h-4 border-2 border-accent-foreground/30 border-t-accent-foreground rounded-full animate-spin" />
                  Processing ₹{PAYOUT_AMOUNT} to {upiId}…
                </>
              ) : (
                <>
                  <Wallet className="w-4 h-4" />
                  Process Payout — ₹{PAYOUT_AMOUNT}
                </>
              )}
            </button>
          ) : (
            <div className="bg-success/10 rounded-lg p-4 text-center animate-fade-in-up">
              <CheckCircle2 className="w-8 h-8 text-success mx-auto mb-2" />
              <p className="text-sm font-semibold text-foreground">₹{PAYOUT_AMOUNT} sent to {upiId}</p>
              <p className="text-[11px] text-muted-foreground mt-1">Transaction ID: {TX_ID} · Completed</p>
            </div>
          )}
        </div>
      )}
    </section>
  );
};

export default UPIPayment;
