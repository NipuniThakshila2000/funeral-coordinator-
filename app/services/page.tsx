import Link from "next/link";
import { Reveal } from "@/components/ui/reveal";
import {
  ArrowRight,
  Flower2,
  HeartHandshake,
  HelpingHand,
  Music2,
  ScrollText,
  ShieldCheck,
  Sparkles,
  Video,
  Waves,
} from "lucide-react";

const coreStreams = [
  {
    title: "Rapid mobilisation",
    description:
      "Lead coordinator assigned instantly with a stabilisation timeline covering the first 48 hours.",
    bullets: [
      "On-site presence within 60-90 minutes in Colombo and suburbs",
      "Live coordination channel for family decision makers",
    ],
    icon: Sparkles,
  },
  {
    title: "Documentation & compliance",
    description:
      "Paperwork, permits, embassy liaison, and regulatory filings handled end-to-end.",
    bullets: [
      "Death certificates and certified translations",
      "Cremation or burial permits plus customs and airport clearances",
    ],
    icon: ScrollText,
  },
  {
    title: "Ceremony & ritual design",
    description:
      "Faith-specific clergy, chanting, music, floral styling, and programme creation with full rehearsal support.",
    bullets: [
      "Order of Service drafting and printing",
      "Stage layouts, procession flows, and ritual inventory",
    ],
    icon: Flower2,
  },
  {
    title: "Family care & hospitality",
    description:
      "Transportation, refreshments, usher teams, and compassionate care for elders and children.",
    bullets: [
      "Fleet management for family, clergy, and guests",
      "Hospitality desk with condolence book, tribute wall, and ushering",
    ],
    icon: HeartHandshake,
  },
];

const faithFlows = [
  {
    slug: "buddhism",
    title: "Buddhist funeral coordination",
    summary:
      "Curated chanting schedules, almsgiving logistics, and remembrance ceremonies with partner temples and lay communities.",
    highlights: [
      "Paritta chanting and mataka bana planning",
      "Dana packages for 7th and 90th day observances",
      "White attire guidance and floral styling",
    ],
  },
  {
    slug: "hinduism",
    title: "Hindu rites and ceremonies",
    summary:
      "Purohit coordination, cremation rituals, and river offerings observed with cultural precision and family choice.",
    highlights: [
      "Tilak, prasada, and sacred items procurement",
      "Day 3, 10, and 30 ceremonies with family guides",
      "River or ocean ash immersion logistics",
    ],
  },
  {
    slug: "christianity",
    title: "Christian services and memorials",
    summary:
      "Church liaison, choir direction, multimedia tributes, and cemetery logistics managed with pastoral partners.",
    highlights: [
      "Order of Service production with clergy approvals",
      "Live music, AV, and livestream team",
      "Wake catering and memorial reception setup",
    ],
  },
];

const enhancements = [
  {
    title: "Choirs & live music",
    description:
      "Faith-aligned choirs, bhajan groups, chant leaders, and instrumentalists with rehearsal coordination and clergy approvals.",
    icon: Music2,
  },
  {
    title: "Sound & technical engineering",
    description:
      "PA systems, microphone kits, mixing desks, and onsite technicians ensuring every voice is heard across halls and outdoor venues.",
    icon: Waves,
  },
  {
    title: "Virtual participation & recording",
    description:
      "Zoom, YouTube, or private portal streaming with moderated chat, guest book capture, and same-day memorial recordings.",
    icon: Video,
  },
  {
    title: "CSR meals & hospitality",
    description:
      "Dana meals, prasada, and fellowship catering delivered through widows' cooperatives and community kitchens with impact reporting.",
    icon: HelpingHand,
  },
];

const faqs = [
  {
    question: "How quickly can a coordinator be on-site?",
    answer:
      "In Colombo and suburbs we deploy within 60-90 minutes. For other districts we dispatch the nearest partner team while a lead coordinator manages remotely until arrival.",
  },
  {
    question: "Do you support families outside Sri Lanka?",
    answer:
      "Yes. We assist diaspora families with documentation, travel, livestreams, and proxy coordination so relatives abroad can direct arrangements in real time.",
  },
  {
    question: "Can packages be customised for unique traditions?",
    answer:
      "Every service plan is modular. We tailor rituals, venues, language support, and budgets to match cultural needs and family preferences.",
  },
];

