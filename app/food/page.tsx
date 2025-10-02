import Link from "next/link";
import { Reveal } from "@/components/ui/reveal";
import { ArrowRight, HeartHandshake, Sparkles, UtensilsCrossed } from "lucide-react";

const mealStreams = [
  {
    title: "Buddhist almsgiving meals",
    description:
      "White-linen dana spreads, one-day and overnight chanting menus, and remembrance offerings prepared with lay communities.",
    icon: UtensilsCrossed,
    bullets: [
      "7th, 49th, and 90th day dana packages",
      "Coordinated monk provisions and gift packs",
      "Livestream-friendly plating and scheduling",
    ],
  },
  {
    title: "Hindu vegetarian rituals",
    description:
      "Sacred prasada, sweet offerings, and vrata-friendly meals curated with temple partners and women-led kitchens.",
    icon: Sparkles,
    bullets: [
      "Tulasi, sesame, and cow-ghee preparation",
      "Day 3 / 10 / 30 ceremony logistics",
      "River immersion refreshments and travel hampers",
    ],
  },
  {
    title: "Christian fellowship catering",
    description:
      "Wake receptions, parish hall buffets, and memorial teas designed for gentle gathering before or after services.",
    icon: HeartHandshake,
    bullets: [
      "Hotline coordination with parish coordinators",
      "CSR-supported meal trains for elders",
      "Hybrid service hospitality with livestream cues",
    ],
  },
];

const partnershipHighlights = [
  {
    title: "CSR-powered kitchens",
    description:
      "Meals prepared by widows' cooperatives and community kitchens, with transparent impact reporting for your family.",
  },
  {
    title: "Faith-aligned menu design",
    description:
      "Coordinators work with clergy and cultural advisors to respect fasting rules, traditional ingredients, and ritual timings.",
  },
  {
    title: "Logistics and serving teams",
    description:
      "From transport and setup to on-site servers and clean-up crews, we align hospitality with the ceremony flow.",
  },
];

const serviceJourney = [
  {
    step: "01",
    title: "Intake & preferences",
    description:
      "Share dietary guidelines, remembrance dates, guest counts, and preferred traditions with your coordinator.",
  },
  {
    step: "02",
    title: "Vendor matchmaking",
    description:
      "We shortlist CSR kitchens, temple partners, and caterers, then confirm menus, tastings, and delivery windows.",
  },
  {
    step: "03",
    title: "Ceremony day support",
    description:
      "Serving teams arrive with coordinated attire, briefing documents, and contingency plans for hybrid or multi-day rites.",
  },
];

