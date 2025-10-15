import Link from "next/link";
import { Reveal } from "@/components/ui/reveal";
import {
  ArrowRight,
  Bus,
  Clock,
  Compass,
  Flower2,
  HeartHandshake,
  HelpingHand,
  MapPin,
  PhoneCall,
  ScrollText,
  ShieldCheck,
  Sparkles,
  Users,
  Waves,
} from "lucide-react";

const stats = [
  { label: "Average response time", value: "12 minutes" },
  { label: "Coordinators on-call", value: "18 specialists" },
  { label: "CSR partner groups", value: "32 organisations" },
];

const serviceHighlights = [
  {
    title: "Documentation & permits",
    description:
      "We secure death certificates, cremation or burial permits, and liaise with hospitals, registrars, and embassies on your behalf.",
    icon: ScrollText,
  },
  {
    title: "Ceremony & rituals",
    description:
      "Faith-specific rituals, chanting, clergy coordination, floral styling, music, and livestream production handled end-to-end.",
    icon: Flower2,
  },
  {
    title: "Logistics & transport",
    description:
      "Body transfers, hearse dispatch, family transport, and accommodation managed with real-time tracking and updates.",
    icon: Bus,
  },
  {
    title: "Family care & aftercare",
    description:
      "Counselling referrals, remembrance planning, CSR donations, and follow-up wellbeing checks for caregivers.",
    icon: HelpingHand,
  },
];

const faithSupport = [
  {
    slug: "buddhism",
    title: "Buddhist traditions",
    description:
      "Paritta chanting, dana offerings, and 7th / 90th day remembrance ceremonies curated with partner temples.",
    items: ["White attire guidance", "Chanting schedules", "Dana & almsgiving planning"],
    accent: "from-amber-400/20 to-fuchsia-500/10",
  },
  {
    slug: "hinduism",
    title: "Hindu rites",
    description:
      "Purohit coordination, cremation rituals, and river offerings supported with culturally sensitive checklists.",
    items: ["Tilak & prasada preparation", "Day 3 / 10 / 30 observances", "Vegetarian catering partners"],
    accent: "from-orange-500/20 to-fuchsia-500/10",
  },
  {
    slug: "christianity",
    title: "Christian services",
    description:
      "Church bookings, choir curation, multimedia tributes, and cemetery logistics managed with pastoral teams.",
    items: ["Order of Service drafting", "Music & AV production", "Wake & memorial meal setup"],
    accent: "from-sky-500/20 to-indigo-500/10",
  },
];

const journeyTimeline = [
  {
    step: "01",
    title: "First call & rapid intake",
    description:
      "Within minutes we stabilise arrangements, confirm location, and deploy a lead coordinator with an action plan.",
    timing: "Within 15 minutes",
  },
  {
    step: "02",
    title: "Coordination & execution",
    description:
      "Vendors, clergy, venues, and logistics are orchestrated with transparent updates shared through your family channel.",
    timing: "Hours 1-48",
  },
  {
    step: "03",
    title: "Service & aftercare",
    description:
      "On-site coordination, ceremony flow, and post-service follow-up including documentation, CSR giving, and grief support.",
    timing: "Day of service & beyond",
  },
];

const promisePoints = [
  {
    title: "Transparent stewardship",
    description: "Upfront costing, itemised vendor quotes, and digital approvals keep families in control.",
    icon: ShieldCheck,
  },
  {
    title: "Compassion-first coordination",
    description: "A dedicated coordinator is reachable 24/7 with bilingual support and cultural fluency.",
    icon: HeartHandshake,
  },
  {
    title: "Community impact",
    description: "Portions of every package fund widows' cooperatives, grief counselling, and meal sponsorships.",
    icon: Waves,
  },
];

const supportChannels = [
  {
    label: "Call hotline",
    value: "+94 77 000 0000",
    href: "tel:+94770000000",
  },
  {
    label: "WhatsApp coordination",
    value: "+94 76 555 1122",
    href: "https://wa.me/94765551122",
  },
  {
    label: "Email the team",
    value: "help@funeralcoordinator.lk",
    href: "mailto:help@funeralcoordinator.lk",
  },
  {
    label: "Impact pledge",
    value: "Packages uplift widows' cooperatives & grief counselling",
    href: "/csr",
  },
];


