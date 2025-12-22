/* eslint-disable @next/next/no-img-element */
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
  MemorialCardPreview,
  type MemorialCardPreviewHandle,
  SCRIPT_FONT_OPTIONS,
  SERIF_FONT_OPTIONS,
  SANS_FONT_OPTIONS,
  type FontSelection,
} from "./MemorialCardPreview";
import {
  getDefaultDesignForFaith,
  getMemorialDesignByVariant,
  memorialCardDesignsByFaith,
  type FaithKey,
  type MemorialCardVariant,
} from "./memorialCardDesigns";
import {
  ArrowDown,
  ArrowRight,
  ArrowUp,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  FileDown,
  GripVertical,
  Layers,
  Plus,
  RefreshCw,
  Sparkles,
  Trash2,
} from "lucide-react";

type TemplateSection = {
  title: string;
  description?: string;
  items?: string[];
  marginTop?: number;
  marginBottom?: number;
  padding?: number;
  gap?: number;
  fontScale?: number;
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

type CardEditorSettings = {
  background: string;
  text: string;
  accent: string;
  fontScale: number;
  lineHeight: number;
  fonts: FontSelection;
};

type FormValues = {
  title: string;
  honoreeName: string;
  birthDate: string;
  passingDate: string;
  tributeSentence: string;
  photoUrl: string;
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
  honoreeName: "",
  birthDate: "",
  passingDate: "",
  tributeSentence: "",
  photoUrl: "",
  readings: "",
  music: "",
  eulogies: "",
  notes: "",
};

const defaultFontSelection: FontSelection = {
  script: (SCRIPT_FONT_OPTIONS[0]?.value ?? 'great-vibes') as FontSelection['script'],
  serif: (SERIF_FONT_OPTIONS[0]?.value ?? 'playfair') as FontSelection['serif'],
  sans: (SANS_FONT_OPTIONS[0]?.value ?? 'inter') as FontSelection['sans'],
};

const defaultCardEditorSettings: CardEditorSettings = {
  background: '#ffffff',
  text: '#111111',
  accent: '#d6b56b',
  fontScale: 1,
  lineHeight: 1.4,
  fonts: defaultFontSelection,
};

const defaultSectionLayout: Required<Pick<TemplateSection, 'marginTop' | 'marginBottom' | 'padding' | 'gap' | 'fontScale'>> = {
  marginTop: 8,
  marginBottom: 12,
  padding: 12,
  gap: 6,
  fontScale: 1,
};

type SectionLayoutField = keyof typeof defaultSectionLayout;

function normalizeSection(section: TemplateSection): TemplateSection {
  const getNumber = (value: number | undefined, fallback: number) =>
    typeof value === 'number' && Number.isFinite(value) ? value : fallback;

  return {
    ...section,
    items: section.items ? [...section.items] : undefined,
    marginTop: getNumber(section.marginTop, defaultSectionLayout.marginTop),
    marginBottom: getNumber(section.marginBottom, defaultSectionLayout.marginBottom),
    padding: getNumber(section.padding, defaultSectionLayout.padding),
    gap: getNumber(section.gap, defaultSectionLayout.gap),
    fontScale: getNumber(section.fontScale, defaultSectionLayout.fontScale),
  };
}

function getSectionLayout(section: TemplateSection) {
  return {
    marginTop: typeof section.marginTop === 'number' ? section.marginTop : defaultSectionLayout.marginTop,
    marginBottom: typeof section.marginBottom === 'number' ? section.marginBottom : defaultSectionLayout.marginBottom,
    padding: typeof section.padding === 'number' ? section.padding : defaultSectionLayout.padding,
    gap: typeof section.gap === 'number' ? section.gap : defaultSectionLayout.gap,
    fontScale: typeof section.fontScale === 'number' ? section.fontScale : defaultSectionLayout.fontScale,
  } satisfies typeof defaultSectionLayout;
}
export default function OrderOfServicePage() {
  const faithEntries = useMemo(
    () => Object.entries(templateCatalog) as Array<[FaithKey, FaithDefinition]>,
    []
  );

  const [selectedFaith, setSelectedFaith] = useState<FaithKey | "">("");
  const [selectedTemplateId, setSelectedTemplateId] = useState<string | null>(null);
  const [formValues, setFormValues] = useState<FormValues>({ ...emptyFormValues });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [cardDownloadStatus, setCardDownloadStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [cardDownloadMessage, setCardDownloadMessage] = useState<string | null>(null);
  const [photoUploadError, setPhotoUploadError] = useState<string | null>(null);
  const [selectedMemorialVariant, setSelectedMemorialVariant] = useState<MemorialCardVariant | null>(null);
  const [cardEditorSettings, setCardEditorSettings] = useState<CardEditorSettings>({ ...defaultCardEditorSettings, fonts: { ...defaultCardEditorSettings.fonts } });
  const [structureSections, setStructureSections] = useState<TemplateSection[]>([]);
  const [structureEditorOpen, setStructureEditorOpen] = useState(true);
  const [activeStructureIndex, setActiveStructureIndex] = useState<number | null>(null);


  const previousFaithRef = useRef<string | "">("");
  const memorialPreviewRef = useRef<MemorialCardPreviewHandle | null>(null);

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
      ...prev,
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
    if (!selectedTemplate) {
      setStructureSections([]);
      return;
    }
    setStructureSections(selectedTemplate.structure.map((section) => normalizeSection(section)));
  }, [selectedTemplate]);

  useEffect(() => {
    if (!selectedFaith) {
      setSelectedMemorialVariant(null);
      return;
    }
    const designs = selectedFaith ? memorialCardDesignsByFaith[selectedFaith as FaithKey] : [];
    setSelectedMemorialVariant((prev) => {
      if (prev && designs.some((design) => design.id === prev)) {
        return prev;
      }
      return designs?.[0]?.id ?? getDefaultDesignForFaith(selectedFaith);
    });
  }, [selectedFaith]);

  useEffect(() => {
    if (!selectedMemorialVariant) {
      return;
    }
    const design = getMemorialDesignByVariant(selectedMemorialVariant);
    if (!design) {
      return;
    }
    setCardEditorSettings((prev) => ({
      ...prev,
      background: design.defaultTheme.background,
      text: design.defaultTheme.text,
      accent: design.defaultTheme.accent,
    }));
  }, [selectedMemorialVariant]);

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

  const toggleStructureEditor = () => setStructureEditorOpen((prev) => !prev);

  const toggleSectionEditor = (index: number) => {
    setActiveStructureIndex((prev) => (prev === index ? null : index));
  };

  const handlePhotoUpload = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }
    if (!file.type.startsWith("image/")) {
      setPhotoUploadError("Please choose an image file (JPG or PNG).");
      event.target.value = "";
      return;
    }
    const maxSizeBytes = 6 * 1024 * 1024;
    if (file.size > maxSizeBytes) {
      setPhotoUploadError("Please select an image smaller than 6MB.");
      event.target.value = "";
      return;
    }
    setPhotoUploadError(null);
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        setFormValues((prev) => ({ ...prev, photoUrl: reader.result as string }));
      } else {
        setPhotoUploadError("We couldn't read that file. Try another image.");
      }
    };
    reader.onerror = () => {
      setPhotoUploadError("We couldn't read that file. Try another image.");
    };
    reader.readAsDataURL(file);
  }, [setFormValues]);

  const handleCardThemeChange = (field: keyof Pick<CardEditorSettings, 'background' | 'text' | 'accent'>) =>
    (event: ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;
      setCardEditorSettings((prev) => ({ ...prev, [field]: value }));
    };

  const handleFontSelectionChange = (field: keyof FontSelection) =>
    (event: ChangeEvent<HTMLSelectElement>) => {
      const { value } = event.target;
      setCardEditorSettings((prev) => ({
        ...prev,
        fonts: { ...prev.fonts, [field]: value as FontSelection[keyof FontSelection] },
      }));
    };

  const handleFontScaleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const next = Number(event.target.value) / 100;
    setCardEditorSettings((prev) => ({ ...prev, fontScale: next }));
  };

  const updateSectionLayoutValue = (index: number, field: SectionLayoutField, value: number) => {
    setStructureSections((prev) => {
      const next = [...prev];
      if (!next[index]) {
        return prev;
      }
      const numericValue = Number.isFinite(value) ? value : defaultSectionLayout[field];
      next[index] = { ...next[index], [field]: numericValue };
      return next;
    });
  };

  const handleSectionNumberChange = (index: number, field: Exclude<SectionLayoutField, 'fontScale'>) =>
    (event: ChangeEvent<HTMLInputElement>) => {
      updateSectionLayoutValue(index, field, Number(event.target.value));
    };

  const handleSectionFontScaleChange = (index: number) => (event: ChangeEvent<HTMLInputElement>) => {
    const percentValue = Number(event.target.value);
    updateSectionLayoutValue(index, 'fontScale', percentValue / 100);
  };

  const handleStructureFieldChange = (index: number, field: keyof TemplateSection) =>
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { value } = event.target;
      setStructureSections((prev) => {
        const next = [...prev];
        const updated = { ...next[index] };
        if (field === "items") {
          updated.items = value
            .split("\n")
            .map((entry) => entry.trim())
            .filter((entry) => entry.length > 0);
        } else {
          (updated as Record<string, unknown>)[field] = value;
        }
        next[index] = updated;
        return next;
      });
    };

  const moveStructureSection = (index: number, direction: "up" | "down") => {
    setStructureSections((prev) => {
      const next = [...prev];
      const swapWith = direction === "up" ? index - 1 : index + 1;
      if (swapWith < 0 || swapWith >= next.length) {
        return prev;
      }
      const temp = next[swapWith];
      next[swapWith] = next[index];
      next[index] = temp;
      return next;
    });
  };

  const addStructureSection = () => {
    setStructureSections((prev) => [
      ...prev,
      normalizeSection({
        title: "New section",
        description: "",
        items: [],
      }),
    ]);
  };

  const removeStructureSection = (index: number) => {
    setStructureSections((prev) => prev.filter((_, itemIndex) => itemIndex !== index));
  };

  const resetStructureToTemplate = () => {
    if (!selectedTemplate) {
      return;
    }
    setStructureSections(selectedTemplate.structure.map((section) => normalizeSection(section)));
  };

  const handleLineHeightChange = (event: ChangeEvent<HTMLInputElement>) => {
    const next = Number(event.target.value) / 100;
    setCardEditorSettings((prev) => ({ ...prev, lineHeight: next }));
  };

  const handleClearPhoto = useCallback(() => {
    setFormValues((prev) => ({ ...prev, photoUrl: "" }));
    setPhotoUploadError(null);
  }, [setFormValues]);

  const handleTemplateSelection = (template: TemplateDefinition) => {
    setSelectedTemplateId(template.id);
    applyTemplate(template);
    setStatus("idle");
    setStatusMessage(null);
  };

  const handleFaithSelection = (faithKey: FaithKey | "") => {
    setSelectedFaith(faithKey);
    setSelectedMemorialVariant(faithKey ? getDefaultDesignForFaith(faithKey) : null);
    setStatus("idle");
    setStatusMessage(null);
  };

  const downloadMemorialCard = useCallback(async () => {
    if (!selectedMemorialVariant) {
      setCardDownloadStatus("error");
      setCardDownloadMessage("Select a memorial card template to download it.");
      return;
    }

    if (!memorialPreviewRef.current) {
      setCardDownloadMessage("The preview is not ready yet.");
      setCardDownloadStatus("error");
      return;
    }

    try {
      setCardDownloadStatus("loading");
      setCardDownloadMessage("Preparing a 665x960 JPG...");
      await memorialPreviewRef.current.download();
      setCardDownloadStatus("success");
      setCardDownloadMessage("Downloaded the memorial card. Check your downloads folder.");
    } catch (error) {
      console.error(error);
      setCardDownloadStatus("error");
      setCardDownloadMessage("We could not export the card. Try again after confirming the portrait URL.");
    }
  }, [selectedMemorialVariant]);

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

    if (
      !formValues.honoreeName.trim() ||
      !formValues.birthDate.trim() ||
      !formValues.passingDate.trim() ||
      !formValues.tributeSentence.trim()
    ) {
      setStatus("error");
      setStatusMessage("Enter the honouree name, birth date, passing date, and a tribute sentence to design the memorial card.");
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
        honoreeName: formValues.honoreeName.trim(),
        birthDate: formValues.birthDate.trim(),
        passingDate: formValues.passingDate.trim(),
        tributeSentence: formValues.tributeSentence.trim(),
        photoUrl: formValues.photoUrl.trim(),
        readings: formValues.readings.trim(),
        music: formValues.music.trim(),
        eulogies: formValues.eulogies.trim(),
        notes: formValues.notes.trim(),
        structure: structureSections,
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
    <div className="space-y-16 px-4 py-16 sm:px-6">
      <div className="mx-auto grid max-w-4xl gap-00">
        <section className="space-y-6">
          <span className="tag-chip">Order of service</span>
          <h1 className="text-balance text-4xl font-semibold text-neutral-900 sm:text-5xl">
            Create a ceremony script your family, clergy, and guests can follow with ease.
          </h1>
          <p className="text-lg text-neutral-700">
            Generate a PDF-ready programme aligned to your faith tradition. Coordinators can personalise hymns, chant schedules, tributes, and multimedia cues for you.
          </p>
          <div className="grid grid-cols-1 gap-4 rounded-3xl border border-neutral-200 bg-white p-6 text-sm text-neutral-600 sm:grid-cols-2">
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

        <section className="glass-panel relative flex w-full flex-col overflow-hidden rounded-[2.5rem] border border-neutral-200 bg-white p-4 shadow-glow sm:p-8">
          <span className="absolute -left-16 top-0 h-48 w-48 rounded-full bg-black/10 blur-3xl" aria-hidden />
          <span className="absolute -right-20 bottom-0 h-48 w-48 rounded-full bg-black/5 blur-3xl" aria-hidden />
          <form onSubmit={submit} className="relative mx-auto w-full max-w-3xl space-y-8 text-sm text-neutral-700">
            <fieldset className="space-y-4" aria-label="Faith tradition">
              <span className="tag-chip">Step 1 - Faith tradition</span>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
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
                <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
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
              <div className="space-y-5 rounded-[2.5rem] border border-neutral-200 bg-white/95 p-5 shadow-sm">
                <div className="space-y-5">
                  <div className="space-y-3 rounded-3xl border border-neutral-200 bg-white p-5">
                    <p className="text-sm font-semibold text-neutral-900">Memorial card details</p>
                    <p className="text-xs text-neutral-600">
                      These fields power the ceremonial poster and PDF header. Families can later swap the portrait or edit
                      wording.
                    </p>
                    <input
                      name="honoreeName"
                      placeholder="Full name for the memorial card"
                      className="form-field"
                      value={formValues.honoreeName}
                      onChange={handleFieldChange("honoreeName")}
                      required
                    />
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                      <input
                        type="date"
                        name="birthDate"
                        placeholder="Date of birth"
                        className="form-field"
                        value={formValues.birthDate}
                        onChange={handleFieldChange("birthDate")}
                        required
                      />
                      <input
                        type="date"
                        name="passingDate"
                        placeholder="Date of passing"
                        className="form-field"
                        value={formValues.passingDate}
                        onChange={handleFieldChange("passingDate")}
                        required
                      />
                    </div>
                    <input
                      name="tributeSentence"
                      placeholder="Short tribute sentence (e.g., 'Forever in our hearts')"
                      className="form-field"
                      value={formValues.tributeSentence}
                      onChange={handleFieldChange("tributeSentence")}
                      required
                    />
                    <div className="space-y-3">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <p className="text-sm font-semibold text-neutral-900">Portrait photo</p>
                        {formValues.photoUrl ? (
                          <button
                            type="button"
                            onClick={handleClearPhoto}
                            className="text-xs font-medium text-rose-600 hover:text-rose-700"
                          >
                            Remove photo
                          </button>
                        ) : null}
                      </div>
                      <label className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-neutral-300 bg-neutral-50/70 p-4 text-center text-xs font-medium text-neutral-600 hover:border-neutral-400">
                        <input type="file" accept="image/*" className="sr-only" onChange={handlePhotoUpload} />
                        <span className="text-sm font-semibold text-neutral-800">Upload from your device</span>
                        <span>JPG or PNG, up to 6MB</span>
                      </label>
                      {photoUploadError ? (
                        <p className="text-xs text-rose-600">{photoUploadError}</p>
                      ) : (
                        <p className="text-xs text-neutral-500">We&apos;ll embed the portrait directly in the preview and JPG download.</p>
                      )}
                      {formValues.photoUrl ? (
                        <div className="flex items-center gap-3 rounded-2xl border border-neutral-200 bg-white p-3">
                          <div className="h-14 w-14 overflow-hidden flex flex-col items-center rounded-full border border-neutral-200 bg-neutral-100">
                            <img
                              src={formValues.photoUrl}
                              alt="Portrait preview"
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <p className="text-xs text-neutral-600">Preview of the photo that will appear on the memorial card.</p>
                        </div>
                      ) : null}
                      <p className="text-xs font-medium uppercase tracking-[0.2em] text-neutral-500">Or supply a link</p>
                      <input
                        name="photoUrl"
                        placeholder="Portrait URL (Google Drive, CDN, etc.)"
                        className="form-field"
                        value={formValues.photoUrl}
                        onChange={handleFieldChange("photoUrl")}
                      />
                    </div>
                  </div>
                </div>
                <div className="space-y-4 rounded-3xl border border-neutral-200 bg-white p-5">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-start gap-3">
                      <button
                        type="button"
                        onClick={toggleStructureEditor}
                        className="rounded-full border border-neutral-200 p-1 text-neutral-500 transition hover:border-neutral-300 hover:text-neutral-800"
                        aria-label={structureEditorOpen ? "Collapse template structure" : "Expand template structure"}
                        aria-expanded={structureEditorOpen}
                      >
                        {structureEditorOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                      </button>
                      <div>
                        <p className="text-sm font-semibold text-neutral-900">Template structure</p>
                        <p className="text-xs text-neutral-600">Reorder, rename, or refine the flow before generating the PDF.</p>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={resetStructureToTemplate}
                        disabled={!selectedTemplate}
                        className="rounded-full border border-neutral-200 px-3 py-1 text-xs font-semibold text-neutral-600 transition hover:border-neutral-300 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        Reset to template
                      </button>
                      <button
                        type="button"
                        onClick={addStructureSection}
                        className="inline-flex items-center gap-1 rounded-full border border-neutral-900 px-3 py-1 text-xs font-semibold text-neutral-900 transition hover:bg-neutral-900 hover:text-white"
                      >
                        <Plus size={14} />
                        Add section
                      </button>
                    </div>
                  </div>
                  {structureEditorOpen ? (
                    structureSections.length === 0 ? (
                      <p className="rounded-2xl border border-dashed border-neutral-200 bg-neutral-50 p-4 text-xs text-neutral-500">
                        Choose a template to load recommended sections, then tailor them to your ceremony.
                      </p>
                    ) : (
                      <div className="space-y-3 max-h-[18rem] overflow-y-auto pr-1">
                        {structureSections.map((section, index) => {
                          const itemsValue = section.items?.join("\n") ?? "";
                          const layout = getSectionLayout(section);
                          const isActive = activeStructureIndex === index;
                          const bulletSummary = section.items?.slice(0, 2).join(" - ");
                          return (
                            <div key={`${section.title}-${index}`} className="space-y-2 rounded-2xl border border-neutral-200 bg-neutral-50 p-4">
                              <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-neutral-500">
                                <div className="inline-flex items-center gap-2 font-semibold uppercase tracking-wide text-neutral-700">
                                  <GripVertical size={14} />
                                  <span>Section {index + 1}</span>
                                  <span className="font-normal normal-case text-neutral-500">
                                    {section.title || "Untitled"} - {section.items?.length ?? 0} entry{section.items && section.items.length === 1 ? "" : "ies"}
                                  </span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <button
                                    type="button"
                                    onClick={() => moveStructureSection(index, "up")}
                                    disabled={index === 0}
                                    className="rounded-full border border-neutral-200 p-1 text-neutral-500 transition hover:border-neutral-300 hover:text-neutral-800 disabled:cursor-not-allowed disabled:opacity-50"
                                    aria-label="Move section up"
                                  >
                                    <ArrowUp size={14} />
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => moveStructureSection(index, "down")}
                                    disabled={index === structureSections.length - 1}
                                    className="rounded-full border border-neutral-200 p-1 text-neutral-500 transition hover:border-neutral-300 hover:text-neutral-800 disabled:cursor-not-allowed disabled:opacity-50"
                                    aria-label="Move section down"
                                  >
                                    <ArrowDown size={14} />
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => removeStructureSection(index)}
                                    className="rounded-full border border-red-100 p-1 text-red-500 transition hover:border-red-200 hover:text-red-600"
                                    aria-label="Remove section"
                                  >
                                    <Trash2 size={14} />
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => toggleSectionEditor(index)}
                                    className="rounded-full border border-neutral-200 px-2 py-1 text-[11px] font-semibold text-neutral-700 transition hover:border-neutral-300"
                                  >
                                    {isActive ? "Hide editor" : "Edit"}
                                  </button>
                                </div>
                              </div>
                              {!isActive ? (
                                <div className="flex flex-col text-xs text-neutral-500">
                                  {bulletSummary ? (
                                    <span className="truncate">
                                      {bulletSummary}
                                      {section.items && section.items.length > 2 ? "..." : ""}
                                    </span>
                                  ) : (
                                    <span className="italic">No bullet items yet.</span>
                                  )}
                                </div>
                              ) : (
                                <div className="space-y-3">
                                  <input
                                    className="form-field"
                                    value={section.title}
                                    onChange={handleStructureFieldChange(index, "title")}
                                    placeholder="Section title"
                                  />
                                  <textarea
                                    className="form-field"
                                    rows={2}
                                    value={section.description ?? ""}
                                    onChange={handleStructureFieldChange(index, "description")}
                                    placeholder="Section description or facilitator"
                                  />
                                  <textarea
                                    className="form-field"
                                    rows={3}
                                    value={itemsValue}
                                    onChange={handleStructureFieldChange(index, "items")}
                                    placeholder="Bullet points (one per line)"
                                  />
                                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                                    <label className="flex flex-col gap-1 text-xs font-medium text-neutral-600">
                                      Margin top (px)
                                      <input type="number" min={0} max={64} className="form-field" value={layout.marginTop} onChange={handleSectionNumberChange(index, 'marginTop')} />
                                    </label>
                                    <label className="flex flex-col gap-1 text-xs font-medium text-neutral-600">
                                      Margin bottom (px)
                                      <input type="number" min={0} max={64} className="form-field" value={layout.marginBottom} onChange={handleSectionNumberChange(index, 'marginBottom')} />
                                    </label>
                                    <label className="flex flex-col gap-1 text-xs font-medium text-neutral-600">
                                      Card padding (px)
                                      <input type="number" min={0} max={48} className="form-field" value={layout.padding} onChange={handleSectionNumberChange(index, 'padding')} />
                                    </label>
                                    <label className="flex flex-col gap-1 text-xs font-medium text-neutral-600">
                                      Bullet gap (px)
                                      <input type="number" min={0} max={32} className="form-field" value={layout.gap} onChange={handleSectionNumberChange(index, 'gap')} />
                                    </label>
                                  </div>
                                  <label className="flex flex-col gap-2 text-xs font-medium text-neutral-600">
                                    Font size
                                    <input type="range" min={80} max={140} step={5} value={Math.round(layout.fontScale * 100)} onChange={handleSectionFontScaleChange(index)} />
                                    <span className="text-[11px] text-neutral-500">{Math.round(layout.fontScale * 100)}%</span>
                                  </label>
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    )
                  ) : (
                    <p className="rounded-2xl border border-dashed border-neutral-200 bg-neutral-50 p-4 text-xs text-neutral-500">
                      Template structure editor collapsed. Select the arrow above to reveal section controls.
                    </p>
                  )}
                  {selectedFaith ? (
                    <div className="space-y-3 max-w-4xl mx-auto">
                      <p className="text-xs uppercase tracking-[0.35em] text-neutral-500">Card template style</p>
                      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                        {memorialCardDesignsByFaith[selectedFaith as FaithKey]?.map((design) => (
                          <label
                            key={design.id}
                            className={`card-lift relative flex cursor-pointer flex-col gap-2 rounded-3xl border p-4 transition ${
                              selectedMemorialVariant === design.id
                                ? "border-neutral-900 bg-white"
                                : "border-neutral-200 bg-white/80 hover:border-neutral-400"
                            }`}
                          >
                            <input
                              type="radio"
                              name="memorial-variant"
                              className="sr-only"
                              checked={selectedMemorialVariant === design.id}
                              onChange={() => setSelectedMemorialVariant(design.id)}
                            />
                            <p className="text-sm font-semibold text-neutral-900">{design.name}</p>
                            <p className="text-xs text-neutral-600">{design.description}</p>
                          </label>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <p className="rounded-3xl border border-dashed border-neutral-200 bg-white/70 p-4 text-xs text-neutral-500">
                      Select a faith tradition to reveal memorial card templates.
                    </p>
                  )}
                  <div className="max-w-3xl mx-auto">
                    <p className="text-sm font-semibold text-neutral-900">Memorial card preview</p>
                    <p className="mt-1 text-xs text-neutral-600">
                      This live template mirrors the downloadable 665x960 JPG and updates as you personalise the card
                      details.
                    </p>
                    <div className="mt-5 flex flex-col items-center gap-3">
                        <div className="w-full max-w-[665px] flex flex-col items-center justify-center overflow-hidden">
                        <MemorialCardPreview
                          ref={memorialPreviewRef}
                          variant={selectedMemorialVariant}
                          name={formValues.honoreeName}
                          birthDate={formValues.birthDate}
                          passingDate={formValues.passingDate}
                          tributeSentence={formValues.tributeSentence}
                          title={formValues.title}
                          readings={formValues.readings}
                          music={formValues.music}
                          eulogies={formValues.eulogies}
                          notes={formValues.notes}
                          photoUrl={formValues.photoUrl}
                          themeOverrides={{
                            background: cardEditorSettings.background,
                            text: cardEditorSettings.text,
                            accent: cardEditorSettings.accent,
                          }}
                          fontSelection={cardEditorSettings.fonts}
                          typeScale={cardEditorSettings.fontScale}
                          lineHeight={cardEditorSettings.lineHeight}
                          previewWidth={320}
                        />
                      </div>
                      <button
                        type="button"
                        onClick={downloadMemorialCard}
                        className="inline-flex items-center justify-center gap-2 rounded-full border border-neutral-200 bg-white px-4 py-2 text-xs font-semibold text-neutral-800 transition hover:border-neutral-400 hover:text-neutral-900 disabled:cursor-not-allowed disabled:opacity-60"
                        disabled={!selectedMemorialVariant || cardDownloadStatus === "loading"}
                      >
                        {cardDownloadStatus === "loading" ? "Preparing JPG..." : "Download JPG (665x960)"}
                      </button>
                      {cardDownloadMessage ? (
                        <p
                          className={`text-xs ${
                            cardDownloadStatus === "error"
                              ? "text-rose-600"
                              : "text-emerald-700"
                          }`}
                        >
                          {cardDownloadMessage}
                        </p>
                      ) : null}
                    </div>
                  </div>
                  <div className="mt-4 space-y-4 rounded-3xl border border-neutral-200 bg-white/90 p-5 max-w-4xl mx-auto">
                    <p className="text-sm font-semibold text-neutral-900">Design editor</p>
                    <p className="text-xs text-neutral-600">Adjust card colors, typography, and spacing after selecting a template.</p>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                      <label className="flex flex-col gap-1 text-xs font-medium text-neutral-600">
                        Background
                        <input
                          type="color"
                          className="h-10 w-full cursor-pointer rounded-2xl border border-neutral-200 bg-white p-1"
                          value={cardEditorSettings.background}
                          onChange={handleCardThemeChange('background')}
                          disabled={!selectedMemorialVariant}
                        />
                        <span className="text-[11px] text-neutral-500">{cardEditorSettings.background}</span>
                      </label>
                      <label className="flex flex-col gap-1 text-xs font-medium text-neutral-600">
                        Text
                        <input
                          type="color"
                          className="h-10 w-full cursor-pointer rounded-2xl border border-neutral-200 bg-white p-1"
                          value={cardEditorSettings.text}
                          onChange={handleCardThemeChange('text')}
                          disabled={!selectedMemorialVariant}
                        />
                        <span className="text-[11px] text-neutral-500">{cardEditorSettings.text}</span>
                      </label>
                      <label className="flex flex-col gap-1 text-xs font-medium text-neutral-600">
                        Accent
                        <input
                          type="color"
                          className="h-10 w-full cursor-pointer rounded-2xl border border-neutral-200 bg-white p-1"
                          value={cardEditorSettings.accent}
                          onChange={handleCardThemeChange('accent')}
                          disabled={!selectedMemorialVariant}
                        />
                        <span className="text-[11px] text-neutral-500">{cardEditorSettings.accent}</span>
                      </label>
                    </div>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                      <label className="flex flex-col gap-1 text-xs font-medium text-neutral-600">
                        Script font
                        <select
                          className="form-field"
                          value={cardEditorSettings.fonts.script}
                          onChange={handleFontSelectionChange('script')}
                          disabled={!selectedMemorialVariant}
                        >
                          {SCRIPT_FONT_OPTIONS.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                      </label>
                      <label className="flex flex-col gap-1 text-xs font-medium text-neutral-600">
                        Serif font
                        <select
                          className="form-field"
                          value={cardEditorSettings.fonts.serif}
                          onChange={handleFontSelectionChange('serif')}
                          disabled={!selectedMemorialVariant}
                        >
                          {SERIF_FONT_OPTIONS.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                      </label>
                      <label className="flex flex-col gap-1 text-xs font-medium text-neutral-600">
                        Sans font
                        <select
                          className="form-field"
                          value={cardEditorSettings.fonts.sans}
                          onChange={handleFontSelectionChange('sans')}
                          disabled={!selectedMemorialVariant}
                        >
                          {SANS_FONT_OPTIONS.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                      </label>
                    </div>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <label className="flex flex-col gap-2 text-xs font-medium text-neutral-600">
                        Overall scale
                        <input
                          type="range"
                          min={90}
                          max={115}
                          step={1}
                          value={Math.round(cardEditorSettings.fontScale * 100)}
                          onChange={handleFontScaleChange}
                          disabled={!selectedMemorialVariant}
                        />
                        <span className="text-[11px] text-neutral-500">{Math.round(cardEditorSettings.fontScale * 100)}%</span>
                      </label>
                      <label className="flex flex-col gap-2 text-xs font-medium text-neutral-600">
                        Line spacing
                        <input
                          type="range"
                          min={100}
                          max={180}
                          step={5}
                          value={Math.round(cardEditorSettings.lineHeight * 100)}
                          onChange={handleLineHeightChange}
                          disabled={!selectedMemorialVariant}
                        />
                        <span className="text-[11px] text-neutral-500">{cardEditorSettings.lineHeight.toFixed(2)}x line height</span>
                      </label>
                    </div>
                  </div>
                </div>
                <input
                  name="title"
                  placeholder="Programme title (e.g., Order of Service for...)"
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
            </div>

            <div className="space-y-4">
              <span className="tag-chip">Step 4 - Review and download</span>
              {structureSections.length > 0 ? (
                <div className="rounded-3xl border border-neutral-200 bg-white p-5">
                  <div className="flex items-center gap-2 text-sm font-semibold text-neutral-900">
                    <Layers size={18} className="stroke-[1.5]" />
                    Ceremony flow overview
                  </div>
                  <p className="mt-2 text-xs text-neutral-600">Pulled from the chosen template or your custom sequence. Reorder or edit sections before exporting.</p>
                  <ul className="mt-4 space-y-3 text-sm text-neutral-700">
                    {structureSections.map((section, index) => {
                      const layout = getSectionLayout(section);
                      const headingFontSize = `${(layout.fontScale ?? 1) * 0.95}rem`;
                      const detailFontSize = `${(layout.fontScale ?? 1) * 0.8}rem`;
                      const listGap = Math.max(layout.gap ?? defaultSectionLayout.gap, 0);
                      return (
                        <li
                          key={`${section.title}-${index}`}
                          className="rounded-2xl border border-neutral-200 bg-neutral-50"
                          style={{
                            padding: `${layout.padding}px`,
                            marginTop: `${layout.marginTop}px`,
                            marginBottom: `${layout.marginBottom}px`,
                          }}
                        >
                          <p className="font-semibold text-neutral-900" style={{ fontSize: headingFontSize }}>
                            {section.title}
                          </p>
                          {section.description ? (
                            <p className="text-neutral-600" style={{ fontSize: detailFontSize }}>
                              {section.description}
                            </p>
                          ) : null}
                          {section.items && section.items.length > 0 ? (
                            <ul
                              className="mt-1 flex flex-col text-neutral-600"
                              style={{ gap: `${listGap}px`, fontSize: detailFontSize }}
                            >
                              {section.items.map((item) => (
                                <li key={item} className="flex items-start gap-2">
                                  <span aria-hidden className="mt-0.5 text-neutral-400">-</span>
                                  <span>{item}</span>
                                </li>
                              ))}
                            </ul>
                          ) : null}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ) : selectedTemplate ? (
                <p className="rounded-3xl border border-dashed border-neutral-200 bg-white/70 p-4 text-xs text-neutral-500">
                  Add at least one section in the editor above to generate a ceremony overview.
                </p>
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



















