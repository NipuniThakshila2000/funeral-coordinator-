import { createHash, randomBytes } from "crypto";

function toBase64Url(buffer: Buffer) {
  return buffer
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

export function createState(length = 48): string {
  return toBase64Url(randomBytes(length));
}

export function createCodeVerifier(length = 64): string {
  return toBase64Url(randomBytes(length));
}

export function createCodeChallenge(codeVerifier: string): string {
  return toBase64Url(createHash("sha256").update(codeVerifier).digest());
}
