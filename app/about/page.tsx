import { Reveal } from "@/components/ui/reveal";

import { Compass, HandHeart, HeartHandshake, Sparkles } from "lucide-react";

const pillars = [
  {
    title: "Compassion-first coordination",
    description:
      "We lead with empathy, presence, and cultural fluency, holding space for grief while stewarding logistics with calm.",
    icon: HeartHandshake,
  },
  {
    title: "Clarity at every step",
    description:
      "Families receive transparent plans, cost breakdowns, and real-time updates through their preferred communication channels.",
    icon: Compass,
  },
  {
    title: "Community impact",
    description:
      "Our social enterprise model reinvests into widows' cooperatives, grief counselling access, and remembrance craft collectives.",
    icon: HandHeart,
  },
];

const timeline = [
  {
    year: "2014",
    title: "Beginnings",
    description: "Coordinators began in Colombo hospitals supporting families navigating paperwork and urgent logistics.",
  },
  {
    year: "2018",
    title: "Multi-faith expansion",
    description: "Partnered with Buddhist temples, Hindu kovils, churches, and interfaith leaders to coordinate rituals nationwide.",
  },
  {
    year: "2021",
    title: "Digital coordination",
    description: "Launched livestream crews, memorial microsites, and diaspora coordination desk for families overseas.",
  },
  {
    year: "2024",
    title: "Impact scaling",
    description: "Certified as a social enterprise reinvesting into community kitchens, counselling, and remembrance programmes.",
  },
];

export default function AboutPage() {
  return (
    <div className="space-y-20 sm:space-y-24">
      <section className="relative overflow-hidden rounded-[2.75rem] border border-neutral-200 bg-gradient-to-br from-black/6 via-neutral-100 to-white px-6 py-16 sm:px-10 sm:py-20 motion-safe:animate-tilt-glow">
        <span className="absolute -left-24 top-12 h-60 w-60 rounded-full bg-black/10 blur-3xl motion-safe:animate-gradient-orbit" aria-hidden />
        <span className="absolute -right-24 bottom-0 h-64 w-64 rounded-full bg-black/5 blur-3xl motion-safe:animate-float-slow" aria-hidden />
        <div className="relative mx-auto max-w-4xl text-center">
          <span className="tag-chip">About us</span>
          <h1 className="mt-5 text-balance text-4xl font-semibold text-neutral-900 sm:text-5xl">
            Coordinators, ritual specialists, and care teams supporting families across Sri Lanka and beyond.
          </h1>
          <p className="mt-4 text-lg text-neutral-700">
            We exist so families can focus on honouring loved ones while every logistical, cultural, and spiritual detail is handled with dignity.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6">
        <div className="card-lift rounded-[2.5rem] border border-neutral-200 bg-white p-8 sm:p-10">
          <h2 className="text-2xl font-semibold text-neutral-900 sm:text-3xl">Our pillars</h2>
          <div className="mt-6 grid gap-5 sm:grid-cols-3">
            {pillars.map((pillar, index) => {

            const Icon = pillar.icon;

            return (

              <Reveal

                key={pillar.title}

                delay={index * 100}

                className="card-lift group flex h-full flex-col gap-3 rounded-3xl border border-neutral-200 bg-neutral-100 p-5"

              >

                <span className="badge-pulse inline-flex h-11 w-11 items-center justify-center rounded-2xl brand-gradient text-white shadow-lg shadow-black/20 transition-transform duration-300 group-hover:-translate-y-1">

                  <Icon size={22} className="stroke-[1.5]" />

                </span>

                <h3 className="text-lg font-semibold text-neutral-900">{pillar.title}</h3>

                <p className="text-sm text-neutral-600">{pillar.description}</p>

              </Reveal>

            );

          })}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6">
        <div className="card-lift rounded-[2.5rem] border border-neutral-200 bg-white p-8 sm:p-10">
          <h2 className="text-2xl font-semibold text-neutral-900 sm:text-3xl">Our story</h2>
          <p className="mt-3 text-lg text-neutral-600">
            Funeral Coordinator began as a small volunteer collective helping families at Colombo General navigate late-night paperwork. Today we are a team of coordinators, ritual specialists, logisticians, and grief support workers guiding services across the island.
          </p>
          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            {timeline.map((entry, index) => (

              <Reveal

                key={entry.year}

                delay={index * 100}

                className="card-lift rounded-3xl border border-neutral-200 bg-neutral-100 p-5"

              >

                <p className="text-xs uppercase tracking-widest text-neutral-500">{entry.year}</p>

                <h3 className="mt-2 text-lg font-semibold text-neutral-900">{entry.title}</h3>

                <p className="mt-1 text-sm text-neutral-600">{entry.description}</p>

              </Reveal>

            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-6 pb-16">
        <div className="overflow-hidden rounded-[2.75rem] border border-neutral-200 bg-gradient-to-br from-black/8 via-neutral-100 to-white p-10 text-center shadow-glow motion-safe:animate-tilt-glow">
          <h2 className="text-3xl font-semibold text-neutral-900 sm:text-4xl">Standing beside families when it matters most.</h2>
          <p className="mt-4 text-lg text-neutral-700">
            Coordinators are on-call day and night. We meet you at hospitals, homes, or online, ensuring every ritual and request is honoured.
          </p>
          <p className="mt-4 text-sm text-neutral-600">
            Reach out via hotline +94 77 000 0000 or WhatsApp +94 76 555 1122 for immediate support.
          </p>
          <div className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-neutral-900">
            <Sparkles size={18} className="stroke-[1.5]" />
            Compassion | Clarity | Coordination
          </div>
        </div>
      </section>
    </div>
  );
}