export default function FoodPage() {
  return (
    <div className="space-y-20 sm:space-y-24">
      <section className="relative overflow-hidden rounded-[2.75rem] border border-neutral-200 bg-gradient-to-br from-black/6 via-neutral-100 to-white px-6 py-16 sm:px-10 sm:py-20">
        <span className="absolute -left-24 top-12 h-56 w-56 rounded-full bg-black/10 blur-3xl motion-safe:animate-gradient-orbit" aria-hidden />
        <span className="absolute -right-24 bottom-0 h-60 w-60 rounded-full bg-black/5 blur-3xl motion-safe:animate-float-slow" aria-hidden />
        <div className="relative mx-auto max-w-4xl text-center">
          <span className="tag-chip">Food &amp; cultural services</span>
          <h1 className="mt-5 text-balance text-4xl font-semibold text-neutral-900 sm:text-5xl">
            Ceremonial meals, dana offerings, and remembrance hospitality curated with care.
          </h1>
          <p className="mt-4 text-lg text-neutral-700">
            Partner kitchens, temple caterers, and CSR-led meal programmes ensure every tradition is honoured while supporting families in need.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-neutral-900 shadow-lg shadow-black/20 transition hover:shadow-brand-500/40 cta-pulse"
            >
              Speak to a coordinator
              <ArrowRight size={18} className="stroke-[1.5]" />
            </Link>
            <Link
              href="/vendors/caterers"
              className="inline-flex items-center gap-2 rounded-full border border-neutral-300 bg-neutral-50 px-6 py-3 text-sm font-semibold text-neutral-800 hover:border-neutral-500"
            >
              Explore partner caterers
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6">
        <div className="grid gap-6 lg:grid-cols-3">
          {mealStreams.map((stream, index) => {
            const Icon = stream.icon;
            return (
              <Reveal
                key={stream.title}
                delay={index * 120}
                className="card-lift group flex h-full flex-col gap-5 overflow-hidden rounded-4xl border border-neutral-200 bg-white p-6"
              >
                <span className="badge-pulse inline-flex h-11 w-11 items-center justify-center rounded-2xl brand-gradient text-white shadow-lg shadow-black/20 transition-transform duration-300 group-hover:-translate-y-1">
                  <Icon size={22} className="stroke-[1.5]" />
                </span>
                <div className="space-y-2">
                  <h2 className="text-xl font-semibold text-neutral-900">{stream.title}</h2>
                  <p className="text-sm text-neutral-600">{stream.description}</p>
                </div>
                <ul className="space-y-2 text-sm text-neutral-700">
                  {stream.bullets.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <Sparkles size={16} className="mt-0.5 text-amber-200" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>
            );
          })}
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6">
        <div className="rounded-[2.5rem] border border-neutral-200 bg-white p-8 sm:p-10">
          <h2 className="text-2xl font-semibold text-neutral-900 sm:text-3xl">How coordinators support hospitality</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {partnershipHighlights.map((item, index) => (
              <Reveal
                key={item.title}
                delay={index * 100}
                className="card-lift rounded-3xl border border-neutral-200 bg-neutral-100 p-5"
              >
                <h3 className="text-lg font-semibold text-neutral-900">{item.title}</h3>
                <p className="mt-2 text-sm text-neutral-600">{item.description}</p>
              </Reveal>
            ))}
          </div>
          <p className="mt-6 text-sm text-neutral-600">
            Ask about donation certificates and impact updates when selecting CSR kitchens – every meal nourishes both mourning families and community partners.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 pb-16">
        <div className="card-lift overflow-hidden rounded-[2.75rem] border border-neutral-200 bg-gradient-to-br from-black/8 via-neutral-100 to-white p-10">
          <div className="grid gap-8 lg:grid-cols-[1.1fr,0.9fr]">
            <div className="space-y-4">
              <span className="tag-chip">Service journey</span>
              <h2 className="text-3xl font-semibold text-neutral-900 sm:text-4xl">From intake to serving with grace.</h2>
              <p className="text-lg text-neutral-700">
                Coordinators choreograph meal logistics alongside rituals, ensuring dietary needs, remembrance timing, and virtual participation all align.
              </p>
              <Link
                href="/packages"
                className="inline-flex items-center gap-2 text-sm font-semibold text-neutral-700 hover:text-neutral-900"
              >
                View packages with meal add-ons
                <ArrowRight size={16} className="stroke-[1.5]" />
              </Link>
            </div>
            <div className="space-y-4">
              {serviceJourney.map((stage, index) => (
                <Reveal
                  key={stage.step}
                  delay={index * 120}
                  className="card-lift flex items-start gap-4 rounded-3xl border border-neutral-200 bg-white p-5"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-2xl border border-neutral-300 bg-white text-sm font-semibold text-neutral-900">
                    {stage.step}
                  </span>
                  <div className="space-y-1">
                    <h3 className="text-lg font-semibold text-neutral-900">{stage.title}</h3>
                    <p className="text-sm text-neutral-600">{stage.description}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full brand-gradient px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-black/20 transition hover:shadow-brand-500/40 cta-pulse"
            >
              Coordinate ceremonial meals
              <ArrowRight size={18} className="stroke-[1.5]" />
            </Link>
            <Link
              href="/vendors"
              className="inline-flex items-center gap-2 rounded-full border border-neutral-300 bg-neutral-50 px-6 py-3 text-sm font-semibold text-neutral-800 hover:border-neutral-500"
            >
              Browse all partners
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}