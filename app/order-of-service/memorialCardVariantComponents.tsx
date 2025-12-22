/* eslint-disable @next/next/no-img-element */

import type { CSSProperties } from "react";

import type { CardTheme, MemorialCardVariant } from "./memorialCardDesigns";



type FontClasses = {

  script: string;

  serif: string;

  sans: string;

};



type MemorialCardContent = {

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



type TemplateProps = {

  data: MemorialCardContent;

  fonts: FontClasses;

  theme: CardTheme;

};



function createStyleVars(theme?: CardTheme): CSSProperties {

  if (!theme) {

    return {};

  }



  return {

    '--card-bg': theme.background,

    '--card-text': theme.text,

    '--card-accent': theme.accent,

  } as CSSProperties;

}





export function renderMemorialCardVariant(

  variant: MemorialCardVariant,

  data: MemorialCardContent,

  fonts: FontClasses,

  theme: CardTheme

) {

  switch (variant) {

    case "christian-peach-crest":

      return <ChristianPeachCrest data={data} fonts={fonts} theme={theme} />;

    case "christian-blue-dove":

      return <ChristianBlueDove data={data} fonts={fonts} theme={theme} />;

    case "buddhist-ornate-gold":

      return <BuddhistOrnateGold data={data} fonts={fonts} theme={theme} />;

    case "buddhist-minimal-gold":

      return <BuddhistMinimalGold data={data} fonts={fonts} theme={theme} />;

    case "hindu-sunrise-banner":

      return <HinduSunriseBanner data={data} fonts={fonts} theme={theme} />;

    case "hindu-wreath-classic":

      return <HinduWreathClassic data={data} fonts={fonts} theme={theme} />;

    case "interfaith-noir-arch":

      return <InterfaithNoirArch data={data} fonts={fonts} theme={theme} />;

    case "interfaith-sky-doves":

      return <InterfaithSkyDoves data={data} fonts={fonts} theme={theme} />;

    default:

      return null;

  }

}





function ChristianPeachCrest({ data, fonts, theme }: TemplateProps) {

  const { name, dates, titleLine, subtitleLine, tribute, service, body, footer, notes, photoUrl } = data;

  const crestScript = (titleLine || "In loving memory").trim();

  const subtitleText = (subtitleLine || tribute || "Celebrating the life of").trim();

  const displayName = (name || "Rachelle Marie Beaudry").trim();

  const [scriptName, ...familyParts] = displayName.split(/\s+/);

  const familyName = familyParts.length ? familyParts.join(" ") : displayName;

  const upperFamily = familyName.toUpperCase();

  const displayDates = dates?.trim() || "October 06, 1955 — May 07, 2027";

  const serviceLines = splitLines(service);

  const serviceTitle = serviceLines[0] || "Memorial Service";

  const serviceDetail = serviceLines.slice(1).join(" • ") || "Sunday, May 7, 2027 • 10:00 AM";

  const messageLine =

    splitLines(body || tribute).join(" ") || "Forever in our hearts and lovingly remembered.";

  const footerLines = splitLines(footer || notes);

  const venueLine = footerLines[0] || "The Rose Chapel";

  const addressBlock = footerLines.slice(1);

  const addressLines = addressBlock.length ? addressBlock : ["123 Bloom Street", "Charleston, South Carolina"];

  const portraitStyles: CSSProperties | undefined = photoUrl ? { backgroundImage: `url(${photoUrl})` } : undefined;



  const styleVars = {

    ...createStyleVars(theme),

    '--peach-bg': theme?.background ?? '#f8e7e3',

    '--peach-ink': theme?.text ?? '#1f1f1f',

    '--peach-accent': theme?.accent ?? '#d4b06a',

  } as CSSProperties;



  return (

    <div className={`peach-crest-layout ${fonts.sans}`} style={styleVars}>

      <div className="card" role="img" aria-label="Peach floral crest memorial card">

        <div className="frame" aria-hidden />

        <span className="floral wash-top" aria-hidden />

        <span className="floral wash-bottom" aria-hidden />

        <div className="content">

          <p className={`subtitle ${fonts.serif}`}>{subtitleText}</p>

          <div className="crest-block">

            <span className="crest-ring">

              <FloralCrestIcon className="crest-icon" />

            </span>

            <p className={`crest-script ${fonts.script}`}>{crestScript}</p>

          </div>

          <div className="photo-wrap" aria-label={displayName ? `Portrait of ${displayName}` : "Portrait photo"}>

            <div className="photo memorial-card-portrait" style={portraitStyles} />

          </div>

          <div className="name-block">

            <p className={`first-name ${fonts.script}`}>{scriptName || displayName}</p>

            <p className={`last-name ${fonts.serif}`}>{upperFamily}</p>

          </div>

          <p className={`dates ${fonts.serif}`}>{displayDates}</p>

          <p className="message">{messageLine}</p>

          <div className="divider" aria-hidden />

          <div className="service-block">

            <p className="service-title">{serviceTitle}</p>

            <p className="service-detail">{serviceDetail}</p>

          </div>

          <div className="venue-block">

            <p className="venue">{venueLine}</p>

            <p className="address">

              {addressLines.map((line, idx) => (

                <span key={`${line}-${idx}`}>

                  {line}

                  {idx < addressLines.length - 1 ? <br /> : null}

                </span>

              ))}

            </p>

          </div>

        </div>

      </div>



      <style jsx>{`

        .peach-crest-layout {

          width: 100%;

          height: 100%;

          color: var(--peach-ink, #1f1f1f);

        }

        .card {

          width: min(665px, 100%);

          aspect-ratio: 665 / 960;

          position: relative;

          overflow: hidden;

          border-radius: 20px;

          box-shadow: 0 18px 70px rgba(0, 0, 0, 0.35);

          background: linear-gradient(180deg, var(--peach-bg, #f8e7e3) 0%, #fff8f3 52%, #ffffff 100%);

          container-type: inline-size;

        }

        .card::before {

          content: '';

          position: absolute;

          inset: 0;

          background:

            radial-gradient(60cqw 40cqw at 20% 15%, rgba(255, 255, 255, 0.72), transparent 70%),

            radial-gradient(50cqw 35cqw at 85% 30%, rgba(249, 208, 189, 0.45), transparent 70%),

            radial-gradient(55cqw 45cqw at 60% 85%, rgba(248, 214, 197, 0.35), transparent 72%),

            repeating-linear-gradient(0deg, rgba(255, 255, 255, 0.08) 0 1px, transparent 1px 6px);

          pointer-events: none;

          opacity: 0.9;

        }

        .frame {

          position: absolute;

          inset: 4.4cqw;

          border-radius: 14px;

          border: 1px solid rgba(214, 181, 107, 0.45);

          background: rgba(255, 255, 255, 0.72);

          z-index: 1;

        }

        .floral {

          position: absolute;

          width: 70%;

          height: 60%;

          opacity: 0.6;

          pointer-events: none;

          filter: blur(0.25cqw);

          z-index: 0;

        }

        .wash-top {

          top: -6%;

          left: -8%;

          background: radial-gradient(closest-side, rgba(244, 190, 169, 0.5), transparent 75%);

        }

        .wash-bottom {

          bottom: -8%;

          right: -10%;

          background: radial-gradient(closest-side, rgba(250, 224, 205, 0.55), transparent 70%);

        }

        .content {

          position: relative;

          z-index: 2;

          height: 100%;

          padding: 6.4cqw 7cqw 6.8cqw;

          display: flex;

          flex-direction: column;

          align-items: center;

          justify-content: center;

          gap: 1.4cqw;

          text-align: center;

          color: var(--peach-ink, #1f1f1f);

        }

        .subtitle {

          text-transform: uppercase;

          letter-spacing: 0.38em;

          font-size: 2.3cqw;

          margin: 0 0 1.8cqw;

          color: rgba(0, 0, 0, 0.65);

        }

        .crest-block {

          display: flex;

          flex-direction: column;

          align-items: center;

          gap: 1.2cqw;

          margin-bottom: 3.4cqw;

        }

        .crest-ring {

          width: 17cqw;

          aspect-ratio: 1 / 1;

          border-radius: 999px;

          border: 0.9cqw solid var(--peach-accent, #d4b06a);

          display: grid;

          place-items: center;

          position: relative;

          background: radial-gradient(circle, rgba(255, 255, 255, 0.85), rgba(255, 255, 255, 0.15));

          box-shadow:

            inset 0 0 0 0.4cqw rgba(255, 255, 255, 0.6),

            0 0.8cqw 2.4cqw rgba(0, 0, 0, 0.18);

        }

        .crest-ring::after {

          content: '';

          position: absolute;

          inset: 1.2cqw;

          border-radius: 999px;

          border: 1px dashed rgba(212, 176, 106, 0.65);

        }

        .crest-icon {

          width: 8.4cqw;

          height: 8.4cqw;

          color: var(--peach-accent, #d4b06a);

        }

        .crest-script {

          font-size: 4.5cqw;

          margin: 0;

          color: rgba(0, 0, 0, 0.72);

        }

        .photo-wrap {

          width: 70cqw;

          aspect-ratio: 3 / 4;

          border-radius: 18px;

          border: 0.85cqw solid rgba(255, 255, 255, 0.92);

          background: rgba(255, 255, 255, 0.7);

          box-shadow: 0 1.6cqw 3.8cqw rgba(0, 0, 0, 0.18);

          margin-bottom: 3.6cqw;

          position: relative;

          overflow: hidden;

        }

        .photo {

          position: absolute;

          inset: 0;

          background-size: cover;

          background-position: center;

          transform: scale(1.02);

          filter: saturate(1.05);

        }

        .name-block {

          display: flex;

          flex-direction: column;

          align-items: center;

          gap: 0.4cqw;

          margin-bottom: 1.8cqw;

        }

        .first-name {

          font-size: 7cqw;

          margin: 0;

          color: rgba(0, 0, 0, 0.86);

        }

        .last-name {

          font-size: 4.6cqw;

          letter-spacing: 0.45em;

          text-indent: 0.45em;

          margin: 0;

          color: rgba(0, 0, 0, 0.78);

        }

        .dates {

          font-size: 2.4cqw;

          letter-spacing: 0.22em;

          text-transform: uppercase;

          margin: 0 0 1.8cqw;

          color: rgba(0, 0, 0, 0.65);

        }

        .message {

          font-size: 2.2cqw;

          margin: 0 0 3cqw;

          letter-spacing: 0.05em;

          color: rgba(0, 0, 0, 0.55);

        }

        .divider {

          width: 34cqw;

          height: 0.4cqw;

          background: linear-gradient(90deg, transparent, rgba(212, 176, 106, 0.8), transparent);

          margin-bottom: 2.6cqw;

        }

        .service-block {

          text-transform: uppercase;

          letter-spacing: 0.18em;

          margin-bottom: 2cqw;

        }

        .service-title {

          margin: 0 0 0.6cqw;

          font-size: 2.1cqw;

          color: rgba(0, 0, 0, 0.66);

        }

        .service-detail {

          margin: 0;

          font-size: 2.3cqw;

          font-weight: 600;

          color: rgba(0, 0, 0, 0.72);

        }

        .venue-block {

          margin-top: auto;

          display: flex;

          flex-direction: column;

          align-items: center;

        }

        .venue {

          font-size: 3cqw;

          font-weight: 700;

          letter-spacing: 0.08em;

          margin: 0 0 0.8cqw;

          color: rgba(0, 0, 0, 0.8);

        }

        .address {

          margin: 0;

          font-size: 2.1cqw;

          color: rgba(0, 0, 0, 0.6);

          line-height: 1.5;

        }

        .address span {

          display: inline-block;

          width: 100%;

        }

        @supports (font-size: 1cqw) {

          .subtitle {

            font-size: clamp(10px, 2.3cqw, 15px);

          }

          .crest-script {

            font-size: clamp(16px, 4.5cqw, 34px);

          }

          .first-name {

            font-size: clamp(22px, 7cqw, 52px);

          }

          .last-name {

            font-size: clamp(16px, 4.6cqw, 32px);

          }

          .dates {

            font-size: clamp(10px, 2.4cqw, 15px);

          }

          .message {

            font-size: clamp(10px, 2.2cqw, 14px);

          }

          .service-title {

            font-size: clamp(9px, 2.1cqw, 13px);

          }

          .service-detail {

            font-size: clamp(10px, 2.3cqw, 15px);

          }

          .venue {

            font-size: clamp(14px, 3cqw, 22px);

          }

          .address {

            font-size: clamp(10px, 2.1cqw, 13px);

          }

        }

        @media print {

          .card {

            box-shadow: none;

            border-radius: 0;

            width: 100%;

          }

          .frame {

            background: transparent;

          }

        }

      `}</style>

    </div>

  );

}







function FloralCrestIcon({ className }: { className?: string }) {

  return (

    <svg className={className} viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" aria-hidden>

      <circle cx="32" cy="32" r="29" stroke="currentColor" strokeWidth="1.4" fill="none" opacity="0.7" />

      <circle cx="32" cy="32" r="22" stroke="currentColor" strokeDasharray="2 4" strokeWidth="0.9" fill="none" opacity="0.55" />

      <path d="M31 17h2v11h11v2H33v18h-2V30H20v-2h11z" fill="currentColor" fillOpacity="0.85" />

      <path d="M8 34c5-1 10-5 12-11-6 2-10 4-12 11zM56 34c-5-1-10-5-12-11 6 2 10 4 12 11z" fill="currentColor" opacity="0.35" />

      <path d="M14 44c6-1 9-5 10-10-5 3-8 5-10 10zm36 0c-6-1-9-5-10-10 5 3 8 5 10 10z" fill="currentColor" opacity="0.25" />

    </svg>

  );

}



function ChristianBlueDove({ data, fonts, theme }: TemplateProps) {

  const { name, dates, tribute, titleLine, subtitleLine, photoUrl } = data;

  const styleVars = {

    ...createStyleVars(theme),

    '--card-muted': '#3b3b3b',

    '--card-ring': theme?.accent ?? '#d6b56b',

  } as CSSProperties;



  return (

    <div className={`christian-blue-template ${fonts.sans}`} style={styleVars}>

      <div className="card" role="img" aria-label="Memorial card template">

        <span className="floral top-right" aria-hidden />

        <span className="floral bottom-left" aria-hidden />

        <span className="floral bottom-right" aria-hidden />



        <div className="content">

          <h1 className={`title ${fonts.serif}`}>{titleLine || "In loving memory of"}</h1>

          <Dove className="dove" />

          <div className="photo-ring">

            <img

              className="photo memorial-card-portrait"

              src={photoUrl}

              alt={name ? `Portrait of ${name}` : "Portrait photo"}

            />

            <span className="ring-floral" aria-hidden />

          </div>

          <p className={`name ${fonts.script}`}>{name}</p>

          <p className={`dates ${fonts.serif}`}>{dates}</p>

          <p className={`subtitle ${fonts.serif}`}>{tribute || subtitleLine}</p>

        </div>

      </div>



      <style jsx>{`

        .christian-blue-template {

          width: 100%;

          height: 100%;

        }

        .card {

          position: relative;

          width: 100%;

          aspect-ratio: 665 / 960;

          border-radius: 18px;

          overflow: hidden;

          color: var(--card-text, #1b1b1b);

          background:

            radial-gradient(1200px 700px at 30% 20%, rgba(255, 255, 255, 0.55), transparent 60%),

            radial-gradient(900px 600px at 80% 70%, rgba(255, 255, 255, 0.35), transparent 55%),

            linear-gradient(180deg, var(--card-bg, #cfe9f8) 0%, #e7f5ff 60%, var(--card-bg, #cfe9f8) 100%);

          box-shadow: 0 18px 60px rgba(0, 0, 0, 0.45);

        }

        .content {

          position: relative;

          height: 100%;

          padding: 86px 70px 70px;

          display: flex;

          flex-direction: column;

          align-items: center;

          text-align: center;

        }

        .title {

          font-size: 30px;

          letter-spacing: 0.2px;

          font-style: italic;

          margin: 0 0 14px;

          color: var(--card-muted, #3b3b3b);

        }

        .dove {

          width: 42px;

          height: 42px;

          margin: 6px 0 20px;

          opacity: 0.85;

        }

        .photo-ring {

          width: min(420px, 78%);

          aspect-ratio: 1 / 1;

          border-radius: 999px;

          position: relative;

          display: grid;

          place-items: center;

          margin: 8px 0 34px;

        }

        .photo-ring::before {

          content: "";

          position: absolute;

          inset: 0;

          border-radius: 999px;

          border: 6px solid var(--card-ring, #d6b56b);

          box-shadow:

            inset 0 0 0 2px rgba(255, 255, 255, 0.35),

            0 10px 25px rgba(0, 0, 0, 0.12);

        }

        .photo {

          width: 86%;

          height: 86%;

          border-radius: 999px;

          object-fit: cover;

          background: #fff;

          box-shadow: 0 12px 28px rgba(0, 0, 0, 0.14);

        }

        .ring-floral {

          position: absolute;

          right: 18px;

          bottom: 18px;

          width: clamp(110px, 30%, 170px);

          aspect-ratio: 5 / 4;

          pointer-events: none;

          border-radius: 999px;

          background:

            radial-gradient(circle at 30% 40%, rgba(255, 255, 255, 0.9), transparent 60%),

            radial-gradient(circle at 75% 60%, rgba(214, 181, 107, 0.3), transparent 70%);

          filter: drop-shadow(0 8px 12px rgba(0, 0, 0, 0.12));

          opacity: 0.85;

        }

        .floral {

          position: absolute;

          width: clamp(180px, 32%, 260px);

          aspect-ratio: 1 / 1;

          opacity: 0.95;

          pointer-events: none;

          filter: drop-shadow(0 6px 10px rgba(0, 0, 0, 0.12));

          background:

            radial-gradient(circle at 35% 30%, rgba(255, 255, 255, 0.92), transparent 65%),

            radial-gradient(circle at 70% 60%, rgba(255, 255, 255, 0.5), transparent 70%);

        }

        .floral.top-right {

          top: -20px;

          right: -10px;

        }

        .floral.bottom-left {

          bottom: -20px;

          left: -10px;

          transform: rotate(-2deg);

        }

        .floral.bottom-right {

          bottom: -10px;

          right: -10px;

          width: clamp(140px, 28%, 220px);

          opacity: 0.7;

        }

        .name {

          font-size: clamp(3.6rem, 7vw, 4.9rem);

          line-height: 1;

          margin: 0 0 10px;

          color: var(--card-text, #1b1b1b);

        }

        .dates {

          font-size: 20px;

          color: var(--card-muted, #3b3b3b);

          margin: 0 0 18px;

        }

        .subtitle {

          font-size: 18px;

          color: var(--card-muted, #3b3b3b);

          line-height: 1.35;

          margin: 0;

        }

      `}</style>

    </div>

  );

}

function BuddhistOrnateGold({ data, fonts, theme }: TemplateProps) {

  const { name, dates, tribute, body, service, footer, notes, photoUrl, titleLine, subtitleLine } = data;

  const topLineRaw = (titleLine || tribute || "In loving memory of").trim();

  const topLine = topLineRaw ? topLineRaw.toUpperCase() : "IN LOVING MEMORY OF";

  const displayName = name?.trim() || "Estelle Darcy";

  const displayDates = dates?.trim() || "10.10.1960 - 10.10.2024";



  const splitLines = (value?: string) => {

    if (!value) return [] as string[];

    return value

      .replace(/<br\s*\/?\s*>/gi, "\n")

      .split(/\r?\n/)

      .map((line) => line.trim())

      .filter(Boolean);

  };



  const detailLines = [

    ...splitLines(service),

    ...splitLines(body || subtitleLine || tribute),

    ...splitLines(footer || notes),

  ].slice(0, 3);



  const styleVars = {

    ...createStyleVars(theme),

    '--card-bg': theme?.background ?? '#f7f7f6',

    '--card-ink': theme?.text ?? '#2a2a2a',

    '--card-muted': 'rgba(0,0,0,.62)',

  } as CSSProperties;



  return (

    <div className={`buddhist-ornate-lotus ${fonts.sans}`} style={styleVars}>

      <div className="card" role="img" aria-label="Ornate lotus memorial poster">

        <div className="content">

          <div className="medallion">

            <svg className="wreath" viewBox="0 0 420 360" xmlns="http://www.w3.org/2000/svg" aria-hidden>

              <defs>

                <linearGradient id="leafG" x1="0" y1="0" x2="1" y2="1">

                  <stop offset="0" stopColor="#9db7b4" />

                  <stop offset="1" stopColor="#5d7f78" />

                </linearGradient>

                <linearGradient id="leafG2" x1="0" y1="0" x2="1" y2="1">

                  <stop offset="0" stopColor="#b7c9c6" />

                  <stop offset="1" stopColor="#6a8c84" />

                </linearGradient>

                <path id="lotus-leaf" d="M210 40 C224 60, 226 84, 210 106 C194 84, 196 60, 210 40Z" />

              </defs>



              <g transform="translate(0,10)">

                <g transform="translate(210,160)">

                  <g fill="url(#leafG)" opacity=".95">

                    <use xlinkHref="#lotus-leaf" transform="rotate(210) translate(0,-118) rotate(-210) scale(.9)" />

                    <use xlinkHref="#lotus-leaf" transform="rotate(230) translate(0,-122) rotate(-230) scale(.95)" />

                    <use xlinkHref="#lotus-leaf" transform="rotate(250) translate(0,-124) rotate(-250) scale(.92)" />

                    <use xlinkHref="#lotus-leaf" transform="rotate(270) translate(0,-124) rotate(-270) scale(.88)" />

                    <use xlinkHref="#lotus-leaf" transform="rotate(290) translate(0,-122) rotate(-290) scale(.92)" />

                    <use xlinkHref="#lotus-leaf" transform="rotate(310) translate(0,-118) rotate(-310) scale(.9)" />

                  </g>

                  <g fill="url(#leafG2)" opacity=".85">

                    <use xlinkHref="#lotus-leaf" transform="rotate(220) translate(0,-102) rotate(-220) scale(.75)" />

                    <use xlinkHref="#lotus-leaf" transform="rotate(260) translate(0,-104) rotate(-260) scale(.72)" />

                    <use xlinkHref="#lotus-leaf" transform="rotate(300) translate(0,-102) rotate(-300) scale(.75)" />

                  </g>

                </g>

              </g>



              <g transform="translate(0,10)">

                <g transform="translate(210,160)">

                  <g fill="url(#leafG)" opacity=".95">

                    <use xlinkHref="#lotus-leaf" transform="rotate(30) translate(0,-118) rotate(-30) scale(.9)" />

                    <use xlinkHref="#lotus-leaf" transform="rotate(50) translate(0,-122) rotate(-50) scale(.95)" />

                    <use xlinkHref="#lotus-leaf" transform="rotate(70) translate(0,-124) rotate(-70) scale(.92)" />

                    <use xlinkHref="#lotus-leaf" transform="rotate(90) translate(0,-124) rotate(-90) scale(.88)" />

                    <use xlinkHref="#lotus-leaf" transform="rotate(110) translate(0,-122) rotate(-110) scale(.92)" />

                    <use xlinkHref="#lotus-leaf" transform="rotate(130) translate(0,-118) rotate(-130) scale(.9)" />

                  </g>

                  <g fill="url(#leafG2)" opacity=".85">

                    <use xlinkHref="#lotus-leaf" transform="rotate(40) translate(0,-102) rotate(-40) scale(.75)" />

                    <use xlinkHref="#lotus-leaf" transform="rotate(80) translate(0,-104) rotate(-80) scale(.72)" />

                    <use xlinkHref="#lotus-leaf" transform="rotate(120) translate(0,-102) rotate(-120) scale(.75)" />

                  </g>

                </g>

              </g>



              <g transform="translate(210,280)">

                <g fill="#c4373a" opacity=".98">

                  <path d="M0,-38 C18,-44 34,-30 28,-10 C20,-6 10,-16 0,-38Z" />

                  <path d="M0,-38 C-18,-44 -34,-30 -28,-10 C-20,-6 -10,-16 0,-38Z" />

                  <path d="M0,-34 C24,-30 30,-4 8,8 C2,4 0,-10 0,-34Z" />

                  <path d="M0,-34 C-24,-30 -30,-4 -8,8 C-2,4 0,-10 0,-34Z" />

                  <path d="M0,-28 C18,-18 14,10 0,18 C-14,10 -18,-18 0,-28Z" />

                </g>

                <circle cx="0" cy="-10" r="7" fill="#f3d5b0" />

                <g fill="#9b2b2e" opacity=".9">

                  <circle cx="-40" cy="-8" r="4" />

                  <circle cx="-32" cy="2" r="3.5" />

                  <circle cx="40" cy="-8" r="4" />

                  <circle cx="32" cy="2" r="3.5" />

                </g>

              </g>

            </svg>



            <div className="photoRing" role="img" aria-label={displayName ? `Portrait of ${displayName}` : 'Portrait'}>

              <div className="photo memorial-card-portrait" style={{ backgroundImage: `url(${photoUrl})` }} />

            </div>

          </div>



          <p className={`topline ${fonts.sans}`}>{topLine}</p>

          <p className={`name ${fonts.script}`}>{displayName}</p>

          <p className={`dates ${fonts.serif}`}>{displayDates}</p>



          {detailLines.length > 0 ? (

            <p className="details">

              {detailLines.map((line, idx) => (

                <span key={`${line}-${idx}`}>

                  {line}

                  {idx < detailLines.length - 1 ? <br /> : null}

                </span>

              ))}

            </p>

          ) : null}

        </div>

      </div>



      <style jsx>{`

        .buddhist-ornate-lotus {

          width: 100%;

          height: 100%;

        }

        .card {

          width: min(665px, 100%);

          aspect-ratio: 665 / 960;

          position: relative;

          overflow: hidden;

          border-radius: 12px;

          background:

            radial-gradient(900px 700px at 30% 20%, rgba(255, 255, 255, 0.7), transparent 60%),

            radial-gradient(900px 700px at 70% 70%, rgba(255, 255, 255, 0.55), transparent 62%),

            var(--card-bg, #f3f3f1);

          box-shadow: 0 18px 70px rgba(0, 0, 0, 0.45);

          container-type: inline-size;

        }

        .card::after {

          content: '';

          position: absolute;

          inset: 0;

          background:

            repeating-linear-gradient(0deg, rgba(0, 0, 0, 0.015) 0 1px, transparent 1px 6px),

            repeating-linear-gradient(90deg, rgba(0, 0, 0, 0.012) 0 1px, transparent 1px 7px);

          opacity: 0.35;

          pointer-events: none;

          mix-blend-mode: multiply;

        }

        .content {

          position: relative;

          z-index: 2;

          height: 100%;

          padding: 8.421cqw 7.895cqw 7.895cqw;

          display: flex;

          flex-direction: column;

          align-items: center;

          text-align: center;

          color: var(--card-ink, #2a2a2a);

        }

        .medallion {

          position: relative;

          width: 55.263cqw;

          height: 47.368cqw;

          display: grid;

          place-items: center;

          margin-top: 0.526cqw;

          margin-bottom: 3.684cqw;

        }

        .wreath {

          position: absolute;

          inset: 0;

          pointer-events: none;

          filter: drop-shadow(0 1.316cqw 1.842cqw rgba(0, 0, 0, 0.1));

          opacity: 0.98;

        }

        .photoRing {

          width: 31.579cqw;

          height: 31.579cqw;

          border-radius: 999px;

          position: relative;

          box-shadow: 0 1.842cqw 3.947cqw rgba(0, 0, 0, 0.16);

          border: 1.316cqw solid rgba(214, 181, 107, 0.95);

          display: grid;

          place-items: center;

        }

        .photoRing::before {

          content: '';

          position: absolute;

          inset: 0.789cqw;

          border-radius: 999px;

          border: 0.526cqw solid rgba(255, 255, 255, 0.85);

          pointer-events: none;

        }

        .photo {

          width: 100%;

          height: 100%;

          border-radius: 999px;

          background-size: cover;

          background-position: center;

        }

        .topline {

          font-size: 1.842cqw;

          letter-spacing: 0.26em;

          text-transform: uppercase;

          color: rgba(122, 75, 75, 0.85);

          margin: 0 0 1.579cqw;

        }

        .name {

          font-size: 9.474cqw;

          line-height: 1;

          margin: 0 0 1.579cqw;

          color: rgba(0, 0, 0, 0.72);

        }

        .dates {

          font-size: 2.105cqw;

          color: rgba(0, 0, 0, 0.55);

          letter-spacing: 0.06em;

          margin: 0 0 2.105cqw;

        }

        .details {

          font-size: 1.579cqw;

          letter-spacing: 0.14em;

          text-transform: uppercase;

          color: rgba(0, 0, 0, 0.55);

          line-height: 1.6;

          margin: 0;

        }

        .details span {

          display: inline-block;

          width: 100%;

        }

        @supports (font-size: 1cqw) {

          .topline {

            font-size: clamp(10px, 1.842cqw, 14px);

          }

          .name {

            font-size: clamp(34px, 9.474cqw, 72px);

          }

          .dates {

            font-size: clamp(11px, 2.105cqw, 16px);

          }

          .details {

            font-size: clamp(9px, 1.579cqw, 12px);

          }

        }

        @media print {

          .card {

            box-shadow: none;

            border-radius: 0;

            width: 100%;

          }

        }

      `}</style>

    </div>

  );

}function BuddhistMinimalGold({ data, fonts, theme }: TemplateProps) {
  const { name, dates, titleLine, subtitleLine, tribute, service, body, footer, notes, photoUrl } = data;
  const topScript = (titleLine || subtitleLine || 'In loving memory of').trim();
  const displayName = (name?.trim() || 'Jane Anderson').trim();
  const displayDates = dates?.trim() || 'JUNE 21, 1980 - MARCH 22, 2019';
  const inviteLines = splitLines(tribute || body);
  const inviteText = inviteLines.length > 0
    ? inviteLines.join('\n')
    : ['THE ANDERSON FAMILY INVITE YOU', 'TO JOIN THEM CELEBRATING OLIVIA\'S LIFE', 'AT A MEMORIAL SERVICE ON'].join('\n');
  const serviceLine = splitLines(service)[0] || 'SUNDAY, MARCH 25, 2018 AT 10.00AM';
  const venue = splitLines(footer || notes)[0] || 'Venue Name';
  const address = splitLines(footer || notes).slice(1).join('\n') || '123 Street Name City, State, 00000';
  const photoStyles: CSSProperties | undefined = photoUrl ? { backgroundImage: `url(${photoUrl})` } : undefined;

  const styleVars = {
    ...createStyleVars(theme),
    '--card-bg': theme?.background ?? '#ffffff',
    '--card-ink': theme?.text ?? '#121212',
  } as CSSProperties;

  return (
    <div className={`white-floral-card ${fonts.sans}`} style={styleVars}>
      <div className="card" role="img" aria-label="White floral memorial card">
        <div className="panel" aria-hidden />
        <div className="content">
          <h1 className={`topScript ${fonts.script}`}>{topScript}</h1>
          <div className="photo" aria-label={displayName ? `Portrait of ${displayName}` : 'Portrait photo'}>
            <div className="photo-fill memorial-card-portrait" style={photoStyles} />
          </div>
          <div className={`name ${fonts.script}`}>{displayName}</div>
          <p className="dates">{displayDates}</p>
          <p className="invite">
            {inviteText.split('\\n').map((line, idx) => (
              <span key={`${line}-${idx}`}>
                {line}
                {idx < inviteText.split('\\n').length - 1 ? <br /> : null}
              </span>
            ))}
          </p>
          <p className="serviceLine">{serviceLine}</p>
          <p className="venue">{venue}</p>
          <p className="address">
            {address.split('\\n').map((line, idx) => (
              <span key={`${line}-${idx}`}>
                {line}
                {idx < address.split('\\n').length - 1 ? <br /> : null}
              </span>
            ))}
          </p>
        </div>
      </div>
      <style jsx>{`
        .white-floral-card {
          width: 100%;
          height: 100%;
          color: var(--card-ink, #121212);
        }
        .card {
          width: min(760px, 100%);
          aspect-ratio: 3 / 4;
          position: relative;
          overflow: hidden;
          border-radius: 12px;
          background: var(--card-bg, #fff);
          box-shadow: 0 18px 70px rgba(0, 0, 0, 0.45);
          container-type: inline-size;
        }
        .card::before {
          content: '';
          position: absolute;
          inset: 0;
          background:
            radial-gradient(22cqw 18cqw at 18% 78%, rgba(0, 0, 0, 0.1), transparent 70%),
            radial-gradient(24cqw 20cqw at 42% 88%, rgba(0, 0, 0, 0.09), transparent 72%),
            radial-gradient(26cqw 22cqw at 72% 82%, rgba(0, 0, 0, 0.1), transparent 72%),
            radial-gradient(30cqw 26cqw at 86% 92%, rgba(0, 0, 0, 0.08), transparent 74%),
            radial-gradient(18cqw 14cqw at 10% 92%, rgba(0, 0, 0, 0.07), transparent 74%),
            linear-gradient(180deg, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 1) 52%, rgba(255, 255, 255, 0.8) 72%, rgba(255, 255, 255, 0.55) 100%);
          filter: blur(0.35cqw);
          opacity: 0.95;
          pointer-events: none;
        }
        .card::after {
          content: '';
          position: absolute;
          inset: 0;
          background:
            repeating-linear-gradient(0deg, rgba(0, 0, 0, 0.012) 0 1px, transparent 1px 7px),
            repeating-linear-gradient(90deg, rgba(0, 0, 0, 0.01) 0 1px, transparent 1px 9px);
          opacity: 0.18;
          pointer-events: none;
          mix-blend-mode: multiply;
        }
        .panel {
          position: absolute;
          inset: 4.6cqw;
          background: rgba(255, 255, 255, 0.92);
          border-radius: 6px;
          box-shadow: 0 1.2cqw 2.2cqw rgba(0, 0, 0, 0.1);
          z-index: 2;
          overflow: hidden;
        }
        .panel::before {
          content: '';
          position: absolute;
          inset: 2.4cqw;
          border: 1px solid rgba(0, 0, 0, 0.1);
          border-radius: 4px;
          pointer-events: none;
        }
        .content {
          position: relative;
          z-index: 3;
          height: 100%;
          padding: 6.4cqw 6.4cqw 5.6cqw;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          color: var(--card-ink, #121212);
        }
        .topScript {
          font-size: 5.2cqw;
          line-height: 1;
          margin: 0 0 3cqw;
          color: rgba(0, 0, 0, 0.78);
        }
        .photo {
          width: 44cqw;
          max-width: 360px;
          aspect-ratio: 4 / 5;
          background: #ddd;
          box-shadow: 0 1.4cqw 2.8cqw rgba(0, 0, 0, 0.14);
          border: 0.9cqw solid rgba(255, 255, 255, 0.95);
          margin-bottom: 3.2cqw;
          position: relative;
          overflow: hidden;
        }
        .photo-fill {
          position: absolute;
          inset: 0;
          background-size: cover;
          background-position: center;
          transform: scale(1.02);
        }
        .name {
          font-size: 7.2cqw;
          line-height: 1;
          margin: 0 0 1.6cqw;
          color: rgba(0, 0, 0, 0.86);
        }
        .dates {
          font-weight: 700;
          font-size: 1.7cqw;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: rgba(0, 0, 0, 0.75);
          margin: 0 0 2.6cqw;
        }
        .invite {
          font-weight: 600;
          font-size: 1.6cqw;
          line-height: 1.55;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          color: rgba(0, 0, 0, 0.62);
          margin: 0 0 2.6cqw;
          max-width: 78cqw;
        }
        .invite span {
          display: inline-block;
          width: 100%;
        }
        .serviceLine {
          font-weight: 800;
          font-size: 1.65cqw;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: rgba(0, 0, 0, 0.78);
          margin: 0 0 3.2cqw;
        }
        .venue {
          font-weight: 800;
          font-size: 2.2cqw;
          margin: 0 0 1cqw;
          color: rgba(0, 0, 0, 0.85);
        }
        .address {
          font-size: 1.55cqw;
          color: rgba(0, 0, 0, 0.62);
          margin: 0;
          line-height: 1.45;
        }
        .address span {
          display: inline-block;
          width: 100%;
        }
        @supports (font-size: 1cqw) {
          .topScript {
            font-size: clamp(18px, 5.2cqw, 42px);
          }
          .name {
            font-size: clamp(22px, 7.2cqw, 54px);
          }
          .dates {
            font-size: clamp(10px, 1.7cqw, 14px);
          }
          .invite {
            font-size: clamp(10px, 1.6cqw, 14px);
          }
          .serviceLine {
            font-size: clamp(10px, 1.65cqw, 14px);
          }
          .venue {
            font-size: clamp(14px, 2.2cqw, 20px);
          }
          .address {
            font-size: clamp(10px, 1.55cqw, 13px);
          }
        }
        @media print {
          .card {
            box-shadow: none;
            border-radius: 0;
            width: 100%;
          }
          .panel {
            box-shadow: none;
          }
        }
      `}</style>
    </div>
  );
}

function HinduSunriseBanner({ data, fonts, theme }: TemplateProps) {
  const { name, dates, titleLine, subtitleLine, tribute, service, body, footer, notes, photoUrl } = data;
  const subtitleText = (titleLine || subtitleLine || tribute || 'Celebrating the life of').trim();
  const displayName = (name?.trim() || 'Rachelle Beaudry').trim();
  const [firstName, ...rest] = displayName.split(/\s+/);
  const lastName = (rest.length ? rest.join(' ') : '').toUpperCase() || 'BEAUDRY';
  const displayFirst = firstName || displayName;
  const displayDates = dates?.trim() || 'OCTOBER 06, 1955 ? MAY 07, 2027';
  const serviceLine = splitLines(service || body || notes).join(' ') || '04.07.2027 FROM 10:00 AM TO 11:00 AM';
  const photoStyles: CSSProperties | undefined = photoUrl ? { backgroundImage: `url(${photoUrl})` } : undefined;

  const styleVars = {
    ...createStyleVars(theme),
    '--paper': theme?.background ?? '#ffffff',
    '--ink': theme?.text ?? '#111111',
  } as CSSProperties;

  return (
    <div className={`minimal-cross-card ${fonts.sans}`} style={styleVars}>
      <div className="card" role="img" aria-label="Minimal memorial card">
        <div className="inner">
          <div className="photo" aria-label={displayName ? `Portrait of ${displayName}` : 'Portrait photo'}>
            <div className="photo-fill memorial-card-portrait" style={photoStyles} />
          </div>

          <div className="crossWrap" aria-hidden="true">
            <svg className="cross" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
              <path d="M30.5 10h3v16h16v3h-16v25h-3V29h-16v-3h16V10z" fill="rgba(0,0,0,.55)" />
            </svg>
          </div>

          <p className={`subtitle ${fonts.serif}`}>{subtitleText}</p>
          <p className={`firstName ${fonts.script}`}>{displayFirst}</p>
          <p className={`lastName ${fonts.serif}`}>{lastName}</p>
          <p className="dates">{displayDates}</p>
          <p className="time">{serviceLine}</p>
        </div>
        <span className="frame" aria-hidden="true" />
      </div>

      <style jsx>{`
        .minimal-cross-card {
          width: 100%;
          height: 100%;
          color: var(--ink, #111);
          display: flex;
          justify-content: center;
          align-items: center;
          background: #111;
        }
        .card {
          width: min(var(--maxW, 760px), 94vw);
          aspect-ratio: 3 / 4;
          position: relative;
          overflow: hidden;
          border-radius: 12px;
          background: var(--paper, #ffffff);
          box-shadow: 0 18px 70px rgba(0, 0, 0, 0.45);
          container-type: inline-size;
        }
        .frame {
          position: absolute;
          inset: 3.8cqw;
          border: 1px solid rgba(0, 0, 0, 0.55);
          border-radius: 2px;
          pointer-events: none;
          z-index: 3;
        }
        .inner {
          position: absolute;
          inset: 3.8cqw;
          padding: 3.6cqw 4.2cqw 4.2cqw;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          color: var(--ink, #111);
          z-index: 2;
        }
        .photo {
          width: 100%;
          height: 46%;
          border: 1px solid rgba(0, 0, 0, 0.1);
          background: #ddd;
          position: relative;
          overflow: hidden;
          margin-bottom: 6cqw;
        }
        .photo-fill {
          position: absolute;
          inset: 0;
          background-size: cover;
          background-position: center;
          transform: scale(1.02);
        }
        .crossWrap {
          height: 10.5cqw;
          display: grid;
          place-items: center;
          margin-bottom: 2.2cqw;
        }
        .cross {
          width: 9cqw;
          height: 9cqw;
          max-width: 56px;
          max-height: 56px;
          opacity: 0.8;
        }
        .subtitle {
          font-size: 2.4cqw;
          color: rgba(0, 0, 0, 0.55);
          margin: 0 0 3.2cqw;
        }
        .firstName {
          font-size: 7.6cqw;
          line-height: 1;
          margin: 0 0 1cqw;
          color: rgba(0, 0, 0, 0.86);
        }
        .lastName {
          font-size: 4.8cqw;
          letter-spacing: 0.52em;
          text-indent: 0.52em;
          text-transform: uppercase;
          margin: 0 0 3cqw;
          color: rgba(0, 0, 0, 0.82);
        }
        .dates {
          font-weight: 500;
          font-size: 2.1cqw;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          margin: 0 0 2.2cqw;
          color: rgba(0, 0, 0, 0.7);
        }
        .time {
          font-weight: 500;
          font-size: 1.9cqw;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          margin: 0;
          color: rgba(0, 0, 0, 0.6);
        }
        @supports (font-size: 1cqw) {
          .subtitle {
            font-size: clamp(11px, 2.4cqw, 16px);
          }
          .firstName {
            font-size: clamp(26px, 7.6cqw, 54px);
          }
          .lastName {
            font-size: clamp(18px, 4.8cqw, 34px);
          }
          .dates {
            font-size: clamp(10px, 2.1cqw, 14px);
          }
          .time {
            font-size: clamp(10px, 1.9cqw, 13px);
          }
        }
        @media print {
          .minimal-cross-card {
            background: #fff;
          }
          .card {
            box-shadow: none;
            border-radius: 0;
            width: 100%;
          }
          .frame {
            border-color: rgba(0, 0, 0, 0.65);
          }
        }
      `}</style>
    </div>
  );
}

function HinduWreathClassic({ data, fonts, theme }: TemplateProps) {

  const { name, dates, tribute, titleLine, service, body, footer, notes, photoUrl } = data;

  const titleSource = (titleLine || tribute || "In loving memory").trim();

  const words = titleSource.split(/\s+/);

  const scriptWord = words.length > 1 ? words.pop() ?? "memory" : titleSource;

  const smallTop = words.length > 0 ? words.join(" ") : "In loving";

  const scriptText = scriptWord ? scriptWord.replace(/^\w/, (c) => c.toUpperCase()) : "Memory";



  const displayName = name?.trim() || "Christina Smith";

  const displayDates = dates?.trim() || "JUNE 21, 1980 - MARCH 22, 2019";

  const serviceLine = service?.trim() || "SUNDAY, MARCH 25, 2018 AT 10.00AM";



  const normalizeLines = (value?: string) => {

    if (!value) return [] as string[];

    return value

      .replace(/<br\s*\/?\s*>/gi, "\n")

      .split(/\r?\n/)

      .map((line) => line.trim())

      .filter(Boolean);

  };



  const locationLines = normalizeLines(body || footer || notes);

  const placeLine = locationLines[0] || "Name Of Church";

  const addressLines = locationLines.slice(1);

  const displayAddress = addressLines.length > 0 ? addressLines : ["123 Street Name City, State, 00000"];



  const styleVars = {

    ...createStyleVars(theme),

    '--card-bg': theme?.background ?? '#f6f2ee',

    '--card-ink': theme?.text ?? '#141414',

    '--card-mint-1': '#e8f4f0',

    '--card-mint-2': '#dff0ea',

    '--card-warm': '#efe2c9',

  } as CSSProperties;



  return (

    <div className={`hindu-floral-card ${fonts.sans}`} style={styleVars}>

      <div className="card" role="img" aria-label="Floral memorial card">

        <div className="frame" aria-hidden />

        <div className="content">

          <div className="smallTop">{smallTop}</div>

          <div className={`script ${fonts.script}`}>{scriptText}</div>



          <div className="photoBlock" aria-label={displayName ? `Portrait of ${displayName}` : 'Portrait photo'}>

            <div className="photo-fill memorial-card-portrait" style={{ backgroundImage: `url(${photoUrl})` }} />

          </div>



          <div className={`name ${fonts.serif}`}>{displayName}</div>

          <div className="dates">{displayDates}</div>



          <div className="dash" aria-hidden />

          <div className="service">{serviceLine}</div>

          <div className="dash" aria-hidden style={{ marginTop: 0, marginBottom: '2.6cqw' }} />



          <div className={`place ${fonts.serif}`}>{placeLine}</div>

          <p className="addr">

            {displayAddress.map((line, idx) => (

              <span key={`${line}-${idx}`}>

                {line}

                {idx < displayAddress.length - 1 ? <br /> : null}

              </span>

            ))}

          </p>

        </div>

      </div>



      <style jsx>{`

        .hindu-floral-card {

          width: 100%;

          height: 100%;

          color: var(--card-ink, #141414);

        }

        .card {

          width: min(665px, 100%);

          aspect-ratio: 3 / 4;

          position: relative;

          overflow: hidden;

          border-radius: 14px;

          box-shadow: 0 18px 70px rgba(0, 0, 0, 0.45);

          container-type: inline-size;

          background:

            radial-gradient(1100px 900px at 30% 25%, rgba(255, 255, 255, 0.85), transparent 58%),

            radial-gradient(1100px 900px at 70% 70%, rgba(255, 255, 255, 0.7), transparent 60%),

            linear-gradient(180deg, var(--card-mint-1, #e8f4f0) 0%, var(--card-mint-2, #dff0ea) 100%);

        }

        .card::before {

          content: '';

          position: absolute;

          inset: 0;

          background:

            radial-gradient(16cqw 10cqw at 16% 18%, rgba(255, 255, 255, 0.45), transparent 62%),

            radial-gradient(18cqw 12cqw at 80% 20%, rgba(255, 255, 255, 0.4), transparent 62%),

            radial-gradient(20cqw 14cqw at 22% 72%, rgba(255, 255, 255, 0.36), transparent 64%),

            radial-gradient(22cqw 16cqw at 78% 78%, rgba(255, 255, 255, 0.34), transparent 66%),

            repeating-radial-gradient(circle at 50% 25%, rgba(255, 255, 255, 0.18) 0 2px, transparent 2px 18px);

          opacity: 0.85;

          pointer-events: none;

          filter: blur(0.12cqw);

        }

        .card::after {

          content: '';

          position: absolute;

          inset: 0;

          background:

            repeating-linear-gradient(0deg, rgba(0, 0, 0, 0.014) 0 1px, transparent 1px 6px),

            repeating-linear-gradient(90deg, rgba(0, 0, 0, 0.012) 0 1px, transparent 1px 7px);

          opacity: 0.22;

          pointer-events: none;

          mix-blend-mode: multiply;

        }

        .frame {

          position: absolute;

          inset: 4.2cqw;

          border: 2px solid rgba(0, 0, 0, 0.6);

          pointer-events: none;

          z-index: 2;

        }

        .content {

          position: relative;

          z-index: 3;

          height: 100%;

          padding: 7.2cqw 7.2cqw 6.2cqw;

          display: flex;

          flex-direction: column;

          align-items: center;

          text-align: center;

        }

        .smallTop {

          font-size: 2.15cqw;

          letter-spacing: 0.06em;

          margin-top: 1.8cqw;

          margin-bottom: 0.6cqw;

          color: rgba(0, 0, 0, 0.8);

        }

        .script {

          font-size: 9.6cqw;

          margin: 0 0 3.2cqw;

          color: rgba(0, 0, 0, 0.86);

          line-height: 1;

        }

        .photoBlock {

          width: 68cqw;

          aspect-ratio: 4 / 3;

          background: #fff;

          border: 0.9cqw solid rgba(255, 255, 255, 0.92);

          box-shadow: 0 1.4cqw 2.6cqw rgba(0, 0, 0, 0.14);

          margin-bottom: 3.4cqw;

          position: relative;

          overflow: hidden;

        }

        .photo-fill {

          position: absolute;

          inset: 0;

          width: 100%;

          height: 100%;

          background-size: cover;

          background-position: center;

          transform: scale(1.02);

        }

        .name {

          font-weight: 400;

          font-size: 6.3cqw;

          margin: 0 0 1.2cqw;

          color: rgba(0, 0, 0, 0.88);

        }

        .dates {

          font-size: 1.85cqw;

          font-weight: 600;

          letter-spacing: 0.12em;

          text-transform: uppercase;

          color: rgba(0, 0, 0, 0.75);

          margin: 0 0 2.4cqw;

        }

        .dash {

          width: 62cqw;

          border-top: 0.55cqw dashed rgba(0, 0, 0, 0.7);

          margin: 0 0 2.2cqw;

        }

        .service {

          font-size: 1.85cqw;

          font-weight: 600;

          letter-spacing: 0.1em;

          text-transform: uppercase;

          color: rgba(0, 0, 0, 0.78);

          margin: 0 0 2.1cqw;

        }

        .place {

          font-size: 2.55cqw;

          font-weight: 600;

          margin: 0 0 1.1cqw;

          color: rgba(0, 0, 0, 0.85);

        }

        .addr {

          font-size: 1.75cqw;

          color: rgba(0, 0, 0, 0.7);

          margin: 0;

          line-height: 1.45;

        }

        .addr span {

          display: inline-block;

          width: 100%;

        }

        @supports (font-size: 1cqw) {

          .smallTop {

            font-size: clamp(12px, 2.15cqw, 16px);

          }

          .script {

            font-size: clamp(34px, 9.6cqw, 64px);

          }

          .name {

            font-size: clamp(20px, 6.3cqw, 40px);

          }

          .dates,

          .service,

          .addr {

            font-size: clamp(10px, 1.85cqw, 14px);

          }

          .place {

            font-size: clamp(13px, 2.55cqw, 18px);

          }

        }

        @media print {

          .card {

            box-shadow: none;

            border-radius: 0;

            width: 100%;

          }

        }

      `}</style>

    </div>

  );

}



function InterfaithNoirArch({ data, fonts, theme }: TemplateProps) {

  const { name, dates, titleLine, subtitleLine, tribute, service, body, footer, notes, photoUrl } = data;

  const smallTop = (titleLine || 'In loving').trim();

  const scriptLine = (subtitleLine || tribute || 'Memory').trim();

  const displayName = (name?.trim() || 'Christina Smith').trim();

  const displayDates = dates?.trim() || 'JUNE 21, 1980 - MARCH 22, 2019';

  const serviceLine = splitLines(service).shift() || 'SUNDAY, MARCH 25, 2018 AT 10.00AM';

  const placeLines = splitLines(footer || notes || body);

  const placeName = placeLines.shift() || 'Name Of Church';

  const addressText = placeLines.join(' ') || '123 Street Name City, State, 00000';

  const portraitSrc =

    photoUrl?.trim() || 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=600&q=80';

  const photoStyles: CSSProperties | undefined = photoUrl ? { backgroundImage: `url(${photoUrl})` } : undefined;



  const styleVars = {

    ...createStyleVars(theme),

    '--ink': theme?.text ?? '#141414',

  } as CSSProperties;



  return (

    <div className={`floral-card-template ${fonts.sans}`} style={styleVars}>

      <div className="card" role="img" aria-label="Interfaith floral tribute card">

        <span className="frame" aria-hidden="true" />

        <div className="content">

          <p className={`smallTop ${fonts.sans}`}>{smallTop}</p>

          <p className={`script ${fonts.script}`}>{scriptLine}</p>



          <div className="photoBlock" aria-label={displayName ? `Portrait of ${displayName}` : 'Portrait photo'}>

            <div className="photo-fill memorial-card-portrait" style={photoStyles} />

          </div>



          <p className={`name ${fonts.serif}`}>{displayName}</p>

          <p className="dates">{displayDates}</p>



          <span className="dash" aria-hidden="true" />

          <p className="service">{serviceLine}</p>

          <span className="dash" aria-hidden="true" style={{ marginTop: 0, marginBottom: '2.6cqw' }} />



          <p className={`place ${fonts.serif}`}>{placeName}</p>

          <p className="addr">{addressText}</p>

        </div>

      </div>



      <style jsx>{`

        .floral-card-template {

          width: 100%;

          height: 100%;

          display: flex;

          justify-content: center;

          align-items: center;

          background: #111;

          color: var(--ink, #141414);

        }

        .card {

          width: min(var(--maxW, 720px), 94vw);

          aspect-ratio: 3 / 4;

          position: relative;

          overflow: hidden;

          border-radius: 14px;

          box-shadow: 0 18px 70px rgba(0, 0, 0, 0.45);

          container-type: inline-size;

          background:

            radial-gradient(1100px 900px at 30% 25%, rgba(255, 255, 255, 0.85), transparent 58%),

            radial-gradient(1100px 900px at 70% 70%, rgba(255, 255, 255, 0.7), transparent 60%),

            linear-gradient(180deg, var(--mint1, #e8f4f0) 0%, var(--mint2, #dff0ea) 55%, var(--warm, #efe2c9) 100%);

        }

        .card::before {

          content: '';

          position: absolute;

          inset: 0;

          background:

            radial-gradient(16cqw 10cqw at 16% 18%, rgba(255, 255, 255, 0.45), transparent 62%),

            radial-gradient(18cqw 12cqw at 80% 20%, rgba(255, 255, 255, 0.4), transparent 62%),

            radial-gradient(20cqw 14cqw at 22% 72%, rgba(255, 255, 255, 0.36), transparent 64%),

            radial-gradient(22cqw 16cqw at 78% 78%, rgba(255, 255, 255, 0.34), transparent 66%),

            repeating-radial-gradient(circle at 50% 25%, rgba(255, 255, 255, 0.18) 0 2px, transparent 2px 18px);

          opacity: 0.85;

          pointer-events: none;

          filter: blur(0.12cqw);

        }

        .card::after {

          content: '';

          position: absolute;

          inset: 0;

          background:

            repeating-linear-gradient(0deg, rgba(0, 0, 0, 0.014) 0 1px, transparent 1px 6px),

            repeating-linear-gradient(90deg, rgba(0, 0, 0, 0.012) 0 1px, transparent 1px 7px);

          opacity: 0.22;

          pointer-events: none;

          mix-blend-mode: multiply;

        }

        .frame {

          position: absolute;

          inset: 4.2cqw;

          border: 2px solid rgba(0, 0, 0, 0.6);

          pointer-events: none;

          z-index: 2;

        }

        .content {

          position: relative;

          z-index: 3;

          height: 100%;

          padding: 7.2cqw;

          padding-bottom: 6.2cqw;

          display: flex;

          flex-direction: column;

          align-items: center;

          text-align: center;

          color: var(--ink, #141414);

        }

        .smallTop {

          font-size: 2.15cqw;

          letter-spacing: 0.06em;

          margin-top: 1.8cqw;

          margin-bottom: 0.6cqw;

          color: rgba(0, 0, 0, 0.8);

        }

        .script {

          font-size: 9.6cqw;

          line-height: 1;

          margin: 0 0 3.2cqw;

          color: rgba(0, 0, 0, 0.86);

        }

        .photoBlock {

          width: 68cqw;

          aspect-ratio: 4 / 3;

          background: #fff;

          border: 0.9cqw solid rgba(255, 255, 255, 0.92);

          box-shadow: 0 1.4cqw 2.6cqw rgba(0, 0, 0, 0.14);

          margin-bottom: 3.4cqw;

          position: relative;

          overflow: hidden;

        }

        .photo-fill {

          position: absolute;

          inset: 0;

          background-size: cover;

          background-position: center;

          transform: scale(1.02);

        }

        .name {

          font-size: 6.3cqw;

          margin: 0 0 1.2cqw;

          color: rgba(0, 0, 0, 0.88);

        }

        .dates {

          font-weight: 600;

          font-size: 1.85cqw;

          letter-spacing: 0.12em;

          text-transform: uppercase;

          color: rgba(0, 0, 0, 0.75);

          margin: 0 0 2.4cqw;

        }

        .dash {

          width: 62cqw;

          border-top: 0.55cqw dashed rgba(0, 0, 0, 0.7);

          margin: 0 0 2.2cqw;

        }

        .service {

          font-weight: 600;

          font-size: 1.85cqw;

          letter-spacing: 0.1em;

          text-transform: uppercase;

          color: rgba(0, 0, 0, 0.78);

          margin: 0 0 2.1cqw;

        }

        .place {

          font-size: 2.55cqw;

          margin: 0 0 1cqw;

          color: rgba(0, 0, 0, 0.85);

        }

        .addr {

          font-size: 1.75cqw;

          color: rgba(0, 0, 0, 0.7);

          margin: 0;

          line-height: 1.45;

        }

        @supports (font-size: 1cqw) {

          .smallTop {

            font-size: clamp(12px, 2.15cqw, 16px);

          }

          .script {

            font-size: clamp(34px, 9.6cqw, 64px);

          }

          .name {

            font-size: clamp(20px, 6.3cqw, 40px);

          }

          .dates,

          .service,

          .addr {

            font-size: clamp(10px, 1.85cqw, 14px);

          }

          .place {

            font-size: clamp(13px, 2.55cqw, 18px);

          }

        }

        @media print {

          .floral-card-template {

            background: #fff;

          }

          .card {

            box-shadow: none;

            border-radius: 0;

            width: 100%;

          }

        }

      `}</style>

    </div>

  );

}



function InterfaithSkyDoves({ data, fonts, theme }: TemplateProps) {

  const { name, dates, tribute, titleLine, service, body, footer, notes, photoUrl } = data;

  const topScript = (titleLine || tribute || "In loving memory of").trim();

  const displayName = name?.trim() || "Jane Anderson";

  const displayDates = dates?.trim() || "June 21, 1980 - March 22, 2019";

  const inviteLines = [

    ...splitLines(tribute || body),

    ...splitLines(service),

  ].filter(Boolean);

  const inviteText = inviteLines.length > 0

    ? inviteLines.join('\n')

    : "THE ANDERSON FAMILY INVITE YOU\nTO JOIN THEM CELEBRATING OLIVIA'S LIFE\nAT A MEMORIAL SERVICE ON";

  const serviceLine = splitLines(service).pop() || "Sunday, March 25, 2018 at 10.00AM";

  const venue = splitLines(footer || notes)[0] || "Venue Name";

  const address = splitLines(footer || notes).slice(1).join('\n') || "123 Street Name City, State, 00000";



  const styleVars = {

    ...createStyleVars(theme),

    '--card-bg': theme?.background ?? '#ffffff',

    '--card-ink': theme?.text ?? '#121212',

  } as CSSProperties;



  return (

    <div className={`white-floral-card ${fonts.sans}`} style={styleVars}>

      <div className="card" role="img" aria-label="White floral memorial card">

        <div className="panel" aria-hidden />

        <div className="content">

          <h1 className={`topScript ${fonts.script}`}>{topScript}</h1>

          <div className="photo" aria-label={displayName ? `Portrait of ${displayName}` : 'Portrait photo'}>

            <div className="photo-fill memorial-card-portrait" style={{ backgroundImage: `url(${photoUrl})` }} />

          </div>

          <div className={`name ${fonts.script}`}>{displayName}</div>

          <p className="dates">{displayDates}</p>

          <p className="invite">

            {inviteText.split('\n').map((line, idx) => (

              <span key={`${line}-${idx}`}>

                {line}

                {idx < inviteText.split('\n').length - 1 ? <br /> : null}

              </span>

            ))}

          </p>

          <p className="serviceLine">{serviceLine}</p>

          <p className="venue">{venue}</p>

          <p className="address">

            {address.split('\n').map((line, idx) => (

              <span key={`${line}-${idx}`}>

                {line}

                {idx < address.split('\n').length - 1 ? <br /> : null}

              </span>

            ))}

          </p>

        </div>

      </div>

      <style jsx>{`

        .white-floral-card {

          width: 100%;

          height: 100%;

          color: var(--card-ink, #121212);

        }

        .card {

          width: min(665px, 100%);

          aspect-ratio: 3 / 4;

          position: relative;

          overflow: hidden;

          border-radius: 12px;

          background: var(--card-bg, #fff);

          box-shadow: 0 18px 70px rgba(0, 0, 0, 0.45);

          container-type: inline-size;

        }

        .card::before {

          content: '';

          position: absolute;

          inset: 0;

          background:

            radial-gradient(22cqw 18cqw at 18% 78%, rgba(0, 0, 0, 0.1), transparent 70%),

            radial-gradient(24cqw 20cqw at 42% 88%, rgba(0, 0, 0, 0.09), transparent 72%),

            radial-gradient(26cqw 22cqw at 72% 82%, rgba(0, 0, 0, 0.1), transparent 72%),

            radial-gradient(30cqw 26cqw at 86% 92%, rgba(0, 0, 0, 0.08), transparent 74%),

            radial-gradient(18cqw 14cqw at 10% 92%, rgba(0, 0, 0, 0.07), transparent 74%),

            linear-gradient(180deg, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 1) 52%, rgba(255, 255, 255, 0.8) 72%, rgba(255, 255, 255, 0.55) 100%);

          filter: blur(0.35cqw);

          opacity: 0.95;

          pointer-events: none;

        }

        .card::after {

          content: '';

          position: absolute;

          inset: 0;

          background:

            repeating-linear-gradient(0deg, rgba(0, 0, 0, 0.012) 0 1px, transparent 1px 7px),

            repeating-linear-gradient(90deg, rgba(0, 0, 0, 0.01) 0 1px, transparent 1px 9px);

          opacity: 0.18;

          pointer-events: none;

          mix-blend-mode: multiply;

        }

        .panel {

          position: absolute;

          inset: 4.6cqw;

          background: rgba(255, 255, 255, 0.92);

          border-radius: 6px;

          box-shadow: 0 1.2cqw 2.2cqw rgba(0, 0, 0, 0.1);

        }

        .panel::before {

          content: '';

          position: absolute;

          inset: 2.4cqw;

          border: 1px solid rgba(0, 0, 0, 0.1);

          border-radius: 4px;

          pointer-events: none;

        }

        .content {

          position: relative;

          z-index: 2;

          height: 100%;

          padding: 6.4cqw 6.4cqw 5.6cqw;

          display: flex;

          flex-direction: column;

          align-items: center;

          text-align: center;

        }

        .topScript {

          font-size: 5.2cqw;

          margin: 0 0 3cqw;

          color: rgba(0, 0, 0, 0.78);

        }

        .photo {

          width: 44cqw;

          aspect-ratio: 4 / 5;

          background: #ddd;

          box-shadow: 0 1.4cqw 2.8cqw rgba(0, 0, 0, 0.14);

          border: 0.9cqw solid rgba(255, 255, 255, 0.95);

          margin-bottom: 3.2cqw;

          overflow: hidden;

          position: relative;

        }

        .photo-fill {

          position: absolute;

          inset: 0;

          background-size: cover;

          background-position: center;

          transform: scale(1.02);

        }

        .name {

          font-size: 7.2cqw;

          margin: 0 0 1.6cqw;

          color: rgba(0, 0, 0, 0.86);

        }

        .dates {

          font-size: 1.7cqw;

          font-weight: 700;

          letter-spacing: 0.12em;

          text-transform: uppercase;

          color: rgba(0, 0, 0, 0.75);

          margin: 0 0 2.6cqw;

        }

        .invite {

          font-size: 1.6cqw;

          line-height: 1.55;

          letter-spacing: 0.04em;

          text-transform: uppercase;

          color: rgba(0, 0, 0, 0.62);

          margin: 0 0 2.6cqw;

          max-width: 78cqw;

        }

        .serviceLine {

          font-size: 1.65cqw;

          font-weight: 800;

          letter-spacing: 0.1em;

          text-transform: uppercase;

          color: rgba(0, 0, 0, 0.78);

          margin: 0 0 3.2cqw;

        }

        .venue {

          font-size: 2.2cqw;

          font-weight: 800;

          margin: 0 0 1cqw;

          color: rgba(0, 0, 0, 0.85);

        }

        .address {

          font-size: 1.55cqw;

          color: rgba(0, 0, 0, 0.62);

          margin: 0;

          line-height: 1.45;

        }

        .invite span,

        .address span {

          display: inline-block;

          width: 100%;

        }

        @supports (font-size: 1cqw) {

          .topScript {

            font-size: clamp(18px, 5.2cqw, 42px);

          }

          .name {

            font-size: clamp(22px, 7.2cqw, 54px);

          }

          .dates {

            font-size: clamp(10px, 1.7cqw, 14px);

          }

          .invite {

            font-size: clamp(10px, 1.6cqw, 14px);

          }

          .serviceLine {

            font-size: clamp(10px, 1.65cqw, 14px);

          }

          .venue {

            font-size: clamp(14px, 2.2cqw, 20px);

          }

          .address {

            font-size: clamp(10px, 1.55cqw, 13px);

          }

        }

        @media print {

          .card {

            box-shadow: none;

            border-radius: 0;

            width: 100%;

          }

          .panel {

            box-shadow: none;

          }

        }

      `}</style>

    </div>

  );

}





function Dove({ className }: { className?: string }) {

  return (

    <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>

      <path d="M50 20c-7 4-13 3-18-2 0 8-6 14-14 15 5 4 12 7 20 7 7 0 13-3 18-9 2-3 2-8-6-11z" fill="rgba(255,255,255,.9)" />

      <path d="M20 33c6-2 10-7 10-15-6 4-12 9-10 15z" fill="rgba(255,255,255,.7)" />

    </svg>

  );

}





function splitLines(value?: string) {

  if (!value) {

    return [] as string[];

  }

  return value

    .replace(/<br\s*\/?\s*>/gi, "\n")

    .split(/\r?\n/)

    .map((line) => line.trim())

    .filter(Boolean);

}


