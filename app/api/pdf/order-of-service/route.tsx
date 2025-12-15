
import React from "react";
import { NextResponse } from "next/server";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  renderToBuffer,
  Svg,
  Path,
  Rect,
  Circle,
} from "@react-pdf/renderer";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type TemplateSection = {
  title: string;
  description?: string;
  items?: string[];
};

type PdfPayload = {
  faith: string;
  faithLabel?: string;
  templateId?: string;
  templateName?: string;
  templateSummary?: string;
  title: string;
  readings?: string;
  music?: string;
  eulogies?: string;
  notes?: string;
  structure?: TemplateSection[];
};

type MemorialTheme = {
  id: string;
  name: string;
  background: string;
  heroBackground: string;
  heroBorder: string;
  panelBackground: string;
  panelBorder: string;
  bodyText: string;
  heroTitle: string;
  heroOverline: string;
  columnTitle: string;
  accent: string;
  pattern?: "dove" | "sunburst" | "floral" | "aurora" | "arches";
  layout: "split" | "stacked";
  noteBackground?: string;
};

type OrderDocumentProps = {
  faith: string;
  faithLabel?: string;
  templateName?: string;
  templateSummary?: string;
  title: string;
  notes?: string;
  structure: TemplateSection[];
  lists: {
    readings: string[];
    music: string[];
    eulogies: string[];
  };
  theme: MemorialTheme;
};

const memorialThemes: MemorialTheme[] = [
  {
    id: "midnight-dove",
    name: "Midnight Dove",
    background: "#0b1120",
    heroBackground: "#111827",
    heroBorder: "#475569",
    panelBackground: "#111827",
    panelBorder: "#1f2937",
    bodyText: "#e2e8f0",
    heroTitle: "#f8fafc",
    heroOverline: "#94a3b8",
    columnTitle: "#e0f2fe",
    accent: "#fbbf24",
    pattern: "dove",
    layout: "split",
    noteBackground: "#0f172a",
  },
  {
    id: "ivory-glow",
    name: "Ivory Glow",
    background: "#fdf6ec",
    heroBackground: "#fff",
    heroBorder: "#f7e0c3",
    panelBackground: "#fffaf5",
    panelBorder: "#f4d9b4",
    bodyText: "#3f3d56",
    heroTitle: "#a16207",
    heroOverline: "#b45309",
    columnTitle: "#a16207",
    accent: "#f59e0b",
    pattern: "sunburst",
    layout: "split",
    noteBackground: "#fff7ed",
  },
  {
    id: "emerald-veil",
    name: "Emerald Veil",
    background: "#0f2a24",
    heroBackground: "#12352d",
    heroBorder: "#1f6b5a",
    panelBackground: "#0f2a24",
    panelBorder: "#1f453c",
    bodyText: "#e6fffa",
    heroTitle: "#d1fae5",
    heroOverline: "#34d399",
    columnTitle: "#6ee7b7",
    accent: "#34d399",
    pattern: "floral",
    layout: "split",
    noteBackground: "#0b201b",
  },
  {
    id: "blush-halo",
    name: "Blush Halo",
    background: "#fff1f2",
    heroBackground: "#fff",
    heroBorder: "#fecdd3",
    panelBackground: "#fff5f7",
    panelBorder: "#fecdd3",
    bodyText: "#4c0519",
    heroTitle: "#9f1239",
    heroOverline: "#db2777",
    columnTitle: "#be123c",
    accent: "#f472b6",
    pattern: "aurora",
    layout: "stacked",
    noteBackground: "#ffe4e8",
  },
  {
    id: "royal-arches",
    name: "Royal Arches",
    background: "#1f1734",
    heroBackground: "#271c40",
    heroBorder: "#6b21a8",
    panelBackground: "#241533",
    panelBorder: "#4c1d95",
    bodyText: "#f3e8ff",
    heroTitle: "#f5d0fe",
    heroOverline: "#c084fc",
    columnTitle: "#d8b4fe",
    accent: "#d946ef",
    pattern: "arches",
    layout: "split",
    noteBackground: "#1a1026",
  },
];

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: "Helvetica",
    position: "relative",
  },
  heroBlock: {
    borderRadius: 28,
    borderWidth: 1.5,
    padding: 20,
  },
  heroOverline: {
    fontSize: 11,
    letterSpacing: 2,
    textTransform: "uppercase",
  },
  heroTitle: {
    fontSize: 26,
    marginTop: 10,
    fontWeight: 700,
    lineHeight: 1.3,
  },
  heroMeta: {
    fontSize: 11,
    marginTop: 4,
  },
  heroSummary: {
    fontSize: 10,
    marginTop: 4,
    lineHeight: 1.4,
  },
  columnsWrap: {
    marginTop: 24,
    flexDirection: "row",
  },
  columnCard: {
    flex: 1,
    borderRadius: 22,
    borderWidth: 1,
    padding: 18,
  },
  columnTitle: {
    fontSize: 11,
    letterSpacing: 1,
    textTransform: "uppercase",
  },
  timelineItem: {
    marginTop: 12,
  },
  timelineHeading: {
    fontSize: 13,
    fontWeight: 600,
  },
  timelineDescription: {
    fontSize: 11,
    marginTop: 2,
  },
  bulletList: {
    marginTop: 6,
    marginLeft: 10,
  },
  bulletItem: {
    fontSize: 11,
    marginBottom: 2,
  },
  listBlock: {
    marginTop: 14,
  },
  notesBlock: {
    marginTop: 24,
    borderRadius: 22,
    borderWidth: 1,
    padding: 18,
  },
  noteText: {
    fontSize: 11,
    marginTop: 6,
    lineHeight: 1.5,
  },
});

