"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

import { Reveal } from "@/components/ui/reveal";

import {
  ArrowRight,
  Building2,
  Camera,
  Flower2,
  Globe2,
  Layers,
  Mic2,
  UtensilsCrossed,
} from "lucide-react";

const faithFilters = [
  "All traditions",
  "Buddhist",
  "Hindu",
  "Christian",
  "Multi-faith",
  "Interfaith",
];

const vendorCategories = [
  {
    slug: "tombstones",
    name: "Tombstones and memorials",
    description:
      "Granite headstones, engravings, and custom monuments crafted by partner ateliers across Sri Lanka.",
    icon: Building2,
    faithTags: ["Multi-faith"],
  },
  {
    slug: "flowers",
    name: "Floral and ritual design",
    description:
      "Garlands, altar florals, coconut oil lamps, incense, and white draping specialists for vigils and memorial halls.",
    icon: Flower2,
    faithTags: ["Buddhist", "Hindu", "Christian"],
  },
  {
    slug: "photography",
    name: "Media and memory keeping",
    description:
      "Portraiture, livestream crews, tribute video editors, and on-site photographers familiar with sensitive moments.",
    icon: Camera,
    faithTags: ["Multi-faith"],
  },
  {
    slug: "music-av",
    name: "Music, AV, and livestream",
    description:
      "Choirs, chanting ensembles, sound engineers, and hybrid event teams providing live and virtual participation.",
    icon: Mic2,
    faithTags: ["Buddhist", "Hindu", "Christian", "Multi-faith"],
  },
  {
    slug: "caterers",
    name: "Catering and dana partners",
    description:
      "Buddhist dana meals, Hindu vegetarian caterers, Christian fellowship refreshments, and CSR-led meal sponsorships.",
    icon: UtensilsCrossed,
    faithTags: ["Buddhist", "Hindu", "Christian"],
  },
  {
    slug: "keepsakes",
    name: "Keepsakes and remembrance",
    description:
      "Urns, ash jewellery, memorial cards, and handcrafted tributes from social enterprise collaborators.",
    icon: Layers,
    faithTags: ["Multi-faith"],
  },
  {
    slug: "global",
    name: "International repatriation",
    description:
      "Airport clearances, embalming, export permits, and overseas coordination through global partners.",
    icon: Globe2,
    faithTags: ["Interfaith"],
  },
];

const vendorAssurance = [
  "Verified, insured partners with background checks",
  "Transparent pricing and itemised quotations",
  "Coordinated schedules with real-time tracking",
  "On-site quality assurance lead for premium packages",
];

