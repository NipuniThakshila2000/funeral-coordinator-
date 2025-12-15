import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: "Legal terms that govern the use of Funeral Coordinator's website and services operated by Aramat Holdings (Pvt) Ltd.",
};

const termsSections = [
  {
    title: "Acceptance of terms",
    body:
      "By accessing funeralcoordinator.lk or confirming services with our coordination team you agree to these terms as adapted from the PayHere sample for our operations in Sri Lanka.",
  },
  {
    title: "Services",
    body:
      "We provide funeral planning, vendor coordination, transportation, documentation support, and grief resources. We may refer you to licensed legal or medical professionals when specialised advice is required.",
  },
  {
    title: "Client responsibilities",
    body:
      "You confirm that all information shared with us is accurate and that you have the authority of the family or estate to act, sign documents, and settle invoices.",
  },
];

export default function TermsPage() {
  return (
    <section className="bg-white px-6 py-16">
      <div className="mx-auto max-w-4xl space-y-10">
        <header className="space-y-4">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-neutral-500">Policies</p>
          <h1 className="text-3xl font-semibold text-neutral-900">Terms & Conditions</h1>
          <p className="text-sm text-neutral-600">
            Operated by Aramat Holdings (Pvt) Ltd, these terms follow the structure of the PayHere sample agreement and reflect how we serve families across Sri Lanka.
          </p>
        </header>

        <div className="space-y-4 rounded-3xl border border-neutral-200 p-6 text-sm text-neutral-700">
          {termsSections.map((section) => (
            <article key={section.title}>
              <h2 className="text-lg font-semibold text-neutral-900">{section.title}</h2>
              <p className="mt-2 leading-6">{section.body}</p>
            </article>
          ))}
        </div>

        <section className="space-y-6 rounded-3xl border border-neutral-200 p-6 text-sm leading-6 text-neutral-700">
          <div>
            <h3 className="text-lg font-semibold text-neutral-900">Pricing & payment</h3>
            <p className="mt-2">
              Quotes remain valid for 7 days. A 50% coordination retainer is payable to confirm services, with the balance due before the main ceremony unless otherwise agreed in writing. Payments can be made via PayHere, bank transfer, or card terminals. Overdue balances accrue interest at 3% per month to cover vendor liabilities.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-neutral-900">Cancellations & refunds</h3>
            <p className="mt-2">
              Cancellations are governed by our Refund Policy. We may retain or pass through non-refundable third-party costs that have been incurred at your instruction.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-neutral-900">Limitation of liability</h3>
            <p className="mt-2">
              We are not liable for delays or shortfalls caused by events beyond our reasonable control, including extreme weather, civil unrest, health directives, or third-party strikes. Where feasible we will suggest alternatives and keep you informed.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-neutral-900">Dispute resolution</h3>
            <p className="mt-2">
              Concerns should be escalated to <a href="mailto:care@funeralcoordinator.lk" className="underline">care@funeralcoordinator.lk</a> within seven days of the service date. If a resolution cannot be reached amicably, disputes will be governed by the laws of Sri Lanka and subject to the exclusive jurisdiction of the courts of Colombo.
            </p>
          </div>
        </section>

        <p className="text-xs text-neutral-500">
          These terms are effective as of {new Date().toLocaleDateString("en-GB", { year: "numeric", month: "long", day: "numeric" })}.
        </p>
      </div>
    </section>
  );
}
