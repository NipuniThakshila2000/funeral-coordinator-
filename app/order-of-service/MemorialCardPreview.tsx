/* eslint-disable @next/next/no-img-element */
"use client";

import { forwardRef, useCallback, useImperativeHandle, useMemo, useRef } from "react";
import type { CSSProperties } from "react";
import {
  Abril_Fatface,
  Alex_Brush,
  Allura,
  Cardo,
  Cinzel,
  Cormorant_Garamond,
  Dancing_Script,
  Great_Vibes,
  IBM_Plex_Sans,
  Inter,
  Libre_Baskerville,
  Lora,
  Manrope,
  Marck_Script,
  Merriweather,
  Montserrat,
  Noto_Serif,
  Nunito,
  Open_Sans,
  Parisienne,
  Petit_Formal_Script,
  Playfair_Display,
  Poppins,
  Raleway,
  Sacramento,
  Satisfy,
  Source_Sans_3,
  Spectral,
  Tangerine,
  Work_Sans,
} from "next/font/google";

import { getMemorialDesignByVariant, type CardTheme, type MemorialCardVariant } from "./memorialCardDesigns";
import { renderMemorialCardVariant } from "./memorialCardVariantComponents";

type FontClasses = {
  script: string;
  serif: string;
  sans: string;
};

type FontFamilies = {
  script: string;
  serif: string;
  sans: string;
};

export type MemorialCardImageCapture = {
  dataUrl: string;
  width: number;
  height: number;
  displayWidth: number;
  displayHeight: number;
};

export type MemorialCardPreviewHandle = {
  download: () => Promise<void>;
  captureImage: () => Promise<MemorialCardImageCapture>;
};

export type MemorialCardPreviewProps = {
  variant: MemorialCardVariant | null;
  name: string;
  birthDate: string;
  passingDate: string;
  tributeSentence: string;
  title: string;
  readings: string;
  music: string;
  eulogies: string;
  notes: string;
  photoUrl: string;
  themeOverrides?: Partial<CardTheme>;
  fontSelection?: FontSelection;
  typeScale?: number;
  lineHeight?: number;
  className?: string;
  previewWidth?: number;
};

type TemplateContent = {
  titleLine: string;
  subtitleLine: string;
  name: string;
  dates: string;
  tribute: string;
  body: string;
  service: string;
  footer: string;
  notes: string;
  photoUrl: string;
};

const scriptGreatVibes = Great_Vibes({ subsets: ['latin'], weight: '400' });
const scriptParisienne = Parisienne({ subsets: ['latin'], weight: '400' });
const scriptDancingScript = Dancing_Script({ subsets: ['latin'], weight: ['400', '500', '600', '700'] });
const scriptSacramento = Sacramento({ subsets: ['latin'], weight: '400' });
const scriptAlexBrush = Alex_Brush({ subsets: ['latin'], weight: '400' });
const scriptMarck = Marck_Script({ subsets: ['latin'], weight: '400' });
const scriptAllura = Allura({ subsets: ['latin'], weight: '400' });
const scriptPetitFormal = Petit_Formal_Script({ subsets: ['latin'], weight: '400' });
const scriptTangerine = Tangerine({ subsets: ['latin'], weight: ['400', '700'] });
const scriptSatisfy = Satisfy({ subsets: ['latin'], weight: '400' });
const serifPlayfair = Playfair_Display({ subsets: ['latin'], weight: ['400', '500', '600'] });
const serifCinzel = Cinzel({ subsets: ['latin'], weight: ['400', '500', '600'] });
const serifLora = Lora({ subsets: ['latin'], weight: ['400', '500', '600', '700'] });
const serifCormorant = Cormorant_Garamond({ subsets: ['latin'], weight: ['400', '500', '600', '700'] });
const serifMerriweather = Merriweather({ subsets: ['latin'], weight: ['300', '400', '700', '900'] });
const serifNoto = Noto_Serif({ subsets: ['latin'], weight: ['400', '500', '600', '700'] });
const serifCardo = Cardo({ subsets: ['latin'], weight: ['400', '700'] });
const serifAbril = Abril_Fatface({ subsets: ['latin'], weight: '400' });
const serifLibreBaskerville = Libre_Baskerville({ subsets: ['latin'], weight: ['400', '700'] });
const serifSpectral = Spectral({ subsets: ['latin'], weight: ['400', '500', '600', '700'] });
const sansInter = Inter({ subsets: ['latin'], weight: ['400', '500', '600'] });
const sansSourceSans = Source_Sans_3({ subsets: ['latin'], weight: ['400', '600'] });
const sansIbmPlex = IBM_Plex_Sans({ subsets: ['latin'], weight: ['400', '500', '600', '700'] });
const sansNunito = Nunito({ subsets: ['latin'], weight: ['400', '500', '600', '700'] });
const sansOpenSans = Open_Sans({ subsets: ['latin'], weight: ['400', '500', '600', '700'] });
const sansPoppins = Poppins({ subsets: ['latin'], weight: ['400', '500', '600', '700'] });
const sansMontserrat = Montserrat({ subsets: ['latin'], weight: ['400', '500', '600', '700'] });
const sansRaleway = Raleway({ subsets: ['latin'], weight: ['400', '500', '600', '700'] });
const sansWorkSans = Work_Sans({ subsets: ['latin'], weight: ['400', '500', '600', '700'] });
const sansManrope = Manrope({ subsets: ['latin'], weight: ['400', '500', '600', '700'] });

