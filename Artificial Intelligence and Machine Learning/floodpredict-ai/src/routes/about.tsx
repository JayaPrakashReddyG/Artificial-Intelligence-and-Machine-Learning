import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Brain, Server, Users, GitBranch } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — FloodPredict AI" },
      { name: "description", content: "FloodPredict AI combines machine learning, meteorology and disaster response tooling into one platform." },
    ],
  }),
  component: About,
});

const pipeline = [
  "Dataset Upload", "Data Cleaning", "Feature Engineering",
  "Train / Test Split", "Model Training", "Compare Accuracy",
  "Save Best Model", "Prediction API",
];

function About() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <div className="text-center">
        <h1 className="text-4xl font-bold sm:text-5xl">About <span className="text-gradient">FloodPredict AI</span></h1>
        <p className="mx-auto mt-4 max-w-2xl text-white/70">
          A production-ready AI Flood Prediction System combining a Flask backend, four benchmarked ML models
          (Decision Tree, Random Forest, KNN, XGBoost) and a modern SaaS-style analytics interface — ready for
          IBM Cloud deployment.
        </p>
      </div>

      <div className="mt-12 grid gap-5 md:grid-cols-2">
        {[
          { icon: Brain, title: "Our Mission", body: "Predict floods before they strike so response teams can act, not react." },
          { icon: Server, title: "Backend Stack", body: "Flask API · Scikit-Learn · Pandas · XGBoost · Joblib model persistence." },
          { icon: Users, title: "Who It's For", body: "Meteorologists, disaster coordinators, government analysts and researchers." },
          { icon: GitBranch, title: "Deployment", body: "Docker & IBM Cloud ready with Procfile and environment configuration." },
        ].map((c, i) => (
          <motion.div key={c.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="glass rounded-2xl p-6">
            <div className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-blue-500 to-sky-400">
              <c.icon className="h-5 w-5 text-white" />
            </div>
            <h3 className="mt-4 text-lg font-semibold">{c.title}</h3>
            <p className="mt-2 text-sm text-white/60">{c.body}</p>
          </motion.div>
        ))}
      </div>

      <div className="mt-14 glass-strong rounded-3xl p-8">
        <h2 className="text-2xl font-bold">ML Pipeline</h2>
        <p className="text-white/60">From raw dataset to production-ready prediction API.</p>
        <div className="mt-8 flex flex-wrap items-center gap-3">
          {pipeline.map((step, i) => (
            <div key={step} className="flex items-center gap-3">
              <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }} transition={{ delay: i * 0.05 }}
                className="glass rounded-xl px-4 py-2 text-sm">
                <span className="mr-2 text-sky-300 font-semibold">{String(i + 1).padStart(2, "0")}</span>
                {step}
              </motion.div>
              {i < pipeline.length - 1 && <span className="text-white/30">→</span>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
