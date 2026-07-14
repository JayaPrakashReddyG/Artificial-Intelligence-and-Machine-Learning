import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ArrowUpDown, ChevronLeft, ChevronRight, Search, Upload } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/dataset")({
  head: () => ({
    meta: [
      { title: "Historical Dataset — FloodPredict AI" },
      { name: "description", content: "Browse, search and filter the historical rainfall and flood dataset used to train the models." },
    ],
  }),
  component: DatasetPage,
});

type Row = {
  district: string; rainfall: number; visibility: number; humidity: number; flood: boolean;
};

const DISTRICTS = ["Chennai","Mumbai","Kolkata","Guwahati","Kochi","Patna","Cuttack","Vijayawada","Kottayam","Alappuzha"];

const seed: Row[] = Array.from({ length: 84 }, (_, i) => {
  const d = DISTRICTS[i % DISTRICTS.length];
  const rainfall = 40 + Math.round(((i * 137) % 500));
  const visibility = Math.round((10 - ((i * 3) % 90) / 10) * 10) / 10;
  const humidity = 40 + ((i * 7) % 55);
  const flood = rainfall > 300 && humidity > 70;
  return { district: d, rainfall, visibility, humidity, flood };
});

type SortKey = keyof Row;

function DatasetPage() {
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState<"all" | "flood" | "safe">("all");
  const [sort, setSort] = useState<{ key: SortKey; dir: "asc" | "desc" }>({ key: "rainfall", dir: "desc" });
  const [page, setPage] = useState(1);
  const perPage = 10;

  const filtered = useMemo(() => {
    let rows = seed.filter((r) =>
      r.district.toLowerCase().includes(q.toLowerCase()) &&
      (filter === "all" || (filter === "flood" ? r.flood : !r.flood)),
    );
    rows.sort((a, b) => {
      const av = a[sort.key], bv = b[sort.key];
      if (av === bv) return 0;
      const cmp = av > bv ? 1 : -1;
      return sort.dir === "asc" ? cmp : -cmp;
    });
    return rows;
  }, [q, filter, sort]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / perPage));
  const clamped = Math.min(page, pageCount);
  const rows = filtered.slice((clamped - 1) * perPage, clamped * perPage);

  function toggleSort(key: SortKey) {
    setSort((s) => s.key === key ? { key, dir: s.dir === "asc" ? "desc" : "asc" } : { key, dir: "desc" });
  }

  function onUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (f) toast.success("Dataset queued", { description: `${f.name} · ${(f.size/1024).toFixed(1)} KB` });
  }

  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold sm:text-5xl">Historical <span className="text-gradient">Dataset</span></h1>
          <p className="mt-2 text-white/60">Search, filter and sort records used to train FloodPredict AI.</p>
        </div>
        <label className="neon-btn neon-btn-hover inline-flex cursor-pointer items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold">
          <Upload className="h-4 w-4" /> Upload CSV
          <input type="file" accept=".csv" className="hidden" onChange={onUpload} />
        </label>
      </div>

      <div className="mt-8 glass-strong rounded-2xl p-4 sm:p-6">
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative flex-1 min-w-[220px]">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
            <input
              value={q} onChange={(e) => { setQ(e.target.value); setPage(1); }}
              placeholder="Search district…"
              className="w-full rounded-xl border border-white/10 bg-white/5 py-2.5 pl-10 pr-4 text-sm outline-none focus:border-sky-400/60"
            />
          </div>
          <div className="glass inline-flex overflow-hidden rounded-xl p-1 text-xs">
            {(["all","flood","safe"] as const).map((k) => (
              <button key={k} onClick={() => { setFilter(k); setPage(1); }}
                className={`px-3 py-1.5 rounded-lg capitalize transition ${filter === k ? "bg-gradient-to-r from-blue-500 to-sky-400 text-white shadow" : "text-white/60 hover:text-white"}`}>
                {k}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-6 -mx-4 sm:mx-0 overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="text-left text-xs uppercase tracking-wider text-white/50">
                {(["district","rainfall","visibility","humidity","flood"] as SortKey[]).map((k) => (
                  <th key={k} className="px-4 py-3">
                    <button onClick={() => toggleSort(k)} className="inline-flex items-center gap-1 hover:text-white">
                      {k} <ArrowUpDown className="h-3 w-3" />
                    </button>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i) => (
                <tr key={i} className="border-t border-white/5 hover:bg-white/5">
                  <td className="px-4 py-3 font-medium">{r.district}</td>
                  <td className="px-4 py-3">{r.rainfall} mm</td>
                  <td className="px-4 py-3">{r.visibility} km</td>
                  <td className="px-4 py-3">{r.humidity}%</td>
                  <td className="px-4 py-3">
                    <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${r.flood ? "bg-red-500/20 text-red-300" : "bg-emerald-500/20 text-emerald-300"}`}>
                      {r.flood ? "Flood" : "Safe"}
                    </span>
                  </td>
                </tr>
              ))}
              {rows.length === 0 && (
                <tr><td colSpan={5} className="px-4 py-10 text-center text-white/50">No records match your filters.</td></tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="mt-6 flex items-center justify-between text-sm text-white/60">
          <div>Showing {rows.length ? (clamped - 1) * perPage + 1 : 0}–{(clamped - 1) * perPage + rows.length} of {filtered.length}</div>
          <div className="flex items-center gap-2">
            <button onClick={() => setPage(Math.max(1, clamped - 1))} disabled={clamped === 1}
              className="glass grid h-9 w-9 place-items-center rounded-lg disabled:opacity-40"><ChevronLeft className="h-4 w-4" /></button>
            <span>Page {clamped} of {pageCount}</span>
            <button onClick={() => setPage(Math.min(pageCount, clamped + 1))} disabled={clamped === pageCount}
              className="glass grid h-9 w-9 place-items-center rounded-lg disabled:opacity-40"><ChevronRight className="h-4 w-4" /></button>
          </div>
        </div>
      </div>
    </div>
  );
}
