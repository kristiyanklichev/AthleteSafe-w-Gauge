import { cn } from "@/src/lib/utils";

interface StatusPillProps {
  status: "green" | "yellow" | "red";
  pulse?: boolean;
}

export const StatusPill = ({ status, pulse }: StatusPillProps) => {
  const colors = {
    green: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
    yellow: "bg-amber-500/10 text-amber-600 border-amber-500/20",
    red: "bg-rose-500/10 text-rose-600 border-rose-500/20",
  };

  return (
    <div className={cn(
      "inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold border",
      colors[status]
    )}>
      <span className={cn(
        "w-1.5 h-1.5 rounded-full",
        status === "green" && "bg-emerald-500",
        status === "yellow" && "bg-amber-500",
        status === "red" && "bg-rose-500",
        pulse && "animate-pulse"
      )} />
      {status === "green" && "Healthy"}
      {status === "yellow" && "Watch"}
      {status === "red" && "Action Required"}
    </div>
  );
};