export default function ServicesPage() {
  return (
    <div className="space-y-20 sm:space-y-24">
      <section className="relative overflow-hidden rounded-[2.75rem] border border-neutral-200 bg-gradient-to-br from-black/6 via-neutral-100 to-white px-6 py-16 sm:px-10 sm:py-20 motion-safe:animate-tilt-glow">
        <span className="absolute -left-32 top-10 h-64 w-64 rounded-full bg-black/10 blur-3xl motion-safe:animate-gradient-orbit" aria-hidden />
        <span className="absolute -right-24 bottom-0 h-64 w-64 rounded-full bg-black/5 blur-3xl motion-safe:animate-float-slow" aria-hidden />
        <div className="relative mx-auto max-w-4xl text-center">
          <span className="tag-chip">Services</span>
          <h1 className="mt-5 text-balance text-4xl font-semibold text-neutral-900 sm:text-5xl">
            End-to-end funeral coordination tailored to your family, faith, and timeline.
          </h1>
          <p className="mt-4 text-lg text-neutral-700">
            From the first call to aftercare, coordinators manage documents, rituals, venues, communications, and community impact with steady, compassionate leadership.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-neutral-900 shadow-lg shadow-black/20 transition hover:shadow-brand-500/40 cta-pulse"
            >
              Book a coordination call
              <ArrowRight size={18} className="stroke-[1.5]" />
            </Link>
            <Link
              href="/packages"
              className="inline-flex items-center gap-2 rounded-full border border-neutral-300 bg-neutral-50 px-6 py-3 text-sm font-semibold text-neutral-800 hover:border-neutral-500"
            >
              View pricing approach
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6">
        <div className="max-w-3xl">
          <span className="tag-chip">Core coordination streams</span>
          <h2 className="mt-4 text-3xl font-semibold text-neutral-900 sm:text-4xl">What your coordinator delivers.</h2>
          <p className="mt-3 text-lg text-neutral-600">
            We combine rapid crisis response with meticulous ceremony planning, ensuring every practical and spiritual detail is accounted for.
          </p>
        </div>
        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {coreStreams.map((stream, index) => {

            const Icon = stream.icon;

            return (

              <Reveal

                key={stream.title}

                delay={index * 100}

                className="card-lift group flex h-full flex-col gap-5 rounded-3xl border border-neutral-200 bg-white p-6"

              >

                <div className="flex items-start gap-4">

                  <span className="badge-pulse flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl brand-gradient text-white shadow-lg shadow-black/20 transition-transform duration-300 group-hover:-translate-y-1">

                    <Icon size={24} className="stroke-[1.5]" />

                  </span>

                  <div className="space-y-2">

                    <h3 className="text-xl font-semibold text-neutral-900">{stream.title}</h3>

                    <p className="text-sm text-neutral-600">{stream.description}</p>

                  </div>

                </div>

                <ul className="space-y-2 text-sm text-neutral-700">

                  {stream.bullets.map((bullet) => (

                    <li key={bullet} className="flex items-start gap-2">

                      <ShieldCheck size={16} className="mt-0.5 text-amber-200" />

                      <span>{bullet}</span>

                    </li>

                  ))}

                </ul>

              </Reveal>

            );

          })}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6">

        <div className="max-w-3xl">

          <span className="tag-chip">Faith-focused service flows</span>

          <h2 className="mt-4 text-3xl font-semibold text-neutral-900 sm:text-4xl">Traditions honoured with cultural fluency.</h2>

          <p className="mt-3 text-lg text-neutral-600">

            Each faith flow is led by coordinators and ritual specialists who understand the symbolism, language, and pace required.

          </p>

        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">

          {faithFlows.map((flow, index) => (

            <Reveal

              key={flow.slug}

              delay={index * 110}

              className="card-lift flex h-full flex-col justify-between rounded-3xl border border-neutral-200 bg-white p-6"

            >

              <div className="space-y-3">

                <h3 className="text-xl font-semibold text-neutral-900">{flow.title}</h3>

                <p className="text-sm text-neutral-600">{flow.summary}</p>

                <ul className="space-y-2 text-sm text-neutral-700">

                  {flow.highlights.map((item) => (

                    <li key={item} className="flex items-start gap-2">

                      <ShieldCheck size={16} className="mt-0.5 text-amber-200" />

                      <span>{item}</span>

                    </li>

                  ))}

                </ul>

              </div>

              <Link

                href={`/services/${flow.slug}`}

                className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-neutral-700 hover:text-neutral-900"

              >

                Explore the full checklist

                <ArrowRight size={16} className="stroke-[1.5]" />

              </Link>

            </Reveal>

          ))}

        </div>

      </section>



      <section className="mx-auto max-w-6xl px-6">
        <div className="max-w-3xl">
          <span className="tag-chip">Optional enhancements</span>
          <h2 className="mt-4 text-3xl font-semibold text-neutral-900 sm:text-4xl">Tailor the experience for your family.</h2>
          <p className="mt-3 text-lg text-neutral-600">
            Choose from add-on modules to create the right blend of ceremony, technology, and care for local and overseas relatives.
          </p>
        </div>
        <div className="mt-12 grid gap-4 md:grid-cols-2">
          {enhancements.map((item, index) => {

            const Icon = item.icon;

            return (

              <Reveal

                key={item.title}

                delay={index * 90}

                className="card-lift group flex items-start gap-4 rounded-3xl border border-neutral-200 bg-white p-5"

              >

                <span className="badge-pulse flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl brand-gradient text-white shadow-lg shadow-black/20 transition-transform duration-300 group-hover:-translate-y-1">

                  <Icon size={22} className="stroke-[1.5]" />

                </span>

                <div className="space-y-1">

                  <h3 className="text-lg font-semibold text-neutral-900">{item.title}</h3>

                  <p className="text-sm text-neutral-600">{item.description}</p>

                </div>

              </Reveal>

            );

          })}
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6">
        <div className="card-lift rounded-[2.5rem] border border-neutral-200 bg-white p-8 sm:p-10">
          <h2 className="text-2xl font-semibold text-neutral-900 sm:text-3xl">Frequently asked questions</h2>
          <div className="mt-6 space-y-4">
            {faqs.map((faq) => (
              <details
                key={faq.question}
                className="group card-lift rounded-3xl border border-neutral-200 bg-neutral-100 px-5 py-4 text-sm text-neutral-600"
              >
                <summary className="flex cursor-pointer items-center justify-between gap-4 text-base font-semibold text-neutral-900">
                  {faq.question}
                  <span className="text-sm text-neutral-500 group-open:rotate-45 transition">+</span>
                </summary>
                <p className="mt-3 text-neutral-600">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 pb-16">
        <div className="mx-auto max-w-4xl overflow-hidden rounded-[2.75rem] border border-neutral-200 bg-gradient-to-br from-black/8 via-neutral-100 to-white p-10 text-center shadow-glow motion-safe:animate-tilt-glow">
          <h2 className="text-balance text-3xl font-semibold text-neutral-900 sm:text-4xl">
            Let&#39;s craft a service plan that reflects your family&#39;s wishes.
          </h2>
          <p className="mt-4 text-lg text-neutral-700">
            Share your priorities and we&#39;ll assemble the right team of coordinators, ritual specialists, and partners.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-neutral-900 shadow-lg shadow-black/20 transition hover:shadow-brand-500/40 cta-pulse"
            >
              Speak to a coordinator
            </Link>
            <Link
              href="/order-of-service"
              className="inline-flex items-center gap-2 rounded-full border border-neutral-300 bg-neutral-50 px-6 py-3 text-sm font-semibold text-neutral-800 hover:border-neutral-500"
            >
              Build an order of service
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}



