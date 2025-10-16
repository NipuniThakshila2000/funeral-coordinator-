import { createRemoteJWKSet, jwtVerify, type JWTPayload } from "jose";

import { tryGetCanvaConfig } from "./config";

const DEFAULT_JWKS_URL = "https://api.canva.com/rest/v1/developer/connect/jwks";
const DEFAULT_ISSUER = "https://www.canva.com/connect";

let cachedJwks: ReturnType<typeof createRemoteJWKSet> | null = null;

async function getJwks() {
  if (!cachedJwks) {
    const jwksUrl = process.env.CANVA_JWKS_URL ?? DEFAULT_JWKS_URL;
    cachedJwks = createRemoteJWKSet(new URL(jwksUrl));
  }
  return cachedJwks;
}

export type CanvaCorrelationPayload = JWTPayload & {
  correlation_state?: unknown;
  correlation_id?: string;
};

export type CorrelationVerificationResult = {
  payload: CanvaCorrelationPayload;
};

export async function verifyCorrelationJwt(token: string): Promise<CorrelationVerificationResult> {
  if (!token || typeof token !== "string") {
    throw new Error("Correlation JWT is required");
  }

  const jwks = await getJwks();
  const config = tryGetCanvaConfig();

  const { payload } = await jwtVerify(token, jwks, {
    issuer: process.env.CANVA_JWT_ISSUER ?? DEFAULT_ISSUER,
    audience: config?.clientId,
  });

  return {
    payload: payload as CanvaCorrelationPayload,
  };
}

export function extractCorrelationState(payload: CanvaCorrelationPayload) {
  return payload.correlation_state ?? null;
}

