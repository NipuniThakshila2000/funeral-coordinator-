"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react";
import { CanvaPanel } from "./CanvaPanel";
import {
  ArrowRight,
  CheckCircle2,
  FileDown,
  Layers,
  RefreshCw,
  Sparkles,
} from "lucide-react";

type TemplateSection = {
  title: string;
  description?: string;
  items?: string[];
};

type TemplateDefaults = {
  title?: string;
  readings?: string;
  music?: string;
  eulogies?: string;
  notes?: string;
};

type TemplateDefinition = {
  id: string;
  name: string;
  summary: string;
  highlights: string[];
  defaults: TemplateDefaults;
  structure: TemplateSection[];
};

type FaithDefinition = {
  label: string;
  description: string;
  accent: string;
  templates: TemplateDefinition[];
};

type FormValues = {
  title: string;
  readings: string;
  music: string;
  eulogies: string;
  notes: string;
};

const templateCatalog: Record<string, FaithDefinition> = {
  christianity: {
    label: "Christianity",
    description:
      "Hymns, scripture, and pastoral blessings for Catholic, Anglican, Methodist, and Pentecostal families.",
    accent: "from-sky-500/20 to-indigo-500/10",
    templates: [
      {
        id: "liturgical-service",
        name: "Classic Liturgical Service",
        summary:
          "Processional hymns, scripture readings, family tributes, and benediction led by clergy.",
        highlights: [
          "Aligns with Anglican, Catholic, and Methodist rites",
          "Pairs scripture readings with hymn suggestions",
          "Includes reception and aftercare reminders",
        ],
        defaults: {
          title: "Order of Service for [Name]",
          readings: [
            "Psalm 23 - Family elder",
            "John 14:1-4 - Celebrant",
            "Revelation 21:1-4 - Reader",
          ].join("\n"),
          music: [
            "Prelude: Soft organ or piano instrumental",
            "Processional hymn: Amazing Grace",
            "Reflection hymn: How Great Thou Art",
            "Recessional: The Lord Bless You and Keep You",
          ].join("\n"),
          eulogies: [
            "Welcome and obituary - Officiant",
            "Family tribute - Children or spouse",
            "Friend reflection - Colleague",
          ].join("\n"),
          notes:
            "Add livestream QR codes, choir cues, and CSR support acknowledgements in the print-ready version.",
        },
        structure: [
          {
            title: "Gathering and Prelude",
            items: [
              "Instrumental prelude and candle lighting",
              "Processional hymn with ushers guiding family",
              "Opening prayer and welcome",
            ],
          },
          {
            title: "Scripture and Reflections",
            items: [
              "Old Testament reading",
              "Psalm or musical response",
              "Gospel proclamation",
              "Homily or message of hope",
            ],
          },
          {
            title: "Tributes and Thanksgiving",
            items: [
              "Family tributes and photo montage",
              "Congregational hymn or solo",
              "Moment of silence and pastoral prayer",
            ],
          },
          {
            title: "Commendation and Committal",
            items: [
              "Commendation prayer",
              "Final blessing or benediction",
              "Recessional music guiding family to reception",
            ],
          },
          {
            title: "Fellowship and Aftercare",
            items: [
              "Reception venue and meal notes",
              "CSR meal sponsorship reminder",
              "Follow-up for grief counselling referrals",
            ],
          },
        ],
      },
      {
        id: "celebration-of-life",
        name: "Celebration of Life and Multimedia",
        summary:
          "Story-led tribute weaving music, multimedia, and blessings for multi-denominational gatherings.",
        highlights: [
          "Flexible for chapel, home, or garden services",
          "Supports multimedia tributes and livestreams",
          "Blends scripture, poetry, and open mic moments",
        ],
        defaults: {
          title: "Celebration of Life for [Name]",
          readings: [
            "Opening poem: When Great Trees Fall - Maya Angelou",
            "Optional scripture: 1 Corinthians 13:4-8",
            "Shared memories compiled by the coordinator",
          ].join("\n"),
          music: [
            "Prelude playlist: Favourite instrumental pieces",
            "Solo tribute: You Raise Me Up",
            "Group song: Bless the Lord (10000 Reasons)",
            "Closing: This Little Light of Mine",
          ].join("\n"),
          eulogies: [
            "Host welcome and life story milestones",
            "Family tributes (2-3 speakers)",
            "Open mic for close friends",
          ].join("\n"),
          notes:
            "Include slideshow cue sheet, remote speaker prompts, and instructions for sending condolences digitally.",
        },
        structure: [
          {
            title: "Welcome and Light",
            items: [
              "Memory lane display and candle lighting",
              "MC welcome and tone setting",
              "Opening prayer or reflective reading",
            ],
          },
          {
            title: "Storytelling and Tributes",
            items: [
              "Life story overview",
              "Family and friend tributes",
              "Photo montage with narration",
            ],
          },
          {
            title: "Music and Reflection",
            items: [
              "Solo or choir performance",
              "Moment of silence with instrumental underscore",
              "Optional scripture or poem",
            ],
          },
          {
            title: "Blessing and Release",
            items: [
              "Blessing or final poem",
              "Collective prayer or gratitude circle",
              "Recessional song with usher guidance",
            ],
          },
          {
            title: "Reception and Impact",
            items: [
              "Reception location and timeline",
              "CSR donation invitation",
              "Livestream replay and tribute guestbook links",
            ],
          },
        ],
      },
    ],
  },
  buddhism: {
    label: "Buddhism",
    description:
      "Paritta chanting, dana offerings, and remembrance ceremonies coordinated with partner temples.",
    accent: "from-amber-400/20 to-rose-400/10",
    templates: [
      {
        id: "paritta-dana",
        name: "Paritta Chanting and Dana",
        summary:
          "Traditional flow covering chanting, dana, and merit transfer with monastic partners.",
        highlights: [
          "Coordinated monk schedules and seating",
          "Dana packs and almsgiving logistics",
          "Includes merit transfer wording for family",
        ],
        defaults: {
          title: "Paritta and Dana for [Name]",
          readings: [
            "Metta Sutta chanting",
            "Ratana Sutta chanting",
            "Anicca vata sankhara reflection",
          ].join("\n"),
          music: [
            "Soft temple bells during welcome",
            "Paritta chanting audio cues",
            "Gentle instrumental for meditation moments",
          ].join("\n"),
          eulogies: [
            "Family remembrance introduction",
            "Lay reflection on virtues",
            "Acknowledgement of monks and donors",
          ].join("\n"),
          notes:
            "Allocate space for dana offerings, monk seating, and livestream camera during chanting sessions.",
        },
        structure: [
          {
            title: "Gathering and Refuge",
            items: [
              "White attire welcome and incense lighting",
              "Pansil and Tisarana recitation",
              "Offering of flowers and oil lamps",
            ],
          },
          {
            title: "Paritta Chanting",
            items: [
              "Sangha introduction and dedication",
              "Sequence of Paritta suttas",
              "Blessing with holy water",
            ],
          },
          {
            title: "Dhamma Reflection",
            items: [
              "Short sermon by monk",
              "Family gratitude statement",
              "Moment of silent metta meditation",
            ],
          },
          {
            title: "Dana and Almsgiving",
            items: [
              "Serving of dana meals",
              "Presentation of requisites and white cloth",
              "Blessing for widows cooperatives",
            ],
          },
          {
            title: "Merit Transfer and Closing",
            items: [
              "Idam me natinam hotu dedication",
              "Sharing of impact tracker and remembrance dates",
              "Distribution of takeaway dana packs",
            ],
          },
        ],
      },
      {
        id: "buddhist-hybrid",
        name: "Hybrid Memorial and Livestream",
        summary:
          "Modern chanting flow blended with tributes, livestream participation, and remembrance slideshows.",
        highlights: [
          "Livestream-ready run of show",
          "Family tributes woven between chanting",
          "Checklist for 7th, 49th, and 90th day remembrances",
        ],
        defaults: {
          title: "Memorial Chanting for [Name]",
          readings: [
            "Opening homage to the Triple Gem",
            "Mangala Sutta recitation",
            "Metta meditation script",
          ].join("\n"),
          music: [
            "Prelude: Singing bowl soundscape",
            "Tribute song: Buddhist gatha (optional)",
            "Closing: Gentle instrumental track",
          ].join("\n"),
          eulogies: [
            "Coordinator welcome and instructions",
            "Family tribute onsite or via Zoom",
            "Community reflections submitted online",
          ].join("\n"),
          notes:
            "Embed Zoom or YouTube links in the PDF and allow space for virtual tributes in the running order.",
        },
        structure: [
          {
            title: "Welcome and Digital Acknowledgement",
            items: [
              "Coordinator welcome and livestream orientation",
              "Display of memorial slideshow",
              "Invitation to light incense or digital candles",
            ],
          },
          {
            title: "Chanting and Blessings",
            items: [
              "Opening refuge and precepts",
              "Chanting blocks with translator notes",
              "Sprinkling of blessed water",
            ],
          },
          {
            title: "Tributes and Reflections",
            items: [
              "Family stories shared onsite or virtually",
              "Recording playback of distant relatives",
              "Mindfulness moment guided by monk",
            ],
          },
          {
            title: "Community Giving",
            items: [
              "Dana pledge and CSR meal sponsorship",
              "Distribution of remembrance packs",
              "Collection of written blessings",
            ],
          },
          {
            title: "Closing and Future Observances",
            items: [
              "Merit transfer and final chant",
              "Reminder of 7th, 49th, 90th day ceremonies",
              "Link to digital tribute wall",
            ],
          },
        ],
      },
    ],
  },
  hinduism: {
    label: "Hinduism",
    description:
      "Purohit coordination, cremation logistics, and anna dhanam prepared with cultural precision.",
    accent: "from-orange-500/20 to-fuchsia-500/10",
    templates: [
      {
        id: "mukti-sequence",
        name: "Traditional Mukti Ceremony",
        summary:
          "Sacred rites covering ganapati puja, antyesti rituals, and river immersion planning.",
        highlights: [
          "Purohit brief and dakshina reminders",
          "Tilak, prasada, and sacred items checklist",
          "Includes immersion and ash scattering logistics",
        ],
        defaults: {
          title: "Antyesti Rites for [Name]",
          readings: [
            "Ganapati puja mantra",
            "Bhagavad Gita 2:20",
            "Ram Nam Satya Hai chant",
          ].join("\n"),
          music: [
            "Nadaswaram or veena instrumental prelude",
            "Bhajan: Vaishnava Janato",
            "Closing mantra: Om Shanti",
          ].join("\n"),
          eulogies: [
            "Family sankalpam dedication",
            "Tribute from eldest child",
            "Community elder reflection",
          ].join("\n"),
          notes:
            "List ghee, sesame, tulasi, and darbha requirements; add travel timing for cremation ground and immersion site.",
        },
        structure: [
          {
            title: "Purification and Sankalpam",
            items: [
              "Lighting of diya and incense",
              "Ganapati puja and sankalpam",
              "Application of tilak and sacred threads",
            ],
          },
          {
            title: "Antyesti Rites",
            items: [
              "Homa set up and priest prayers",
              "Offering of sesame, ghee, and tulasi",
              "Mantra chanting guiding cremation",
            ],
          },
          {
            title: "Tributes and Readings",
            items: [
              "Bhagavad Gita recitation",
              "Family remembrance circle",
              "Bhajan or instrumental reflection",
            ],
          },
          {
            title: "Anna Dhanam and Hospitality",
            items: [
              "Distribution of prasada and sweet offerings",
              "CSR kitchen acknowledgement",
              "Meal service logistics",
            ],
          },
          {
            title: "Immersion and Aftercare",
            items: [
              "Travel to river or ocean for ash immersion",
              "30th day and annual ceremony reminders",
              "Grief counselling and CSR donations",
            ],
          },
        ],
      },
      {
        id: "hindu-hybrid",
        name: "Hybrid Remembrance and Anna Dhanam",
        summary:
          "Balances sacred rites with storytelling, livestream support, and CSR meal sponsorship.",
        highlights: [
          "Digital brief for overseas relatives",
          "Anna dhanam menus with fasting guidance",
          "Fire ritual with safety and AV coordination",
        ],
        defaults: {
          title: "Remembrance Ceremony for [Name]",
          readings: [
            "Shraddha sankalpam",
            "Bhagavad Gita 18:66",
            "Poem or reflection chosen by family",
          ].join("\n"),
          music: [
            "Prelude: Veena or flute instrumental",
            "Bhajan: Om Namah Shivaya",
            "Closing: Peace mantra chanted collectively",
          ].join("\n"),
          eulogies: [
            "Coordinator welcome and ritual explanation",
            "Family tributes onsite or via Zoom",
            "Purohit blessings and guidance",
          ].join("\n"),
          notes:
            "Embed livestream link, outline anna dhanam serving order, and include list of ritual kits for each family member.",
        },
        structure: [
          {
            title: "Welcome and Orientation",
            items: [
              "Coordinator explains flow and ritual roles",
              "Lighting of kuthu vilakku",
              "Invocation mantra",
            ],
          },
          {
            title: "Sacred Rites and Mantras",
            items: [
              "Priest led chanting",
              "Family participation with tilak and offerings",
              "Ghee lamp and homa cues",
            ],
          },
          {
            title: "Tribute Segment",
            items: [
              "Family stories and video montage",
              "Blessings from elders",
              "Moment of silence with soft bhajan",
            ],
          },
          {
            title: "Anna Dhanam",
            items: [
              "Meal blessing and service order",
              "CSR cooperative acknowledgement",
              "Packaging of carry home prasada",
            ],
          },
          {
            title: "Aftercare and Memorial Timeline",
            items: [
              "Day 3, 10, and 30 observance plan",
              "Donation or seva options",
              "Counselling and community support contacts",
            ],
          },
        ],
      },
    ],
  },
  interfaith: {
    label: "Interfaith and Other Traditions",
    description:
      "Islamic Janazah, Sikh, humanist, and blended ceremonies with culturally aware coordinators.",
    accent: "from-teal-400/20 to-slate-500/10",
    templates: [
      {
        id: "islamic-janazah",
        name: "Islamic Janazah and Community Support",
        summary:
          "Expedited Janazah flow with ghusl, kafan, funeral prayer, and burial coordination.",
        highlights: [
          "Guides ghusl and kafan preparation",
          "Includes transport and burial timing checklist",
          "Provides dua and Quran recitation prompts",
        ],
        defaults: {
          title: "Janazah Programme for [Name]",
          readings: [
            "Opening dua: Bismillah ar-Rahman ar-Rahim",
            "Surah Al-Fatiha",
            "Surah Ikhlas, Falaq, Nas",
          ].join("\n"),
          music: [
            "Quiet recitation (no instrumentation)",
            "Talbiyah or simple zikr for reflection",
          ].join("\n"),
          eulogies: [
            "Family remembrance and virtues",
            "Community leader message",
            "Prayer for the deceased",
          ].join("\n"),
          notes:
            "Outline timings for ghusl, masjid arrival, burial plot readiness, and sadaqah or CSR contributions in the family name.",
        },
        structure: [
          {
            title: "Preparation and Ghusl",
            items: [
              "Ghusl team briefing and privacy arrangements",
              "Kafan cloth preparation",
              "Recitation of recommended duas",
            ],
          },
          {
            title: "Janazah Prayer",
            items: [
              "Takbir sequence guidance",
              "Silent supplication for the deceased",
              "Concluding salaams",
            ],
          },
          {
            title: "Procession and Burial",
            items: [
              "Transport coordination to burial ground",
              "Grave lowering protocol",
              "Dua during burial and filling of soil",
            ],
          },
          {
            title: "Community Support",
            items: [
              "Condolence reception or meal",
              "Zakat or sadaqah dedication",
              "Support for widows cooperatives or madrasa",
            ],
          },
          {
            title: "Aftercare and Remembrance",
            items: [
              "Third, seventh, and fortieth day gathering guidance",
              "Online message board and prayer chain",
              "Counselling and CSR update notes",
            ],
          },
        ],
      },
      {
        id: "interfaith-reflection",
        name: "Interfaith Reflection and Celebration",
        summary:
          "Blends readings, music, and tributes from multiple traditions or secular expressions.",
        highlights: [
          "Customisable for Sikh, Bahai, or humanist services",
          "Supports hybrid participation and multimedia",
          "Includes space for CSR storytelling",
        ],
        defaults: {
          title: "Celebration and Reflection for [Name]",
          readings: [
            "Welcome acknowledgement of faiths present",
            "Excerpt: Guru Granth Sahib or favourite quote",
            "Poem: Do Not Stand at My Grave and Weep",
          ].join("\n"),
          music: [
            "Prelude: Instrumental (piano or sarangi)",
            "Reflection song: You Raise Me Up",
            "Closing mantra or shared affirmation",
          ].join("\n"),
          eulogies: [
            "Moderator shares life highlights",
            "Family reflections onsite and virtual",
            "Community tributes gathered via portal",
          ].join("\n"),
          notes:
            "Invite speakers from different traditions, provide pronunciation guides, and highlight CSR partners supporting the service.",
        },
        structure: [
          {
            title: "Gathering and Land Acknowledgement",
            items: [
              "Welcome and recognition of traditions present",
              "Lighting candle or symbolic ritual",
              "Moment of silence for personal prayer",
            ],
          },
          {
            title: "Readings Across Traditions",
            items: [
              "Faith inspired readings such as Quran, Gita, Bible, poetry",
              "Translation or summary for guests",
              "Short reflection tying themes together",
            ],
          },
          {
            title: "Music and Reflection",
            items: [
              "Solo or instrumental performance",
              "Meditative moment or guided breathing",
              "Optional communal song",
            ],
          },
          {
            title: "Tributes and Gratitude",
            items: [
              "Family stories and video montage",
              "Messages from global relatives",
              "CSR partner acknowledgement",
            ],
          },
          {
            title: "Closing and Next Steps",
            items: [
              "Shared affirmation or blessing",
              "Invitation to remembrance meal",
              "Details for future memorial milestones",
            ],
          },
        ],
      },
    ],
  },
};

