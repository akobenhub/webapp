import { ShieldCheck, X } from "lucide-react";
import { useEffect, useState } from "react";

export function SafetyBanner() {
  const [show, setShow] = useState(true);
  useEffect(() => {
    if (typeof window !== "undefined" && localStorage.getItem("akoben.safety.ack") === "1") {
      setShow(false);
    }
  }, []);
  if (!show) return null;
  return (
    <div className="bg-primary/95 text-primary-foreground">
      <div className="mx-auto flex max-w-6xl items-start gap-3 px-4 py-2.5 text-xs sm:items-center">
        <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 sm:mt-0" aria-hidden />
        <p className="flex-1 leading-relaxed">
          This is a safe, confidential space. You may pause, leave, or continue anonymously at any time. If you are in immediate danger, call <a href="tel:191" className="font-semibold underline underline-offset-2">191</a>.
        </p>
        <button
          aria-label="Acknowledge and dismiss"
          onClick={() => {
            localStorage.setItem("akoben.safety.ack", "1");
            setShow(false);
          }}
          className="rounded-md p-1 hover:bg-white/10"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
