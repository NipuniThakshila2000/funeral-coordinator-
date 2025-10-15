"use client";

import { useState, type FormEvent } from "react";
import { ArrowRight, CheckCircle2, Clock, PhoneCall, Sparkles } from "lucide-react";

const responseInfo = [
  {
    title: "Rapid response",
    description: "Average callback within 12 minutes. Coordinators are on-site within 60-90 minutes in Colombo.",
    icon: Clock,
  },
  {
    title: "Multi-channel support",
    description: "Available via hotline, WhatsApp, and Zoom for families in Sri Lanka and overseas.",
    icon: PhoneCall,
  },
  {
    title: "Compassion assured",
    description: "Trauma-informed, multi-lingual coordinators grounded in Buddhist, Hindu, Christian, and interfaith experience.",
    icon: Sparkles,
  },
];

export default function ContactPage() {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setStatus("idle");

    const form = event.currentTarget;
    const payload = Object.fromEntries(new FormData(form).entries());

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Request failed");
      }

      form.reset();
      setStatus("success");
    } catch (error) {
      console.error(error);
      setStatus("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto grid max-w-6xl gap-12 px-6 py-16 lg:grid-cols-[1.05fr_0.95fr]">
      <section className="space-y-6">
        <span className="tag-chip">Contact</span>
        <h1 className="text-balance text-4xl font-semibold text-neutral-900 sm:text-5xl">
          Coordinators on-call 24/7 - share how we can support you right now.
        </h1>
        <p className="text-lg text-neutral-700">
          We&#39;ll assign a lead coordinator immediately, gather key details, and mobilise rituals, logistics, and aftercare tailored to your family&#39;s tradition.
        </p>
        <div className="grid gap-4 sm:grid-cols-3">
          {responseInfo.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="fade-up rounded-3xl border border-neutral-200 bg-white p-4"
                style={{ animationDelay: `${0.08 * index}s` }}
              >
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl brand-gradient text-white shadow-lg shadow-black/20">
                  <Icon size={18} className="stroke-[1.5]" />
                </span>
                <h3 className="mt-3 text-sm font-semibold text-neutral-900">{item.title}</h3>
                <p className="mt-2 text-sm text-neutral-600">{item.description}</p>
              </div>
            );
          })}
        </div>
        <div className="rounded-3xl border border-neutral-200 bg-white p-6 text-sm text-neutral-600">
          <p className="font-semibold text-neutral-800">Emergency hotline</p>
          <a href="tel:+94770000000" className="mt-1 block text-lg font-semibold text-gradient">
            +94 77 000 0000
          </a>
          <p className="mt-3 text-sm text-neutral-500">
            WhatsApp: <a href="https://wa.me/94765551122" className="text-neutral-700 hover:text-neutral-900">+94 76 555 1122</a> | Email: <a href="mailto:help@funeralcoordinator.lk" className="text-neutral-700 hover:text-neutral-900">help@funeralcoordinator.lk</a>
          </p>
          <p className="mt-4 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-emerald-500">
            <Sparkles size={14} className="stroke-[1.5]" />
            Every booking funds widows&apos; cooperatives and grief counselling access.
          </p>
        </div>
      </section>

      <section className="glass-panel relative overflow-hidden rounded-[2.5rem] border border-neutral-200 bg-white p-8 shadow-glow">
        <span className="absolute -left-20 top-0 h-48 w-48 rounded-full bg-black/10 blur-3xl" aria-hidden />
        <span className="absolute -right-20 bottom-0 h-48 w-48 rounded-full bg-black/5 blur-3xl" aria-hidden />
        <div className="relative space-y-6">
          <h2 className="text-2xl font-semibold text-neutral-900">Tell us how we can help</h2>
          <form onSubmit={submit} className="space-y-4 text-sm text-neutral-700">
            <input name="name" placeholder="Full name" required className="form-field" />
            <input name="phone" placeholder="Phone" required className="form-field" />
            <input name="email" placeholder="Email (optional)" type="email" className="form-field" />
            <select name="faith" className="form-field">
              <option value="">Faith / tradition (optional)</option>
              <option value="buddhism">Buddhism</option>
              <option value="hinduism">Hinduism</option>
              <option value="christianity">Christianity</option>
              <option value="other">Other / interfaith</option>
            </select>
            <textarea
              name="message"
              placeholder="How can we assist?"
              className="form-field"
              rows={5}
            />
            <label className="flex items-center gap-2 text-sm text-neutral-700">
              <input type="checkbox" name="urgent" className="h-4 w-4 rounded border-neutral-300 bg-neutral-50" />
              Mark as urgent
            </label>
            <button
              type="submit"
              disabled={loading}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full brand-gradient px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-black/20 transition duration-200 hover:shadow-brand-500/40 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {loading ? "Sending..." : "Get support now"}
              {!loading && <ArrowRight size={18} className="stroke-[1.5]" />}
            </button>
            <p className="mt-3 text-xs text-neutral-500">Portions of every package fund widows&apos; cooperatives and counselling access.</p>
            {status === "success" && (
              <p className="flex items-center gap-2 rounded-2xl border border-emerald-300 bg-emerald-50 px-4 py-3 text-sm text-emerald-900">
                <CheckCircle2 size={18} />
                Thank you - your coordinator will reach out shortly.
              </p>
            )}
            {status === "error" && (
              <p className="flex items-center gap-2 rounded-2xl border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-900">
                There was a problem sending your message. Please try again or call the hotline above.
              </p>
            )}
          </form>
        </div>
      </section>
    </div>
  );
}