const scriptFontRegistry = {
  "great-vibes": { label: "Great Vibes", font: scriptGreatVibes },
  parisienne: { label: "Parisienne", font: scriptParisienne },
  "dancing-script": { label: "Dancing Script", font: scriptDancingScript },
  sacramento: { label: "Sacramento", font: scriptSacramento },
  "alex-brush": { label: "Alex Brush", font: scriptAlexBrush },
  "marck-script": { label: "Marck Script", font: scriptMarck },
  allura: { label: "Allura", font: scriptAllura },
  "petit-formal": { label: "Petit Formal Script", font: scriptPetitFormal },
  tangerine: { label: "Tangerine", font: scriptTangerine },
  satisfy: { label: "Satisfy", font: scriptSatisfy },
} as const;

const serifFontRegistry = {
  playfair: { label: "Playfair Display", font: serifPlayfair },
  cinzel: { label: "Cinzel", font: serifCinzel },
  lora: { label: "Lora", font: serifLora },
  "cormorant-garamond": { label: "Cormorant Garamond", font: serifCormorant },
  merriweather: { label: "Merriweather", font: serifMerriweather },
  "noto-serif": { label: "Noto Serif", font: serifNoto },
  cardo: { label: "Cardo", font: serifCardo },
  "abril-fatface": { label: "Abril Fatface", font: serifAbril },
  "libre-baskerville": { label: "Libre Baskerville", font: serifLibreBaskerville },
  spectral: { label: "Spectral", font: serifSpectral },
} as const;

const sansFontRegistry = {
  inter: { label: "Inter", font: sansInter },
  "source-sans": { label: "Source Sans 3", font: sansSourceSans },
  "ibm-plex-sans": { label: "IBM Plex Sans", font: sansIbmPlex },
  nunito: { label: "Nunito", font: sansNunito },
  "open-sans": { label: "Open Sans", font: sansOpenSans },
  poppins: { label: "Poppins", font: sansPoppins },
  montserrat: { label: "Montserrat", font: sansMontserrat },
  raleway: { label: "Raleway", font: sansRaleway },
  "work-sans": { label: "Work Sans", font: sansWorkSans },
  manrope: { label: "Manrope", font: sansManrope },
} as const;

export const SCRIPT_FONT_OPTIONS = Object.entries(scriptFontRegistry).map(([value, meta]) => ({ value, label: meta.label }));
export const SERIF_FONT_OPTIONS = Object.entries(serifFontRegistry).map(([value, meta]) => ({ value, label: meta.label }));
export const SANS_FONT_OPTIONS = Object.entries(sansFontRegistry).map(([value, meta]) => ({ value, label: meta.label }));

