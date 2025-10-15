import { NextResponse } from "next/server";
import { getCanvaConfig } from "@/lib/canva/config";
import { createCodeChallenge, createCodeVerifier, createState } from "@/lib/canva/pkce";
import { storePkceSession } from "@/lib/canva/session";

export const dynamic = "force-dynamic";
export const revalidate = 0;

type StartRequestBody = {
  returnTo?: string;
};

export async function POST(request: Request) {
  let config: ReturnType<typeof getCanvaConfig>;
  try {
    config = getCanvaConfig();
  } catch (error) {
    console.error("Canva integration is not configured", error);
    return NextResponse.json({ error: "canva_not_configured" }, { status: 503 });
  }

  const body = (await request.json().catch(() => ({}))) as StartRequestBody;

  const state = createState();
  const codeVerifier = createCodeVerifier();
  const codeChallenge = createCodeChallenge(codeVerifier);

  storePkceSession({
    state,
    codeVerifier,
    returnTo: body.returnTo,
    createdAt: Date.now(),
  });

  const params = new URLSearchParams({
    client_id: config.clientId,
    redirect_uri: config.redirectUri,
    response_type: "code",
    scope: config.scopes.join(" "),
    state,
    code_challenge: codeChallenge,
    code_challenge_method: "S256",
  });

  return NextResponse.json({ authorizeUrl: `${config.authorizeUrl}?${params.toString()}` });
}

