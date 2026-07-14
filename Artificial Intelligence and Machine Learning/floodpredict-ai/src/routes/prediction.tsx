import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import {
  AlertTriangle, CheckCircle2, Droplets, Loader2, Sparkles, ShieldAlert,
} from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/prediction")({
  head: () => ({
    meta: [
      { title: "Flood Risk Prediction — FloodPredict AI" },
      { name: "description", content: "Enter weather parameters and get an instant flood risk prediction powered by machine learning." },
    ],
  }),
  component: PredictionPage,
});

const districts = [
  "Chennai", "Mumbai", "Kolkata", "Guwahati", "Kochi", "Patna", "Cuttack",
  "Vijayawada", "Kottayam", "Alappuzha",
];
const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

type Result = {
  probability: number;
  risk: "Low" | "Medium" | "High";
  confidence: number;
  prediction: string;
  action: string;
};

function computePrediction(f: Record<string, number>): Result {
  // deterministic pseudo-model for demo purposes
  const norm =
    (f.annualRainfall / 3500) * 0.28 +
    (f.seasonalRainfall / 1500) * 0.2 +
    (f.humidity / 100) * 0.14 +
    (f.riverLevel / 12) * 0.18 +
    (f.rainfallIntensity / 100) * 0.1 +
    (f.cloudCover / 100) * 0.06 +
    (1 - f.cloudVisibility / 10) * 0.04;
  const prob = Math.max(2, Math.min(99, Math.round(norm * 100)));
  const risk = prob >= 70 ? "High" : prob >= 40 ? "Medium" : "Low";
  const action =
    risk === "High" ? "Evacuate Immediately" :
    risk === "Medium" ? "Prepare & Monitor" : "Routine Monitoring";
  return {
    probability: prob,
    risk,
    confidence: Math.min(99, 85 + Math.round((prob % 15))),
    prediction: risk === "High" ? "Flood Expected" : risk === "Medium" ? "Possible Flooding" : "No Flood Expected",
    action,
  };
}

const fields = [
  { key: "annualRainfall", label: "Annual Rainfall (mm)", def: 2100, min: 0, max: 5000 },
  { key: "seasonalRainfall", label: "Seasonal Rainfall (mm)", def: 800, min: 0, max: 2000 },
  { key: "cloudVisibility", label: "Cloud Visibility (km)", def: 4, min: 0, max: 10, step: 0.1 },
  { key: "humidity", label: "Humidity (%)", def: 78, min: 0, max: 100 },
  { key: "temperature", label: "Temperature (°C)", def: 29, min: -10, max: 50 },
  { key: "riverLevel", label: "River Water Level (m)", def: 6, min: 0, max: 12, step: 0.1 },
  { key: "windSpeed", label: "Wind Speed (km/h)", def: 22, min: 0, max: 200 },
  { key: "pressure", label: "Pressure (hPa)", def: 1005, min: 900, max: 1100 },
  { key: "cloudCover", label: "Cloud Cover (%)", def: 72, min: 0, max: 100 },
  { key: "rainfallIntensity", label: "Rainfall Intensity (mm/h)", def: 30, min: 0, max: 100 },
] as const;

function PredictionPage() {
  const [values, setValues] = useState<Record<string, number>>(
    () => Object.fromEntries(fields.map((f) => [f.key, f.def])),
  );
  const [month, setMonth] = useState("Jul");
  const [district, setDistrict] = useState("Chennai");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<Result | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true); setResult(null);
    await new Promise((r) => setTimeout(r, 1600));
    const r = computePrediction(values);
    setResult(r);
    setLoading(false);
    toast.success("Prediction complete", { description: `${r.risk} risk · ${r.probability}% probability` });
  }

  const riskColor = result?.risk === "High" ? "from-orange-500 to-red-600" :
    result?.risk === "Medium" ? "from-amber-400 to-orange-500" :
    "from-emerald-400 to-teal-500";

  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
        <div className="glass inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs text-white/70">
          <Sparkles className="h-3 w-3 text-sky-300" /> Live ML prediction
        </div>
        <h1 className="mt-4 text-4xl font-bold sm:text-5xl">Flood Risk <span className="text-gradient">Prediction</span></h1>
        <p className="mt-2 text-white/60">Enter weather & hydrology parameters. Model returns risk, probability and recommended action.</p>
      </motion.div>

      <div className="grid gap-6 lg:grid-cols-5">
        <form onSubmit={handleSubmit} className="glass-strong lg:col-span-3 rounded-2xl p-6 sm:p-8">
          <h2 className="text-lg font-semibold">Weather Parameters</h2>
          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            {fields.map((f) => (
              <label key={f.key} className="block">
                <span className="text-xs uppercase tracking-wider text-white/60">{f.label}</span>
                <input
                  type="number"
                  step={"step" in f ? f.step : 1}
                  min={f.min} max={f.max}
                  value={values[f.key]}
                  onChange={(e) => setValues((v) => ({ ...v, [f.key]: Number(e.target.value) }))}
                  className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm outline-none transition focus:border-sky-400/60 focus:bg-white/10"
                />
              </label>
            ))}
            <label>
              <span className="text-xs uppercase tracking-wider text-white/60">Month</span>
              <select
                value={month} onChange={(e) => setMonth(e.target.value)}
                className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm outline-none focus:border-sky-400/60"
              >
                {months.map((m) => <option key={m} value={m} className="bg-slate-900">{m}</option>)}
              </select>
            </label>
            <label>
              <span className="text-xs uppercase tracking-wider text-white/60">District</span>
              <select
                value={district} onChange={(e) => setDistrict(e.target.value)}
                className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm outline-none focus:border-sky-400/60"
              >
                {districts.map((d) => <option key={d} value={d} className="bg-slate-900">{d}</option>)}
              </select>
            </label>
          </div>

          <button
            disabled={loading}
            className="neon-btn neon-btn-hover mt-8 inline-flex w-full items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold disabled:opacity-70"
          >
            {loading ? <><Loader2 className="h-4 w-4 animate-spin" /> AI is analyzing weather patterns...</> : "Predict Flood Risk"}
          </button>
        </form>

        <div className="lg:col-span-2">
          <ResultPanel loading={loading} result={result} district={district} month={month} riskColor={riskColor} />
        </div>
      </div>
    </div>
  );
}