export type FontSelection = {
  script: keyof typeof scriptFontRegistry;
  serif: keyof typeof serifFontRegistry;
  sans: keyof typeof sansFontRegistry;
};

const DEFAULT_FONT_SELECTION: FontSelection = {
  script: "great-vibes",
  serif: 'playfair',
  sans: 'inter',
};

const FALLBACK_PHOTO = "/memorial-card/portrait-placeholder.svg";


async function blobToDataUrl(blob: Blob, errorMessage = "Could not convert blob") {
  return await new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === "string") {
        resolve(reader.result);
      } else {
        reject(new Error(errorMessage));
      }
    };
    reader.onerror = () => reject(new Error(errorMessage));
    reader.readAsDataURL(blob);
  });
}

function formatDate(value: string): string | null {
  if (!value) return null;
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) {
    return null;
  }
  return new Intl.DateTimeFormat("en-US", { month: "long", day: "2-digit", year: "numeric" }).format(parsed);
}

function formatDateRange(start?: string, end?: string) {
  const formattedStart = start ? formatDate(start) : null;
  const formattedEnd = end ? formatDate(end) : null;
  if (formattedStart && formattedEnd) {
    return `${formattedStart} - ${formattedEnd}`;
  }
  return formattedStart ?? formattedEnd;
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .replace(/--+/g, "-")
    .trim();
}

function waitForImageLoad(img: HTMLImageElement) {
  return new Promise<void>((resolve) => {
    if (img.complete && img.naturalWidth > 0) {
      resolve();
      return;
    }
    const done = () => resolve();
    img.onload = done;
    img.onerror = done;
  });
}

async function inlinePortraitSource(card: HTMLElement) {
  const targets = Array.from(
    card.querySelectorAll<HTMLElement>("img.memorial-card-portrait, .portrait, .photo, .photo-ring")
  );
  if (targets.length === 0) {
    return;
  }
  for (const target of targets) {
    await inlinePortraitElement(target);
  }
}

async function inlinePortraitElement(target: HTMLElement) {
  const rawSrc = target instanceof HTMLImageElement ? target.getAttribute("src") : target.style.backgroundImage;
  if (!rawSrc) return;

  const needsExtraction = rawSrc.startsWith("url(");
  if (!needsExtraction && rawSrc.startsWith("data:")) {
    if (target instanceof HTMLImageElement) {
      await waitForImageLoad(target);
    }
    return;
  }

  let absoluteSrc = rawSrc;
  if (needsExtraction) {
    const match = rawSrc.match(/url\((.*)\)/);
    if (!match) return;
    absoluteSrc = match[1].replace(/"/g, "").replace(/'/g, "");
  }
  if (!absoluteSrc) return;

  if (!absoluteSrc.startsWith("http") && !absoluteSrc.startsWith("data:")) {
    absoluteSrc = `${window.location.origin}${absoluteSrc.startsWith("/") ? absoluteSrc : `/${absoluteSrc}`}`;
  }
  if (absoluteSrc.startsWith("data:")) {
    if (target instanceof HTMLImageElement) {
      await waitForImageLoad(target);
    }
    return;
  }

  try {
    const response = await fetch(absoluteSrc, { mode: "cors" });
    if (!response.ok) {
      throw new Error("Portrait response was not ok");
    }
    const blob = await response.blob();
    const dataUrl = await blobToDataUrl(blob, "Could not read portrait");
    if (target instanceof HTMLImageElement) {
      target.setAttribute("src", dataUrl);
      await waitForImageLoad(target);
    } else {
      target.style.backgroundImage = `url(${dataUrl})`;
    }
  } catch (error) {
    if (target instanceof HTMLImageElement) {
      target.setAttribute("src", FALLBACK_PHOTO);
      await waitForImageLoad(target);
    } else {
      target.style.backgroundImage = `url(${FALLBACK_PHOTO})`;
    }
    console.warn("Could not inline portrait for download", error);
  }
}

const fontDataUrlCache = new Map<string, string>();
let documentStylesCache: string | null = null;
let documentStylesPromise: Promise<string> | null = null;

async function inlineExternalFontSources(cssText: string) {
  if (typeof window === "undefined" || !cssText) {
    return cssText;
  }
  const FONT_URL_REGEX = /url\((['"\s]?)(https?:[^)]+?\.(?:woff2?|woff|ttf|otf)(?:\?[^)"']*)?)\1\)/gi;
  const fontUrls = new Set<string>();
  let match: RegExpExecArray | null;
  while ((match = FONT_URL_REGEX.exec(cssText)) !== null) {
    const url = match[2];
    if (url) {
      fontUrls.add(url);
    }
  }
  if (!fontUrls.size) {
    return cssText;
  }
  await Promise.all(
    Array.from(fontUrls).map(async (url) => {
      if (fontDataUrlCache.has(url)) {
        return;
      }
      try {
        const response = await fetch(url, { mode: "cors" });
        if (!response.ok) {
          throw new Error("Font response was not ok");
        }
        const blob = await response.blob();
        const dataUrl = await blobToDataUrl(blob, "Could not inline font");
        fontDataUrlCache.set(url, dataUrl);
      } catch (error) {
        console.warn("Could not inline font for memorial card download", url, error);
      }
    })
  );
  return cssText.replace(FONT_URL_REGEX, (fullMatch, quote, url) => {
    if (!url) {
      return fullMatch;
    }
    const dataUrl = fontDataUrlCache.get(url);
    if (!dataUrl) {
      return fullMatch;
    }
    const quoteChar = quote?.trim() ?? "";
    return `url(${quoteChar}${dataUrl}${quoteChar})`;
  });
}

