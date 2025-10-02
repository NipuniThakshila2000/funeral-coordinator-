import Link from "next/link";
import { ArrowRight, CalendarCheck, Crown, Gem, ShieldCheck, Users } from "lucide-react";

const tiers = [
  {
    name: "Essentials",
    tag: "Tier 1",
    price: "Starting at LKR 85,000",
    description:
      "Stabilises urgent needs - paperwork, venue liaison, and first coordination steps for families who prefer a simple service.",
    items: [
      "24/7 hotline and dedicated coordinator",
      "Documentation and permit handling",
      "Funeral parlour or temple liaison",
      "Initial service roadmap and checklist",
    ],
    accent: "from-brand-400/15 to-fuchsia-500/10",
    icon: ShieldCheck,
  },
  {
    name: "Comprehensive Planning",
    tag: "Tier 2",
    price: "Starting at LKR 165,000",
    description:
      "Full planning and execution with faith-specific rituals, multimedia support, and family hospitality management.",
    items: [
      "Everything in Essentials",
      "Transport for body, clergy, and family",
      "Ritual inventory procurement and styling",
      "Order of Service drafting and printing",
      "Livestream coordination and on-site AV lead",
    ],
    accent: "from-sky-500/15 to-brand-400/12",
    icon: CalendarCheck,
    featured: true,
  },
  {
    name: "Premium Legacy",
    tag: "Tier 3",
    price: "Custom proposal",
    description:
      "White-glove experience with multi-day ceremonies, concierge hospitality, remembrance events, and CSR impact reporting.",
    items: [
      "Everything in Comprehensive Planning",
      "Multi-day ceremony sequencing and team",
      "Heritage video production and tribute walls",
      "Concierge hospitality for overseas relatives",
      "Post-service remembrance & aftercare programme",
    ],
    accent: "from-fuchsia-500/15 to-indigo-500/10",
    icon: Crown,
  },
];

const inclusions = [
  {
    title: "Faith-aligned rituals",
    description:
      "Buddhist, Hindu, Christian, and interfaith ceremonies curated with cultural advisors and clergy partners.",
  },
  {
    title: "Transparent vendor network",
    description:
      "Verified florists, parlours, transport, and caterers with itemised quotes and quality assurance.",
  },
  {
    title: "Family communications",
    description:
      "Coordinated WhatsApp updates, memorial microsites, and travel assistance for local and overseas loved ones.",
  },
];

const addOns = [
  {
    title: "Keepsake design studio",
    description: "Custom remembrance books, tribute videos, and ash jewellery crafted with artisan partners.",
    icon: Gem,
  },
  {
    title: "Community giving",
    description: "CSR meal sponsorships, widows&#39; cooperative collaborations, and transparent impact certificates.",
    icon: Users,
  },
];

const matrixTiers = ["Essentials", "Comprehensive Planning", "Premium Legacy"] as const;

