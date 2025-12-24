import React from "react";
import { NextResponse } from "next/server";
/* eslint-disable jsx-a11y/alt-text */
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  renderToBuffer,
  Svg,
  Path,
  Circle,
  Image,
} from "@react-pdf/renderer";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

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

type PosterImagePayload = {
  dataUrl: string;
  width: number;
  height: number;
  displayWidth?: number;
  displayHeight?: number;
};

const defaultSectionLayout: Required<Pick<TemplateSection, 'marginTop' | 'marginBottom' | 'padding' | 'gap' | 'fontScale'>> = {
  marginTop: 12,
  marginBottom: 10,
  padding: 12,
  gap: 6,
  fontScale: 1,
};

function clampNumber(value: number, min: number, max: number) {
  if (!Number.isFinite(value)) {
    return value;
  }
  if (value < min) {
    return min;
  }
  if (value > max) {
    return max;
  }
  return value;
}

function normalizeSectionLayout(section?: TemplateSection) {
  const sanitize = (input: number | undefined, fallback: number, min: number, max: number) => {
    if (typeof input !== 'number' || Number.isNaN(input)) {
      return fallback;
    }
    return clampNumber(input, min, max);
  };

  return {
    marginTop: sanitize(section?.marginTop, defaultSectionLayout.marginTop, 0, 72),
    marginBottom: sanitize(section?.marginBottom, defaultSectionLayout.marginBottom, 0, 72),
    padding: sanitize(section?.padding, defaultSectionLayout.padding, 0, 64),
    gap: sanitize(section?.gap, defaultSectionLayout.gap, 0, 32),
    fontScale: sanitize(section?.fontScale, defaultSectionLayout.fontScale, 0.5, 2),
  };
}

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
  honoreeName?: string;
  birthDate?: string;
  passingDate?: string;
  tributeSentence?: string;
  photoUrl?: string;
  posterImage?: PosterImagePayload;
  pdfTemplateId?: string;
};

type MemorialTemplate = {
  id: string;
  name: string;
  background: string;
  panelBackground: string;
  panelBorder: string;
  textColor: string;
  accent: string;
  secondary: string;
  heroBackground: string;
  heroBorder: string;
  ribbonColor: string;
  doveColor: string;
  heroVariant: "crest" | "ribbon" | "arch" | "noir";
  pattern: "soft-doves" | "silver-lilies" | "garden-arch" | "night-bloom";
  noteBackground: string;
  backgroundImage?: string;
  backgroundImageOpacity?: number;
};

