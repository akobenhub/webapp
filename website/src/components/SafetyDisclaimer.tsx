import { AlertTriangle } from "lucide-react";
import { Link } from "@tanstack/react-router";

/**
 * Clear scope-of-service disclaimer. Use on onboarding, referral, survivor pages.
 * Warm tone — not scary.
 */
export function SafetyDisclaimer({ compact = false }: { compact?: boolean }) {
  return (
    <div className="rounded-2xl border border-warmth/40 bg-warmth/15 p-4 sm:p-5">
      <div className="flex gap-3">
        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-warmth/40 text-warmth-foreground">
          <AlertTriangle className="h-4 w-4" aria-hidden />
        </span>
        <div className="min-w-0">
          <p className="text-sm font-medium text-foreground">Akoben is not an emergency service</p>
          {!compact && (
            <p className="mt-1 text-sm text-foreground/80">
              Akoben provides educational and supportive pathways. It does not replace therapy, police intervention, legal advice, or crisis services.
              If you or a child is in immediate danger, please contact emergency services or a trusted professional.
            </p>
          )}
          <p className="mt-2 text-xs">
            <Link to="/contact" className="font-medium text-primary underline-offset-2 hover:underline">See emergency contacts</Link>
            <span className="mx-2 text-muted-foreground">·</span>
            <Link to="/consent" className="font-medium text-primary underline-offset-2 hover:underline">Consent & confidentiality</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
