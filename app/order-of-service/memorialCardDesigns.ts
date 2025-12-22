/* eslint-disable @next/next/no-img-element */
export type FaithKey = "christianity" | "buddhism" | "hinduism" | "interfaith";

export type MemorialCardVariant =
  | "christian-peach-crest"
  | "christian-blue-dove"
  | "buddhist-ornate-gold"
  | "buddhist-minimal-gold"
  | "hindu-sunrise-banner"
  | "hindu-wreath-classic"
  | "interfaith-noir-arch"
  | "interfaith-sky-doves";

export type CardTheme = {
  background: string;
  text: string;
  accent: string;
};

type DownloadSize = {
  width: number;
  height: number;
};

export type MemorialCardDesign = {
  id: MemorialCardVariant;
  name: string;
  description: string;
  downloadSize: DownloadSize;
  defaultTheme: CardTheme;
};

const variantCatalog: Record<MemorialCardVariant, MemorialCardDesign> = {
  "christian-peach-crest": {
    id: "christian-peach-crest",
    name: "Peach Floral Crest",
    description: "Soft peach watercolor background with gold crest and script typography.",
    downloadSize: { width: 665, height: 960 },
    defaultTheme: { background: "#f8e7e3", text: "#1c1c1c", accent: "#d6b56b" },
  },
  "christian-blue-dove": {
    id: "christian-blue-dove",
    name: "Blue Dove Cameo",
    description: "Blue watercolor cameo with dove illustration and floral overlay.",
    downloadSize: { width: 665, height: 960 },
    defaultTheme: { background: "#cfe9f8", text: "#1b1b1b", accent: "#d6b56b" },
  },
  "buddhist-ornate-gold": {
    id: "buddhist-ornate-gold",
    name: "Ornate Lotus Poster",
    description: "Tabletop parchment layout with ornate medallion and ceremony summary.",
    downloadSize: { width: 665, height: 960 },
    defaultTheme: { background: "#fdfaf4", text: "#1a1a1a", accent: "#a57a2a" },
  },
  "buddhist-minimal-gold": {
    id: "buddhist-minimal-gold",
    name: "Minimal Gold Circle",
    description: "Clean neutral poster with ornate gold ring and uppercase typography.",
    downloadSize: { width: 665, height: 960 },
    defaultTheme: { background: "#efefef", text: "#1b1b1b", accent: "#a57a2a" },
  },
  "hindu-sunrise-banner": {
    id: "hindu-sunrise-banner",
    name: "Sunrise Tribute",
    description: "Sky gradient backdrop, portrait vignette, and saffron name banner.",
    downloadSize: { width: 665, height: 960 },
    defaultTheme: { background: "#cfe3ef", text: "#222222", accent: "#caa23a" },
  },
  "hindu-wreath-classic": {
    id: "hindu-wreath-classic",
    name: "Wreath Celebration",
    description: "Delicate wreath with gold script and uppercase service details.",
    downloadSize: { width: 665, height: 960 },
    defaultTheme: { background: "#f7f7f6", text: "#2a2a2a", accent: "#d6b56b" },
  },
  "interfaith-noir-arch": {
    id: "interfaith-noir-arch",
    name: "Noir Arch Tribute",
    description: "Deep navy arch, cloud florals, and glowing gold script.",
    downloadSize: { width: 665, height: 960 },
    defaultTheme: { background: "#071224", text: "#f6f6f6", accent: "#d4b06a" },
  },
  "interfaith-sky-doves": {
    id: "interfaith-sky-doves",
    name: "Skyline Doves",
    description: "Sky photo background with soaring doves and bold sans serif text.",
    downloadSize: { width: 665, height: 960 },
    defaultTheme: { background: "#cde2f0", text: "#0f0f0f", accent: "#d4b06a" },
  },
};

export const memorialCardDesignsByFaith: Record<FaithKey, MemorialCardDesign[]> = {
  christianity: [variantCatalog["christian-peach-crest"], variantCatalog["christian-blue-dove"]],
  buddhism: [variantCatalog["buddhist-ornate-gold"], variantCatalog["buddhist-minimal-gold"]],
  hinduism: [variantCatalog["hindu-sunrise-banner"], variantCatalog["hindu-wreath-classic"]],
  interfaith: [variantCatalog["interfaith-noir-arch"], variantCatalog["interfaith-sky-doves"]],
};

export function getDefaultDesignForFaith(faith: FaithKey | "" | null) {
  if (!faith) {
    return null;
  }
  return memorialCardDesignsByFaith[faith]?.[0]?.id ?? null;
}

export function getMemorialDesignByVariant(variant: MemorialCardVariant | null) {
  if (!variant) {
    return null;
  }
  return variantCatalog[variant] ?? null;
}