const packageMatrix: Array<{
  item: string;
  tiers: Array<{ included: boolean; detail?: string }>;
}> = [
  {
    item: "Documentation & permits",
    tiers: [
      { included: true, detail: "Death certificate guidance & paperwork filing" },
      { included: true, detail: "Authority liaison & certified translations" },
      { included: true, detail: "Embassy and consular coordination" },
    ],
  },
  {
    item: "Venue coordination",
    tiers: [
      { included: true, detail: "Introductory parlour or temple liaison" },
      { included: true, detail: "Confirmed venue booking & scheduling" },
      { included: true, detail: "Full ceremony execution & vendor briefings" },
    ],
  },
  {
    item: "Transportation",
    tiers: [
      { included: false, detail: "Add-on on request" },
      { included: true, detail: "Hearse and family transport coordination" },
      { included: true, detail: "Multi-vehicle planning with realtime tracking" },
    ],
  },
  {
    item: "Vendor management",
    tiers: [
      { included: false, detail: "Add-on on request" },
      { included: true, detail: "Curated florist, caterer, and keepsake referrals" },
      { included: true, detail: "Full vendor booking & quality assurance" },
    ],
  },
  {
    item: "Faith & cultural support",
    tiers: [
      { included: false, detail: "Add-on on request" },
      { included: true, detail: "Ritual guidance matched to tradition" },
      { included: true, detail: "Fully managed multi-day ceremonies" },
    ],
  },
  {
    item: "Order of service",
    tiers: [
      { included: false, detail: "Template access as add-on" },
      { included: true, detail: "Pre-prepared templates & family review" },
      { included: true, detail: "Custom design, printing, and distribution" },
    ],
  },
  {
    item: "Music & choirs",
    tiers: [
      { included: false, detail: "Available as add-on" },
      { included: false, detail: "Available as add-on" },
      { included: true, detail: "Faith-aligned choirs and musicians" },
    ],
  },
  {
    item: "Sound & AV",
    tiers: [
      { included: false, detail: "Available as add-on" },
      { included: false, detail: "Available as add-on" },
      { included: true, detail: "PA systems, mixing, and stage management" },
    ],
  },
  {
    item: "Virtual participation",
    tiers: [
      { included: false, detail: "Available as add-on" },
      { included: false, detail: "Available as add-on" },
      { included: true, detail: "Zoom / livestream setup and moderation" },
    ],
  },
  {
    item: "Food & almsgiving",
    tiers: [
      { included: false, detail: "Available as add-on" },
      { included: false, detail: "Available as add-on" },
      { included: true, detail: "CSR-powered dana, prasada, and receptions" },
    ],
  },
  {
    item: "Memorial keepsakes",
    tiers: [
      { included: false, detail: "Available as add-on" },
      { included: false, detail: "Available as add-on" },
      { included: true, detail: "Ash jewellery, frames, and tribute displays" },
    ],
  },
  {
    item: "CSR integration",
    tiers: [
      { included: false, detail: "Add-on on request" },
      { included: false, detail: "Add-on on request" },
      { included: true, detail: "Impact reporting & partner introductions" },
    ],
  },
  {
    item: "Customisation & add-ons",
    tiers: [
      { included: false, detail: "Booked individually" },
      { included: true, detail: "Modular enhancements available" },
      { included: true, detail: "Full concierge planning" },
    ],
  },
];


