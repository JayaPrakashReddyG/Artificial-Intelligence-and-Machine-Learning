import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  Brain, CloudRain, AlertTriangle, ShieldAlert, Cloud, BarChart3,
  ArrowRight, Sparkles, Satellite, Waves, Activity, CheckCircle2,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "FloodPredict AI — Predict Floods Before They Happen" },
      { name: "description", content: "AI-powered flood prediction platform using machine learning to analyze rainfall, weather patterns, and issue early warnings." },
    ],
  }),
  component: Landing,
});

const features = [
  { icon: Brain, title: "Machine Learning Prediction", desc: "Predict flood probability using historical rainfall & weather data across multiple ML models." },
  { icon: Cloud, title: "Weather Analysis", desc: "Analyze rainfall patterns, cloud visibility and seasonal changes in real time." },
  { icon: AlertTriangle, title: "Early Warning", desc: "Generate flood alerts before disasters occur, sent to response teams instantly." },
  { icon: ShieldAlert, title: "Risk Classification", desc: "Automatic Low / Medium / High risk tiers with confidence scoring." },
  { icon: Satellite, title: "Cloud Deployment", desc: "IBM Cloud & Docker-ready. Ship the platform to production in minutes." },
  { icon: BarChart3, title: "Interactive Dashboard", desc: "Live graphs, charts and statistics for every district and season." },
];

const models = [
  { name: "Decision Tree", acc: 89.12, desc: "Interpretable baseline with fast inference." },
  { name: "Random Forest", acc: 93.44, desc: "Ensemble of trees for robust predictions." },
  { name: "KNN", acc: 87.30, desc: "Distance-based classifier for local patterns." },
  { name: "XGBoost", acc: 96.55, desc: "Gradient boosted trees — state-of-the-art accuracy.", best: true },
];

