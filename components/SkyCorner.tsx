import type { ComponentProps } from "react";

type SkyCornerProps = ComponentProps<"svg"> & {
  invert?: boolean;
};

export function SkyCorner({ invert, ...props }: SkyCornerProps) {
  return (
    <svg viewBox="0 0 300 300" aria-hidden focusable="false" {...props}>
      <defs>
        <linearGradient id={`skyCorner-${invert ? "invert" : "default"}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="var(--card-gold)" />
          <stop offset="1" stopColor="var(--card-gold2)" />
        </linearGradient>
      </defs>
      <path
        d="M290 40 C250 50, 238 70, 246 92 C256 122, 280 118, 270 92 C260 70, 220 66, 180 78 C140 90, 120 120, 130 150 C144 192, 208 182, 208 148 C208 120, 160 118, 154 150 C148 186, 194 214, 252 206"
        fill="none"
        stroke={`url(#skyCorner-${invert ? "invert" : "default"})`}
        strokeWidth={6}
        strokeLinecap="round"
      />
      <path
        d="M250 22 C226 34, 218 50, 230 66 C244 84, 270 82, 266 60"
        fill="none"
        stroke={`url(#skyCorner-${invert ? "invert" : "default"})`}
        strokeWidth={4}
        strokeLinecap="round"
        opacity={0.9}
      />
      <path
        d="M290 120 C270 140, 252 154, 230 160 C202 168, 182 164, 170 154"
        fill="none"
        stroke={`url(#skyCorner-${invert ? "invert" : "default"})`}
        strokeWidth={4}
        strokeLinecap="round"
        opacity={0.85}
      />
      <path d="M286 34 c-10 10-10 20 0 30 c10-10 10-20 0-30z" fill={`url(#skyCorner-${invert ? "invert" : "default"})`} opacity={0.95} />
      <path d="M270 28 c-8 8-8 16 0 24 c8-8 8-16 0-24z" fill={`url(#skyCorner-${invert ? "invert" : "default"})`} opacity={0.8} />
    </svg>
  );
}