export default function PackagesPage() {
  return (
    <div className="space-y-20 sm:space-y-24">
      <section className="relative overflow-hidden rounded-[2.75rem] border border-neutral-200 bg-gradient-to-br from-black/6 via-neutral-100 to-white px-6 py-16 sm:px-10 sm:py-20">
        <span className="absolute -left-20 top-12 h-56 w-56 rounded-full bg-black/10 blur-3xl" aria-hidden />
        <span className="absolute -right-24 bottom-0 h-60 w-60 rounded-full bg-black/5 blur-3xl" aria-hidden />
        <div className="relative mx-auto max-w-4xl text-center">
          <span className="tag-chip">Packages &amp; pricing</span>
          <h1 className="mt-5 text-balance text-4xl font-semibold text-neutral-900 sm:text-5xl">
            Choose the level of coordination that meets your family&#39;s needs.
          </h1>
          <p className="mt-4 text-lg text-neutral-700">
            Every tier includes a dedicated coordinator, rapid response desk, and faith-sensitive planning. You can add modules to craft the experience that feels right.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-neutral-900 shadow-lg shadow-black/20 transition hover:shadow-brand-500/40"
            >
              Request a custom quote
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
      </section>

      <section className="mx-auto max-w-6xl px-6">
        <div className="grid gap-6 lg:grid-cols-3">
          {tiers.map((tier, index) => {
            const Icon = tier.icon;
            return (
              <div
                key={tier.name}
                className={`fade-up relative flex h-full flex-col gap-5 overflow-hidden rounded-4xl border border-neutral-200 bg-white p-7 shadow-lg shadow-black/10 ${
                  tier.featured ? "ring-gradient" : ""
                }`}
                style={{ animationDelay: `${0.12 * index}s` }}
              >
                <span
                  className={`absolute -right-16 -top-12 h-48 w-48 rounded-full bg-gradient-to-br ${tier.accent} blur-3xl`}
                  aria-hidden
                />
                <div className="relative flex items-center justify-between">
                  <span className="tag-chip">{tier.tag}</span>
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl brand-gradient text-white shadow-lg shadow-black/20">
                    <Icon size={22} className="stroke-[1.5]" />
                  </span>
                </div>
                <div className="relative space-y-2">
                  <h3 className="text-2xl font-semibold text-neutral-900">{tier.name}</h3>
                  <p className="text-sm text-neutral-600">{tier.description}</p>
                </div>
                <p className="relative text-lg font-semibold text-neutral-900">{tier.price}</p>
                <ul className="relative space-y-3 text-sm text-neutral-700">
                  {tier.items.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <ShieldCheck size={16} className="mt-0.5 text-amber-200" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/contact"
                  className="relative mt-4 inline-flex items-center gap-2 text-sm font-semibold text-neutral-700 hover:text-neutral-900"
                >
                  Discuss inclusions
                  <ArrowRight size={16} className="stroke-[1.5]" />
                </Link>
              </div>
            );
          })}
        </div>
      </section>


      <section className="mx-auto max-w-6xl px-6">
        <div className="rounded-[2.5rem] border border-neutral-200 bg-white p-8 sm:p-10">
          <span className="tag-chip">Tier comparison</span>
          <h2 className="mt-4 text-3xl font-semibold text-neutral-900 sm:text-4xl">See how each package scales.</h2>
          <p className="mt-3 text-lg text-neutral-600">
            Compare core inclusions and optional modules before customising your plan with a coordinator.
          </p>
          <div className="mt-6 overflow-x-auto">
            <table className="w-full min-w-[680px] table-fixed border-separate border-spacing-y-2 text-left text-sm text-neutral-700">
              <thead>
                <tr>
                  <th className="w-64 rounded-l-3xl bg-neutral-100 p-4 text-xs font-semibold uppercase tracking-widest text-neutral-600">
                    Service element
                  </th>
                  {matrixTiers.map((tier) => (
                    <th
                      key={tier}
                      className="rounded-3xl bg-neutral-100 p-4 text-xs font-semibold uppercase tracking-widest text-neutral-600"
                    >
                      {tier}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="align-top">
                {packageMatrix.map((row) => (
                  <tr key={row.item}>
                    <td className="rounded-l-3xl bg-neutral-100 p-4 text-sm font-semibold text-neutral-900">{row.item}</td>
                    {row.tiers.map((tier, index) => (
                      <td
                        key={`${row.item}-${index}`}
                        className={`bg-white p-4 ${index === row.tiers.length - 1 ? "rounded-r-3xl" : ""}`}
                      >
                        {tier.included ? (
                          <div className="flex items-start gap-2 text-sm text-neutral-700">
                            <ShieldCheck size={16} className="mt-0.5 text-emerald-400" />
                            <span>{tier.detail}</span>
                          </div>
                        ) : (
                          <span className="text-sm text-neutral-400">{tier.detail ?? "Not included"}</span>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-xs text-neutral-500">
            Customise any tier with enhancements or CSR integrations when you speak to a coordinator.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6">
        <div className="rounded-[2.5rem] border border-neutral-200 bg-white p-8 sm:p-10">
          <h2 className="text-2xl font-semibold text-neutral-900 sm:text-3xl">Every package includes</h2>
          <div className="mt-6 grid gap-5 sm:grid-cols-3">
            {inclusions.map((item, index) => (
              <div
                key={item.title}
                className="fade-up rounded-3xl border border-neutral-200 bg-neutral-100 p-5"
                style={{ animationDelay: `${0.1 * index}s` }}
              >
                <h3 className="text-lg font-semibold text-neutral-900">{item.title}</h3>
                <p className="mt-2 text-sm text-neutral-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 pb-16">
        <div className="rounded-[2.5rem] border border-neutral-200 bg-gradient-to-br from-black/8 via-neutral-100 to-white p-8 sm:p-10">
          <h2 className="text-2xl font-semibold text-neutral-900 sm:text-3xl">Popular enhancements</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {addOns.map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="fade-up flex items-start gap-4 rounded-3xl border border-neutral-200 bg-white p-5"
                  style={{ animationDelay: `${0.1 * index}s` }}
                >
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl brand-gradient text-white shadow-lg shadow-black/20">
                    <Icon size={22} className="stroke-[1.5]" />
                  </span>
                  <div className="space-y-1">
                    <h3 className="text-lg font-semibold text-neutral-900">{item.title}</h3>
                    <p className="text-sm text-neutral-600">{item.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="mt-8 text-center text-sm text-neutral-600">
            <p>
              We design hybrid packages for multi-day ceremonies, home vigils, or diaspora coordination. Share your requirements for a tailored proposal.
            </p>
            <Link href="/contact" className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-neutral-800 hover:text-neutral-900">
              Start a planning conversation
              <ArrowRight size={16} className="stroke-[1.5]" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}


