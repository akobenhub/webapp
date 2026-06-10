import { Link } from "@tanstack/react-router";
import { Phone, Heart, Lock } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-border/60 bg-secondary/40">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 md:grid-cols-4">
        <div className="md:col-span-2">
          <h3 className="font-serif text-xl">Akoben Digital Healing & Advocacy Hub</h3>
          <p className="mt-3 max-w-md text-sm text-muted-foreground">
            Safe trauma-informed education and support pathways for survivors, families, schools, faith communities, and caregivers.
          </p>
          <p className="mt-4 inline-flex items-center gap-2 text-xs text-muted-foreground">
            <Heart className="h-3.5 w-3.5 text-healing" aria-hidden /> Built with care · 🇬🇭 Ghana · expanding across Africa
          </p>
        </div>

        <div>
          <h4 className="text-sm font-semibold">Explore</h4>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li><Link to="/our-story" className="hover:text-foreground">Our Story</Link></li>
            <li><Link to="/about" className="hover:text-foreground">About Us</Link></li>
            <li><Link to="/about/team" className="hover:text-foreground">Our Team</Link></li>
            <li><Link to="/programs" className="hover:text-foreground">Our Programs</Link></li>
            <li><Link to="/resources" className="hover:text-foreground">Resources</Link></li>
            <li><Link to="/consent" className="hover:text-foreground">Consent & Confidentiality</Link></li>
            <li><Link to="/feedback" className="hover:text-foreground">Share Feedback</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold">In a crisis</h4>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li className="inline-flex items-center gap-2">
              <Phone className="h-3.5 w-3.5" aria-hidden /> Ghana Police: <a href="tel:191" className="text-foreground underline-offset-2 hover:underline">191</a>
            </li>
            <li className="inline-flex items-center gap-2">
              <Phone className="h-3.5 w-3.5" aria-hidden /> DOVVSU: <a href="tel:0551000900" className="text-foreground underline-offset-2 hover:underline">055-100-0900</a>
            </li>
            <li className="inline-flex items-center gap-2">
              <Phone className="h-3.5 w-3.5" aria-hidden /> Orange Support Unit: <a href="tel:0800111222" className="text-foreground underline-offset-2 hover:underline">0800-111-222</a>
            </li>
            <li><Link to="/contact" className="hover:text-foreground">Contact & emergency</Link></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border/60">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-4 text-xs text-muted-foreground">
          <span>© {new Date().getFullYear()} Akoben Hub · Confidential · Non-judgmental</span>
          <Link to="/staff" className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1.5 font-medium text-foreground hover:bg-secondary">
            <Lock className="h-3 w-3" /> Staff Portal
          </Link>
        </div>
      </div>
    </footer>
  );
}
