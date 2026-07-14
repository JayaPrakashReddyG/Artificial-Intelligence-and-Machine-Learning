import { motion } from "framer-motion";

export function AnimatedBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* Base gradient */}
      <div
        className="absolute inset-0"
        style={{ background: "var(--gradient-hero)" }}
      />
      {/* Grid overlay */}
      <div className="absolute inset-0 grid-bg opacity-40" />

      {/* Floating orbs */}
      <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-blue-600/30 blur-3xl animate-float-slow" />
      <div className="absolute top-1/3 -right-40 h-[28rem] w-[28rem] rounded-full bg-sky-500/25 blur-3xl animate-float-slower" />
      <div className="absolute bottom-0 left-1/4 h-80 w-80 rounded-full bg-cyan-400/20 blur-3xl animate-float-slow" />

      {/* Rain streaks */}
      <div className="absolute inset-0 opacity-40">
        {Array.from({ length: 40 }).map((_, i) => {
          const left = (i * 97) % 100;
          const delay = (i * 0.23) % 4;
          const dur = 2 + ((i * 7) % 30) / 10;
          return (
            <span
              key={i}
              className="absolute top-0 block w-px bg-gradient-to-b from-transparent via-sky-300/50 to-transparent"
              style={{
                left: `${left}%`,
                height: `${60 + (i % 5) * 20}px`,
                animation: `rain ${dur}s linear ${delay}s infinite`,
              }}
            />
          );
        })}
      </div>

      {/* Particles */}
      {Array.from({ length: 24 }).map((_, i) => (
        <motion.span
          key={i}
          className="absolute h-1 w-1 rounded-full bg-sky-300/60"
          style={{
            top: `${(i * 41) % 100}%`,
            left: `${(i * 73) % 100}%`,
          }}
          animate={{ y: [0, -20, 0], opacity: [0.2, 0.9, 0.2] }}
          transition={{ duration: 4 + (i % 5), repeat: Infinity, delay: i * 0.2 }}
        />
      ))}
    </div>
  );
}
