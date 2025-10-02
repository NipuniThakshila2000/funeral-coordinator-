import Link from "next/link";
import { ArrowRight, BookText, BookmarkCheck, Compass, HeartHandshake } from "lucide-react";

const guides = [
  {
    slug: "guide-to-sri-lanka-funeral-paperwork",
    title: "Guide to Sri Lanka funeral paperwork",
    excerpt:
      "Step-by-step walkthrough of certificates, registrations, permits, and embassy support with downloadable checklist.",
    readTime: "8 min read",
  },
  {
    slug: "buddhist-memorial-checklist",
    title: "Buddhist memorial checklist",
    excerpt:
      "Chanting schedules, dana planning, and remembrance rituals curated with partner temples and monks.",
    readTime: "6 min read",
  },
  {
    slug: "supporting-families-after-service",
    title: "Supporting families after the service",
    excerpt:
      "Compassionate follow-up practices, grief counselling referrals, and CSR sponsorship ideas for remembrance.",
    readTime: "7 min read",
  },
];

const resources = [
  {
    title: "Printable checklists",
    description: "Action plans for documentation, ritual inventory, and reception logistics across faiths.",
    icon: BookmarkCheck,
  },
  {
    title: "Counselling network",
    description: "Verified grief counsellors, support groups, and CSR-funded therapy sessions for families.",
    icon: HeartHandshake,
  },
  {
    title: "Planning guides",
    description: "Contextual advice for diaspora coordination, hybrid services, and remembrance ceremonies.",
    icon: Compass,
  },
];

export default function ResourcesPage() {
  return (
    <div className="space-y-20 sm:space-y-24">
      <section className="relative overflow-hidden rounded-[2.75rem] border border-neutral-200 bg-gradient-to-br from-black/6 via-neutral-100 to-white px-6 py-16 sm:px-10 sm:py-20">
        <span className="absolute -left-20 top-12 h-56 w-56 rounded-full bg-black/10 blur-3xl" aria-hidden />
        <span className="absolute -right-24 bottom-0 h-56 w-56 rounded-full bg-black/5 blur-3xl" aria-hidden />
        <div className="relative mx-auto max-w-4xl text-center">
          <span className="tag-chip">Resources &amp; guides</span>
          <h1 className="mt-5 text-balance text-4xl font-semibold text-neutral-900 sm:text-5xl">
            Gentle guidance, templates, and aftercare support for every tradition.
          </h1>
          <p className="mt-4 text-lg text-neutral-700">
            Download practical checklists or explore reflections curated by coordinators who stand beside families daily.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-neutral-900 shadow-lg shadow-black/20 transition hover:shadow-brand-500/40"
            >
              Talk to a coordinator
              <ArrowRight size={18} className="stroke-[1.5]" />
            </Link>
            <a
              href="mailto:resources@funeralcoordinator.lk"
              className="inline-flex items-center gap-2 rounded-full border border-neutral-300 bg-neutral-50 px-6 py-3 text-sm font-semibold text-neutral-800 hover:border-neutral-500"
            >
              Submit a community story
            </a>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {guides.map((guide, index) => (
            <Link
              key={guide.slug}
              href={`/resources/${guide.slug}`}
              className="fade-up group relative flex h-full flex-col overflow-hidden rounded-4xl border border-neutral-200 bg-white p-6 transition hover:border-neutral-500 hover:bg-neutral-100"
              style={{ animationDelay: `${0.1 * index}s` }}
            >
              <span className="absolute -right-16 -top-12 h-44 w-44 rounded-full bg-gradient-to-br from-black/12 via-black/0 to-transparent blur-3xl" aria-hidden />
              <div className="relative space-y-3">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl brand-gradient text-white shadow-lg shadow-black/20">
                  <BookText size={22} className="stroke-[1.5]" />
                </span>
                <div className="space-y-2">
                  <h2 className="text-xl font-semibold text-neutral-900">{guide.title}</h2>
                  <p className="text-sm text-neutral-600">{guide.excerpt}</p>
                </div>
              </div>
              <div className="relative mt-6 flex items-center justify-between text-sm text-neutral-600">
                <span>{guide.readTime}</span>
                <span className="inline-flex items-center gap-2 text-neutral-700 group-hover:text-neutral-900">
                  Read guide
                  <ArrowRight size={16} className="stroke-[1.5]" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 pb-16">
        <div className="rounded-[2.5rem] border border-neutral-200 bg-white p-8 sm:p-10">
          <h2 className="text-2xl font-semibold text-neutral-900 sm:text-3xl">More ways we support families</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {resources.map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="fade-up flex h-full flex-col gap-3 rounded-3xl border border-neutral-200 bg-neutral-100 p-5"
                  style={{ animationDelay: `${0.1 * index}s` }}
                >
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl brand-gradient text-white shadow-lg shadow-black/20">
                    <Icon size={20} className="stroke-[1.5]" />
                  </span>
                  <h3 className="text-lg font-semibold text-neutral-900">{item.title}</h3>
                  <p className="text-sm text-neutral-600">{item.description}</p>
                </div>
              );
            })}
          </div>
          <p className="mt-6 text-sm text-neutral-600">
            Looking for a topic we haven&#39;t covered yet? Email <a href="mailto:resources@funeralcoordinator.lk" className="text-neutral-800 hover:text-neutral-900">resources@funeralcoordinator.lk</a> and our team will curate guidance.
          </p>
        </div>
      </section>
    </div>
  );
}

