import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { MODULES, ModuleCard } from "@/components/ModuleCard";
import { Search } from "lucide-react";

export const Route = createFileRoute("/modules")({
  head: () => ({
    meta: [
      { title: "Psychoeducation Modules | Akoben Hub" },
      { name: "description", content: "Browse all safeguarding and survivor psychoeducation modules, with audio support." },
    ],
  }),
  component: ModulesPage,
});

function ModulesPage() {
  const [filter, setFilter] = useState<"all" | "parents" | "survivors">("all");
  const [q, setQ] = useState("");
  const items = MODULES.filter((m) => (filter === "all" || m.tone === filter) && m.title.toLowerCase().includes(q.toLowerCase()));

  return (
    <div className="mx-auto max-w-6xl px-4 py-14">
      <div className="max-w-2xl">
        <h1 className="font-serif text-4xl sm:text-5xl">Learning modules</h1>
        <p className="mt-3 text-muted-foreground">
          Short, mobile-friendly lessons with optional audio. Take what helps; leave what does not.
        </p>
      </div>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="inline-flex rounded-full border border-border bg-card p-1 text-sm">
          {(["all", "parents", "survivors"] as const).map((k) => (
            <button
              key={k}
              onClick={() => setFilter(k)}
              className={`rounded-full px-4 py-2 capitalize transition-colors ${filter === k ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}
            >
              {k}
            </button>
          ))}
        </div>
        <label className="relative w-full sm:max-w-xs">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search modules"
            className="w-full rounded-full border border-input bg-card py-2.5 pl-9 pr-4 text-sm outline-none focus:border-primary"
          />
        </label>
      </div>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((m) => <ModuleCard key={m.slug} m={m} />)}
        {items.length === 0 && (
          <p className="col-span-full text-sm text-muted-foreground">No modules match your search.</p>
        )}
      </div>
    </div>
  );
}
