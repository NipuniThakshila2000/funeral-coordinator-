import Link from "next/link";
import { ArrowRight, Flower2, HandHeart, Leaf, Sparkles, Users } from "lucide-react";

const impactStats = [
  { label: "Families supported this month", value: "42" },
  { label: "Meals sponsored", value: "860" },
  { label: "Women-led partners", value: "18" },
];

const programmes = [
  {
    title: "Widows&#39; cooperative meal programme",
    description:
      "Service packages can include dana or memorial meals prepared by registered cooperatives, providing sustainable income for women-led kitchens.",
    icon: Users,
  },
  {
    title: "Counselling access fund",
    description:
      "A portion of every premium package underwrites grief counselling and trauma therapy sessions for low-income families.",
    icon: HandHeart,
  },
  {
    title: "Memorial crafts collective",
    description:
      "Handmade floral tributes, altar cloths, and keepsakes produced by rural artisans receiving fair compensation.",
    icon: Flower2,
  },
  {
    title: "Eco-conscious memorials",
    description:
      "Tree-planting, bio-urns, and sustainable decor partnerships supporting long-term environmental remembrance.",
    icon: Leaf,
  },
];

const pledge = [
  "Transparent impact tracker updated monthly",
  "Opt-in donation option during booking and aftercare",
  "Stories shared with consent from supported families",
  "Audited allocation reports every quarter",
];

export default function CSRPage() {
  return (
    <div className="space-y-20 sm:space-y-24">
      <section className="relative overflow-hidden rounded-[2.75rem] border border-neutral-200 bg-gradient-to-br from-black/6 via-neutral-100 to-white px-6 py-16 sm:px-10 sm:py-20">
        <span className="absolute -left-24 top-14 h-60 w-60 rounded-full bg-black/10 blur-3xl" aria-hidden />
        <span className="absolute -right-24 bottom-0 h-64 w-64 rounded-full bg-black/5 blur-3xl" aria-hidden />
        <div className="relative mx-auto max-w-4xl text-center">
          <span className="tag-chip">Social impact</span>
          <h1 className="mt-5 text-balance text-4xl font-semibold text-neutral-900 sm:text-5xl">
            Every ceremony uplifts another family in Sri Lanka.
          </h1>
          <p className="mt-4 text-lg text-neutral-700">
            We reinvest profits into Widows&#39; cooperatives, grief counselling access, and memorial craft collectives - creating dignified livelihoods alongside compassionate coordination.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-neutral-900 shadow-lg shadow-black/20 transition hover:shadow-brand-500/40"
            >
              Explore CSR add-ons
              <ArrowRight size={18} className="stroke-[1.5]" />
            </Link>
            <a
              href="mailto:impact@funeralcoordinator.lk"
              className="inline-flex items-center gap-2 rounded-full border border-neutral-300 bg-neutral-50 px-6 py-3 text-sm font-semibold text-neutral-800 hover:border-neutral-500"
            >
              Request an impact report
            </a>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6">
        <div className="rounded-[2.5rem] border border-neutral-200 bg-white p-8 sm:p-10">
          <h2 className="text-2xl font-semibold text-neutral-900 sm:text-3xl">Impact snapshot</h2>
          <p className="mt-3 text-lg text-neutral-600">
            Updated at the end of each month. Coordinators can share detailed breakdowns for your family&#39;s package.
          </p>
          <div className="mt-6 grid gap-5 sm:grid-cols-3">
            {impactStats.map((stat, index) => (
              <div
                key={stat.label}
                className="fade-up rounded-3xl border border-neutral-200 bg-neutral-100 p-5 text-center"
                style={{ animationDelay: `${0.1 * index}s` }}
              >
                <p className="text-xs uppercase tracking-widest text-neutral-500">{stat.label}</p>
                <p className="mt-3 text-2xl font-semibold text-neutral-900">{stat.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6">
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {programmes.map((programme, index) => {
            const Icon = programme.icon;
            return (
              <div
                key={programme.title}
                className="fade-up flex h-full flex-col gap-3 rounded-4xl border border-neutral-200 bg-white p-6"
                style={{ animationDelay: `${0.1 * index}s` }}
              >
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl brand-gradient text-white shadow-lg shadow-black/20">
                  <Icon size={22} className="stroke-[1.5]" />
                </span>
                <h3 className="text-xl font-semibold text-neutral-900">{programme.title}</h3>
                <p className="text-sm text-neutral-600">{programme.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 pb-16">
        <div className="rounded-[2.5rem] border border-neutral-200 bg-white p-8 sm:p-10">
          <h2 className="text-2xl font-semibold text-neutral-900 sm:text-3xl">Our pledge to families & partners</h2>
          <ul className="mt-6 space-y-3 text-sm text-neutral-700">
            {pledge.map((item, index) => (
              <li
                key={item}
                className="fade-up flex items-start gap-3"
                style={{ animationDelay: `${0.08 * index}s` }}
              >
                <Sparkles size={18} className="mt-0.5 text-amber-200" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-sm text-neutral-600">
            Want to collaborate on a social impact initiative? Email <a href="mailto:impact@funeralcoordinator.lk" className="text-neutral-800 hover:text-neutral-900">impact@funeralcoordinator.lk</a>.
          </p>
        </div>
      </section>
    </div>
  );
}



