import { motion } from "motion/react";
import { cn } from "@/src/lib/utils";

interface RiskGaugeProps {
  value: number; // 0 to 100
  label?: string;
  className?: string;
}

export const RiskGauge = ({ value, label, className }: RiskGaugeProps) => {
  // Clamp value between 0 and 100
  const clampedValue = Math.min(Math.max(value, 0), 100);
  
  // Determine color and status text
  const getStatus = (val: number) => {
    if (val <= 40) return { color: "text-emerald-500", bg: "bg-emerald-500", label: "Optimal" };
    if (val <= 75) return { color: "text-amber-500", bg: "bg-amber-500", label: "Caution" };
    return { color: "text-rose-500", bg: "bg-rose-500", label: "High Risk" };
  };

  const status = getStatus(clampedValue);
  const rotation = (clampedValue / 100) * 180 - 90; // -90 to 90 degrees

  return (
    <div className={cn("flex flex-col items-center", className)}>
      <div className="relative w-48 h-24 overflow-hidden">
        {/* Gauge Background */}
        <div className="absolute top-0 left-0 w-48 h-48 rounded-full border-[12px] border-slate-200" />
        
        {/* Gauge Progress (Colored segments) */}
        <div className="absolute top-0 left-0 w-48 h-48 rounded-full border-[12px] border-transparent border-t-emerald-500/20 border-l-emerald-500/20 rotate-45" />
        
        {/* Needle */}
        <motion.div 
          className="absolute bottom-0 left-1/2 w-1 h-20 bg-slate-800 origin-bottom -translate-x-1/2"
          initial={{ rotate: -90 }}
          animate={{ rotate: rotation }}
          transition={{ type: "spring", stiffness: 60, damping: 15 }}
        >
          <div className="absolute -top-1 -left-1 w-3 h-3 rounded-full bg-slate-800" />
        </motion.div>
        
        {/* Center Point */}
        <div className="absolute bottom-0 left-1/2 w-4 h-4 rounded-full bg-slate-800 -translate-x-1/2 translate-y-1/2 border-4 border-white shadow-sm" />
      </div>

      <div className="mt-4 text-center">
        <div className="flex items-center justify-center gap-2">
          <span className={cn("text-2xl font-bold", status.color)}>{clampedValue}%</span>
          <span className={cn("px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider text-white", status.bg)}>
            {status.label}
          </span>
        </div>
        {label && <p className="text-xs text-slate-500 mt-1 font-medium">{label}</p>}
      </div>
      
      {/* Scale Labels */}
      <div className="flex justify-between w-48 mt-1 px-1 text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
        <span>Low</span>
        <span>Peak</span>
      </div>
    </div>
  );
};
