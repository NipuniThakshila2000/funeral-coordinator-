import { Reveal } from "@/components/ui/reveal";

import Link from "next/link";
import { ArrowLeft, ArrowRight, MessageCircle, PhoneCall, Sparkles } from "lucide-react";

const directory: Record<
  string,
  {
    title: string;
    description: string;
    vendors: Array<{ name: string; phone?: string; whatsapp?: string; faithTags?: string[] }>;
  }
> = {
  tombstones: {
    title: "Tombstones and memorials",
    description: "Engraved headstones, plaques, and memorial sculptures crafted by trusted ateliers.",
    vendors: [
      {
        name: "Colombo Stoneworks",
        phone: "+94 77 123 4567",
        faithTags: ["Christian", "Buddhist"],
      },
      {
        name: "Sacred Lotus Memorials",
        phone: "+94 71 987 6543",
        faithTags: ["Buddhist", "Hindu"],
      },
    ],
  },
  flowers: {
    title: "Floral and ritual design",
    description: "Garlands, altar florals, incense, and ceremonial decor for parlours and homes.",
    vendors: [
      {
        name: "Anjali Floral Studio",
        phone: "+94 76 456 7890",
        faithTags: ["Hindu", "Buddhist"],
      },
      {
        name: "Grace Blooms",
        phone: "+94 72 345 6789",
        faithTags: ["Christian"],
      },
    ],
  },
  photography: {
    title: "Photography and media",
    description: "Portraiture, live coverage, tribute videos, and memorial slideshow storytellers.",
    vendors: [
      {
        name: "Everlight Studios",
        phone: "+94 77 222 3344",
        faithTags: ["Multi-faith"],
      },
    ],
  },
  "music-av": {
    title: "Music, sound, and livestream teams",
    description: "Choirs, chanting ensembles, AV engineers, and hybrid service crews.",
    vendors: [
      {
        name: "Serene Choir Collective",
        phone: "+94 77 445 8899",
        faithTags: ["Christian"],
      },
      {
        name: "Lotus Chant Ensemble",
        phone: "+94 71 200 3344",
        faithTags: ["Buddhist"],
      },
      {
        name: "Heritage AV & Streaming",
        phone: "+94 76 889 2233",
        faithTags: ["Multi-faith"],
      },
    ],
  },
  caterers: {
    title: "Caterers",
    description: "Dana meals, vegetarian feasts, and memorial reception hospitality teams.",
    vendors: [
      {
        name: "Compassionate Kitchen",
        phone: "+94 71 123 8899",
        faithTags: ["Buddhist", "Christian"],
      },
      {
        name: "Spice Harmony",
        phone: "+94 75 778 1122",
        faithTags: ["Hindu"],
      },
    ],
  },
  keepsakes: {
    title: "Keepsakes and remembrance",
    description: "Urns, ash jewellery, and bespoke memorial gifts crafted with care.",
    vendors: [
      {
        name: "Memory Atelier",
        phone: "+94 77 333 2211",
        faithTags: ["Multi-faith"],
      },
    ],
  },
};

type CategoryPageProps = {
  params: { category: string };
};

export default function VendorCategoryPage({ params }: CategoryPageProps) {
  const data = directory[params.category.toLowerCase()];

  if (!data) {
    return (
      <div className="mx-auto max-w-4xl px-6 py-16">
        <div className="card-lift rounded-3xl border border-neutral-200 bg-white p-8 text-center">
          <h1 className="text-3xl font-semibold text-neutral-900">Category not found</h1>
          <p className="mt-3 text-sm text-neutral-600">
            We do not yet have vendors in this category. Please contact us for bespoke recommendations.
          </p>
          <Link
            href="/vendors"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-neutral-900 cta-pulse"
          >
            <ArrowLeft size={18} className="stroke-[1.5]" />
            Back to vendors
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl space-y-12 px-6 py-16">
      <div className="space-y-4">
        <Link href="/vendors" className="inline-flex items-center gap-2 text-sm text-neutral-600 hover:text-neutral-900">
          <ArrowLeft size={16} className="stroke-[1.5]" />
          All vendor categories
        </Link>
        <h1 className="text-balance text-4xl font-semibold text-neutral-900">{data.title}</h1>
        <p className="text-lg text-neutral-700">{data.description}</p>
      </div>

      <ul className="grid gap-5 md:grid-cols-2">
        {data.vendors.map((vendor, index) => (

          <Reveal

            as="li"

            key={vendor.name}

            delay={index * 90}

            className="card-lift group relative flex h-full flex-col gap-4 overflow-hidden rounded-4xl border border-neutral-200 bg-white p-6"

          >

            <span className="absolute -right-16 -top-14 h-40 w-40 rounded-full bg-gradient-to-br from-black/12 via-black/0 to-transparent blur-3xl motion-safe:animate-gradient-orbit" aria-hidden />

            <div className="relative space-y-2">

              <h2 className="text-xl font-semibold text-neutral-900">{vendor.name}</h2>

              {vendor.faithTags && vendor.faithTags.length > 0 ? (

                <p className="text-xs uppercase tracking-widest text-neutral-600">

                  {vendor.faithTags.join(" | ")}

                </p>

              ) : null}

            </div>



            <div className="relative flex flex-col gap-3 text-sm text-neutral-700">

              <div className="inline-flex items-center gap-2 text-neutral-700">

                <Sparkles size={16} className="stroke-[1.5]" />

                Coordinator verified partner

              </div>

              {vendor.phone ? (

                <p className="text-sm text-neutral-600">Hotline: {vendor.phone}</p>

              ) : null}

            </div>



            <div className="relative mt-auto flex flex-wrap gap-3 text-sm">

              {vendor.phone ? (

                <a

                  href={`tel:${vendor.phone.replace(/[^+\d]/g, "")}`}

                  className="inline-flex items-center gap-2 rounded-full brand-gradient px-4 py-2 font-semibold text-white cta-pulse"

                >

                  <PhoneCall size={16} className="stroke-[1.5]" />

                  Call partner

                </a>

              ) : null}

              {vendor.phone ? (

                <a

                  href={`https://wa.me/${vendor.phone.replace(/[^+\d]/g, "")}`}

                  className="inline-flex items-center gap-2 rounded-full border border-neutral-300 bg-neutral-50 px-4 py-2 font-semibold text-neutral-800 hover:border-neutral-500"

                >

                  <MessageCircle size={16} className="stroke-[1.5]" />

                  WhatsApp

                </a>

              ) : null}

              <Link

                href="/contact"

                className="inline-flex items-center gap-2 rounded-full border border-neutral-300 bg-neutral-50 px-4 py-2 font-semibold text-neutral-800 hover:border-neutral-500"

              >

                <ArrowRight size={16} className="stroke-[1.5]" />

                Coordinate via team

              </Link>

            </div>

          </Reveal>

        ))}
      </ul>
    </div>
  );
}