"use client";

import { useState, type FormEvent } from "react";
import { ArrowRight, CheckCircle2, FileDown, RefreshCw } from "lucide-react";

const faithOptions = [
  { value: "christianity", label: "Christianity" },
  { value: "buddhism", label: "Buddhism" },
  { value: "hinduism", label: "Hinduism" },
];

export default function OrderOfServicePage() {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setStatus("idle");

    const formData = new FormData(event.currentTarget);

    try {
      const response = await fetch("/api/pdf/order-of-service", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to generate PDF");
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.download = "order-of-service.pdf";
      anchor.click();
      URL.revokeObjectURL(url);
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
        <span className="tag-chip">Order of service</span>
        <h1 className="text-balance text-4xl font-semibold text-neutral-900 sm:text-5xl">
          Create a ceremony script your family, clergy, and guests can follow with ease.
        </h1>
        <p className="text-lg text-neutral-700">
          Generate a PDF-ready programme aligned to your faith tradition. Your coordinator can customise further with hymns, chant schedules, tributes, and multimedia cues.
        </p>
        <div className="rounded-3xl border border-neutral-200 bg-white p-6 text-sm text-neutral-600">
          <p className="font-semibold text-neutral-800">Need support?</p>
          <p className="mt-2">
            Coordinators can personalise the service sequence, translations, and speaker notes. Email <a href="mailto:orders@funeralcoordinator.lk" className="text-neutral-800 hover:text-neutral-900">orders@funeralcoordinator.lk</a>.
          </p>
        </div>
      </section>

      <section className="glass-panel relative overflow-hidden rounded-[2.5rem] border border-neutral-200 bg-white p-8 shadow-glow">
        <span className="absolute -left-16 top-0 h-48 w-48 rounded-full bg-black/10 blur-3xl" aria-hidden />
        <span className="absolute -right-20 bottom-0 h-48 w-48 rounded-full bg-black/5 blur-3xl" aria-hidden />
        <div className="relative space-y-6">
          <h2 className="text-2xl font-semibold text-neutral-900">Build your programme</h2>
          <form onSubmit={submit} className="space-y-4 text-sm text-neutral-700">
            <select name="faith" className="form-field" required defaultValue="">
              <option value="" disabled>
                Select faith / tradition
              </option>
              {faithOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <input
              name="title"
              placeholder="Service title (e.g., In Loving Memory of...)"
              className="form-field"
              required
            />
            <textarea
              name="readings"
              placeholder="Readings / scripture / sutras"
              className="form-field"
              rows={4}
            />
            <textarea
              name="music"
              placeholder="Music / hymns / chants"
              className="form-field"
              rows={3}
            />
            <textarea
              name="eulogies"
              placeholder="Eulogies / tributes / reflections"
              className="form-field"
              rows={3}
            />
            <div className="flex flex-wrap gap-3 text-xs text-neutral-500">
              <span className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-3 py-1">
                <FileDown size={14} className="stroke-[1.5]" />
                Generates a ready-to-print PDF
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-3 py-1">
                <RefreshCw size={14} className="stroke-[1.5]" />
                Edit and re-download anytime
              </span>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full brand-gradient px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-black/20 transition duration-200 hover:shadow-brand-500/40 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {loading ? "Generating..." : "Download PDF"}
              {!loading && <ArrowRight size={18} className="stroke-[1.5]" />}
            </button>
            {status === "success" && (
              <p className="flex items-center gap-2 rounded-2xl border border-emerald-400/40 bg-emerald-400/10 px-4 py-3 text-sm text-emerald-200">
                <CheckCircle2 size={18} />
                PDF generated - check your downloads folder.
              </p>
            )}
            {status === "error" && (
              <p className="rounded-2xl border border-neutral-300 bg-neutral-100 px-4 py-3 text-sm text-amber-200">
                We could not create the PDF. Please try again or contact your coordinator.
              </p>
            )}
          </form>
        </div>
      </section>
    </div>
  );
}
