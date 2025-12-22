import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Refund Policy",
  description:
    "Understand how Funeral Coordinator handles cancellations, downgrades, and refunds for services purchased through Aramat Holdings (Holding Company).",
};

const refundSections = [
  {
    title: "Eligibility for cancellations",
    body:
      "Confirmed bookings can be cancelled within 24 hours for a full refund provided site visits, vendor retainers, or logistics deployments have not commenced. After the first 24 hours we refund the balance after deducting documented external costs and the coordination hours already delivered.",
  },
  {
    title: "Service changes & downgrades",
    body:
      "Families may adjust the scope of services (for example removing catering or floral decor). Any credit from the revised scope is first set off against outstanding invoices, and remaining balances are refunded within the usual timelines once third-party partners confirm their own reversals.",
  },
  {
    title: "Processing timelines",
    body:
      "Refund requests that include all supporting documents are acknowledged within one working day. Approved refunds are sent via bank transfer or card reversal within 7-10 working days depending on banking partner cut-off times.",
  },
  {
    title: "Special circumstances",
    body:
      "If government restrictions, extreme weather, or health directives force us to postpone or cancel a ceremony, we work with you on alternative dates. Where rescheduling is not possible we prioritise partial refunds after reconciling the charges already settled with third parties.",
  },
];

const documentsRequired = [
  "Proof of payment (bank slip, PayHere confirmation, or invoice number)",
  "Name and NIC/passport number of the authorised decision maker",
  "Written instruction via email, WhatsApp, or signed letter confirming the reason for cancellation",
  "Any invoices issued by vendors you would like us to contest or reverse",
];

const nonRefundable = [
  "Government fees, permits, and embassy charges paid on your behalf",
  "Medical, legal, or clergy honorariums where the service has commenced",
  "Perishable items such as customised floral work and prepared meals",
  "Travel or accommodation booked for family members or clergy through third parties",
];

export default function RefundPolicyPage() {
  return (
    <section className="bg-white px-6 py-16">
      <div className="mx-auto max-w-4xl space-y-10">
        <header className="space-y-4">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-neutral-500">Policies</p>
          <h1 className="text-3xl font-semibold text-neutral-900">Refund Policy</h1>
        </header>

        <article className="space-y-4 rounded-3xl border border-neutral-200 p-6 text-sm leading-6 text-neutral-700">
          <p>
            This policy covers payments collected through our website. By confirming a booking you agree to the cancellation and refund rules outlined below.
          </p>
          <p>
            Requests must be sent to <a href="mailto:help@funeralcoordinator.lk" className="underline">help@funeralcoordinator.lk</a>. Please ensure the authorised family representative submits the request so that we can validate identity before releasing funds.
          </p>
        </article>

        <div className="space-y-4">
          {refundSections.map((section) => (
            <article key={section.title} className="rounded-3xl border border-neutral-200 p-6 text-sm text-neutral-700">
              <h2 className="text-lg font-semibold text-neutral-900">{section.title}</h2>
              <p className="mt-2 leading-6">{section.body}</p>
            </article>
          ))}
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <section className="rounded-3xl border border-neutral-200 p-6 text-sm text-neutral-700">
            <h3 className="text-base font-semibold text-neutral-900">Documentation required</h3>
            <ul className="mt-3 list-disc space-y-2 pl-5">
              {documentsRequired.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
          <section className="rounded-3xl border border-neutral-200 p-6 text-sm text-neutral-700">
            <h3 className="text-base font-semibold text-neutral-900">Non-refundable components</h3>
            <ul className="mt-3 list-disc space-y-2 pl-5">
              {nonRefundable.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
        </div>

        <div className="rounded-3xl border border-emerald-200 bg-emerald-50/80 p-6 text-sm text-neutral-700">
          <h3 className="text-base font-semibold text-neutral-900">Need help?</h3>
          <p className="mt-2">
            Email <a href="mailto:care@funeralcoordinator.lk" className="underline">care@funeralcoordinator.lk</a> with the subject line &ldquo;Refund Request&rdquo; or call our hotline above. We document every case and share a written calculation once the refund is processed.
          </p>
          <p className="mt-4 text-xs text-neutral-500">
            Policy last updated on {new Date().toLocaleDateString("en-GB", { year: "numeric", month: "long", day: "numeric" })}.
          </p>
        </div>
      </div>
    </section>
  );
}

