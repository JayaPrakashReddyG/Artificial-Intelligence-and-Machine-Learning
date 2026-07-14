import { createFileRoute } from "@tanstack/react-router";
import {
  Bar, BarChart, CartesianGrid, Cell, Legend, Line, LineChart,
  RadialBar, RadialBarChart, ResponsiveContainer, Tooltip, XAxis, YAxis,
} from "recharts";

export const Route = createFileRoute("/analytics")({
  head: () => ({
    meta: [
      { title: "Analytics — FloodPredict AI" },
      { name: "description", content: "Deep analytics on flood frequency, cloud visibility trends, prediction accuracy and risk heatmaps." },
    ],
  }),
  component: AnalyticsPage,
});

const monthly = [
  { m: "Jan", r: 40 }, { m: "Feb", r: 55 }, { m: "Mar", r: 90 }, { m: "Apr", r: 120 },
  { m: "May", r: 180 }, { m: "Jun", r: 260 }, { m: "Jul", r: 340 }, { m: "Aug", r: 300 },
  { m: "Sep", r: 220 }, { m: "Oct", r: 160 }, { m: "Nov", r: 90 }, { m: "Dec", r: 55 },
];
const frequency = [
  { yr: "2020", f: 8 }, { yr: "2021", f: 14 }, { yr: "2022", f: 11 },
  { yr: "2023", f: 19 }, { yr: "2024", f: 22 }, { yr: "2025", f: 27 },
];
const visibility = [
  { m: "Jan", v: 8.5 }, { m: "Feb", v: 8.2 }, { m: "Mar", v: 7.4 }, { m: "Apr", v: 6.8 },
  { m: "May", v: 5.2 }, { m: "Jun", v: 3.8 }, { m: "Jul", v: 2.9 }, { m: "Aug", v: 3.4 },
  { m: "Sep", v: 4.6 }, { m: "Oct", v: 6.2 }, { m: "Nov", v: 7.5 }, { m: "Dec", v: 8.1 },
];
const accuracy = [
  { name: "Decision Tree", acc: 89.12, fill: "#60a5fa" },
  { name: "KNN", acc: 87.30, fill: "#a78bfa" },
  { name: "Random Forest", acc: 93.44, fill: "#22d3ee" },
  { name: "XGBoost", acc: 96.55, fill: "#38bdf8" },
];

const tooltipStyle = {
  background: "rgba(2,6,23,0.9)", border: "1px solid rgba(255,255,255,0.1)",
  borderRadius: 12, color: "white", fontSize: 12,
};

function AnalyticsPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      <h1 className="text-4xl font-bold sm:text-5xl">Analytics <span className="text-gradient">Suite</span></h1>
      <p className="mt-2 text-white/60">Interactive charts on rainfall, flood frequency, cloud cover and model accuracy.</p>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <Card title="Monthly Rainfall (mm)">
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={monthly}>
              <CartesianGrid stroke="rgba(255,255,255,0.06)" strokeDasharray="3 3" />
              <XAxis dataKey="m" stroke="rgba(255,255,255,0.5)" fontSize={12} />
              <YAxis stroke="rgba(255,255,255,0.5)" fontSize={12} />
              <Tooltip contentStyle={tooltipStyle} />
              <Bar dataKey="r" radius={[8, 8, 0, 0]}>
                {monthly.map((_, i) => (
                  <Cell key={i} fill={`hsl(${210 - i * 5}, 90%, ${55 + (i % 3) * 5}%)`} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card title="Flood Frequency by Year">
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={frequency}>
              <CartesianGrid stroke="rgba(255,255,255,0.06)" strokeDasharray="3 3" />
              <XAxis dataKey="yr" stroke="rgba(255,255,255,0.5)" fontSize={12} />
              <YAxis stroke="rgba(255,255,255,0.5)" fontSize={12} />
              <Tooltip contentStyle={tooltipStyle} />
              <Line type="monotone" dataKey="f" stroke="#38bdf8" strokeWidth={3} dot={{ r: 4, fill: "#38bdf8" }} />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        <Card title="Cloud Visibility (km)">
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={visibility}>
              <CartesianGrid stroke="rgba(255,255,255,0.06)" strokeDasharray="3 3" />
              <XAxis dataKey="m" stroke="rgba(255,255,255,0.5)" fontSize={12} />
              <YAxis stroke="rgba(255,255,255,0.5)" fontSize={12} />
              <Tooltip contentStyle={tooltipStyle} />
              <Line type="monotone" dataKey="v" stroke="#a78bfa" strokeWidth={3} dot={{ r: 4, fill: "#a78bfa" }} />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        <Card title="Model Accuracy Comparison">
          <ResponsiveContainer width="100%" height={280}>
            <RadialBarChart innerRadius="30%" outerRadius="90%" barSize={16} data={accuracy}>
              <RadialBar background dataKey="acc" cornerRadius={8} />
              <Legend iconSize={10} wrapperStyle={{ color: "white", fontSize: 12 }} />
              <Tooltip contentStyle={tooltipStyle} />
            </RadialBarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Heatmap */}
      <div className="mt-8 glass rounded-2xl p-6">
        <h3 className="text-lg font-semibold">Risk Heatmap — District × Month</h3>
        <p className="text-xs text-white/50">Warmer cells indicate higher flood probability.</p>
        <div className="mt-6 overflow-x-auto">
          <div className="min-w-[720px]">
            <div className="grid grid-cols-[120px_repeat(12,1fr)] gap-1">
              <div />
              {monthly.map((m) => (
                <div key={m.m} className="text-center text-[10px] uppercase tracking-wider text-white/50">{m.m}</div>
              ))}
              {["Chennai","Mumbai","Kolkata","Guwahati","Kochi","Patna","Cuttack","Vijayawada"].map((d, ri) => (
                <div key={d} className="contents">
                  <div className="text-xs text-white/70 py-1">{d}</div>
                  {monthly.map((_, ci) => {
                    const v = Math.round((Math.sin(ri + ci / 1.4) * 0.5 + 0.5) * 100);
                    const hue = 220 - (v * 1.6);
                    return (
                      <div key={ci}
                        title={`${v}%`}
                        className="aspect-square rounded-md transition-transform hover:scale-110"
                        style={{ background: `hsl(${hue} 85% ${35 + v / 3}% / 0.85)` }}
                      />
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="glass rounded-2xl p-6">
      <h3 className="mb-4 text-lg font-semibold">{title}</h3>
      {children}
    </div>
  );
}
