import { useState } from "react";
import { motion } from "motion/react";
import { Plus, ShieldCheck, AlertTriangle, Activity, Info } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { StatusPill } from "@/src/components/StatusPill";
import { ConsentBadge } from "@/src/components/ConsentBadge";
import { AppLayout } from "@/src/components/AppLayout";
import { RiskGauge } from "@/src/components/RiskGauge";
import { PlayerDetailModal } from "@/src/components/PlayerDetailModal";
import { cn } from "@/src/lib/utils";

const mockPlayers = [
  { 
    id: 1, 
    name: "Marcus Johnson", 
    position: "Forward", 
    age: 14, 
    status: "green" as const, 
    consent: true, 
    load: 32,
    metrics: { acwr: 1.1, rpe: 4, monotony: 1.2, wellness: 92 }
  },
  { 
    id: 2, 
    name: "Emma Rodriguez", 
    position: "Midfielder", 
    age: 13, 
    status: "red" as const, 
    consent: false, 
    load: 88,
    metrics: { acwr: 1.8, rpe: 9, monotony: 2.4, wellness: 45 }
  },
  { 
    id: 3, 
    name: "Liam Chen", 
    position: "Defender", 
    age: 15, 
    status: "yellow" as const, 
    consent: true, 
    load: 65,
    metrics: { acwr: 1.4, rpe: 7, monotony: 1.9, wellness: 72 }
  },
  { 
    id: 4, 
    name: "Sofia Williams", 
    position: "Goalkeeper", 
    age: 14, 
    status: "green" as const, 
    consent: true, 
    load: 15,
    metrics: { acwr: 0.9, rpe: 3, monotony: 1.1, wellness: 95 }
  },
  { 
    id: 5, 
    name: "Aiden Patel", 
    position: "Forward", 
    age: 13, 
    status: "green" as const, 
    consent: false, 
    load: 42,
    metrics: { acwr: 1.2, rpe: 5, monotony: 1.3, wellness: 88 }
  },
  { 
    id: 6, 
    name: "Olivia Thompson", 
    position: "Midfielder", 
    age: 15, 
    status: "yellow" as const, 
    consent: true, 
    load: 72,
    metrics: { acwr: 1.5, rpe: 8, monotony: 2.1, wellness: 65 }
  },
  { 
    id: 7, 
    name: "Noah Kim", 
    position: "Defender", 
    age: 14, 
    status: "red" as const, 
    consent: false, 
    load: 94,
    metrics: { acwr: 1.9, rpe: 10, monotony: 2.6, wellness: 38 }
  },
  { 
    id: 8, 
    name: "Ava Martinez", 
    position: "Forward", 
    age: 13, 
    status: "green" as const, 
    consent: true, 
    load: 28,
    metrics: { acwr: 1.0, rpe: 4, monotony: 1.2, wellness: 90 }
  },
];

type TabFilter = "all" | "action" | "verified";

