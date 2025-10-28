import { NextResponse } from "next/server";
import { getCanvaConfig, resolveRedirectUri } from "@/lib/canva/config";
import { createCodeChallenge, createCodeVerifier, createState } from "@/lib/canva/pkce";
import { storePkceSession } from "@/lib/canva/session";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const FALLBACK_RETURN_PATH = "/order-of-service";

type StartRequestBody = {
  returnTo?: string;
};

type StartErrorCode = "canva_not_configured" | "invalid_authorize_url";

type StartResult =
  | { type: "ok"; authorizeUrl: string; requestOrigin: string; returnTo?: string }
  | {
      type: "error";
      response: NextResponse;
      requestOrigin: string;
      returnTo?: string;
      reason: string;
      code: StartErrorCode;
    };

function sanitizeReturnPath(returnTo: string | undefined, origin: string, fallback = FALLBACK_RETURN_PATH): string {
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
  const escapedUrl = escapeHtml(targetUrl.toString());
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

function buildAuthorizeUrl(request: Request, returnTo?: string): StartResult {
  let config: ReturnType<typeof getCanvaConfig>;
  try {
    config = getCanvaConfig();
  } catch (error) {
    console.error("Canva integration is not configured", error);
    return {
      type: "error",
      response: NextResponse.json({ error: "canva_not_configured" }, { status: 503 }),
      requestOrigin: new URL(request.url).origin,
      returnTo,
      reason:
        "Canva integration is not configured. Please set CANVA_CLIENT_ID, CANVA_CLIENT_SECRET, CANVA_SESSION_SECRET, and CANVA_REDIRECT_URI.",
      code: "canva_not_configured",
    };
  }

  const requestUrl = new URL(request.url);
  const originHeader = request.headers.get("origin");
  const requestOrigin = originHeader ?? requestUrl.origin;
  const redirectUri = resolveRedirectUri(config, requestOrigin);

  const state = createState();
  const codeVerifier = createCodeVerifier();
  const codeChallenge = createCodeChallenge(codeVerifier);

  storePkceSession({
    state,
    codeVerifier,
    returnTo,
    redirectUri,
    createdAt: Date.now(),
  });

  const params = new URLSearchParams({
    client_id: config.clientId,
    redirect_uri: redirectUri,
    response_type: "code",
    scope: config.scopes.join(" "),
    state,
    code_challenge: codeChallenge,
    code_challenge_method: "S256",
  });

  const authorizeHref = `${config.authorizeUrl}?${params.toString()}`;

  let resolvedAuthorizeUrl: URL;
  try {
    resolvedAuthorizeUrl = new URL(authorizeHref);
  } catch {
    const reason = `Could not build Canva authorize URL from \\"${config.authorizeUrl}\\". Please verify CANVA_AUTHORIZE_URL.`;
    console.error(reason);
    return {
      type: "error",
      response: NextResponse.json({ error: "invalid_authorize_url" }, { status: 500 }),
      requestOrigin,
      returnTo,
      reason,
      code: "invalid_authorize_url",
    };
  }

  if (resolvedAuthorizeUrl.origin === requestOrigin) {
    const reason = `Configured Canva authorize URL \\"${config.authorizeUrl}\\" resolves to this site (${requestOrigin}). It must point to https://www.canva.com/api/oauth/authorize.`;
    console.error(reason);
    return {
      type: "error",
      response: NextResponse.json({ error: "invalid_authorize_url" }, { status: 500 }),
      requestOrigin,
      returnTo,
      reason,
      code: "invalid_authorize_url",
    };
  }

  return { type: "ok", authorizeUrl: resolvedAuthorizeUrl.toString(), requestOrigin, returnTo };
}

export async function POST(request: Request) {
  const body = (await request.json().catch(() => ({}))) as StartRequestBody;
  const result = buildAuthorizeUrl(request, body.returnTo);
  if (result.type === "error") {
    return result.response;
  }
  return NextResponse.json({ authorizeUrl: result.authorizeUrl });
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const returnTo = url.searchParams.get("returnTo") ?? undefined;
  const result = buildAuthorizeUrl(request, returnTo);
  if (result.type === "error") {
    const redirectPath = sanitizeReturnPath(returnTo, result.requestOrigin);
    const redirectUrl = new URL(redirectPath, result.requestOrigin);
    redirectUrl.searchParams.set("canvaStatus", "error");
    redirectUrl.searchParams.set("reason", result.reason);
    redirectUrl.searchParams.set("reasonCode", result.code);

    return htmlRedirectResponse(redirectUrl, result.reason);
  }

  return NextResponse.redirect(result.authorizeUrl);
}