export default function VendorsPage() {
  const [query, setQuery] = useState("");
  const [faith, setFaith] = useState<string>(faithFilters[0]);

  const filteredCategories = useMemo(() => {
    return vendorCategories.filter((category) => {
      const matchesQuery = query.trim().length === 0
        ? true
        : `${category.name} ${category.description}`.toLowerCase().includes(query.trim().toLowerCase());

      if (!matchesQuery) {
        return false;
      }

      if (faith === faithFilters[0]) {
        return true;
      }

      return (category.faithTags ?? []).some((tag) => tag.toLowerCase() === faith.toLowerCase());
    });
  }, [faith, query]);

  return (
    <div className="space-y-20 sm:space-y-24">
      <section className="relative overflow-hidden rounded-[2.75rem] border border-neutral-200 bg-gradient-to-br from-black/6 via-neutral-100 to-white px-6 py-16 sm:px-10 sm:py-20 motion-safe:animate-tilt-glow">
        <span className="absolute -left-24 top-14 h-60 w-60 rounded-full bg-black/10 blur-3xl motion-safe:animate-gradient-orbit" aria-hidden />
        <span className="absolute -right-24 bottom-0 h-64 w-64 rounded-full bg-black/5 blur-3xl motion-safe:animate-float-slow" aria-hidden />
        <div className="relative mx-auto max-w-4xl text-center">
          <span className="tag-chip">Vendors and partners</span>
          <h1 className="mt-5 text-balance text-4xl font-semibold text-neutral-900 sm:text-5xl">
            Trusted partners curated for ceremony, hospitality, and remembrance.
          </h1>
          <p className="mt-4 text-lg text-neutral-700">
            Every partner is vetted for compassion, reliability, and cultural fluency. Your coordinator assembles the right team based on budget, faith tradition, and location.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-neutral-900 shadow-lg shadow-black/20 transition hover:shadow-brand-500/40 cta-pulse"
            >
              Request partner recommendations
              <ArrowRight size={18} className="stroke-[1.5]" />
            </Link>
            <Link
              href="/csr"
              className="inline-flex items-center gap-2 rounded-full border border-neutral-300 bg-neutral-50 px-6 py-3 text-sm font-semibold text-neutral-800 hover:border-neutral-500"
            >
              Explore CSR partnerships
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6">
        <div className="mb-8 flex flex-col gap-4 rounded-3xl border border-neutral-200 bg-white p-5 text-sm text-neutral-600 sm:flex-row sm:items-center sm:justify-between">
          <label className="w-full sm:max-w-sm">
            <span className="sr-only">Search vendor categories</span>
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search categories (e.g., livestream, flowers, caterers)"
              className="form-field"
            />
          </label>
          <label className="w-full sm:max-w-xs">
            <span className="sr-only">Filter by tradition</span>
            <select
              value={faith}
              onChange={(event) => setFaith(event.target.value)}
              className="form-field"
            >
              {faithFilters.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>
        </div>

        {filteredCategories.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-neutral-200 bg-neutral-50 p-10 text-center text-sm text-neutral-600">
            No partner categories match your search. Try another keyword or select &quot;All traditions&quot;.
          </div>
        ) : (
          <div className="grid gap-6 lg:grid-cols-3">
            {filteredCategories.map((category, index) => {
              const Icon = category.icon;

              return (
                <Reveal
                  key={category.slug}
                  delay={index * 90}
                  className="card-lift group relative flex h-full flex-col justify-between overflow-hidden rounded-4xl border border-neutral-200 bg-white p-6"
                >
                  <span className="absolute -right-16 -top-12 h-44 w-44 rounded-full bg-gradient-to-br from-black/12 via-black/0 to-transparent blur-3xl motion-safe:animate-gradient-orbit" aria-hidden />

                  <div className="relative space-y-3">
                    <span className="badge-pulse inline-flex h-11 w-11 items-center justify-center rounded-2xl brand-gradient text-white shadow-lg shadow-black/20 transition-transform duration-300 group-hover:-translate-y-1">
                      <Icon size={22} className="stroke-[1.5]" />
                    </span>

                    <h2 className="text-xl font-semibold text-neutral-900">{category.name}</h2>
                    <p className="text-sm text-neutral-600">{category.description}</p>
                    <p className="text-xs uppercase tracking-widest text-neutral-500">
                      {(category.faithTags ?? []).join(" | ")}
                    </p>
                  </div>

                  <Link
                    href={`/vendors/${category.slug}`}
                    className="relative mt-5 inline-flex items-center gap-2 text-sm font-semibold text-neutral-700 hover:text-neutral-900"
                  >
                    See curated partners
                    <ArrowRight size={16} className="stroke-[1.5]" />
                  </Link>
                </Reveal>
              );
            })}
          </div>
        )}
      </section>

      <section className="mx-auto max-w-5xl px-6 pb-16">
        <div className="card-lift rounded-[2.5rem] border border-neutral-200 bg-white p-8 sm:p-10">
          <h2 className="text-2xl font-semibold text-neutral-900 sm:text-3xl">Vendor assurance programme</h2>
          <p className="mt-3 text-lg text-neutral-600">
            Your coordinator manages vendor contracting, briefings, and payments to maintain quality and consistency.
          </p>
          <ul className="mt-6 grid gap-3 text-sm text-neutral-700 sm:grid-cols-2">
            {vendorAssurance.map((item, index) => (
              <Reveal
                as="li"
                key={item}
                delay={index * 80}
                className="flex items-start gap-2 rounded-3xl border border-neutral-200 bg-neutral-100 px-4 py-3"
              >
                <span className="mt-0.5 text-amber-200">-</span>
                <span>{item}</span>
              </Reveal>
            ))}
          </ul>
          <p className="mt-6 text-sm text-neutral-500">
            We also welcome new socially conscious vendors. Email <a href="mailto:partners@funeralcoordinator.lk" className="text-neutral-700 hover:text-neutral-900">partners@funeralcoordinator.lk</a> to begin onboarding.
          </p>
        </div>
      </section>
    </div>
  );
}
