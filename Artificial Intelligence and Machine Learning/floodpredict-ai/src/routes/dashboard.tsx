import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  Area, AreaChart, Bar, BarChart, CartesianGrid, Cell, Line, LineChart,
  Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis, Legend,
} from "recharts";
import { AlertTriangle, Droplets, MapPin, TrendingUp } from "lucide-react";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard — FloodPredict AI" },
      { name: "description", content: "Live flood prediction dashboard with rainfall trends, district comparisons and risk distribution." },
    ],
  }),
  component: Dashboard,
});

const rainfall = [
  { month: "Jan", mm: 40 }, { month: "Feb", mm: 55 }, { month: "Mar", mm: 90 },
  { month: "Apr", mm: 120 }, { month: "May", mm: 180 }, { month: "Jun", mm: 260 },
  { month: "Jul", mm: 340 }, { month: "Aug", mm: 300 }, { month: "Sep", mm: 220 },
  { month: "Oct", mm: 160 }, { month: "Nov", mm: 90 }, { month: "Dec", mm: 55 },
];
const districts = [
  { name: "Chennai", risk: 82 }, { name: "Mumbai", risk: 74 },
  { name: "Kolkata", risk: 68 }, { name: "Guwahati", risk: 88 },
  { name: "Kochi", risk: 61 }, { name: "Patna", risk: 71 },
];
const distribution = [
  { name: "High Risk", value: 34, color: "#ef4444" },
  { name: "Medium Risk", value: 41, color: "#f59e0b" },
  { name: "Low Risk", value: 25, color: "#22c55e" },
];
const historic = Array.from({ length: 24 }, (_, i) => ({
  m: `M${i+1}`, mm: 60 + Math.round(80 * Math.sin(i / 2) + 90 + i * 3),
}));

const stats = [
  { label: "Total Predictions", value: "42,613", icon: TrendingUp, tint: "from-blue-500 to-sky-400" },
  { label: "High Risk Areas", value: "34", icon: AlertTriangle, tint: "from-orange-500 to-red-500" },
  { label: "Safe Regions", value: "89", icon: MapPin, tint: "from-emerald-500 to-teal-400" },
  { label: "Avg Rainfall", value: "184 mm", icon: Droplets, tint: "from-cyan-500 to-blue-400" },
];

function Dashboard() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl font-bold sm:text-5xl">
        Live <span className="text-gradient">Dashboard</span>
      </motion.h1>
      <p className="mt-2 text-white/60">Real-time flood risk monitoring across regions.</p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
            className="glass relative overflow-hidden rounded-2xl p-5">
            <div className={`grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br ${s.tint} shadow-lg`}>
              <s.icon className="h-5 w-5 text-white" />
            </div>
            <div className="mt-3 text-3xl font-bold">{s.value}</div>
            <div className="mt-1 text-sm text-white/60">{s.label}</div>
          </motion.div>
        ))}
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        <Card title="Rainfall Trend" subtitle="Monthly average (mm)" className="lg:col-span-2">
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={rainfall}>
              <defs>
                <linearGradient id="lineGrad" x1="0" x2="1">
                  <stop offset="0" stopColor="#38bdf8" />
                  <stop offset="1" stopColor="#2563eb" />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="rgba(255,255,255,0.06)" strokeDasharray="3 3" />
              <XAxis dataKey="month" stroke="rgba(255,255,255,0.5)" fontSize={12} />
              <YAxis stroke="rgba(255,255,255,0.5)" fontSize={12} />
              <Tooltip contentStyle={tooltipStyle} />
              <Line type="monotone" dataKey="mm" stroke="url(#lineGrad)" strokeWidth={3} dot={{ r: 3, fill: "#38bdf8" }} />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        <Card title="Flood Distribution" subtitle="Risk classification">
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie data={distribution} dataKey="value" nameKey="name" innerRadius={55} outerRadius={90} paddingAngle={4}>
                {distribution.map((d) => <Cell key={d.name} fill={d.color} stroke="none" />)}
              </Pie>
              <Legend wrapperStyle={{ color: "white", fontSize: 12 }} />
              <Tooltip contentStyle={tooltipStyle} />
            </PieChart>
          </ResponsiveContainer>
        </Card>

        <Card title="District Comparison" subtitle="Risk index by district" className="lg:col-span-2">
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={districts}>
              <defs>
                <linearGradient id="barGrad" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0" stopColor="#38bdf8" />
                  <stop offset="1" stopColor="#2563eb" />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="rgba(255,255,255,0.06)" strokeDasharray="3 3" />
              <XAxis dataKey="name" stroke="rgba(255,255,255,0.5)" fontSize={12} />
              <YAxis stroke="rgba(255,255,255,0.5)" fontSize={12} />
              <Tooltip contentStyle={tooltipStyle} />
              <Bar dataKey="risk" fill="url(#barGrad)" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card title="Historical Rainfall" subtitle="Rolling 24 months">
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={historic}>
              <defs>
                <linearGradient id="areaGrad" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0" stopColor="#38bdf8" stopOpacity={0.6} />
                  <stop offset="1" stopColor="#2563eb" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="rgba(255,255,255,0.06)" strokeDasharray="3 3" />
              <XAxis dataKey="m" stroke="rgba(255,255,255,0.5)" fontSize={10} />
              <YAxis stroke="rgba(255,255,255,0.5)" fontSize={12} />
              <Tooltip contentStyle={tooltipStyle} />
              <Area type="monotone" dataKey="mm" stroke="#38bdf8" fill="url(#areaGrad)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </Card>
      </div>
    </div>
  );
}

const tooltipStyle = {
  background: "rgba(2,6,23,0.9)",
  border: "1px solid rgba(255,255,255,0.1)",
  borderRadius: 12,
  color: "white",
  fontSize: 12,
};

function Card({ title, subtitle, children, className = "" }: {
  title: string; subtitle?: string; children: React.ReactNode; className?: string;
}) {
  return (
    <div className={`glass rounded-2xl p-6 ${className}`}>
      <div className="mb-4 flex items-end justify-between">
        <div>
          <h3 className="text-lg font-semibold">{title}</h3>
          {subtitle && <p className="text-xs text-white/50">{subtitle}</p>}
        </div>
      </div>
      {children}
    </div>
  );
}