function parseLines(input?: string) {
  if (!input) {
    return [] as string[];
  }

  return input
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line.length > 0);
}

function renderEntries(entries: string[], theme: MemorialTheme) {
  if (entries.length === 0) {
    return <Text style={[styles.bulletItem, { color: theme.bodyText }]}>-</Text>;
  }

  return (
    <View style={styles.bulletList}>
      {entries.map((entry, index) => (
        <Text key={`${entry}-${index}`} style={[styles.bulletItem, { color: theme.bodyText }]}>
          - {entry}
        </Text>
      ))}
    </View>
  );
}

function DecorativeLayer({ theme }: { theme: MemorialTheme }) {
  if (!theme.pattern) {
    return null;
  }

  switch (theme.pattern) {
    case "dove":
      return (
        <Svg
          style={{ position: "absolute", top: 10, right: 10, width: 180, height: 180, opacity: 0.18 }}
          viewBox="0 0 200 200"
        >
          <Path
            d="M20 140 C70 120 80 60 130 50 C150 45 170 60 180 90"
            stroke={theme.accent}
            strokeWidth={10}
            fill="none"
            strokeLinecap="round"
          />
          <Path
            d="M40 170 C80 140 120 150 150 120"
            stroke={theme.columnTitle}
            strokeWidth={6}
            fill="none"
            strokeLinecap="round"
            opacity={0.6}
          />
        </Svg>
      );
    case "sunburst":
      return (
        <Svg
          style={{ position: "absolute", top: -20, left: -20, width: 220, height: 220, opacity: 0.2 }}
          viewBox="0 0 200 200"
        >
          {[...Array(12)].map((_, index) => (
            <Path
              key={`ray-${index}`}
              d={`M100 100 L100 ${index % 2 === 0 ? 0 : 30}`}
              stroke={theme.accent}
              strokeWidth={index % 2 === 0 ? 2 : 1}
              transform={`rotate(${index * 30} 100 100)`}
            />
          ))}
          <Circle cx="100" cy="100" r="40" stroke={theme.heroBorder} strokeWidth="3" fill="none" />
        </Svg>
      );
    case "floral":
      return (
        <Svg
          style={{ position: "absolute", bottom: 20, right: 0, width: 220, height: 220, opacity: 0.15 }}
          viewBox="0 0 200 200"
        >
          <Path
            d="M60 150 C80 120 120 120 140 150 C160 180 120 190 100 170 C80 150 40 180 60 150Z"
            fill={theme.accent}
            opacity={0.6}
          />
          <Circle cx="120" cy="110" r="30" fill={theme.columnTitle} opacity={0.4} />
        </Svg>
      );
    case "aurora":
      return (
        <Svg
          style={{ position: "absolute", top: -10, right: -10, width: 200, height: 200, opacity: 0.2 }}
          viewBox="0 0 200 200"
        >
          <Path d="M0 120 C60 60 140 180 200 120" stroke={theme.accent} strokeWidth={20} fill="none" />
          <Path d="M0 160 C70 90 130 210 200 150" stroke={theme.columnTitle} strokeWidth={12} fill="none" opacity={0.5} />
        </Svg>
      );
    case "arches":
      return (
        <Svg
          style={{ position: "absolute", bottom: -20, left: 0, width: 240, height: 240, opacity: 0.2 }}
          viewBox="0 0 200 200"
        >
          {[...Array(4)].map((_, index) => (
            <Rect
              key={`arch-${index}`}
              x={index * 15}
              y={index * 15}
              width={200 - index * 30}
              height={200 - index * 30}
              rx={100}
              ry={100}
              stroke={theme.accent}
              strokeWidth={4}
              fill="none"
            />
          ))}
        </Svg>
      );
    default:
      return null;
  }
}