const memorialTemplates: MemorialTemplate[] = [
  {
    id: "serene-gold",
    name: "Serene Gold Crest",
    background: "#f7f5f0",
    panelBackground: "#fffdfa",
    panelBorder: "#f2dcc0",
    textColor: "#3f2e29",
    accent: "#c47a08",
    secondary: "#69442c",
    heroBackground: "#ffffff",
    heroBorder: "#f5d5a1",
    ribbonColor: "#f0b429",
    doveColor: "#f4f0ea",
    heroVariant: "crest",
    pattern: "soft-doves",
    noteBackground: "#fff7ec",
  },
  {
    id: "lotus-mist",
    name: "Lotus Mist",
    background: "#fdf8f4",
    panelBackground: "#fffdf8",
    panelBorder: "#f7e6d7",
    textColor: "#412f24",
    accent: "#c97b4f",
    secondary: "#8d5c3b",
    heroBackground: "#ffffff",
    heroBorder: "#f6d9c0",
    ribbonColor: "#e9a96a",
    doveColor: "#fdf4ea",
    heroVariant: "crest",
    pattern: "soft-doves",
    noteBackground: "#fff7ef",
  },
  {
    id: "sage-halo",
    name: "Sage Halo",
    background: "#f4f7f3",
    panelBackground: "#ffffff",
    panelBorder: "#dce7d7",
    textColor: "#2e392f",
    accent: "#5f8365",
    secondary: "#6f8570",
    heroBackground: "#ffffff",
    heroBorder: "#cfe0d1",
    ribbonColor: "#5c7f66",
    doveColor: "#f8fbf7",
    heroVariant: "ribbon",
    pattern: "silver-lilies",
    noteBackground: "#eef5ed",
  },
  {
    id: "rose-dawn",
    name: "Rose Dawn",
    background: "#fff6f6",
    panelBackground: "#fffdfd",
    panelBorder: "#ffdce0",
    textColor: "#40232b",
    accent: "#c6566a",
    secondary: "#9f4a5b",
    heroBackground: "#ffffff",
    heroBorder: "#fed5dc",
    ribbonColor: "#d65c74",
    doveColor: "#fff1f3",
    heroVariant: "crest",
    pattern: "soft-doves",
    noteBackground: "#fff1f2",
  },
  {
    id: "azure-paritta",
    name: "Azure Paritta",
    background: "#eef3fb",
    panelBackground: "#ffffff",
    panelBorder: "#d5e1fb",
    textColor: "#1b273a",
    accent: "#4667b8",
    secondary: "#4b5f7d",
    heroBackground: "#ffffff",
    heroBorder: "#cdd9f4",
    ribbonColor: "#3856a6",
    doveColor: "#f6f9ff",
    heroVariant: "ribbon",
    pattern: "silver-lilies",
    noteBackground: "#f4f7ff",
  },
  {
    id: "celestial-lilies",
    name: "Celestial Lilies",
    background: "#e9edf4",
    panelBackground: "#f8fbff",
    panelBorder: "#d7e4fb",
    textColor: "#1e293b",
    accent: "#2f5993",
    secondary: "#475569",
    heroBackground: "#fefeff",
    heroBorder: "#cbd5f5",
    ribbonColor: "#1f365c",
    doveColor: "#ffffff",
    heroVariant: "ribbon",
    pattern: "silver-lilies",
    noteBackground: "#eef4ff",
  },
  {
    id: "onyx-arch",
    name: "Onyx Arch",
    background: "#101116",
    panelBackground: "#161821",
    panelBorder: "#2f3145",
    textColor: "#f4f4f0",
    accent: "#c0a368",
    secondary: "#ded5bb",
    heroBackground: "#1c1f2b",
    heroBorder: "#3b3f52",
    ribbonColor: "#d4b87a",
    doveColor: "#faf7f0",
    heroVariant: "arch",
    pattern: "garden-arch",
    noteBackground: "#151723",
  },
  {
    id: "noir-bloom",
    name: "Noir Bloom",
    background: "#070709",
    panelBackground: "#111115",
    panelBorder: "#2a2a36",
    textColor: "#f2f2f2",
    accent: "#f7f3e8",
    secondary: "#c1c3d5",
    heroBackground: "#0d0d11",
    heroBorder: "#30303c",
    ribbonColor: "#e3cfc0",
    doveColor: "#ffffff",
    heroVariant: "noir",
    pattern: "night-bloom",
    noteBackground: "#111115",
  },
  {
    id: "obsidian-parchment",
    name: "Obsidian Parchment",
    background: "#010101",
    panelBackground: "#0b0b0b",
    panelBorder: "#4b4b4b",
    textColor: "#f3f0ea",
    accent: "#f5d19c",
    secondary: "#d9c3a2",
    heroBackground: "#111111",
    heroBorder: "#5c4d3b",
    ribbonColor: "#c49a52",
    doveColor: "#fdf9f3",
    heroVariant: "noir",
    pattern: "night-bloom",
    noteBackground: "#0d0d0d",
    backgroundImage: "https://media-public.canva.com/Vxv0E/MAFjjxVxv0E/1/s.jpg",
    backgroundImageOpacity: 0.4,
  },
];

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: "Helvetica",
    position: "relative",
  },
  heroScript: {
    fontSize: 16,
    fontFamily: "Times-Italic",
    textAlign: "center",
  },
  heroTitle: {
    fontSize: 28,
    textAlign: "center",
    marginTop: 10,
    fontWeight: 700,
  },
  heroSubtitle: {
    fontSize: 12,
    textAlign: "center",
    marginTop: 6,
  },
  heroSummary: {
    fontSize: 11,
    textAlign: "center",
    marginTop: 4,
    lineHeight: 1.4,
  },
  heroBadge: {
    marginTop: 14,
    alignSelf: "center",
    paddingHorizontal: 18,
    paddingVertical: 6,
    borderRadius: 999,
    fontSize: 11,
    fontWeight: 600,
  },
  heroRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 12,
    gap: 8,
  },
  heroCircle: {
    width: 128,
    height: 128,
    borderRadius: 64,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
  },
  columnsWrap: {
    marginTop: 4,
    flexDirection: "row",
    gap: 14,
  },
  columnCard: {
    flex: 1,
    borderRadius: 26,
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
    marginTop: 22,
    borderRadius: 22,
    borderWidth: 1,
    padding: 18,
  },
  noteText: {
    fontSize: 11,
    lineHeight: 1.5,
    marginTop: 6,
  },
  posterWrapper: {
    borderWidth: 1,
    borderRadius: 28,
    padding: 18,
    marginBottom: 24,
    alignItems: "center",
  },
  posterCaption: {
    marginTop: 8,
    fontSize: 10,
    letterSpacing: 0.8,
    textTransform: "uppercase",
  },
  posterFallback: {
    borderWidth: 1,
    borderRadius: 28,
    padding: 24,
    marginBottom: 24,
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

function renderEntries(entries: string[], template: MemorialTemplate) {
  if (entries.length === 0) {
    return <Text style={[styles.bulletItem, { color: template.textColor }]}>-</Text>;
  }

  return (
    <View style={styles.bulletList}>
      {entries.map((entry, index) => (
        <Text key={`${entry}-${index}`} style={[styles.bulletItem, { color: template.textColor }]}>
          - {entry}
        </Text>
      ))}
    </View>
  );
}

function DecorativeLayer({ template }: { template: MemorialTemplate }) {
  switch (template.pattern) {
    case "soft-doves":
      return (
        <Svg
          style={{ position: "absolute", top: -10, right: -20, width: 240, height: 240, opacity: 0.25 }}
          viewBox="0 0 200 200"
        >
          <Path d="M40 150 C80 110 120 110 160 150" stroke={template.heroBorder} strokeWidth={8} fill="none" strokeLinecap="round" />
          <Path d="M30 130 C60 90 100 90 130 130" stroke={template.doveColor} strokeWidth={6} fill="none" strokeLinecap="round" />
          <Circle cx="150" cy="60" r="32" fill={template.doveColor} opacity="0.25" />
        </Svg>
      );
    case "silver-lilies":
      return (
        <Svg
          style={{ position: "absolute", bottom: 0, left: -10, width: 240, height: 220, opacity: 0.18 }}
          viewBox="0 0 200 200"
        >
          <Path d="M20 180 C60 140 140 220 180 180" stroke={template.heroBorder} strokeWidth={14} fill="none" />
          <Circle cx="70" cy="120" r="35" fill={template.doveColor} opacity="0.3" />
          <Circle cx="120" cy="80" r="22" fill={template.doveColor} opacity="0.25" />
        </Svg>
      );
    case "garden-arch":
      return (
        <Svg
          style={{ position: "absolute", top: -30, right: -60, width: 280, height: 320, opacity: 0.18 }}
          viewBox="0 0 200 200"
        >
          {[...Array(3)].map((_, index) => (
            <Path
              key={`arch-${index}`}
              d={`M${20 + index * 10} 200 Q100 ${-20 + index * 20} ${180 - index * 10} 200`}
              stroke={template.heroBorder}
              strokeWidth={6 - index}
              fill="none"
            />
          ))}
        </Svg>
      );
    case "night-bloom":
      return (
        <Svg
          style={{ position: "absolute", top: 0, left: 0, width: 300, height: 260, opacity: 0.25 }}
          viewBox="0 0 200 200"
        >
          <Path d="M0 150 C50 50 150 250 200 120" stroke={template.heroBorder} strokeWidth={12} fill="none" />
          <Circle cx="60" cy="60" r="26" fill={template.doveColor} opacity="0.35" />
          <Circle cx="150" cy="30" r="18" fill={template.doveColor} opacity="0.2" />
        </Svg>
      );
    default:
      return null;
  }
}

type HeroSectionProps = {
  template: MemorialTemplate;
  displayName: string;
  datesLine: string;
  epitaph: string;
  ceremonyTitle: string;
  photoUrl?: string;
  posterImage?: PosterImagePayload;
};

function HeroSection({ template, displayName, datesLine, epitaph, ceremonyTitle, photoUrl }: HeroSectionProps) {
  const initials = displayName
    .split(/\s+/)
    .filter(Boolean)
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase() || "FC";
  const picture = photoUrl?.trim().length ? photoUrl.trim() : null;
  const portrait = picture ? (
    <Image
      src={picture}
      style={{ width: 128, height: 128, borderRadius: 64, objectFit: "cover", borderWidth: 3, borderColor: template.heroBorder }}
    />
  ) : (
    <View style={[styles.heroCircle, { borderColor: template.accent, backgroundColor: template.doveColor }]}>
      <Text style={{ fontSize: 36, fontWeight: 600, color: template.accent }}>{initials}</Text>
    </View>
  );

  const subtitle = datesLine || ceremonyTitle;
  const summary = epitaph || ceremonyTitle;

  switch (template.heroVariant) {
    case "crest":
      return (
        <View>
          <Text style={[styles.heroScript, { color: template.secondary }]}>In loving memory of</Text>
          <View style={{ marginTop: 14, alignItems: "center" }}>
            {portrait}
            <Svg style={{ marginTop: -30 }} width="160" height="90" viewBox="0 0 200 110">
              <Path d="M20 80 C40 30 70 30 100 70 C130 30 160 30 180 80" stroke={template.heroBorder} strokeWidth={5} fill="none" />
              <Path d="M20 82 C40 60 70 60 90 78" stroke={template.accent} strokeWidth={3} fill="none" />
              <Path d="M110 78 C130 60 160 60 180 82" stroke={template.accent} strokeWidth={3} fill="none" />
            </Svg>
          </View>
          <Text style={[styles.heroTitle, { color: template.textColor }]}>{displayName}</Text>
          {subtitle ? <Text style={[styles.heroSubtitle, { color: template.secondary }]}>{subtitle}</Text> : null}
          <Text style={[styles.heroSummary, { color: template.textColor }]}>{summary}</Text>
          <Text style={[styles.heroBadge, { backgroundColor: template.ribbonColor, color: template.background }]}>Rest in Peace</Text>
        </View>
      );
    case "ribbon":
      return (
        <View>
          <Text style={[styles.heroScript, { color: template.accent }]}>In loving memory</Text>
          <View style={styles.heroRow}>
            {portrait}
            <View>
              <Text style={[styles.heroTitle, { color: template.textColor }]}>{displayName}</Text>
              {subtitle ? <Text style={[styles.heroSubtitle, { color: template.secondary }]}>{subtitle}</Text> : null}
            </View>
          </View>
          <View
            style={{
              marginTop: 14,
              alignSelf: "center",
              paddingHorizontal: 28,
              paddingVertical: 8,
              borderRadius: 999,
              backgroundColor: template.ribbonColor,
            }}
          >
            <Text style={{ color: template.background, fontSize: 12, fontWeight: 600 }}>Rest in Peace</Text>
          </View>
          <Text style={[styles.heroSummary, { color: template.textColor }]}>{summary}</Text>
        </View>
      );
    case "arch":
      return (
        <View>
          <Text style={[styles.heroScript, { color: template.secondary }]}>Tribute service</Text>
          <View style={{ marginTop: 12, alignItems: "center" }}>
            <Svg width="220" height="200" viewBox="0 0 200 200">
              <Path d="M30 190 Q100 20 170 190" stroke={template.accent} strokeWidth="6" fill="none" />
              <Path d="M50 190 Q100 60 150 190" stroke={template.secondary} strokeWidth="3" fill="none" />
              <Circle cx="100" cy="70" r="38" fill={template.heroBorder} opacity="0.45" />
            </Svg>
            {portrait}
            <Text style={[styles.heroTitle, { color: template.textColor, marginTop: 12 }]}>{displayName}</Text>
            {subtitle ? <Text style={[styles.heroSubtitle, { color: template.secondary }]}>{subtitle}</Text> : null}
          </View>
          <Text style={[styles.heroSummary, { color: template.textColor }]}>{summary}</Text>
        </View>
      );
    case "noir":
    default:
      return (
        <View>
          <Text style={[styles.heroScript, { color: template.secondary }]}>Forever cherished</Text>
          <View style={{ marginTop: 12, alignItems: "center" }}>
            {portrait}
            <Svg width="200" height="120" viewBox="0 0 200 120">
              <Path d="M20 90 C60 10 140 10 180 90" stroke={template.secondary} strokeWidth="5" fill="none" />
              <Circle cx="60" cy="40" r="26" fill={template.doveColor} opacity="0.4" />
              <Circle cx="140" cy="32" r="22" fill={template.doveColor} opacity="0.3" />
            </Svg>
          </View>
          <Text style={[styles.heroTitle, { color: template.textColor }]}>{displayName}</Text>
          {subtitle ? <Text style={[styles.heroSubtitle, { color: template.secondary }]}>{subtitle}</Text> : null}
          <Text style={[styles.heroSummary, { color: template.textColor }]}>{summary}</Text>
          <View style={{ marginTop: 12, alignItems: "center" }}>
            <View style={{ borderTopWidth: 1, borderColor: template.secondary, width: 160 }} />
          </View>
        </View>
      );
  }
}

type PosterSectionProps = {
  template: MemorialTemplate;
  displayName: string;
  datesLine: string;
  epitaph: string;
  ceremonyTitle: string;
  photoUrl?: string;
  posterImage?: PosterImagePayload;
};

function PosterSection({ template, displayName, datesLine, epitaph, ceremonyTitle, photoUrl, posterImage }: PosterSectionProps) {
  const hasPosterImage = Boolean(posterImage && posterImage.dataUrl && posterImage.width > 0 && posterImage.height > 0);
  if (hasPosterImage && posterImage) {
    const baseWidth = posterImage.displayWidth ?? posterImage.width;
    const baseHeight = posterImage.displayHeight ?? posterImage.height;
    const fallbackAspect = posterImage.width > 0 ? posterImage.height / posterImage.width : 1;
    const previewWidth = baseWidth > 0 ? baseWidth : posterImage.width;
    const previewHeight = baseHeight > 0 ? baseHeight : previewWidth * fallbackAspect;
    const PX_TO_PT = 72 / 96;
    const rawWidth = Math.max(1, previewWidth * PX_TO_PT);
    const rawHeight = Math.max(1, previewHeight * PX_TO_PT);
    const pageMaxWidth = 520;
    const scale = rawWidth > pageMaxWidth ? pageMaxWidth / rawWidth : 1;
    const posterWidth = rawWidth * scale;
    const posterHeight = rawHeight * scale;
    return (
      <View
        style={[
          styles.posterWrapper,
          { borderColor: template.panelBorder, backgroundColor: template.panelBackground },
        ]}
      >
        <Image
          src={posterImage.dataUrl}
          style={{
            width: posterWidth,
            height: posterHeight,
            borderRadius: 28,
            borderWidth: 4,
            borderColor: template.panelBorder,
          }}
        />
      </View>
    );
  }

  return (
    <View
      style={[
        styles.posterFallback,
        { backgroundColor: template.heroBackground, borderColor: template.heroBorder },
      ]}
    >
      <HeroSection
        template={template}
        displayName={displayName}
        datesLine={datesLine}
        epitaph={epitaph}
        ceremonyTitle={ceremonyTitle}
        photoUrl={photoUrl}
      />
    </View>
  );
}

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
  template: MemorialTemplate;
  honoreeName?: string;
  birthDate?: string;
  passingDate?: string;
  tributeSentence?: string;
  photoUrl?: string;
  posterImage?: PosterImagePayload;
};

