import { NextRequest, NextResponse } from "next/server";
import { exchangeAuthorizationCode } from "@/lib/canva/api";
import { clearCanvaSession, clearPkceSession, readPkceSession } from "@/lib/canva/session";

export const dynamic = "force-dynamic";
export const revalidate = 0;

function sanitizeReturnPath(returnTo: string | undefined, origin: string, fallback = "/order-of-service"): string {
  if (!returnTo) {
    return fallback;
  }

  try {
    const url = new URL(returnTo, origin);
    if (url.origin !== origin) {
      return fallback;
    }
    return `${url.pathname}${url.search}${url.hash}`;
  } catch {
    return fallback;
  }
}

export async function GET(request: NextRequest) {
  const { searchParams, origin } = request.nextUrl;
  const error = searchParams.get("error");
  const errorDescription = searchParams.get("error_description");
  const code = searchParams.get("code");
  const state = searchParams.get("state") ?? "";

  const pkce = readPkceSession();

  const redirectPath = sanitizeReturnPath(pkce?.returnTo, origin);
  const redirectUrl = new URL(redirectPath, origin);

  if (!pkce || pkce.state !== state) {
    clearPkceSession();
    clearCanvaSession();
    redirectUrl.searchParams.set("canvaStatus", "error");
    redirectUrl.searchParams.set("reason", "state_mismatch");
    return NextResponse.redirect(redirectUrl);
  }

  if (error) {
    clearPkceSession();
    clearCanvaSession();
    redirectUrl.searchParams.set("canvaStatus", "error");
    redirectUrl.searchParams.set("reason", errorDescription ?? error);
    return NextResponse.redirect(redirectUrl);
  }

  if (!code) {
    clearPkceSession();
    clearCanvaSession();
    redirectUrl.searchParams.set("canvaStatus", "error");
    redirectUrl.searchParams.set("reason", "missing_code");
    return NextResponse.redirect(redirectUrl);
  }

  try {
    await exchangeAuthorizationCode(code, pkce.codeVerifier);
    redirectUrl.searchParams.set("canvaStatus", "connected");
  } catch (error) {
    console.error("Canva authorization code exchange failed", error);
    clearCanvaSession();
    redirectUrl.searchParams.set("canvaStatus", "error");
    redirectUrl.searchParams.set("reason", "token_exchange_failed");
  } finally {
    clearPkceSession();
  }

  return NextResponse.redirect(redirectUrl);
}