const builderSteps = [
  {
    step: "01",
    title: "Select faith and tone",
    description: "Choose Buddhist, Hindu, Christian, or interfaith flows aligned to your family.",
  },
  {
    step: "02",
    title: "Pick a curated template",
    description: "Start with layouts that already list chants, hymns, and cultural touchpoints.",
  },
  {
    step: "03",
    title: "Personalise readings and music",
    description: "Swap hymns, add tributes, and embed livestream or multimedia cues.",
  },
  {
    step: "04",
    title: "Download and share instantly",
    description: "Generate a print ready PDF for clergy, family, and vendors in seconds.",
  },
];

const emptyFormValues: FormValues = {
  title: "",
  readings: "",
  music: "",
  eulogies: "",
  notes: "",
};
export default function OrderOfServicePage() {
  const faithEntries = useMemo(
    () => Object.entries(templateCatalog) as Array<[keyof typeof templateCatalog, FaithDefinition]>,
    []
  );

  const [selectedFaith, setSelectedFaith] = useState<keyof typeof templateCatalog | "">("");
  const [selectedTemplateId, setSelectedTemplateId] = useState<string | null>(null);
  const [formValues, setFormValues] = useState<FormValues>({ ...emptyFormValues });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const previousFaithRef = useRef<string | "">("");

  const selectedFaithDefinition = selectedFaith ? templateCatalog[selectedFaith] : null;
  const selectedTemplate = useMemo(() => {
    if (!selectedFaithDefinition) {
      return null;
    }
    return (
      selectedFaithDefinition.templates.find((template) => template.id === selectedTemplateId) ?? null
    );
  }, [selectedFaithDefinition, selectedTemplateId]);

  const applyTemplate = useCallback((template: TemplateDefinition, opts?: { forceTitle?: boolean }) => {
    setFormValues((prev) => ({
      title:
        opts?.forceTitle || prev.title.trim().length === 0
          ? template.defaults.title ?? prev.title
          : prev.title,
      readings: template.defaults.readings ?? prev.readings,
      music: template.defaults.music ?? prev.music,
      eulogies: template.defaults.eulogies ?? prev.eulogies,
      notes: template.defaults.notes ?? prev.notes,
    }));
  }, []);

  useEffect(() => {
    if (!selectedFaith) {
      setSelectedTemplateId(null);
      setFormValues({ ...emptyFormValues });
      previousFaithRef.current = "";
      return;
    }

    const definition = templateCatalog[selectedFaith];
    if (!definition || definition.templates.length === 0) {
      setSelectedTemplateId(null);
      previousFaithRef.current = selectedFaith;
      return;
    }

    const existingTemplate = definition.templates.find((template) => template.id === selectedTemplateId);
    const templateToUse = existingTemplate ?? definition.templates[0];

    if (!existingTemplate) {
      setSelectedTemplateId(templateToUse.id);
      applyTemplate(templateToUse, { forceTitle: true });
    } else if (previousFaithRef.current !== selectedFaith) {
      applyTemplate(templateToUse, { forceTitle: true });
    }

    previousFaithRef.current = selectedFaith;
  }, [applyTemplate, selectedFaith, selectedTemplateId]);

  const handleFieldChange = (field: keyof FormValues) =>
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { value } = event.target;
      setFormValues((prev) => ({ ...prev, [field]: value }));
    };

  const handleTemplateSelection = (template: TemplateDefinition) => {
    setSelectedTemplateId(template.id);
    applyTemplate(template);
    setStatus("idle");
    setStatusMessage(null);
  };

  const handleFaithSelection = (faithKey: keyof typeof templateCatalog) => {
    setSelectedFaith(faithKey);
    setStatus("idle");
    setStatusMessage(null);
  };

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!selectedFaith || !selectedFaithDefinition || !selectedTemplate) {
      setStatus("error");
      setStatusMessage("Select a faith tradition and template before generating the PDF.");
      return;
    }

    if (!formValues.title.trim()) {
      setStatus("error");
      setStatusMessage("Please provide a ceremony title.");
      return;
    }

    setLoading(true);
    setStatus("idle");
    setStatusMessage(null);

    try {
      const payload = {
        faith: selectedFaith,
        faithLabel: selectedFaithDefinition.label,
        templateId: selectedTemplate.id,
        templateName: selectedTemplate.name,
        templateSummary: selectedTemplate.summary,
        title: formValues.title.trim(),
        readings: formValues.readings.trim(),
        music: formValues.music.trim(),
        eulogies: formValues.eulogies.trim(),
        notes: formValues.notes.trim(),
        structure: selectedTemplate.structure,
      };

      const response = await fetch("/api/pdf/order-of-service", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Failed to generate PDF");
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      anchor.href = url;
      const safeTitle = payload.title.replace(/[^a-z0-9]+/gi, "-").replace(/^-|-$/g, "").toLowerCase();
      anchor.download = `${safeTitle || "order-of-service"}.pdf`;
      anchor.click();
      URL.revokeObjectURL(url);

      setStatus("success");
      setStatusMessage("PDF generated - check your downloads folder.");
    } catch (error) {
      console.error(error);
      setStatus("error");
      setStatusMessage("We could not create the PDF. Please try again or contact your coordinator.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="space-y-16 px-6 py-16">
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1.05fr_0.95fr]">
        <section className="space-y-6">
          <span className="tag-chip">Order of service</span>
          <h1 className="text-balance text-4xl font-semibold text-neutral-900 sm:text-5xl">
            Create a ceremony script your family, clergy, and guests can follow with ease.
          </h1>
          <p className="text-lg text-neutral-700">
            Generate a PDF-ready programme aligned to your faith tradition. Coordinators can personalise hymns, chant schedules, tributes, and multimedia cues for you.
          </p>
          <div className="grid gap-4 rounded-3xl border border-neutral-200 bg-white p-6 text-sm text-neutral-600 sm:grid-cols-2">
            {builderSteps.map((step) => (
              <div key={step.step} className="space-y-1">
                <p className="text-xs uppercase tracking-widest text-neutral-500">{step.step}</p>
                <p className="text-sm font-semibold text-neutral-900">{step.title}</p>
                <p className="text-xs text-neutral-600">{step.description}</p>
              </div>
            ))}
          </div>
          <div className="rounded-3xl border border-neutral-200 bg-white p-6 text-sm text-neutral-600">
            <p className="font-semibold text-neutral-800">Need support?</p>
            <p className="mt-2">
              Coordinators can personalise the service sequence, translations, and speaker notes. Email
              {" "}
              <a href="mailto:orders@funeralcoordinator.lk" className="text-neutral-800 hover:text-neutral-900">
                orders@funeralcoordinator.lk
              </a>
              .
            </p>
          </div>
        </section>

        <section className="glass-panel relative overflow-hidden rounded-[2.5rem] border border-neutral-200 bg-white p-8 shadow-glow">
          <span className="absolute -left-16 top-0 h-48 w-48 rounded-full bg-black/10 blur-3xl" aria-hidden />
          <span className="absolute -right-20 bottom-0 h-48 w-48 rounded-full bg-black/5 blur-3xl" aria-hidden />
          <form onSubmit={submit} className="relative space-y-8 text-sm text-neutral-700">
            <fieldset className="space-y-4" aria-label="Faith tradition">
              <span className="tag-chip">Step 1 - Faith tradition</span>
              <div className="grid gap-3 sm:grid-cols-2">
                {faithEntries.map(([key, definition]) => (
                  <label
                    key={key}
                    className={`card-lift group relative flex cursor-pointer flex-col gap-3 rounded-3xl border border-neutral-200 p-5 transition ${
                      selectedFaith === key
                        ? `border-neutral-900 bg-gradient-to-br ${definition.accent}`
                        : "bg-white hover:border-neutral-400"
                    }`}
                  >
                    <input
                      type="radio"
                      name="faith"
                      value={key}
                      checked={selectedFaith === key}
                      onChange={() => handleFaithSelection(key)}
                      className="sr-only"
                    />
                    <div className="space-y-2">
                      <p className="text-sm font-semibold text-neutral-900">{definition.label}</p>
                      <p className="text-xs text-neutral-600">{definition.description}</p>
                    </div>
                    <p className="text-xs uppercase tracking-widest text-neutral-500">
                      {definition.templates.length} template{definition.templates.length > 1 ? "s" : ""}
                    </p>
                  </label>
                ))}
              </div>
            </fieldset>

            <fieldset className="space-y-4" aria-label="Template style" disabled={!selectedFaithDefinition}>
              <span className="tag-chip">Step 2 - Template style</span>
              {selectedFaithDefinition ? (
                <div className="grid gap-3">
                  {selectedFaithDefinition.templates.map((template) => (
                    <label
                      key={template.id}
                      className={`card-lift group relative flex cursor-pointer flex-col gap-3 rounded-3xl border border-neutral-200 p-5 transition ${
                        selectedTemplateId === template.id ? "border-neutral-900 bg-neutral-50" : "bg-white hover:border-neutral-400"
                      }`}
                    >
                      <input
                        type="radio"
                        name="template"
                        value={template.id}
                        checked={selectedTemplateId === template.id}
                        onChange={() => handleTemplateSelection(template)}
                        className="sr-only"
                      />
                      <div className="space-y-2">
                        <p className="text-sm font-semibold text-neutral-900">{template.name}</p>
                        <p className="text-xs text-neutral-600">{template.summary}</p>
                      </div>
                      <ul className="space-y-1 text-xs text-neutral-600">
                        {template.highlights.map((highlight) => (
                          <li key={highlight} className="flex items-start gap-2">
                            <Sparkles size={14} className="mt-0.5 text-amber-200" />
                            <span>{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    </label>
                  ))}
                </div>
              ) : (
                <p className="rounded-3xl border border-dashed border-neutral-200 bg-white/70 p-4 text-xs text-neutral-500">
                  Choose a faith tradition first to reveal recommended templates.
                </p>
              )}
            </fieldset>

            <div className="space-y-4">
              <span className="tag-chip">Step 3 - Personalise content</span>
              <input
                name="title"
                placeholder="Service title (e.g., In Loving Memory of...)"
                className="form-field"
                value={formValues.title}
                onChange={handleFieldChange("title")}
                required
              />
              <textarea
                name="readings"
                placeholder="Readings / scripture / sutras"
                className="form-field"
                rows={4}
                value={formValues.readings}
                onChange={handleFieldChange("readings")}
              />
              <textarea
                name="music"
                placeholder="Music / hymns / chants"
                className="form-field"
                rows={3}
                value={formValues.music}
                onChange={handleFieldChange("music")}
              />
              <textarea
                name="eulogies"
                placeholder="Eulogies / tributes / reflections"
                className="form-field"
                rows={3}
                value={formValues.eulogies}
                onChange={handleFieldChange("eulogies")}
              />
              <textarea
                name="notes"
                placeholder="Additional notes (livestream link, CSR impact, ritual reminders)"
                className="form-field"
                rows={3}
                value={formValues.notes}
                onChange={handleFieldChange("notes")}
              />
            </div>

            <div className="space-y-4">
              <span className="tag-chip">Step 4 - Review and download</span>
              {selectedTemplate ? (
                <div className="rounded-3xl border border-neutral-200 bg-white p-5">
                  <div className="flex items-center gap-2 text-sm font-semibold text-neutral-900">
                    <Layers size={18} className="stroke-[1.5]" />
                    Ceremony flow overview
                  </div>
                  <p className="mt-2 text-xs text-neutral-600">Generated from the selected template. Edit sections with your coordinator if you need a custom flow.</p>
                  <ul className="mt-4 space-y-3 text-sm text-neutral-700">
                    {selectedTemplate.structure.map((section) => (
                      <li key={section.title} className="rounded-2xl border border-neutral-200 bg-neutral-50 p-3">
                        <p className="text-sm font-semibold text-neutral-900">{section.title}</p>
                        {section.description ? (
                          <p className="text-xs text-neutral-600">{section.description}</p>
                        ) : null}
                        {section.items && section.items.length > 0 ? (
                          <ul className="mt-1 space-y-1 text-xs text-neutral-600">
                            {section.items.map((item) => (
                              <li key={item} className="flex items-start gap-2">
                                <span aria-hidden className="mt-0.5 text-neutral-400">-</span>
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        ) : null}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
              <div className="flex flex-wrap gap-3 text-xs text-neutral-500">
                <span className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-3 py-1">
                  <FileDown size={14} className="stroke-[1.5]" />
                  Generates a ready-to-print PDF
                </span>
                <span className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-3 py-1">
                  <RefreshCw size={14} className="stroke-[1.5]" />
                  Edit and re-download anytime
                </span>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="inline-flex w-full items-center justify-center gap-2 rounded-full brand-gradient px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-black/20 transition duration-200 hover:shadow-brand-500/40 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {loading ? "Generating..." : "Download PDF"}
                {!loading && <ArrowRight size={18} className="stroke-[1.5]" />}
              </button>
              {status !== "idle" && statusMessage ? (
                <p
                  className={`rounded-2xl border px-4 py-3 text-sm ${
                    status === "success"
                      ? "border-emerald-300 bg-emerald-50 text-emerald-900"
                      : "border-amber-300 bg-amber-50 text-amber-900"
                  }`}
                >
                  {status === "success" && <CheckCircle2 size={18} className="mr-2 inline align-middle" />}
                  {statusMessage}
                </p>
              ) : null}
            </div>
          </form>
        </section>
      </div>

      <div className="mx-auto max-w-6xl">
        <CanvaPanel />
      </div>
    </div>
  );
}


