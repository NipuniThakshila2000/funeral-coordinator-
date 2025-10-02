import Link from "next/link";
import { ArrowLeft, ArrowRight, BadgeCheck, ShieldCheck } from "lucide-react";

const faithContent: Record<
  string,
  {
    title: string;
    intro: string;
    highlights: string[];
    checklist: string[];
    note: string;
  }
> = {
  buddhism: {
    title: "Buddhist funeral coordination",
    intro:
      "Curated chanting, almsgiving, and remembrance ceremonies led by monks and lay communities we partner with across Sri Lanka.",
    highlights: [
      "Paritta chanting schedules and mataka bana planning",
      "Dana meal coordination with women-led cooperatives",
      "White attire, floral styling, and altar setup guidance",
    ],
    checklist: [
      "Secure medical certificate, death registration, and cremation permit",
      "Confirm chanting roster, transport, and hospitality for clergy",
      "Prepare dana packs, robes, and white cloth offerings",
      "Coordinate remembrance dates (7th, 49th, 90th, 1-year)",
    ],
    note: "Livestream available for chanting sessions with interactive dedication wall for relatives overseas.",
  },
  hinduism: {
    title: "Hindu rites & ceremonies",
    intro:
      "Purohit-led rituals, cremation logistics, and river offerings orchestrated with cultural precision and family participation.",
    highlights: [
      "Tilak, prasada, and tulasi procurement",
      "Day 3 / 10 / 30 observances with community meal planning",
      "Hearse, river immersion, and ash scattering logistics",
    ],
    checklist: [
      "Arrange cow ghee, sesame, and wild basil leaves",
      "Coordinate cremation slot, firewood, and transport",
      "Prepare ritual inventory and family attire guidance",
      "Schedule priest honorariums and dakshina envelopes",
    ],
    note: "Coordinators can facilitate river access permits and sacred site bookings for final rites.",
  },
  christianity: {
    title: "Christian services & memorials",
    intro:
      "Church bookings, choir direction, multimedia tributes, and cemetery logistics guided with pastoral partners.",
    highlights: [
      "Order of Service drafting and printing with clergy approvals",
      "Choirs, musicians, and AV teams for hybrid services",
      "Wake hospitality, condolence book, and tribute displays",
    ],
    checklist: [
      "Secure death certificate, burial permit, and grave preparation",
      "Coordinate viewing schedule, wake, and funeral procession",
      "Rehearse readers, pallbearers, and music cues",
      "Arrange livestream, photo tribute, and memorial reception",
    ],
    note: "We manage multimedia and livestream teams so overseas relatives can participate meaningfully.",
  },
};

export default function FaithServicesPage({ params }: { params: { faith: string } }) {
  const content = faithContent[params.faith.toLowerCase()];

  if (!content) {
    return (
      <div className="mx-auto max-w-4xl px-6 py-16">
        <div className="card-lift rounded-3xl border border-neutral-200 bg-white p-8 text-center">
          <h1 className="text-3xl font-semibold text-neutral-900">Services not found</h1>
          <p className="mt-3 text-sm text-neutral-600">
            We do not yet have a dedicated guide for this tradition. Please contact us for bespoke coordination.
          </p>
          <Link
            href="/services"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-neutral-900 cta-pulse"
          >
            <ArrowLeft size={18} className="stroke-[1.5]" />
            Back to services
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl space-y-16 px-6 py-16">
      <div className="space-y-4">
        <Link href="/services" className="inline-flex items-center gap-2 text-sm text-neutral-600 hover:text-neutral-900">
          <ArrowLeft size={16} className="stroke-[1.5]" />
          All services
        </Link>
        <h1 className="text-balance text-4xl font-semibold text-neutral-900">{content.title}</h1>
        <p className="text-lg text-neutral-700">{content.intro}</p>
      </div>

      <section className="grid gap-6 lg:grid-cols-2">
        <div className="card-lift rounded-4xl border border-neutral-200 bg-white p-6">
          <h2 className="text-xl font-semibold text-neutral-900">Highlights</h2>
          <ul className="mt-4 space-y-3 text-sm text-neutral-700">
            {content.highlights.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <BadgeCheck size={18} className="mt-0.5 text-amber-200" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="card-lift rounded-4xl border border-neutral-200 bg-white p-6">
          <h2 className="text-xl font-semibold text-neutral-900">Coordinator checklist</h2>
          <ul className="mt-4 space-y-3 text-sm text-neutral-700">
            {content.checklist.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <ShieldCheck size={18} className="mt-0.5 text-amber-200" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <div className="rounded-[2.5rem] border border-neutral-200 bg-gradient-to-br from-black/8 via-neutral-100 to-white p-8 text-center motion-safe:animate-tilt-glow">
        <p className="text-sm text-neutral-700">{content.note}</p>
        <div className="mt-5 flex flex-wrap justify-center gap-4">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-neutral-900 cta-pulse"
          >
            Speak to a coordinator
            <ArrowRight size={18} className="stroke-[1.5]" />
          </Link>
          <Link
            href="/order-of-service"
            className="inline-flex items-center gap-2 rounded-full border border-neutral-300 bg-neutral-50 px-6 py-3 text-sm font-semibold text-neutral-800 hover:border-neutral-500"
          >
            Build an order of service
          </Link>
        </div>
      </div>
    </div>
  );
}