async function getDocumentStylesForDownload() {
  if (typeof document === "undefined") {
    return "";
  }
  if (documentStylesCache) {
    return documentStylesCache;
  }
  if (documentStylesPromise) {
    return documentStylesPromise;
  }
  const cssChunks: string[] = [];
  const appendCss = (value?: string | null) => {
    if (value && value.trim()) {
      cssChunks.push(value);
    }
  };
  documentStylesPromise = (async () => {
    for (const sheet of Array.from(document.styleSheets)) {
      const cssSheet = sheet as CSSStyleSheet;
      try {
        const rules = cssSheet.cssRules;
        if (!rules) {
          continue;
        }
        for (const rule of Array.from(rules)) {
          const cssText = (rule as CSSStyleRule)?.cssText;
          if (cssText) {
            cssChunks.push(cssText);
          }
        }
        continue;
      } catch (error) {
        console.warn("Skipping stylesheet while preparing memorial card download", error);
        appendCss((cssSheet.ownerNode as HTMLElement | null)?.textContent);
      }
    }
    for (const inlineStyle of Array.from(document.querySelectorAll<HTMLStyleElement>("style"))) {
      appendCss(inlineStyle.textContent);
    }
    const newlineChar = '\n';
    const origin = typeof window !== 'undefined' ? window.location.origin : '';
    const cssText = cssChunks.join(newlineChar);
    const normalizedCss = origin
      ? cssText.replace(/url\((['"\s]?)(\/[^)]+)\1\)/g, (match, quote, pathSegment) => {
          if (!pathSegment.startsWith('http')) {
            const normalized = `${origin}${pathSegment}`;
            const q = quote || '';
            return `url(${q}${normalized}${q})`;
          }
          return match;
        })
      : cssText;
    const cssWithFonts = await inlineExternalFontSources(normalizedCss);
    documentStylesCache = cssWithFonts;
    return cssWithFonts;
  })();
  return documentStylesPromise;
}

async function prependDocumentStylesForDownload(target: HTMLElement) {
  if (typeof document === "undefined") {
    return;
  }
  const cssText = await getDocumentStylesForDownload();
  if (!cssText) {
    return;
  }
  const styleElement = document.createElement("style");
  styleElement.setAttribute("data-memorial-download-styles", "true");
  styleElement.textContent = cssText;
  target.insertBefore(styleElement, target.firstChild);
}

function prependFontClassStyles(target: HTMLElement, fontClasses: FontClasses, fontFamilies: FontFamilies) {
  if (typeof document === "undefined") {
    return;
  }
  if (!fontClasses || !fontFamilies) {
    return;
  }
  const styleElement = document.createElement("style");
  styleElement.setAttribute("data-memorial-font-classes", "true");
  styleElement.textContent = `.${fontClasses.script} { font-family: ${fontFamilies.script}; }
.${fontClasses.serif} { font-family: ${fontFamilies.serif}; }
.${fontClasses.sans} { font-family: ${fontFamilies.sans}; }`;
  target.insertBefore(styleElement, target.firstChild);
}

async function convertNodeToPng(card: HTMLElement, width: number, height: number) {
  const serializer = new XMLSerializer();
  const serialized = serializer.serializeToString(card);
  const svg = `<?xml version="1.0" encoding="UTF-8"?>
    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
      <foreignObject width="100%" height="100%">
        ${serialized}
      </foreignObject>
    </svg>`;
  const svgUrl = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
  const image = await loadImageFromUrl(svgUrl);
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    throw new Error("Could not get canvas context");
  }
  ctx.drawImage(image, 0, 0, width, height);
  return await new Promise<Blob>((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (!blob) {
        reject(new Error("Could not export PNG"));
        return;
      }
      resolve(blob);
    }, "image/png");
  });
}