function MemorialDocument({
  faith,
  faithLabel,
  templateName,
  templateSummary,
  title,
  notes,
  structure,
  lists,
  template,
  honoreeName,
  birthDate,
  passingDate,
  tributeSentence,
  photoUrl,
  posterImage,
}: OrderDocumentProps) {
  const displayName = honoreeName?.trim().length ? honoreeName.trim() : title;
  const datesLine = [birthDate?.trim(), passingDate?.trim()].filter(Boolean).join(" ? ");
  const epitaph =
    tributeSentence?.trim().length ? tributeSentence.trim() : templateSummary ?? "Those we love remain in our hearts.";
  const ceremonyTitle = templateName ?? `${faithLabel ?? faith} service`;
  const noteLine =
    notes?.split(/\r?\n/).find((line) => line.trim().length > 0) ??
    "Coordinators can add livestream, CSR impact, or ritual reminders here.";
  const columnStyles =
    template.heroVariant === "arch"
      ? [styles.columnsWrap, { flexDirection: "column" as const }]
      : [styles.columnsWrap];

  return (
    <Document>
      <Page size="A4" style={[styles.page, { backgroundColor: template.background }]}>
        <DecorativeLayer template={template} />
        <PosterSection
          template={template}
          displayName={displayName}
          datesLine={datesLine}
          epitaph={epitaph}
          ceremonyTitle={ceremonyTitle}
          photoUrl={photoUrl}
          posterImage={posterImage}
        />

        <View style={columnStyles}>
          <View
            style={[
              styles.columnCard,
              { backgroundColor: template.panelBackground, borderColor: template.panelBorder, marginBottom: template.heroVariant === "arch" ? 12 : 0 },
            ]}
          >
            <Text style={[styles.columnTitle, { color: template.accent }]}>Ceremony flow</Text>
            {structure.length === 0 && (
              <Text style={[styles.timelineDescription, { marginTop: 10, color: template.textColor }]}>No sections added yet.</Text>
            )}
            {structure.length > 0 &&
              structure.map((section, index) => {
                const layout = normalizeSectionLayout(section);
                const bulletSpacing = Math.max(layout.gap, 0);
                return (
                  <View
                    key={`${section.title}-${index}`}
                    style={[
                      styles.timelineItem,
                      {
                        marginTop: layout.marginTop,
                        marginBottom: layout.marginBottom,
                        padding: layout.padding,
                      },
                    ]}
                  >
                    <Text
                      style={[styles.timelineHeading, { color: template.textColor, fontSize: 13 * layout.fontScale }]}
                    >
                      {section.title}
                    </Text>
                    {section.description ? (
                      <Text
                        style={[
                          styles.timelineDescription,
                          { color: template.secondary, fontSize: 11 * layout.fontScale },
                        ]}
                      >
                        {section.description}
                      </Text>
                    ) : null}
                    {section.items && section.items.length > 0 ? (
                      <View style={[styles.bulletList, { marginTop: bulletSpacing }]}>
                        {section.items.map((item, itemIndex) => (
                          <Text
                            key={`${item}-${itemIndex}`}
                            style={[
                              styles.bulletItem,
                              {
                                color: template.textColor,
                                fontSize: 11 * layout.fontScale,
                                marginBottom: bulletSpacing / 2,
                              },
                            ]}
                          >
                            - {item}
                          </Text>
                        ))}
                      </View>
                    ) : null}
                  </View>
                );
              })}
          </View>

          <View style={[styles.columnCard, { backgroundColor: template.panelBackground, borderColor: template.panelBorder }]}>
            <Text style={[styles.columnTitle, { color: template.accent }]}>Readings & tributes</Text>
            <View style={styles.listBlock}>
              <Text style={[styles.timelineHeading, { color: template.textColor }]}>Readings and scripture</Text>
              {renderEntries(lists.readings, template)}
            </View>
            <View style={styles.listBlock}>
              <Text style={[styles.timelineHeading, { color: template.textColor }]}>Music, hymns, and chants</Text>
              {renderEntries(lists.music, template)}
            </View>
            <View style={styles.listBlock}>
              <Text style={[styles.timelineHeading, { color: template.textColor }]}>Eulogies and reflections</Text>
              {renderEntries(lists.eulogies, template)}
            </View>
          </View>
        </View>

        <View
          style={[
            styles.notesBlock,
            { backgroundColor: template.noteBackground, borderColor: template.panelBorder },
          ]}
        >
          <Text style={[styles.columnTitle, { color: template.accent }]}>Additional notes</Text>
          <Text style={[styles.noteText, { color: template.textColor }]}>{noteLine}</Text>
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
        ...normalizeSectionLayout(section ?? undefined),
      }))
    : [];

  const lists = {
    readings: parseLines(payload.readings),
    music: parseLines(payload.music),
    eulogies: parseLines(payload.eulogies),
  };

  const preferredTemplateIds = [
    "serene-gold",
    "lotus-mist",
    "sage-halo",
    "rose-dawn",
    "azure-paritta",
    "celestial-lilies",
  ];
  const preferredTemplates = memorialTemplates.filter((entry) => preferredTemplateIds.includes(entry.id));
  const templatePool = preferredTemplates.length > 0 ? preferredTemplates : memorialTemplates;
  const requestedTemplate = payload.pdfTemplateId
    ? memorialTemplates.find((entry) => entry.id === payload.pdfTemplateId)
    : undefined;
  const template = requestedTemplate ?? templatePool[Math.floor(Math.random() * templatePool.length)];

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
        template={template}
        honoreeName={payload.honoreeName?.trim()}
        birthDate={payload.birthDate?.trim()}
        passingDate={payload.passingDate?.trim()}
        tributeSentence={payload.tributeSentence?.trim()}
        photoUrl={payload.photoUrl?.trim()}
        posterImage={payload.posterImage}
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
