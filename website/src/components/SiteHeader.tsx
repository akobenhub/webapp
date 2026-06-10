import { Link } from "@tanstack/react-router";
import { ChevronDown, Lock, Menu, Shield, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useCountry } from "@/lib/country-context";

type NavItem = { to: string; label: string; children?: { to: string; label: string }[] };

const NAV: NavItem[] = [
  { to: "/", label: "Home" },
  { to: "/our-story", label: "Our Story" },
  {
    to: "/about",
    label: "About Us",
    children: [
      { to: "/about", label: "About Us" },
      { to: "/about/team", label: "Our Team" },
    ],
  },
  { to: "/programs", label: "Our Programs" },
  { to: "/resources", label: "Resources" },
  { to: "/contact", label: "Contact & Emergency" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const { country, setCountry, countries } = useCountry();
  const [flagOpen, setFlagOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/95 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 gap-3">
        <div className="flex items-center gap-3">
          <Link to="/" className="flex items-center gap-2.5">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-primary text-primary-foreground shadow-soft">
              <Shield className="h-4 w-4" aria-hidden />
            </span>
            <span className="flex items-baseline gap-1.5 leading-none">
              <span className="font-serif text-lg">Akoben</span>
              <span className="rounded-md bg-primary px-1.5 py-0.5 text-[0.65rem] font-bold tracking-widest text-primary-foreground">
                HUB
              </span>
            </span>
          </Link>

          {/* Country selector — Ghana only enabled. Future-ready. */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setFlagOpen((v) => !v)}
              aria-label={`Country: ${country.name}. Change country`}
              aria-expanded={flagOpen}
              className="flex items-center gap-1 rounded-full border border-border bg-card px-2 py-1 text-sm hover:bg-secondary"
            >
              <span aria-hidden className="text-base leading-none">{country.flag}</span>
              <span className="hidden text-xs font-medium text-muted-foreground sm:inline">{country.code}</span>
              <ChevronDown className="h-3 w-3 text-muted-foreground" aria-hidden />
            </button>
            {flagOpen && (
              <div role="menu" className="absolute left-0 top-full z-50 mt-1 w-52 rounded-xl border border-border bg-popover p-1 shadow-soft">
                {countries.map((c) => (
                  <button
                    key={c.code}
                    type="button"
                    disabled={!c.available}
                    onClick={() => { if (c.available) { setCountry(c.code); setFlagOpen(false); } }}
                    className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm hover:bg-secondary disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    <span aria-hidden>{c.flag}</span>
                    <span className="flex-1">{c.name}</span>
                    {c.available ? (
                      country.code === c.code && <span className="text-xs text-primary">Selected</span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[0.65rem] text-muted-foreground">
                        <Lock className="h-3 w-3" /> Coming soon
                      </span>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <nav className="hidden items-center gap-0.5 lg:flex" aria-label="Primary">
          {NAV.map((l) =>
            l.children ? (
              <div
                key={l.to}
                className="relative"
                onMouseEnter={() => setAboutOpen(true)}
                onMouseLeave={() => setAboutOpen(false)}
              >
                <button
                  type="button"
                  onClick={() => setAboutOpen((v) => !v)}
                  className="inline-flex items-center gap-1 rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                >
                  {l.label} <ChevronDown className="h-3 w-3" />
                </button>
                {aboutOpen && (
                  <div className="absolute left-0 top-full z-50 w-48 rounded-xl border border-border bg-popover p-1 shadow-soft">
                    {l.children.map((c) => (
                      <Link
                        key={c.to}
                        to={c.to}
                        onClick={() => setAboutOpen(false)}
                        className="block rounded-lg px-3 py-2 text-sm hover:bg-secondary"
                      >
                        {c.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={l.to}
                to={l.to}
                className="rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                activeProps={{ className: "text-foreground bg-secondary" }}
                activeOptions={{ exact: l.to === "/" }}
              >
                {l.label}
              </Link>
            ),
          )}
        </nav>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            aria-label={open ? "Close menu" : "Open menu"}
            className="lg:hidden h-10 w-10"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-border/60 bg-background lg:hidden" aria-label="Mobile">
          <ul className="mx-auto flex max-w-6xl flex-col px-2 py-2">
            {NAV.map((l) => (
              <li key={l.to}>
                <Link
                  to={l.to}
                  onClick={() => setOpen(false)}
                  className="block rounded-md px-3 py-3.5 text-base text-foreground hover:bg-secondary"
                >
                  {l.label}
                </Link>
                {l.children && (
                  <ul className="pl-4">
                    {l.children.map((c) => (
                      <li key={c.to}>
                        <Link to={c.to} onClick={() => setOpen(false)} className="block rounded-md px-3 py-2.5 text-sm text-muted-foreground hover:bg-secondary">
                          {c.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
            <li className="mt-2 border-t border-border/60 pt-2">
              <Link to="/staff" onClick={() => setOpen(false)} className="block rounded-md px-3 py-3 text-sm font-medium text-primary hover:bg-secondary">
                Staff Portal →
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
