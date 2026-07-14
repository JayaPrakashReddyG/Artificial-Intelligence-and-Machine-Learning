import { Link } from "@tanstack/react-router";
import { Github, Linkedin, Mail, Waves } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-white/10">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid gap-10 md:grid-cols-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-blue-500 to-sky-400">
                <Waves className="h-5 w-5 text-white" />
              </span>
              <span className="text-lg font-semibold">
                FloodPredict <span className="text-gradient">AI</span>
              </span>
            </div>
            <p className="mt-4 max-w-xs text-sm text-white/60">
              AI-powered flood prediction & early warning platform for disaster
              response teams and researchers.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white/90">Product</h4>
            <ul className="mt-3 space-y-2 text-sm text-white/60">
              <li><Link to="/prediction" className="hover:text-white">Prediction</Link></li>
              <li><Link to="/dashboard" className="hover:text-white">Dashboard</Link></li>
              <li><Link to="/analytics" className="hover:text-white">Analytics</Link></li>
              <li><Link to="/dataset" className="hover:text-white">Dataset</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white/90">Company</h4>
            <ul className="mt-3 space-y-2 text-sm text-white/60">
              <li><Link to="/about" className="hover:text-white">About</Link></li>
              <li><Link to="/contact" className="hover:text-white">Contact</Link></li>
              <li><a href="#" className="hover:text-white">Privacy</a></li>
              <li><a href="#" className="hover:text-white">Terms</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white/90">Connect</h4>
            <div className="mt-3 flex gap-3">
              <a href="#" className="glass grid h-10 w-10 place-items-center rounded-xl hover:bg-white/10"><Github className="h-4 w-4" /></a>
              <a href="#" className="glass grid h-10 w-10 place-items-center rounded-xl hover:bg-white/10"><Linkedin className="h-4 w-4" /></a>
              <a href="#" className="glass grid h-10 w-10 place-items-center rounded-xl hover:bg-white/10"><Mail className="h-4 w-4" /></a>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-xs text-white/50 sm:flex-row">
          <span>© 2026 FloodPredict AI. All rights reserved.</span>
          <span>Built for disaster resilience.</span>
        </div>
      </div>
    </footer>
  );
}
