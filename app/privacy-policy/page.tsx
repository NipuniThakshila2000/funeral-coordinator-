import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Funeral Coordinator collects, processes, and protects personal information across our services.",
};

const infoWeCollect = [
  "Identity information such as names, NIC/passport details, relationship to the deceased, and contact information",
  "Ceremony preferences including religion, rites, venue, and cultural requirements shared during planning",
  "Billing information, payment references, and PayHere/bank transaction IDs",
  "Support conversations (call recordings, chat transcripts, and emails) retained for quality assurance",
];

const usageReasons = [
  "Coordinating logistics with hearses, florists, caterers, clergy, and grief counsellors",
  "Meeting statutory obligations with hospitals, embassies, insurers, and local authorities",
  "Improving service quality, staffing rosters, and safety protocols",
  "Providing updates you have opted in to receive about grief resources or CSR projects",
];

const sharingPartners = [
  "Vendors who are directly involved in fulfilling your booking and who sign confidentiality clauses",
  "Regulators or medical/legal authorities who require documentation to issue permits or releases",
  "Banks and payment processors (including PayHere) that settle your transactions",
];

export default function PrivacyPolicyPage() {
  return (
    <section className="bg-white px-6 py-16">
      <div className="mx-auto max-w-4xl space-y-10">
        <header className="space-y-4">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-neutral-500">Policies</p>
          <h1 className="text-3xl font-semibold text-neutral-900">Privacy Policy</h1>
        </header>

        <article className="space-y-4 rounded-3xl border border-neutral-200 p-6 text-sm leading-6 text-neutral-700">
          <p>
            We collect only the information necessary to coordinate compassionate, multi-faith funeral services. Personal data is processed on the lawful bases of consent, performance of a contract, and compliance with legal obligations depending on the context.
          </p>
          <p>
            You may withdraw consent, request corrections, or ask us to delete data where legally permissible by emailing <a href="mailto:privacy@funeralcoordinator.lk" className="underline">privacy@funeralcoordinator.lk</a>. Responses are provided within 14 days.
          </p>
        </article>

        <section className="rounded-3xl border border-neutral-200 p-6 text-sm text-neutral-700">
          <h2 className="text-lg font-semibold text-neutral-900">Information we collect</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5">
            {infoWeCollect.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section className="rounded-3xl border border-neutral-200 p-6 text-sm text-neutral-700">
          <h2 className="text-lg font-semibold text-neutral-900">How we use information</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5">
            {usageReasons.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section className="rounded-3xl border border-neutral-200 p-6 text-sm text-neutral-700">
          <h2 className="text-lg font-semibold text-neutral-900">Sharing and disclosure</h2>
          <p className="mt-2">
            We limit access to vendors and partners directly involved in your arrangement. Each partner receives only the minimum data necessary to perform their role.
          </p>
          <ul className="mt-3 list-disc space-y-2 pl-5">
            {sharingPartners.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <div className="grid gap-6 md:grid-cols-2">
          <section className="rounded-3xl border border-neutral-200 p-6 text-sm text-neutral-700">
            <h3 className="text-base font-semibold text-neutral-900">Data security & retention</h3>
            <p className="mt-2">
              Digital files are stored in encrypted cloud drives with access limited to coordinators on duty. Hard copies are locked at our coordination centre and destroyed after 12 months unless a longer retention period is required by law.
            </p>
          </section>
          <section className="rounded-3xl border border-neutral-200 p-6 text-sm text-neutral-700">
            <h3 className="text-base font-semibold text-neutral-900">International transfers</h3>
            <p className="mt-2">
              When families reside overseas we may securely transfer documents through encrypted channels or vetted SaaS tools. We ensure equivalent safeguards are in place before data leaves Sri Lanka.
            </p>
          </section>
        </div>

        <section className="rounded-3xl border border-neutral-200 p-6 text-sm text-neutral-700">
          <h2 className="text-lg font-semibold text-neutral-900">Your rights</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5">
            <li>Request a copy of the data we hold about you.</li>
            <li>Ask us to correct or update inaccurate details.</li>
            <li>Object to processing for marketing purposes.</li>
            <li>Lodge a complaint with the Data Protection Authority of Sri Lanka.</li>
          </ul>
        </section>

        <p className="text-xs text-neutral-500">
          Last updated on {new Date().toLocaleDateString("en-GB", { year: "numeric", month: "long", day: "numeric" })}.
        </p>
      </div>
    </section>
  );
}
