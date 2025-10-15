import { tryGetCanvaConfig, type CanvaConfig } from "./config";
import {
  CanvaSession,
  clearCanvaSession,
  readCanvaSession,
  shouldRefresh,
  storeCanvaSession,
} from "./session";

export class CanvaApiError extends Error {
  status: number;
  body: unknown;

  constructor(message: string, status: number, body: unknown) {
    super(message);
    this.name = "CanvaApiError";
    this.status = status;
    this.body = body;
  }
}

function requireCanvaConfig(): CanvaConfig {
  const config = tryGetCanvaConfig();
  if (!config) {
    throw new CanvaApiError("Canva integration is not configured", 503, { error: "missing_configuration" });
  }
  return config;
}

type RequestOptions = {
  method?: string;
  headers?: Record<string, string>;
  searchParams?: Record<string, string | number | boolean | undefined>;
  body?: unknown;
};

type TokenResponse = {
  access_token: string;
  token_type: string;
  expires_in: number;
  scope: string;
  refresh_token: string;
};

async function refreshAccessToken(session: CanvaSession): Promise<CanvaSession> {
  const config = requireCanvaConfig();
  const response = await fetch(config.tokenUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: session.refreshToken,
      client_id: config.clientId,
      client_secret: config.clientSecret,
    }),
  });

  if (!response.ok) {
    clearCanvaSession();
    throw new CanvaApiError("Failed to refresh Canva access token", response.status, await safeJson(response));
  }

  const tokenSet = (await response.json()) as TokenResponse;
  const refreshed: CanvaSession = {
    accessToken: tokenSet.access_token,
    refreshToken: tokenSet.refresh_token ?? session.refreshToken,
    tokenType: tokenSet.token_type,
    scope: tokenSet.scope,
    expiresAt: Date.now() + tokenSet.expires_in * 1000,
  };
  storeCanvaSession(refreshed);
  return refreshed;
}

async function safeJson(response: Response) {
  try {
    return await response.json();
  } catch {
    return null;
  }
}

async function resolveSession(): Promise<CanvaSession> {
  let session = readCanvaSession();
  if (!session) {
    throw new CanvaApiError("No Canva session", 401, null);
  }

  if (shouldRefresh(session)) {
    session = await refreshAccessToken(session);
  }

  return session;
}

function buildUrl(path: string, searchParams?: RequestOptions["searchParams"]): string {
  const config = requireCanvaConfig();
  const trimmed = path.startsWith("/") ? path : `/${path}`;
  const url = new URL(`${config.apiBaseUrl.replace(/\/$/, "")}${trimmed}`);
  if (searchParams) {
    Object.entries(searchParams).forEach(([key, value]) => {
      if (value === undefined || value === null) return;
      url.searchParams.set(key, String(value));
    });
  }
  return url.toString();
}

export async function callCanva<T = unknown>(path: string, options: RequestOptions = {}): Promise<T> {
  const session = await resolveSession();
  const url = buildUrl(path, options.searchParams);
  const headers: Record<string, string> = {
    Authorization: `${session.tokenType} ${session.accessToken}`,
    Accept: "application/json",
    ...options.headers,
  };

  let body: BodyInit | undefined;
  if (options.body !== undefined) {
    if (options.body instanceof FormData || options.body instanceof URLSearchParams) {
      body = options.body;
    } else {
      body = JSON.stringify(options.body);
      headers["Content-Type"] = headers["Content-Type"] ?? "application/json";
    }
  }

  const response = await fetch(url, {
    method: options.method ?? "GET",
    headers,
    body,
  });

  if (!response.ok) {
    if (response.status === 401 || response.status === 403) {
      clearCanvaSession();
    }
    throw new CanvaApiError("Canva API request failed", response.status, await safeJson(response));
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return (await response.json()) as T;
}

export async function exchangeAuthorizationCode(code: string, codeVerifier: string): Promise<CanvaSession> {
  const config = requireCanvaConfig();

  const response = await fetch(config.tokenUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "authorization_code",
      code,
      code_verifier: codeVerifier,
      redirect_uri: config.redirectUri,
      client_id: config.clientId,
      client_secret: config.clientSecret,
    }),
  });

  if (!response.ok) {
    throw new CanvaApiError("Failed to exchange Canva authorization code", response.status, await safeJson(response));
  }

  const tokenSet = (await response.json()) as TokenResponse;
  const session: CanvaSession = {
    accessToken: tokenSet.access_token,
    refreshToken: tokenSet.refresh_token,
    tokenType: tokenSet.token_type,
    scope: tokenSet.scope,
    expiresAt: Date.now() + tokenSet.expires_in * 1000,
  };
  storeCanvaSession(session);
  return session;
}


