import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Mail, MessageSquare, Send, User } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — FloodPredict AI" },
      { name: "description", content: "Get in touch with the FloodPredict AI team for demos, partnerships or research collaboration." },
    ],
  }),
  component: Contact,
});

function Contact() {
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSent(true);
    toast.success("Message sent", { description: "We'll get back to you within 24 hours." });
  }

  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <div className="text-center">
        <h1 className="text-4xl font-bold sm:text-5xl">Get in <span className="text-gradient">Touch</span></h1>
        <p className="mt-3 text-white/60">Demos, research collaborations or deployment help — we'd love to hear from you.</p>
      </div>

      <div className="mt-12 grid gap-6 lg:grid-cols-5">
        <form onSubmit={handleSubmit} className="glass-strong lg:col-span-3 rounded-2xl p-6 sm:p-8">
          <div className="grid gap-5 sm:grid-cols-2">
            <Field icon={User} label="Full Name" placeholder="Ada Lovelace" />
            <Field icon={Mail} label="Email" type="email" placeholder="you@company.com" />
          </div>
          <Field icon={MessageSquare} label="Subject" placeholder="Partnership inquiry" className="mt-5" />
          <label className="mt-5 block">
            <span className="text-xs uppercase tracking-wider text-white/60">Message</span>
            <textarea
              required rows={5}
              placeholder="Tell us how we can help…"
              className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none focus:border-sky-400/60"
            />
          </label>
          <button className="neon-btn neon-btn-hover mt-6 inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold">
            <Send className="h-4 w-4" /> {sent ? "Sent — send another" : "Send Message"}
          </button>
        </form>

        <div className="lg:col-span-2 space-y-4">
          {[
            { title: "Email", body: "hello@floodpredict.ai" },
            { title: "Research", body: "research@floodpredict.ai" },
            { title: "Response Time", body: "Within 24 hours" },
          ].map((c) => (
            <div key={c.title} className="glass rounded-2xl p-5">
              <div className="text-xs uppercase tracking-wider text-white/50">{c.title}</div>
              <div className="mt-1 font-semibold">{c.body}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Field({ icon: Icon, label, className = "", ...rest }: {
  icon: React.ComponentType<{ className?: string }>;
  label: string; className?: string;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className={`block ${className}`}>
      <span className="text-xs uppercase tracking-wider text-white/60">{label}</span>
      <div className="relative mt-2">
        <Icon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
        <input
          required
          className="w-full rounded-xl border border-white/10 bg-white/5 py-2.5 pl-10 pr-4 text-sm outline-none focus:border-sky-400/60"
          {...rest}
        />
      </div>
    </label>
  );
}
