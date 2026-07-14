import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  Brain, Cloud, AlertTriangle, ShieldAlert, BarChart3, Satellite,
  Sparkles, ArrowRight,
} from "lucide-react";

export const Route = createFileRoute("/features")({
  head: () => ({
    meta: [
      { title: "Features — FloodPredict AI" },
      { name: "description", content: "Machine learning prediction, weather analysis, early warnings, risk classification, cloud deployment and interactive dashboards." },
    ],
  }),
  component: FeaturesPage,
});

const features = [
  { icon: Brain, title: "Machine Learning Prediction", desc: "Predict flood probability using historical rainfall data with four benchmarked models." },
  { icon: Cloud, title: "Weather Analysis", desc: "Analyze rainfall patterns, cloud visibility and seasonal changes across regions." },
  { icon: AlertTriangle, title: "Early Warning", desc: "Generate flood alerts before disasters occur — routed to response teams instantly." },
  { icon: ShieldAlert, title: "Risk Classification", desc: "Automatic Low / Medium / High risk labels with confidence scoring." },
  { icon: Satellite, title: "Cloud Deployment", desc: "IBM Cloud & Docker ready. Deploy the platform to production in minutes." },
  { icon: BarChart3, title: "Interactive Dashboard", desc: "Live graphs, charts and statistics for every district and season." },
];

function FeaturesPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-16">
      <div className="mx-auto max-w-3xl text-center">
        <div className="glass inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs text-white/70">
          <Sparkles className="h-3 w-3 text-sky-300" /> Platform capabilities
        </div>
        <h1 className="mt-4 text-4xl font-bold sm:text-6xl">Built for meteorologists & first responders</h1>
        <p className="mt-4 text-white/60">Every feature you need for accurate, explainable flood risk analysis.</p>
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
            <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-blue-500/10 blur-2xl transition group-hover:bg-sky-400/25" />
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

      <div className="mt-16 glass-strong flex flex-wrap items-center justify-between gap-4 rounded-3xl p-8">
        <div>
          <h3 className="text-2xl font-bold">Try the live prediction</h3>
          <p className="text-white/60">See the model in action with sample weather parameters.</p>
        </div>
        <Link to="/prediction" className="neon-btn neon-btn-hover inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold">
          Open Predictor <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
