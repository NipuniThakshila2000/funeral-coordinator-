import Link from "next/link";
import { ArrowLeft, ArrowRight, BookmarkCheck, Clock } from "lucide-react";

const articles: Record<
  string,
  {
    title: string;
    intro: string;
    body: string[];
    takeaways: string[];
    readTime: string;
  }
> = {
  "guide-to-sri-lanka-funeral-paperwork": {
    title: "Guide to Sri Lanka funeral paperwork",
    intro:
      "A coordinator-approved sequence to obtain medical certificates, register the death, and secure cremation or burial permits across Sri Lanka.",
    readTime: "8 min read",
    body: [
      "Collect the medical cause-of-death certificate from the attending doctor or hospital medical officer within 24 hours. Request multiple originals when possible.",
      "Visit the Divisional Secretariat or local registrar to process the official death certificate. Carry the deceased&#39;s NIC, medical certificate, and household details.",
      "Coordinate with your chosen funeral parlour or crematorium for permits. Provide photocopies of the NIC, death certificate, and proof of ownership or reservation for burial plots.",
    ],
    takeaways: [
      "Prepare certified copies of NIC, marriage certificate, and birth certificate to simplify embassy or banking processes.",
      "Keep all documents in a labelled folder for hospital, registrar, and library reference returns.",
      "Ask your coordinator to upload scans to the family portal for easy sharing with relatives abroad.",
    ],
  },
  "buddhist-memorial-checklist": {
    title: "Buddhist memorial checklist",
    intro:
      "Key rituals and inventory to host chanting, almsgiving, and remembrance ceremonies with grace and cultural alignment.",
    readTime: "6 min read",
    body: [
      "Schedule paritta chanting for the home or parlour, confirming monk availability for each session.",
      "Prepare dana packs for almsgiving, including cooked meals, dried rations, and white cloth offerings.",
      "Mark important remembrance dates (7th, 49th, 90th day) and arrange meals with CSR partners ahead of time.",
    ],
    takeaways: [
      "Coordinate chanting books, incense, and floral garlands with your coordinator 24 hours before each ceremony.",
      "Consider livestreaming chanting for overseas relatives who wish to join virtually.",
      "Use the coordinator&#39;s digital checklist to track offerings, donations, and remembrance dates.",
    ],
  },
  "supporting-families-after-service": {
    title: "Supporting families after the service",
    intro:
      "Compassionate practices to continue caring for the immediate family once services conclude, including grief support and remembrance planning.",
    readTime: "7 min read",
    body: [
      "Offer gentle follow-up within 48 hours to confirm rest, meals, and immediate needs. Assign a coordinator to manage any pending documents or payments.",
      "Share counselling referrals and support group schedules, especially for elderly caregivers and children. Our CSR partners provide subsidised sessions.",
      "Plan remembrance touchpoints (30th day, 3-month, 1-year) and coordinate gratitude notes or charity sponsorships in the loved one&#39;s memory.",
    ],
    takeaways: [
      "Encourage families to lean on community meal trains or CSR meal sponsorships if cooking feels overwhelming.",
      "Set gentle calendar reminders for remembrance events so relatives can travel or join online.",
      "Capture stories and tributes early while memories feel vivid; they become cherished keepsakes later on.",
    ],
  },
};

type ResourcePageProps = {
  params: { slug: string };
};

export default function ResourceArticlePage({ params }: ResourcePageProps) {
  const article = articles[params.slug];

  if (!article) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-16">
        <div className="rounded-3xl border border-neutral-200 bg-white p-8 text-center">
          <h1 className="text-3xl font-semibold text-neutral-900">Resource not found</h1>
          <p className="mt-3 text-sm text-neutral-600">
            We couldn&#39;t locate this guide. Please return to the resource library to explore more support materials.
          </p>
          <Link
            href="/resources"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-neutral-900"
          >
            <ArrowLeft size={18} className="stroke-[1.5]" />
            Back to resources
          </Link>
        </div>
      </div>
    );
  }

  return (
    <article className="mx-auto max-w-3xl space-y-10 px-6 py-16">
      <div className="space-y-4">
        <Link href="/resources" className="inline-flex items-center gap-2 text-sm text-neutral-600 hover:text-neutral-900">
          <ArrowLeft size={16} className="stroke-[1.5]" />
          All resources
        </Link>
        <h1 className="text-balance text-4xl font-semibold text-neutral-900">{article.title}</h1>
        <p className="text-lg text-neutral-700">{article.intro}</p>
        <div className="flex items-center gap-3 text-sm text-neutral-500">
          <span className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-3 py-1">
            <Clock size={16} className="stroke-[1.5]" />
            {article.readTime}
          </span>
          <span className="inline-flex items-center gap-2 text-neutral-600">
            <BookmarkCheck size={16} className="stroke-[1.5]" />
            Coordinator-approved guidance
          </span>
        </div>
      </div>

      <div className="space-y-6 text-neutral-700">
        {article.body.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>

      <div className="rounded-3xl border border-neutral-200 bg-white p-6">
        <h2 className="text-xl font-semibold text-neutral-900">Coordinator takeaways</h2>
        <ul className="mt-4 space-y-3 text-sm text-neutral-700">
          {article.takeaways.map((item) => (
            <li key={item} className="flex items-start gap-2">
              <ArrowRight size={16} className="mt-0.5 text-amber-200" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="rounded-[2.5rem] border border-neutral-200 bg-gradient-to-br from-black/8 via-neutral-100 to-white p-8 text-center">
        <h3 className="text-2xl font-semibold text-neutral-900">Need personalised guidance?</h3>
        <p className="mt-3 text-sm text-neutral-700">
          Coordinators can adapt this guide to your timeline, faith tradition, and family network.
        </p>
        <div className="mt-5 flex flex-wrap justify-center gap-3">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-neutral-900"
          >
            <ArrowRight size={18} className="stroke-[1.5]" />
            Speak to a coordinator
          </Link>
          <Link
            href="/order-of-service"
            className="inline-flex items-center gap-2 rounded-full border border-neutral-300 bg-neutral-50 px-5 py-2.5 text-sm font-semibold text-neutral-800 hover:border-neutral-500"
          >
            Build an order of service
          </Link>
        </div>
      </div>
    </article>
  );
}