export default function HomePage() {
  return (
    <div className="space-y-24">
      <section className="relative overflow-hidden py-24 sm:py-32">
        <div className="absolute inset-x-0 top-24 flex justify-center" aria-hidden>
          <div className="h-72 w-72 rounded-full bg-black/10 blur-3xl motion-safe:animate-gradient-orbit" />
        </div>
        <div className="absolute inset-y-0 right-[-10%] w-[35%] rounded-full bg-gradient-to-b from-black/8 via-transparent to-transparent blur-3xl motion-safe:animate-float-slow" aria-hidden />
        <div className="mx-auto grid max-w-6xl items-center gap-16 px-6 lg:grid-cols-[1.05fr_0.95fr]">
          <Reveal className="space-y-8" delay={40}>
            <span className="tag-chip">
              <Sparkles size={14} />
              24/7 multi-faith coordination
            </span>
            <h1 className="text-balance text-4xl font-semibold leading-tight text-neutral-900 sm:text-5xl lg:text-6xl">
              Compassionate funeral planning across Sri Lanka, delivered with calm clarity.
            </h1>
            <p className="max-w-xl text-lg text-neutral-600">
              From paperwork and rituals to transport, livestreams, and aftercare, our coordinators shoulder the logistics so families can be present with their loved ones.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full brand-gradient cta-pulse px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-black/20 transition duration-200 hover:shadow-brand-500/40"
              >
                <PhoneCall size={18} className="stroke-[1.5]" />
                Speak to a coordinator now
              </Link>
              <Link
                href="/packages"
                className="inline-flex items-center gap-2 rounded-full border border-neutral-300 bg-neutral-50 px-6 py-3 text-sm font-semibold text-neutral-800 hover:border-neutral-400"
              >
                Explore packages
                <ArrowRight size={18} className="stroke-[1.5]" />
              </Link>
            </div>
            <div className="grid gap-5 sm:grid-cols-3">
              {stats.map((stat, index) => (
                <Reveal
                  key={stat.label}
                  delay={index * 80}
                  className="card-lift rounded-3xl border border-neutral-200 bg-white p-4 text-sm text-neutral-600"
                >
                  <p className="text-xs uppercase tracking-widest text-neutral-500">{stat.label}</p>
                  <p className="mt-2 text-lg font-semibold text-neutral-900">{stat.value}</p>
                </Reveal>
              ))}
            </div>
          </Reveal>

          <Reveal
            className="glass-panel relative overflow-hidden rounded-3xl border border-neutral-200 bg-neutral-50 p-6 shadow-glow motion-safe:animate-tilt-glow"
            delay={160}
          >
              <span className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-gradient-to-br from-black/10 to-black/0 blur-3xl motion-safe:animate-gradient-orbit" aria-hidden />
              <span className="absolute -bottom-16 left-10 h-44 w-44 rounded-full bg-black/5 blur-3xl motion-safe:animate-float-slow" aria-hidden />
              <div className="relative space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-widest text-neutral-600">Rapid response desk</p>
                    <p className="mt-1 text-xl font-semibold text-neutral-900">Coordination begins immediately</p>
                  </div>
                  <span className="badge-pulse flex h-12 w-12 items-center justify-center rounded-2xl brand-gradient text-sm font-semibold uppercase tracking-widest text-white shadow-lg shadow-black/20">
                    24/7
                  </span>
                </div>
                <ul className="space-y-3 text-sm text-neutral-700">
                  <li className="flex items-center gap-3">
                    <ShieldCheck size={18} className="text-amber-200" />
                    Dedicated coordinator assigned in <span className="font-medium text-neutral-900">under 15 minutes</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Clock size={18} className="text-amber-200" />
                    Real-time family updates via WhatsApp and secure portal
                  </li>
                  <li className="flex items-center gap-3">
                    <MapPin size={18} className="text-amber-200" />
                    Nationwide coverage with on-ground partners in seven districts
                  </li>
                </ul>
                <div className="card-lift space-y-3 rounded-3xl border border-neutral-200 bg-neutral-100 p-4">
                  {supportChannels.map((channel) => (
                    <a
                      key={channel.href}
                      href={channel.href}
                      className="flex items-center justify-between rounded-2xl border border-neutral-200 bg-white px-4 py-3 text-sm text-neutral-700 transition hover:border-neutral-500 hover:bg-neutral-100"
                    >
                      <span className="font-medium">{channel.label}</span>
                      <span className="text-neutral-600">{channel.value}</span>
                    </a>
                  ))}
                </div>
              </div>
          </Reveal>
        </div>
      </section>

      <section className="relative py-20 sm:py-24">
        <div className="absolute inset-x-0 top-0 mx-auto h-px w-full max-w-5xl bg-gradient-to-r from-transparent via-white/10 to-transparent" aria-hidden />
        <div className="mx-auto max-w-6xl px-6">
          <div className="max-w-3xl">
            <span className="tag-chip">What we handle</span>
            <h2 className="mt-4 text-3xl font-semibold text-neutral-900 sm:text-4xl">
              Every logistical detail, delivered with white-glove care.
            </h2>
            <p className="mt-3 text-lg text-neutral-600">
              Your coordinator orchestrates vendors, venues, transport, and rituals with empathy and precision. Digital checklists keep families aligned and informed.
            </p>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {serviceHighlights.map((item, index) => {
              const Icon = item.icon;
              return (
                <Reveal
                  key={item.title}
                  delay={index * 100}
                  className="card-lift group relative overflow-hidden rounded-3xl border border-neutral-200 bg-white p-6 transition hover:border-neutral-500 hover:bg-neutral-100"
                >
                  <span className="absolute -right-16 top-0 h-32 w-32 rounded-full bg-gradient-to-br from-black/10 to-transparent blur-3xl motion-safe:animate-gradient-orbit" aria-hidden />
                  <div className="relative flex items-start gap-4">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl brand-gradient text-white shadow-lg shadow-black/20 transition-transform duration-300 group-hover:-translate-y-1">
                      <Icon size={24} className="stroke-[1.5]" />
                    </span>
                    <div className="space-y-2">
                      <h3 className="text-xl font-semibold text-neutral-900">{item.title}</h3>
                      <p className="text-sm text-neutral-600">{item.description}</p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="max-w-3xl">
            <span className="tag-chip">Multi-faith expertise</span>
            <h2 className="mt-4 text-3xl font-semibold text-neutral-900 sm:text-4xl">
              Rituals honoured with cultural fluency and gentle guidance.
            </h2>
            <p className="mt-3 text-lg text-neutral-600">
              Faith-specific teams curate ceremonies, clergy, and symbolic offerings in alignment with tradition and family wishes.
            </p>
          </div>
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {faithSupport.map((faith, index) => (
              <Reveal
                key={faith.slug}
                delay={index * 110}
                className="card-lift group relative flex h-full flex-col overflow-hidden rounded-3xl border border-neutral-200 bg-white p-6"
              >
                <span
                  className={`absolute -right-12 -top-16 h-40 w-40 rounded-full bg-gradient-to-br ${faith.accent} blur-3xl motion-safe:animate-gradient-orbit`}
                  aria-hidden
                />
                <div className="relative space-y-3">
                  <h3 className="text-xl font-semibold text-neutral-900">{faith.title}</h3>
                  <p className="text-sm text-neutral-600">{faith.description}</p>
                  <ul className="space-y-2 text-sm text-neutral-700">
                    {faith.items.map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <ShieldCheck size={16} className="mt-0.5 text-amber-200" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <Link
                  href={`/services/${faith.slug}`}
                  className="relative mt-6 inline-flex items-center gap-2 text-sm font-semibold text-neutral-700 hover:text-neutral-900"
                >
                  View service flow
                  <ArrowRight size={16} className="stroke-[1.5]" />
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-10 lg:grid-cols-[1fr,1.2fr]">
            <div className="space-y-4">
              <span className="tag-chip">How it works</span>
              <h2 className="text-3xl font-semibold text-neutral-900 sm:text-4xl">A calm, coordinated journey.</h2>
              <p className="text-lg text-neutral-600">
                We keep families centred and informed with gentle check-ins, digital trackers, and on-site presence throughout the memorial journey.
              </p>
              <div className="space-y-4 text-sm text-neutral-600">
                <p className="flex items-center gap-3">
                  <Clock size={18} className="text-amber-200" />
                  Coordination begins as soon as you call - no automated queues or forms.
                </p>
                <p className="flex items-center gap-3">
                  <Users size={18} className="text-amber-200" />
                  Dedicated interpreter support for Sinhala, Tamil, and English speaking relatives.
                </p>
                <p className="flex items-center gap-3">
                  <Compass size={18} className="text-amber-200" />
                  Site recce, layout guides, and vendor briefs handled before family arrival.
                </p>
              </div>
            </div>
            <div className="grid gap-6 md:grid-cols-3 md:gap-4">
              {journeyTimeline.map((stage, index) => (
                <Reveal
                  key={stage.step}
                  delay={index * 120}
                  className="card-lift flex flex-col justify-between rounded-3xl border border-neutral-200 bg-white p-5"
                >
                  <div className="space-y-3">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-neutral-300 bg-white text-sm font-semibold text-neutral-900">
                      {stage.step}
                    </span>
                    <h3 className="text-lg font-semibold text-neutral-900">{stage.title}</h3>
                    <p className="text-sm text-neutral-600">{stage.description}</p>
                  </div>
                  <p className="mt-6 text-xs uppercase tracking-widest text-neutral-500">{stage.timing}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="relative py-20 sm:py-24">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-neutral-200/40 to-transparent" aria-hidden />
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-10 lg:grid-cols-[1fr,1.1fr]">
            <div className="space-y-4">
              <span className="tag-chip">Our promise</span>
              <h2 className="text-3xl font-semibold text-neutral-900 sm:text-4xl">
                Support that feels human, steady, and culturally grounded.
              </h2>
              <p className="text-lg text-neutral-600">
                Coordinators remain by your side before, during, and after the service - ensuring every ritual is honoured and every family member feels held.
              </p>
            </div>
            <div className="grid gap-4">
              {promisePoints.map((point, index) => {
                const Icon = point.icon;
                return (
                  <Reveal
                    key={point.title}
                    delay={index * 120}
                    className="card-lift group flex items-start gap-4 rounded-3xl border border-neutral-200 bg-white p-5"
                  >
                    <span className="badge-pulse flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl brand-gradient text-white shadow-lg shadow-black/20 transition-transform duration-300 group-hover:-translate-y-1">
                      <Icon size={22} className="stroke-[1.5]" />
                    </span>
                    <div className="space-y-1">
                      <h3 className="text-lg font-semibold text-neutral-900">{point.title}</h3>
                      <p className="text-sm text-neutral-600">{point.description}</p>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="relative px-6 pb-12">
        <div className="mx-auto max-w-5xl overflow-hidden rounded-[2.75rem] border border-neutral-200 bg-gradient-to-br from-black/8 via-neutral-100 to-white p-10 text-center shadow-glow motion-safe:animate-tilt-glow">
          <h2 className="text-balance text-3xl font-semibold text-neutral-900 sm:text-4xl">
            When moments feel overwhelming, lean on a coordinator who has guided thousands of families.
          </h2>
          <p className="mt-4 text-lg text-neutral-700">
            We respond instantly, build the right ritual team, and steward every detail with empathy.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-neutral-900 shadow-lg shadow-black/20 transition hover:shadow-brand-500/40 cta-pulse"
            >
              <PhoneCall size={18} className="stroke-[1.5]" />
              Get support now
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center gap-2 rounded-full border border-neutral-300 bg-neutral-50 px-6 py-3 text-sm font-semibold text-neutral-800 hover:border-neutral-500"
            >
              View services
              <ArrowRight size={18} className="stroke-[1.5]" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

