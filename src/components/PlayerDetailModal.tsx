import { motion, AnimatePresence } from "motion/react";
import { X, Activity, Zap, BarChart3, HeartPulse } from "lucide-react";
import { cn } from "@/src/lib/utils";

interface PlayerMetrics {
  acwr: number;
  rpe: number;
  monotony: number;
  wellness: number;
}

interface Player {
  id: number;
  name: string;
  load: number;
  metrics: PlayerMetrics;
}

interface PlayerDetailModalProps {
  player: Player | null;
  isOpen: boolean;
  onClose: () => void;
}

export const PlayerDetailModal = ({ player, isOpen, onClose }: PlayerDetailModalProps) => {
  if (!player) return null;

  const tiles = [
    {
      title: "Workload Ratio (ACWR)",
      value: player.metrics.acwr.toFixed(1),
      unit: "Ratio",
      description: "Acute:Chronic ratio. Target: 0.8 - 1.3",
      icon: <Activity className="w-5 h-5 text-teal-600" />,
      status: player.metrics.acwr > 1.5 ? "danger" : player.metrics.acwr > 1.3 ? "warning" : "optimal",
      insight: player.metrics.acwr > 1.5 ? "High injury risk due to sudden spike." : "Safe training zone."
    },
    {
      title: "Internal Load (RPE)",
      value: player.metrics.rpe,
      unit: "/10",
      description: "Perceived intensity x duration.",
      icon: <Zap className="w-5 h-5 text-amber-600" />,
      status: player.metrics.rpe > 8 ? "danger" : player.metrics.rpe > 6 ? "warning" : "optimal",
      insight: player.metrics.rpe > 8 ? "Athlete feels significantly over-exerted." : "Intensity matches capacity."
    },
    {
      title: "Training Monotony",
      value: player.metrics.monotony.toFixed(1),
      unit: "Score",
      description: "Weekly load variability.",
      icon: <BarChart3 className="w-5 h-5 text-indigo-600" />,
      status: player.metrics.monotony > 2.0 ? "danger" : player.metrics.monotony > 1.5 ? "warning" : "optimal",
      insight: player.metrics.monotony > 2.0 ? "Lack of recovery days detected." : "Good training variety."
    },
    {
      title: "Wellness Score",
      value: player.metrics.wellness,
      unit: "%",
      description: "Sleep, Stress, and Soreness.",
      icon: <HeartPulse className="w-5 h-5 text-rose-600" />,
      status: player.metrics.wellness < 60 ? "danger" : player.metrics.wellness < 80 ? "warning" : "optimal",
      insight: player.metrics.wellness < 60 ? "Recovery is lagging behind work." : "Athlete is well-recovered."
    }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <div>
                <h3 className="text-2xl font-bold text-slate-900">{player.name}</h3>
                <p className="text-sm text-slate-500">Predictive Injury Risk Assessment</p>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-full hover:bg-slate-200 transition-colors"
              >
                <X className="w-6 h-6 text-slate-400" />
              </button>
            </div>

            {/* Grid */}
            <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {tiles.map((tile, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="p-5 rounded-2xl border border-slate-100 bg-white shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="p-2 rounded-xl bg-slate-50">
                      {tile.icon}
                    </div>
                    <div className={cn(
                      "text-xs font-bold px-2 py-1 rounded-full uppercase tracking-wider",
                      tile.status === "optimal" ? "bg-emerald-100 text-emerald-700" :
                      tile.status === "warning" ? "bg-amber-100 text-amber-700" :
                      "bg-rose-100 text-rose-700"
                    )}>
                      {tile.status}
                    </div>
                  </div>
                  <div className="mb-1">
                    <span className="text-3xl font-bold text-slate-900">{tile.value}</span>
                    <span className="text-sm font-medium text-slate-400 ml-1">{tile.unit}</span>
                  </div>
                  <div className="text-sm font-bold text-slate-800 mb-1">{tile.title}</div>
                  <p className="text-xs text-slate-500 leading-relaxed mb-3">{tile.description}</p>
                  <div className="pt-3 border-t border-slate-50 text-xs italic text-slate-600">
                    "{tile.insight}"
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Footer */}
            <div className="p-6 bg-slate-50 border-t border-slate-100 flex justify-end">
              <button
                onClick={onClose}
                className="px-6 py-2 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-colors"
              >
                Close Assessment
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