function MemorialDocument({
  faith,
  faithLabel,
  templateName,
  templateSummary,
  title,
  notes,
  structure,
  lists,
  theme,
}: OrderDocumentProps) {
  const isStacked = theme.layout === "stacked";

  return (
    <Document>
      <Page size="A4" style={[styles.page, { backgroundColor: theme.background, color: theme.bodyText }]}>
        <DecorativeLayer theme={theme} />
        <View style={[styles.heroBlock, { backgroundColor: theme.heroBackground, borderColor: theme.heroBorder }]}>
          <Text style={[styles.heroOverline, { color: theme.heroOverline }]}>In loving memory of</Text>
          <Text style={[styles.heroTitle, { color: theme.heroTitle }]}>{title}</Text>
          <Text style={[styles.heroMeta, { color: theme.bodyText }]}>Faith tradition: {faithLabel ?? faith}</Text>
          {templateName ? (
            <Text style={[styles.heroMeta, { color: theme.bodyText }]}>Template: {templateName}</Text>
          ) : null}
          {templateSummary ? (
            <Text style={[styles.heroSummary, { color: theme.bodyText }]}>{templateSummary}</Text>
          ) : null}
        </View>

        <View style={[styles.columnsWrap, isStacked ? { flexDirection: "column" } : null]}>
          <View
            style={[
              styles.columnCard,
              { backgroundColor: theme.panelBackground, borderColor: theme.panelBorder },
              !isStacked ? { marginRight: 14 } : { marginBottom: 16 },
            ]}
          >
            <Text style={[styles.columnTitle, { color: theme.columnTitle }]}>Ceremony flow</Text>
            {structure.length === 0 ? (
              <Text style={[styles.timelineDescription, { marginTop: 10, color: theme.bodyText }]}>No sections added.</Text>
            ) : (
              structure.map((section, index) => (
                <View key={`${section.title}-${index}`} style={styles.timelineItem}>
                  <Text style={[styles.timelineHeading, { color: theme.bodyText }]}>{section.title}</Text>
                  {section.description ? (
                    <Text style={[styles.timelineDescription, { color: theme.bodyText }]}>{section.description}</Text>
                  ) : null}
                  {section.items && section.items.length > 0 ? (
                    <View style={styles.bulletList}>
                      {section.items.map((item, itemIndex) => (
                        <Text key={`${item}-${itemIndex}`} style={[styles.bulletItem, { color: theme.bodyText }]}>
                          - {item}
                        </Text>
                      ))}
                    </View>
                  ) : null}
                </View>
              ))
            )}
          </View>

          <View style={[styles.columnCard, { backgroundColor: theme.panelBackground, borderColor: theme.panelBorder }]}>
            <Text style={[styles.columnTitle, { color: theme.columnTitle }]}>Readings & tributes</Text>
            <View style={styles.listBlock}>
              <Text style={[styles.timelineHeading, { color: theme.bodyText }]}>Readings and scripture</Text>
              {renderEntries(lists.readings, theme)}
            </View>
            <View style={styles.listBlock}>
              <Text style={[styles.timelineHeading, { color: theme.bodyText }]}>Music, hymns, and chants</Text>
              {renderEntries(lists.music, theme)}
            </View>
            <View style={styles.listBlock}>
              <Text style={[styles.timelineHeading, { color: theme.bodyText }]}>Eulogies and reflections</Text>
              {renderEntries(lists.eulogies, theme)}
            </View>
          </View>
        </View>

        <View
          style={[
            styles.notesBlock,
            { backgroundColor: theme.noteBackground ?? theme.panelBackground, borderColor: theme.panelBorder },
          ]}
        >
          <Text style={[styles.columnTitle, { color: theme.columnTitle }]}>Additional notes</Text>
          <Text style={[styles.noteText, { color: theme.bodyText }]}>
            {notes && notes.trim().length > 0 ? notes.trim() : "No further notes added."}
          </Text>
        </View>
      </Page>
    </Document>
  );
}

export async function POST(request: Request) {
  let payload: PdfPayload;
  let rawBody: string;

  try {
    rawBody = await request.text();
  } catch (error) {
    console.error("Failed to read request body for order-of-service PDF", error);
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  try {
    payload = JSON.parse(rawBody) as PdfPayload;
  } catch (error) {
    console.error("Failed to parse order-of-service PDF payload", error, rawBody);
    return NextResponse.json({ error: "Invalid JSON payload" }, { status: 400 });
  }

  if (!payload || !payload.title || !payload.title.trim() || !payload.faith) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const structure = Array.isArray(payload.structure)
    ? payload.structure.map((section) => ({
        title: section?.title ?? "Untitled section",
        description: section?.description ?? undefined,
        items: Array.isArray(section?.items)
          ? section.items.filter((item): item is string => typeof item === "string" && item.trim().length > 0)
          : undefined,
      }))
    : [];

  const lists = {
    readings: parseLines(payload.readings),
    music: parseLines(payload.music),
    eulogies: parseLines(payload.eulogies),
  };

  const theme = memorialThemes[Math.floor(Math.random() * memorialThemes.length)];

  let pdfBuffer: Uint8Array;
  try {
    pdfBuffer = await renderToBuffer(
      <MemorialDocument
        faith={payload.faith}
        faithLabel={payload.faithLabel}
        templateName={payload.templateName}
        templateSummary={payload.templateSummary}
        title={payload.title.trim()}
        notes={payload.notes?.trim()}
        structure={structure}
        lists={lists}
        theme={theme}
      />
    );
  } catch (error) {
    console.error("Failed to render order-of-service PDF", error);
    return NextResponse.json({ error: "pdf_generation_failed" }, { status: 500 });
  }

  const body = Buffer.from(pdfBuffer);

  return new NextResponse(body, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": "attachment; filename=order-of-service.pdf",
      "Content-Length": String(body.length),
    },
  });
}
