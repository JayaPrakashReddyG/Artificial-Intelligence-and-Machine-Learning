import { Link, useRouterState } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X, Waves } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const links = [
  { to: "/", label: "Home" },
  { to: "/features", label: "Features" },
  { to: "/dashboard", label: "Dashboard" },
  { to: "/prediction", label: "Prediction" },
  { to: "/analytics", label: "Analytics" },
  { to: "/scenarios", label: "Scenarios" },
  { to: "/dataset", label: "Dataset" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <header className="sticky top-0 z-50 w-full">
      <div className="mx-auto mt-3 max-w-7xl px-4">
        <nav className="glass-strong flex items-center justify-between rounded-2xl px-4 py-3">
          <Link to="/" className="flex items-center gap-2">
            <span className="relative grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-blue-500 to-sky-400 shadow-[0_0_20px_rgba(56,189,248,0.6)]">
              <Waves className="h-5 w-5 text-white" />
            </span>
            <span className="text-lg font-semibold tracking-tight">
              FloodPredict <span className="text-gradient">AI</span>
            </span>
          </Link>

          <ul className="hidden items-center gap-1 lg:flex">
            {links.map((l) => {
              const active = pathname === l.to;
              return (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    className={`relative rounded-lg px-3 py-1.5 text-sm transition-colors ${
                      active ? "text-white" : "text-white/70 hover:text-white"
                    }`}
                  >
                    {active && (
                      <motion.span
                        layoutId="nav-active"
                        className="absolute inset-0 rounded-lg bg-white/10"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                    <span className="relative">{l.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-2">
            <Link
              to="/prediction"
              className="hidden neon-btn neon-btn-hover rounded-xl px-4 py-2 text-sm font-semibold sm:inline-flex"
            >
              Predict Now
            </Link>
            <button
              onClick={() => setOpen((v) => !v)}
              className="glass grid h-10 w-10 place-items-center rounded-xl lg:hidden"
              aria-label="Toggle menu"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </nav>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="glass-strong mt-2 grid gap-1 rounded-2xl p-2 lg:hidden"
            >
              {links.map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  onClick={() => setOpen(false)}
                  className={`rounded-lg px-3 py-2 text-sm ${
                    pathname === l.to ? "bg-white/10 text-white" : "text-white/80 hover:bg-white/5"
                  }`}
                >
                  {l.label}
                </Link>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
