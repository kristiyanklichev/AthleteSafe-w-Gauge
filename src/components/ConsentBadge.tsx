import { ShieldCheck, ShieldAlert } from "lucide-react";
import { cn } from "@/src/lib/utils";

interface ConsentBadgeProps {
  verified: boolean;
}

export const ConsentBadge = ({ verified }: ConsentBadgeProps) => {
  return (
    <div className={cn(
      "inline-flex items-center gap-1.5 px-2 py-1 rounded-md text-xs font-medium",
      verified 
        ? "bg-teal-50 text-teal-700 border border-teal-100" 
        : "bg-rose-50 text-rose-700 border border-rose-100"
    )}>
      {verified ? (
        <>
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Verified</span>
        </>
      ) : (
        <>
          <ShieldAlert className="w-3.5 h-3.5" />
          <span>Missing</span>
        </>
      )}
    </div>
  );
};
