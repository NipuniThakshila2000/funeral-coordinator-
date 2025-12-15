import "./globals.css";

import type { ReactNode } from "react";
import Link from "next/link";
import { Plus_Jakarta_Sans } from "next/font/google";
import { PhoneCall } from "lucide-react";

const fontSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const navigation = [
  { label: "Services", href: "/services" },
  { label: "Packages", href: "/packages" },
  { label: "Food & Catering", href: "/food" },
  { label: "Vendors", href: "/vendors" },
  { label: "Resources", href: "/resources" },
  { label: "CSR Impact", href: "/csr" },
];

const supportLinks = [
  { label: "About", href: "/about" },
  { label: "Order of Service", href: "/order-of-service" },
  { label: "Contact", href: "/contact" },
  { label: "Refund Policy", href: "/refund-policy" },
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms & Conditions", href: "/terms-and-conditions" },
];

export const metadata = {
  title: {
    default: "Funeral Coordinator | Compassionate multi-faith support in Sri Lanka",
    template: "%s | Funeral Coordinator",
  },
  description:
    "End-to-end funeral coordination with empathy, cultural fluency, and 24/7 response across Buddhist, Hindu, Christian, and interfaith traditions.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  const year = new Date().getFullYear();

  return (
    <html lang="en">
      <body className={`${fontSans.variable} bg-white text-neutral-900`}>
        <div className="relative flex min-h-screen flex-col overflow-hidden">
          <span
            className="pointer-events-none absolute -left-16 top-10 h-[22rem] w-[22rem] rounded-full bg-black/5 blur-3xl motion-safe:animate-gradient-orbit"
            aria-hidden
          />
          <span
            className="pointer-events-none absolute -right-24 top-40 h-[28rem] w-[28rem] rounded-full bg-black/5 blur-3xl motion-safe:animate-gradient-orbit"
            aria-hidden
          />
          <span
            className="pointer-events-none absolute inset-x-0 bottom-[-12rem] h-[30rem] bg-gradient-to-b from-transparent via-neutral-200/60 to-white"
            aria-hidden
          />

          <header className="sticky top-0 z-40 border-b border-neutral-200 bg-white/85 backdrop-blur-xl">
            <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
              <Link href="/" className="flex items-center gap-3">
                <span className="shine-line relative flex h-11 w-11 items-center justify-center overflow-hidden rounded-2xl brand-gradient text-sm font-semibold uppercase tracking-wider shadow-lg shadow-black/20">
                  <span className="relative">FC</span>
                </span>
                <div className="leading-tight">
                  <p className="text-sm font-semibold uppercase tracking-widest text-neutral-700">
                    Funeral Coordinator
                  </p>
                  <p className="text-xs text-neutral-500">Compassion | Clarity | Coordination</p>
                </div>
              </Link>
              <nav className="hidden items-center gap-8 text-sm font-medium md:flex">
                {navigation.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="text-neutral-600 transition hover:text-black"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
              <div className="flex items-center gap-3">
                <Link
                  href="/contact"
                  className="hidden md:inline-flex cta-pulse items-center gap-2 rounded-full border border-transparent brand-gradient px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-black/20 transition duration-200 hover:shadow-black/30"
                >
                  <PhoneCall size={18} className="stroke-[1.5]" />
                  Get Support 24/7
                </Link>
                <details className="relative md:hidden">
                  <summary className="flex cursor-pointer items-center gap-2 rounded-full border border-neutral-200 bg-white px-4 py-2 text-sm text-neutral-700">
                    Menu
                    <span className="text-xs text-neutral-500">v</span>
                  </summary>
                  <div className="absolute right-0 mt-3 w-56 space-y-1 rounded-3xl border border-neutral-200 bg-white p-4 shadow-2xl backdrop-blur-xl">
                    {navigation.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="block rounded-2xl px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100"
                      >
                        {item.label}
                      </Link>
                    ))}
                    <Link
                      href="/contact"
                      className="mt-2 inline-flex cta-pulse w-full items-center justify-center gap-2 rounded-2xl brand-gradient px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-black/25"
                    >
                      <PhoneCall size={16} className="stroke-[1.5]" />
                      Get Support
                    </Link>
                  </div>
                </details>
              </div>
            </div>
          </header>

          <main id="main-content" className="relative z-10 flex-1 pb-24">
            {children}
          </main>

          <footer className="relative z-10 border-t border-neutral-200 bg-neutral-100">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-neutral-200/40 to-white" aria-hidden />
            <div className="relative mx-auto max-w-6xl px-6 py-12">
              <div className="grid gap-10 md:grid-cols-3">
                <div className="space-y-4">
                  <Link href="/" className="flex items-center gap-3">
                    <span className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-2xl brand-gradient text-xs font-semibold uppercase tracking-widest shadow-lg shadow-black/20">
                      <span className="shine-line absolute inset-0" aria-hidden />
                      <span className="relative">FC</span>
                    </span>
                    <span className="text-sm font-semibold uppercase tracking-[0.3em] text-neutral-600">
                      Funeral Coordinator
                    </span>
                  </Link>
                  <p className="text-sm text-neutral-500">
                    End-to-end funeral planning for Buddhist, Hindu, Christian, and interfaith families across Sri Lanka.
                    Coordinators on-call day and night.
                  </p>
                  <div className="space-y-2 text-sm text-neutral-600">
                    <p className="font-medium text-neutral-700">Emergency hotline (24/7)</p>
                    <a href="tel:+94770000000" className="block text-lg font-semibold text-gradient">
                      +94 77 000 0000
                    </a>
                    <a href="mailto:help@funeralcoordinator.lk" className="block text-neutral-600 hover:text-black">
                      help@funeralcoordinator.lk
                    </a>
                  </div>
                </div>

                <div className="grid gap-8 md:grid-cols-2 md:gap-4">
                  <div>
                    <h3 className="text-sm font-semibold uppercase tracking-widest text-neutral-600">Explore</h3>
                    <div className="mt-4 space-y-2 text-sm text-neutral-500">
                      {navigation.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className="block transition hover:text-black"
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold uppercase tracking-widest text-neutral-600">Support</h3>
                    <div className="mt-4 space-y-2 text-sm text-neutral-500">
                      {supportLinks.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className="block transition hover:text-black"
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-4 rounded-3xl border border-neutral-200 bg-white p-6">
                  <h3 className="text-sm font-semibold uppercase tracking-widest text-neutral-600">Service coverage</h3>
                  <p className="text-sm text-neutral-500">
                    Colombo | Gampaha | Kandy | Galle | Kurunegala | Jaffna | Batticaloa. Coordinators can travel
                    nationwide upon request.
                  </p>
                  <div className="space-y-2 text-sm text-neutral-500">
                    <p>WhatsApp and Zoom consultations available globally.</p>
                    <p className="text-neutral-600">
                      Registered social enterprise reinvesting proceeds into widows&#39; cooperatives and grief counselling
                      programmes.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-10 flex flex-col gap-4 border-t border-neutral-200 pt-6 text-xs text-neutral-500 sm:flex-row sm:items-center sm:justify-between">
                <p>&copy; {year} Funeral Coordinator. All rights reserved.</p>
                <div className="flex flex-wrap gap-6">
                  <Link href="/about" className="hover:text-neutral-600">
                    About
                  </Link>
                  <Link href="/resources" className="hover:text-neutral-600">
                    Resources
                  </Link>
                  <Link href="/contact" className="hover:text-neutral-600">
                    Contact
                  </Link>
                  <Link href="/refund-policy" className="hover:text-neutral-600">
                    Refund Policy
                  </Link>
                  <Link href="/privacy-policy" className="hover:text-neutral-600">
                    Privacy Policy
                  </Link>
                  <Link href="/terms-and-conditions" className="hover:text-neutral-600">
                    Terms & Conditions
                  </Link>
                  <a
                    href="https://www.aramatholdings.com"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-neutral-600"
                  >
                    Aramat Holdings
                  </a>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}