async function convertNodeToJpeg(card: HTMLElement, width: number, height: number) {
  const pngBlob = await convertNodeToPng(card, width, height);
  const pngUrl = URL.createObjectURL(pngBlob);
  try {
    const image = await loadImageFromUrl(pngUrl);
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      throw new Error("Could not get canvas context");
    }
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, width, height);
    ctx.drawImage(image, 0, 0, width, height);
    return await new Promise<Blob>((resolve, reject) => {
      canvas.toBlob((blob) => {
        if (!blob) {
          reject(new Error("Could not export JPG"));
          return;
        }
        resolve(blob);
      }, "image/jpeg", 0.92);
    });
  } finally {
    URL.revokeObjectURL(pngUrl);
  }
}

function loadImageFromUrl(url: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image();
    image.crossOrigin = "anonymous";
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error("Could not render SVG"));
    image.src = url;
  });
}

function buildTemplateContent(props: MemorialCardPreviewProps): TemplateContent {
  const displayName = props.name?.trim() || "Olivia Wilson";
  const displayDates = formatDateRange(props.birthDate, props.passingDate) ?? "March 03, 1950 - November 22, 2022";
  const tribute = props.tributeSentence?.trim() || "Beloved wife, mother and grandmother";
  const titleLine = props.title?.trim() || "In loving memory of";
  const subtitleLine = props.readings?.split(/\r?\n/)[0]?.trim() || tribute;
  const body = props.readings?.trim() || tribute;
  const service = props.music?.trim() || "";
  const footer = props.notes?.trim() || props.eulogies?.trim() || "";
  const notes = props.eulogies?.trim() || "";
  const photoUrl = props.photoUrl?.trim() || FALLBACK_PHOTO;
  return {
    titleLine,
    subtitleLine,
    name: displayName,
    dates: displayDates,
    tribute,
    body,
    service,
    footer,
    notes,
    photoUrl,
  };
}

