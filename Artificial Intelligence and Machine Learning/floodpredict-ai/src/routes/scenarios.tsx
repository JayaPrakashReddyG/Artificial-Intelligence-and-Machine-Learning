import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Radar, Map, GaugeCircle, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/scenarios")({
  head: () => ({
    meta: [
      { title: "Scenarios — FloodPredict AI" },
      { name: "description", content: "Real-world scenarios: early warning, disaster management coordination and model validation." },
    ],
  }),
  component: ScenariosPage,
});

const scenarios = [
  {
    icon: Radar,
    tag: "Scenario 1",
    title: "Early Flood Warning",
    body: "A meteorologist enters current rainfall and cloud visibility. System predicts a High Flood Probability and issues an evacuation recommendation.",
    metric: "94% Probability · High Risk",
    tint: "from-red-500 to-orange-500",
  },
  {
    icon: Map,
    tag: "Scenario 2",
    title: "Disaster Management",
    body: "A coordinator monitors multiple regions in parallel. Live flood classifications and priority allocation help route response teams.",
    metric: "12 Regions · Priority Sorted",
    tint: "from-blue-500 to-sky-400",
  },
  {
    icon: GaugeCircle,
    tag: "Scenario 3",
    title: "Model Validation",
    body: "A government analyst evaluates historical data. XGBoost leads with 96.55% accuracy — verified via confusion matrix and ROC curve.",
    metric: "Best Model · XGBoost 96.55%",
    tint: "from-emerald-400 to-teal-500",
  },
];

function ScenariosPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      <div className="mx-auto max-w-3xl text-center">
        <h1 className="text-4xl font-bold sm:text-5xl">Real-World <span className="text-gradient">Scenarios</span></h1>
        <p className="mt-3 text-white/60">How teams use FloodPredict AI across meteorology, disaster response and research.</p>
      </div>

      <div className="mt-14 grid gap-6 lg:grid-cols-3">
        {scenarios.map((s, i) => (
          <motion.div
            key={s.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="glass group relative overflow-hidden rounded-3xl p-8 transition-transform hover:-translate-y-1"
          >
            <div className={`absolute -right-16 -top-16 h-56 w-56 rounded-full bg-gradient-to-br ${s.tint} opacity-20 blur-3xl transition-opacity group-hover:opacity-40`} />
            <div className={`grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br ${s.tint} shadow-lg`}>
              <s.icon className="h-7 w-7 text-white" />
            </div>
            <div className="mt-6 text-xs uppercase tracking-wider text-white/50">{s.tag}</div>
            <h3 className="mt-1 text-2xl font-bold">{s.title}</h3>
            <p className="mt-3 text-sm text-white/70">{s.body}</p>

            <div className="mt-6 glass rounded-xl p-3 text-sm">
              <span className="text-white/50">Result · </span>
              <span className="font-semibold text-white">{s.metric}</span>
            </div>

            <div className="mt-6 inline-flex items-center gap-2 text-sm text-sky-300">
              Explore <ArrowRight className="h-4 w-4" />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Confusion matrix */}
      <div className="mt-14 grid gap-6 lg:grid-cols-2">
        <div className="glass rounded-2xl p-6">
          <h3 className="text-lg font-semibold">Confusion Matrix — XGBoost</h3>
          <div className="mt-6 grid grid-cols-3 gap-3 text-center text-sm">
            <div />
            <div className="text-white/50">Pred: No Flood</div>
            <div className="text-white/50">Pred: Flood</div>
            <div className="text-white/50">Actual: No Flood</div>
            <div className="glass rounded-xl p-4 text-lg font-bold text-emerald-300">1284</div>
            <div className="glass rounded-xl p-4 text-lg font-bold text-red-300">37</div>
            <div className="text-white/50">Actual: Flood</div>
            <div className="glass rounded-xl p-4 text-lg font-bold text-red-300">41</div>
            <div className="glass rounded-xl p-4 text-lg font-bold text-emerald-300">1092</div>
          </div>
        </div>

        <div className="glass rounded-2xl p-6">
          <h3 className="text-lg font-semibold">ROC Curve</h3>
          <svg viewBox="0 0 300 220" className="mt-4 w-full">
            <defs>
              <linearGradient id="rocG" x1="0" x2="1">
                <stop offset="0" stopColor="#2563eb" />
                <stop offset="1" stopColor="#38bdf8" />
              </linearGradient>
            </defs>
            {/* grid */}
            {[0,1,2,3,4].map((i) => (
              <line key={i} x1={30 + i * 60} y1={10} x2={30 + i * 60} y2={200} stroke="rgba(255,255,255,0.06)" />
            ))}
            {[0,1,2,3,4].map((i) => (
              <line key={i} x1={30} y1={10 + i * 47.5} x2={270} y2={10 + i * 47.5} stroke="rgba(255,255,255,0.06)" />
            ))}
            <line x1="30" y1="200" x2="270" y2="10" stroke="rgba(255,255,255,0.2)" strokeDasharray="4 4" />
            <motion.path
              d="M30 200 Q 60 60, 120 40 Q 180 30, 240 20 L 270 10"
              fill="none" stroke="url(#rocG)" strokeWidth="3"
              initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 2 }}
            />
            <text x="150" y="215" textAnchor="middle" className="fill-white/60" style={{ fontSize: 10 }}>False Positive Rate</text>
          </svg>
          <div className="mt-2 text-sm text-white/60">AUC · <span className="text-sky-300 font-semibold">0.984</span></div>
        </div>
      </div>
    </div>
  );
}