function Landing() {
  return (
    <div>
      {/* HERO */}
      <section className="relative overflow-hidden px-6 pt-16 pb-24 sm:pt-24">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="glass mx-auto mb-6 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs text-white/80"
          >
            <Sparkles className="h-3.5 w-3.5 text-sky-300" />
            Powered by XGBoost · 96.55% accuracy
          </motion.div>

          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="text-5xl font-bold leading-[1.05] sm:text-6xl lg:text-7xl"
              >
                AI Powered <span className="text-gradient">Flood Prediction</span> System
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.25 }}
                className="mt-6 max-w-xl text-lg text-white/70"
              >
                Predict flood risks before disasters happen using Machine Learning
                and historical weather analysis.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.4 }}
                className="mt-8 flex flex-wrap items-center gap-3"
              >
                <Link to="/prediction" className="neon-btn neon-btn-hover inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold">
                  Predict Now <ArrowRight className="h-4 w-4" />
                </Link>
                <Link to="/features" className="glass hover:bg-white/10 inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold">
                  Learn More
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="mt-10 flex flex-wrap gap-6 text-sm text-white/60"
              >
                {["4 ML Models", "Real-time Alerts", "IBM Cloud Ready"].map((t) => (
                  <span key={t} className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-sky-300" /> {t}
                  </span>
                ))}
              </motion.div>
            </div>

            {/* Illustration card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative"
            >
              <div className="glass-strong relative overflow-hidden rounded-3xl p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs text-white/60">
                    <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
                    Live Analysis
                  </div>
                  <Satellite className="h-4 w-4 text-sky-300" />
                </div>

                <div className="mt-6 space-y-4">
                  <div className="glass rounded-2xl p-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-white/70">Flood Probability</span>
                      <span className="font-semibold text-red-400">96%</span>
                    </div>
                    <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/10">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: "96%" }}
                        transition={{ duration: 1.6, delay: 0.6, ease: "easeOut" }}
                        className="h-full rounded-full bg-gradient-to-r from-orange-400 to-red-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { label: "Rainfall", value: "284mm", icon: CloudRain },
                      { label: "Humidity", value: "89%", icon: Waves },
                      { label: "Risk", value: "High", icon: AlertTriangle },
                    ].map((s) => (
                      <div key={s.label} className="glass rounded-xl p-3">
                        <s.icon className="h-4 w-4 text-sky-300" />
                        <div className="mt-2 text-lg font-semibold">{s.value}</div>
                        <div className="text-[10px] uppercase tracking-wider text-white/50">{s.label}</div>
                      </div>
                    ))}
                  </div>

                  <div className="glass rounded-2xl p-4">
                    <div className="flex items-center justify-between text-xs text-white/60">
                      <span>Model Confidence</span>
                      <span className="text-sky-300">XGBoost</span>
                    </div>
                    <svg viewBox="0 0 200 60" className="mt-2 h-16 w-full">
                      <motion.path
                        d="M0 40 Q 20 20, 40 30 T 80 25 T 120 15 T 160 22 T 200 10"
                        fill="none"
                        stroke="url(#g)"
                        strokeWidth="2"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 2, delay: 0.8 }}
                      />
                      <defs>
                        <linearGradient id="g" x1="0" x2="1">
                          <stop offset="0" stopColor="#2563eb" />
                          <stop offset="1" stopColor="#38bdf8" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>
                </div>
              </div>

              {/* floating badges */}
              <motion.div
                animate={{ y: [0, -12, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="glass-strong absolute -left-6 top-8 hidden rounded-2xl p-3 shadow-2xl sm:block"
              >
                <Activity className="h-6 w-6 text-sky-300" />
              </motion.div>
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 5, repeat: Infinity }}
                className="glass-strong absolute -right-4 bottom-10 hidden rounded-2xl p-3 shadow-2xl sm:block"
              >
                <Brain className="h-6 w-6 text-blue-300" />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="px-6 py-12">
        <div className="mx-auto grid max-w-7xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: "Model Accuracy", value: "96.55%" },
            { label: "Districts Covered", value: "128" },
            { label: "Predictions Made", value: "42.6K" },
            { label: "Response Teams", value: "310" },
          ].map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass rounded-2xl p-6"
            >
              <div className="text-3xl font-bold text-gradient">{s.value}</div>
              <div className="mt-1 text-sm text-white/60">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-4xl font-bold sm:text-5xl">Everything you need to stay ahead of floods</h2>
            <p className="mt-4 text-white/60">
              An end-to-end platform for meteorologists, disaster management teams and researchers.
            </p>
          </div>

          <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="glass group relative overflow-hidden rounded-2xl p-6 transition-all hover:-translate-y-1 hover:bg-white/10"
              >
                <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-blue-500/10 blur-2xl transition-all group-hover:bg-sky-400/20" />
                <div className="relative">
                  <div className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br from-blue-500/80 to-sky-400/80 shadow-[0_0_20px_rgba(56,189,248,0.4)]">
                    <f.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold">{f.title}</h3>
                  <p className="mt-2 text-sm text-white/60">{f.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* MODELS */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-4xl font-bold sm:text-5xl">Machine Learning Models</h2>
            <p className="mt-4 text-white/60">
              We benchmarked four algorithms. XGBoost led on accuracy and stability.
            </p>
          </div>

          <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {models.map((m, i) => (
              <motion.div
                key={m.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className={`relative rounded-2xl p-6 ${
                  m.best ? "glass-strong ring-1 ring-sky-400/50 shadow-[0_0_40px_rgba(56,189,248,0.25)]" : "glass"
                }`}
              >
                {m.best && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-blue-500 to-sky-400 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow-lg">
                    Best Model
                  </span>
                )}
                <h3 className="text-lg font-semibold">{m.name}</h3>
                <div className="mt-4 text-4xl font-bold text-gradient">{m.acc}%</div>
                <div className="mt-1 text-xs uppercase tracking-wider text-white/50">Accuracy</div>
                <p className="mt-4 text-sm text-white/60">{m.desc}</p>
                <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-white/10">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${m.acc}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, delay: 0.2 + i * 0.1 }}
                    className="h-full rounded-full bg-gradient-to-r from-blue-500 to-sky-400"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-5xl">
          <div className="glass-strong relative overflow-hidden rounded-3xl p-10 text-center sm:p-16">
            <div className="absolute inset-0 -z-10 opacity-40" style={{ background: "var(--gradient-primary)" }} />
            <h2 className="text-4xl font-bold sm:text-5xl">Ready to prevent the next disaster?</h2>
            <p className="mx-auto mt-4 max-w-xl text-white/80">
              Run a prediction in seconds. No signup required for the demo.
            </p>
            <Link to="/prediction" className="mt-8 neon-btn neon-btn-hover inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold">
              Launch Prediction <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