export const MemorialCardPreview = forwardRef<MemorialCardPreviewHandle, MemorialCardPreviewProps>(
  function MemorialCardPreview(props, ref) {
    const cardRef = useRef<HTMLDivElement | null>(null);
    const data = buildTemplateContent(props);
    const designMeta = getMemorialDesignByVariant(props.variant);
    const selection = props.fontSelection ?? DEFAULT_FONT_SELECTION;
    const scriptFontEntry = scriptFontRegistry[selection.script] ?? scriptFontRegistry["great-vibes"];
    const scriptFontClass = scriptFontEntry.font.className;
    const scriptFontFamily = scriptFontEntry.font.style.fontFamily;
    const serifFontEntry = serifFontRegistry[selection.serif] ?? serifFontRegistry.playfair;
    const serifFontClass = serifFontEntry.font.className;
    const serifFontFamily = serifFontEntry.font.style.fontFamily;
    const sansFontEntry = sansFontRegistry[selection.sans] ?? sansFontRegistry.inter;
    const sansFontClass = sansFontEntry.font.className;
    const sansFontFamily = sansFontEntry.font.style.fontFamily;
    const fonts: FontClasses = useMemo(() => ({
      script: scriptFontClass,
      serif: serifFontClass,
      sans: sansFontClass,
    }), [scriptFontClass, serifFontClass, sansFontClass]);
    const fontFamilies: FontFamilies = useMemo(() => ({
      script: scriptFontFamily,
      serif: serifFontFamily,
      sans: sansFontFamily,
    }), [scriptFontFamily, serifFontFamily, sansFontFamily]);
    const baseTheme = designMeta?.defaultTheme ?? { background: '#ffffff', text: '#1a1a1a', accent: '#d6b56b' };
    const theme: CardTheme = {
      background: props.themeOverrides?.background ?? baseTheme.background,
      text: props.themeOverrides?.text ?? baseTheme.text,
      accent: props.themeOverrides?.accent ?? baseTheme.accent,
    };

    const prepareCardClone = useCallback(async () => {

      if (!props.variant) {

        throw new Error("Select a memorial card template first");

      }

      if (!cardRef.current || !designMeta) {

        throw new Error("Memorial card preview is not ready");

      }

      if (document.fonts?.ready) {

        try {

          await document.fonts.ready;

        } catch (error) {

          console.warn("Fonts did not finish loading before download", error);

        }

      }



      const clone = cardRef.current.cloneNode(true) as HTMLElement;

      prependFontClassStyles(clone, fonts, fontFamilies);

      clone.setAttribute("xmlns", "http://www.w3.org/1999/xhtml");

      const previewRect = cardRef.current.getBoundingClientRect();
      const fallbackWidth = designMeta.downloadSize.width;
      const fallbackHeight = designMeta.downloadSize.height;
      const logicalWidth = previewRect.width || fallbackWidth;
      const logicalHeight = previewRect.height || (fallbackHeight * (logicalWidth / fallbackWidth));
      const deviceScale = typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1;
      const targetWidth = Math.max(1, Math.round(logicalWidth * deviceScale));
      const targetHeight = Math.max(1, Math.round(logicalHeight * deviceScale));
      clone.style.width = `${targetWidth}px`;
      clone.style.height = `${targetHeight}px`;

      await prependDocumentStylesForDownload(clone);

      await inlinePortraitSource(clone);

      return { clone, width: targetWidth, height: targetHeight, displayWidth: logicalWidth, displayHeight: logicalHeight };

    }, [designMeta, fontFamilies, fonts, props.variant]);



    const captureCardBlob = useCallback(async () => {

      const { clone, width, height, displayWidth, displayHeight } = await prepareCardClone();

      const jpegBlob = await convertNodeToJpeg(clone, width, height);

      return { blob: jpegBlob, width, height, displayWidth, displayHeight };

    }, [prepareCardClone]);



    const captureCardImage = useCallback(async () => {

      const capture = await captureCardBlob();

      const dataUrl = await blobToDataUrl(capture.blob, "Could not capture memorial card");

      return { dataUrl, width: capture.width, height: capture.height, displayWidth: capture.displayWidth, displayHeight: capture.displayHeight };

    }, [captureCardBlob]);



    const downloadCard = useCallback(async () => {

      const { blob, width, height } = await captureCardBlob();

      const downloadUrl = URL.createObjectURL(blob);

      const anchor = document.createElement("a");

      const safeName = slugify(data.name) || "memorial-card";

      anchor.download = `${safeName}-${width}x${height}.jpg`;

      anchor.href = downloadUrl;

      anchor.click();

      URL.revokeObjectURL(downloadUrl);

    }, [captureCardBlob, data.name]);



    useImperativeHandle(ref, () => ({ download: downloadCard, captureImage: captureCardImage }), [captureCardImage, downloadCard]);



    const typeScale = props.typeScale ?? 1;
    const previewWidth = props.previewWidth ?? 665;
    const clampedScale = Math.min(Math.max(typeScale, 0.85), 1.25);
    const requestedLineHeight = props.lineHeight ?? 1.4;
    const shouldOverrideLineHeight = Math.abs(requestedLineHeight - 1.4) > 0.001;
    const cardCanvasStyle: (CSSProperties & {
      ['--editor-line-height']?: string;
      ['--card-bg']?: string;
      ['--card-text']?: string;
      ['--card-accent']?: string;
      ['--card-type-scale']?: string;
    }) = {};
    if (shouldOverrideLineHeight) {
      cardCanvasStyle['--editor-line-height'] = requestedLineHeight.toString();
    }
    cardCanvasStyle['--card-bg'] = theme.background;
    cardCanvasStyle['--card-text'] = theme.text;
    cardCanvasStyle['--card-accent'] = theme.accent;
    cardCanvasStyle['--card-type-scale'] = clampedScale.toString();
    cardCanvasStyle.backgroundColor = 'transparent';
    cardCanvasStyle.color = theme.text;
    const canvasClassName = shouldOverrideLineHeight ? 'card-canvas lineheight-active' : 'card-canvas';

    return (
      <div className={`preview-shell ${props.className ?? ""}`}>
        <div
          className="card-wrapper"
          style={{
            width: `${previewWidth}px`,
            maxWidth: "100%",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: theme.background,
          }}
          ref={cardRef}
        >

          <div className="card-inner">
            {props.variant ? (
              <div className={canvasClassName} style={cardCanvasStyle}>
                {renderMemorialCardVariant(props.variant, data, fonts, theme)}
              </div>
            ) : (
              <div className="placeholder">
                <p>Select a memorial card template to preview your design.</p>
              </div>
            )}
          </div>
        </div>
        <style jsx>{`
          .preview-shell {
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
          }
          .card-wrapper {
            width: min(665px, 100%);
            aspect-ratio: 665 / 960;
            display: flex;
            justify-content: center;

            align-items: center;
            overflow: hidden;
          }
          .card-wrapper :global(.card) {
            box-shadow: none !important;
          }
          .card-wrapper :global(.card::before),
          .card-wrapper :global(.card::after) {
            box-shadow: none !important;
          }
          .card-inner {

            width: 100%;

            height: 100%;

            display: flex;

            justify-content: center;

            align-items: center;

          }
          .card-inner :global(> *) {
            width: 100%;
            height: 100%;
          }
          .card-canvas {

            width: 100%;

            height: 100%;

            display: flex;

            justify-content: center;

            align-items: center;

          }
          .card-canvas :global(> *) {
            width: 100%;
            height: 100%;
          }
          .card-canvas.lineheight-active :global(p),
          .card-canvas.lineheight-active :global(.details),
          .card-canvas.lineheight-active :global(.invite),
          .card-canvas.lineheight-active :global(.serviceLine),
          .card-canvas.lineheight-active :global(.service),
          .card-canvas.lineheight-active :global(.notes),
          .card-canvas.lineheight-active :global(.body),
          .card-canvas.lineheight-active :global(.address),
          .card-canvas.lineheight-active :global(.dates),
          .card-canvas.lineheight-active :global(.time),
          .card-canvas.lineheight-active :global(.rsvp),
          .card-canvas.lineheight-active :global(.subtitle),
          .card-canvas.lineheight-active :global(.details span),
          .card-canvas.lineheight-active :global(.invite span),
          .card-canvas.lineheight-active :global(.address span) {
            line-height: var(--editor-line-height);
          }
          .placeholder {
            width: 100%;
            height: 100%;
            display: grid;
            place-items: center;
            text-align: center;
            padding: 32px;
            border-radius: 24px;
            border: 1px dashed rgba(0, 0, 0, 0.1);
            background: rgba(255, 255, 255, 0.6);
            color: #4b4b4b;
          }
        `}</style>
      </div>
    );
  }
);






