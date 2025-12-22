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

function escapeHtml(input: string): string {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function htmlRedirectResponse(targetUrl: URL, message = "Redirecting...") {
  const url = targetUrl.toString();
  const escapedUrl = escapeHtml(url);
  const escapedMessage = escapeHtml(message);

  const html = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>Redirecting...</title>
    <meta http-equiv="refresh" content="0; url=${escapedUrl}" />
    <style>
      body { font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; line-height: 1.6; padding: 3rem 1.5rem; text-align: center; }
      a { color: #0b5ed7; text-decoration: none; font-weight: 600; }
    </style>
  </head>
  <body>
    <p>${escapedMessage}</p>
    <p><a href="${escapedUrl}">Continue</a></p>
    <script>window.location.href = "${escapedUrl}";</script>
  </body>
</html>`;

  return new NextResponse(html, {
    status: 200,
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });
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
    return htmlRedirectResponse(redirectUrl, "We could not validate your Canva session. Redirecting...");
  }

  if (error) {
    clearPkceSession();
    clearCanvaSession();
    redirectUrl.searchParams.set("canvaStatus", "error");
    redirectUrl.searchParams.set("reason", errorDescription ?? error);
    return htmlRedirectResponse(redirectUrl, "Canva reported an error. Redirecting...");
  }

  if (!code) {
    clearPkceSession();
    clearCanvaSession();
    redirectUrl.searchParams.set("canvaStatus", "error");
    redirectUrl.searchParams.set("reason", "missing_code");
    return htmlRedirectResponse(redirectUrl, "Missing authorization code from Canva. Redirecting...");
  }

  try {
    await exchangeAuthorizationCode(code, pkce.codeVerifier, pkce.redirectUri);
    redirectUrl.searchParams.set("canvaStatus", "connected");
  } catch (exchangeError) {
    console.error("Canva authorization code exchange failed", exchangeError);
    clearCanvaSession();
    redirectUrl.searchParams.set("canvaStatus", "error");
    redirectUrl.searchParams.set("reason", "token_exchange_failed");
  } finally {
    clearPkceSession();
  }

  return htmlRedirectResponse(redirectUrl, "Returning to Funeral Coordinator...");
}