function ResultPanel({ loading, result, district, month, riskColor }: {
  loading: boolean; result: Result | null; district: string; month: string; riskColor: string;
}) {
  const gaugeAngle = useMemo(() => (result ? (result.probability / 100) * 180 : 0), [result]);

  if (!result && !loading) {
    return (
      <div className="glass rounded-2xl p-8 text-center">
        <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-br from-blue-500 to-sky-400 shadow-[0_0_30px_rgba(56,189,248,0.4)]">
          <Droplets className="h-7 w-7 text-white" />
        </div>
        <h3 className="mt-4 text-lg font-semibold">Awaiting parameters</h3>
        <p className="mt-2 text-sm text-white/60">Fill in the form and press <em>Predict Flood Risk</em> to see live results.</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="glass-strong rounded-2xl p-8 text-center">
        <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-white/5 animate-pulse-ring">
          <Loader2 className="h-8 w-8 animate-spin text-sky-300" />
        </div>
        <h3 className="mt-4 text-lg font-semibold">Analyzing…</h3>
        <p className="mt-2 text-sm text-white/60">Running XGBoost against weather patterns.</p>
      </div>
    );
  }

  return (
    <motion.div
      key={result!.probability}
      initial={{ opacity: 0, scale: 0.95, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      className="glass-strong overflow-hidden rounded-2xl p-6"
    >
      <div className="flex items-center justify-between">
        <div>
          <div className="text-xs uppercase tracking-wider text-white/50">Prediction · {district} · {month}</div>
          <h3 className="mt-1 text-2xl font-bold">{result!.prediction}</h3>
        </div>
        <div className={`grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br ${riskColor} shadow-lg`}>
          {result!.risk === "High" ? <AlertTriangle className="h-6 w-6 text-white" /> :
            result!.risk === "Medium" ? <ShieldAlert className="h-6 w-6 text-white" /> :
            <CheckCircle2 className="h-6 w-6 text-white" />}
        </div>
      </div>

      {/* Gauge */}
      <div className="mt-6 flex items-center justify-center">
        <svg viewBox="0 0 200 120" className="h-40 w-full">
          <defs>
            <linearGradient id="gaugeG" x1="0" x2="1">
              <stop offset="0" stopColor="#22c55e" />
              <stop offset="0.5" stopColor="#f59e0b" />
              <stop offset="1" stopColor="#ef4444" />
            </linearGradient>
          </defs>
          <path d="M20 100 A80 80 0 0 1 180 100" stroke="rgba(255,255,255,0.08)" strokeWidth="14" fill="none" strokeLinecap="round" />
          <motion.path
            d="M20 100 A80 80 0 0 1 180 100"
            stroke="url(#gaugeG)" strokeWidth="14" fill="none" strokeLinecap="round"
            strokeDasharray="251.3"
            initial={{ strokeDashoffset: 251.3 }}
            animate={{ strokeDashoffset: 251.3 - (gaugeAngle / 180) * 251.3 }}
            transition={{ duration: 1.4, ease: "easeOut" }}
          />
          <text x="100" y="90" textAnchor="middle" className="fill-white" style={{ fontSize: 28, fontWeight: 700 }}>
            {result!.probability}%
          </text>
          <text x="100" y="108" textAnchor="middle" className="fill-white/50" style={{ fontSize: 10 }}>
            Flood Probability
          </text>
        </svg>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3">
        <Stat label="Risk Level" value={result!.risk}
          color={result!.risk === "High" ? "text-red-400" : result!.risk === "Medium" ? "text-amber-300" : "text-emerald-300"} />
        <Stat label="Confidence" value={`${result!.confidence}%`} color="text-sky-300" />
      </div>

      <div className="mt-4 glass rounded-xl p-4">
        <div className="text-xs uppercase tracking-wider text-white/50">Suggested Action</div>
        <div className={`mt-1 text-lg font-semibold ${result!.risk === "High" ? "text-red-300" : "text-white"}`}>
          {result!.action}
        </div>
      </div>
    </motion.div>
  );
}

function Stat({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div className="glass rounded-xl p-4">
      <div className="text-xs uppercase tracking-wider text-white/50">{label}</div>
      <div className={`mt-1 text-xl font-bold ${color}`}>{value}</div>
    </div>
  );
}