export default function App() {
  const [activeTab, setActiveTab] = useState<TabFilter>("all");
  const [selectedPlayer, setSelectedPlayer] = useState(mockPlayers[0]);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  const actionCount = mockPlayers.filter((p) => !p.consent).length;
  const filtered = mockPlayers.filter((p) => {
    if (activeTab === "action") return !p.consent;
    if (activeTab === "verified") return p.consent;
    return true;
  });

  return (
    <AppLayout>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="gradient-hero absolute inset-0" />
        <div className="relative container mx-auto px-4 lg:px-8 py-12 lg:py-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-3xl lg:text-5xl font-bold tracking-tight text-slate-900 leading-tight">
                Stop Injuries Before{" "}
                <span className="text-gradient-teal">They Happen.</span>
              </h1>
              <p className="mt-4 text-base lg:text-lg text-slate-600 max-w-xl leading-relaxed">
                InjuryIQ uses real-time training load data to identify athletes at risk of overuse injuries. Keep your players on the field and performing at their peak.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button variant="hero" size="lg">Get Started</Button>
                <Button variant="heroOutline" size="lg">Watch How It Works</Button>
              </div>

              {/* Trust bar */}
              <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-slate-500">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-teal-600" /> Data-Driven Safety
                </span>
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-teal-600" /> Real-Time Monitoring
                </span>
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-teal-600" /> Privacy Protected
                </span>
              </div>
            </motion.div>

            {/* Risk Gauge Feature Highlight */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="glass-card p-8 flex flex-col items-center justify-center relative cursor-pointer group"
              onClick={() => setIsDetailModalOpen(true)}
            >
              <div className="absolute top-4 left-4 flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest">
                <Activity className="w-3 h-3" /> Live Training Load
              </div>
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 text-[10px] font-bold text-teal-600 uppercase">
                <Info className="w-3 h-3" /> View Assessment
              </div>
              <RiskGauge 
                value={selectedPlayer.load} 
                label={`Current Load: ${selectedPlayer.name}`} 
                className="mt-4"
              />
              <div className="mt-8 grid grid-cols-4 gap-2 w-full">
                {mockPlayers.slice(0, 4).map((p) => (
                  <button
                    key={p.id}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedPlayer(p);
                    }}
                    className={cn(
                      "h-1 w-full rounded-full transition-all",
                      selectedPlayer.id === p.id ? "bg-teal-600" : "bg-slate-200 hover:bg-slate-300"
                    )}
                  />
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Roster Panel */}
      <section className="container mx-auto px-4 lg:px-8 py-8">
        {/* Alert banner */}
        {actionCount > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 rounded-xl border border-rose-200 bg-rose-50 flex items-center justify-between gap-4 flex-wrap"
          >
            <div className="flex items-center gap-3">
              <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0" />
              <p className="text-sm text-slate-900">
                <span className="font-semibold">{actionCount} players</span> missing consent — your club has liability exposure.
              </p>
            </div>
            <Button size="sm" variant="destructive" onClick={() => setActiveTab("action")}>
              Fix now →
            </Button>
          </motion.div>
        )}

        <div className="flex items-center justify-between gap-4 flex-wrap mb-6">
          <div>
            <h2 className="text-xl font-bold text-slate-900">Player Roster</h2>
            <p className="text-sm text-slate-500 mt-0.5">{mockPlayers.length} athletes registered</p>
          </div>
          <Button variant="hero" size="default">
            <Plus className="w-4 h-4" /> Add New Player
          </Button>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-1 mb-6 bg-slate-200 rounded-lg p-1 w-fit">
          {([
            { key: "all" as const, label: "All" },
            { key: "action" as const, label: `Action Required (${actionCount})` },
            { key: "verified" as const, label: "Verified" },
          ]).map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                activeTab === tab.key
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-slate-500 hover:text-slate-900"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Table */}
        <div className="glass-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="text-left px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">Player</th>
                  <th className="text-left px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider hidden sm:table-cell">Position</th>
                  <th className="text-left px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider hidden sm:table-cell">Age</th>
                  <th className="text-left px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                  <th className="text-left px-5 py-3.5 text-xs font-semibold text-slate-500 uppercase tracking-wider">Consent</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((player, i) => (
                  <motion.tr
                    key={player.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.05 }}
                    onClick={() => {
                      setSelectedPlayer(player);
                      setIsDetailModalOpen(true);
                    }}
                    className={cn(
                      "border-b border-slate-100 transition-colors cursor-pointer group",
                      selectedPlayer.id === player.id ? "bg-teal-50/50" : "hover:bg-slate-50"
                    )}
                  >
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-700 group-hover:bg-teal-100 group-hover:text-teal-700 transition-colors">
                          {player.name.split(" ").map((n) => n[0]).join("")}
                        </div>
                        <span className="font-medium text-sm text-slate-900">{player.name}</span>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-sm text-slate-500 hidden sm:table-cell">{player.position}</td>
                    <td className="px-5 py-4 text-sm text-slate-500 hidden sm:table-cell">{player.age}</td>
                    <td className="px-5 py-4">
                      <StatusPill status={player.status} pulse={player.status === "red"} />
                    </td>
                    <td className="px-5 py-4">
                      <ConsentBadge verified={player.consent} />
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Detail Modal */}
      <PlayerDetailModal 
        player={selectedPlayer} 
        isOpen={isDetailModalOpen} 
        onClose={() => setIsDetailModalOpen(false)} 
      />
    </AppLayout>
  );
}
