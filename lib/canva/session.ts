import { cookies } from "next/headers";
import { createHmac, timingSafeEqual } from "crypto";
import { tryGetCanvaConfig } from "./config";

const SESSION_COOKIE = "canva_session";
const PKCE_COOKIE = "canva_pkce";

export type CanvaSession = {
  accessToken: string;
  refreshToken: string;
  expiresAt: number;
  scope: string;
  tokenType: string;
};

export type PkceSession = {
  state: string;
  codeVerifier: string;
  returnTo?: string;
  redirectUri?: string;
  createdAt: number;
};


function base64UrlEncode(input: string): string {
  return Buffer.from(input, "utf8").toString("base64url");
}

function base64UrlDecode(input: string): string {
  return Buffer.from(input, "base64url").toString("utf8");
}

function signPayload(payload: string, secret: string): string {
  return createHmac("sha256", secret).update(payload).digest("base64url");
}

function serializeCookie<T>(data: T, secret: string): string {
  const payload = JSON.stringify(data);
  const signature = signPayload(payload, secret);
  return `${signature}.${base64UrlEncode(payload)}`;
}

function deserializeCookie<T>(value: string, secret: string): T | null {
  const [providedSignature, encodedPayload] = value.split(".");
  if (!providedSignature || !encodedPayload) {
    return null;
  }

  try {
    const payload = base64UrlDecode(encodedPayload);
    const expectedSignature = signPayload(payload, secret);
    const providedSig = Buffer.from(providedSignature, "base64url");
    const expectedSig = Buffer.from(expectedSignature, "base64url");
    if (providedSig.length !== expectedSig.length) {
      return null;
    }
    const signaturesMatch = timingSafeEqual(providedSig, expectedSig);

    if (!signaturesMatch) {
      return null;
    }

    return JSON.parse(payload) as T;
  } catch (error) {
    console.error("Failed to parse Canva cookie", error);
    return null;
  }
}

function isProduction() {
  return process.env.NODE_ENV === "production";
}

export function storePkceSession(pkce: PkceSession) {
  const config = tryGetCanvaConfig();
  if (!config) {
    return;
  }
  const value = serializeCookie(pkce, config.sessionSecret);
  cookies().set({
    name: PKCE_COOKIE,
    value,
    httpOnly: true,
    sameSite: "lax",
    secure: isProduction(),
    path: "/",
    maxAge: 10 * 60, // 10 minutes
  });
}

export function readPkceSession(): PkceSession | null {
  const config = tryGetCanvaConfig();
  if (!config) {
    return null;
  }
  const raw = cookies().get(PKCE_COOKIE)?.value;
  if (!raw) {
    return null;
  }
  return deserializeCookie<PkceSession>(raw, config.sessionSecret);
}

export function clearPkceSession() {
  cookies().delete(PKCE_COOKIE);
}

export function storeCanvaSession(session: CanvaSession) {
  const config = tryGetCanvaConfig();
  if (!config) {
    return;
  }
  const value = serializeCookie(session, config.sessionSecret);
  cookies().set({
    name: SESSION_COOKIE,
    value,
    httpOnly: true,
    sameSite: "lax",
    secure: isProduction(),
    path: "/",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  });
}

export function readCanvaSession(): CanvaSession | null {
  const config = tryGetCanvaConfig();
  if (!config) {
    return null;
  }
  const raw = cookies().get(SESSION_COOKIE)?.value;
  if (!raw) {
    return null;
  }
  return deserializeCookie<CanvaSession>(raw, config.sessionSecret);
}

export function clearCanvaSession() {
  cookies().delete(SESSION_COOKIE);
}

export function isSessionExpired(session: CanvaSession): boolean {
  return Date.now() > session.expiresAt;
}

export function shouldRefresh(session: CanvaSession): boolean {
  return Date.now() > session.expiresAt - 2 * 60 * 1000; // refresh 2 minutes before expiry
}





