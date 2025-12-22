const DEFAULT_SCOPES = [
  "profile:read",
  "design:meta:read",
  "design:content:read",
  "design:content:write",
  "brandtemplate:meta:read",
  "brandtemplate:content:read",
];

const DEFAULT_AUTHORIZE_URL = "https://www.canva.com/api/oauth/authorize";
const DEFAULT_TOKEN_URL = "https://api.canva.com/rest/v1/oauth/token";
const DEFAULT_API_URL = "https://api.canva.com/rest";

const REDIRECT_DELIMITER = /[,;\s]+/;

export type CanvaConfig = {
  clientId: string;
  clientSecret: string;
  redirectUri: string;
  redirectUris: string[];
  authorizeUrl: string;
  tokenUrl: string;
  apiBaseUrl: string;
  scopes: string[];
  sessionSecret: string;
};

function stripWrappingQuotes(value: string): string {
  if (value.length >= 2) {
    const first = value[0];
    const last = value[value.length - 1];
    if ((first === '"' && last === '"') || (first === "'" && last === "'")) {
      return value.slice(1, -1);
    }
  }
  return value;
}

function readEnv(key: string, fallback?: string): string {
  const raw = process.env[key];
  const value = raw ?? fallback;
  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`);
  }

  const normalized = stripWrappingQuotes(value.trim());

  if (!normalized) {
    throw new Error(`Missing required environment variable: ${key}`);
  }

  return normalized;
}

function parseRedirectUris(raw: string): string[] {
  return raw
    .split(REDIRECT_DELIMITER)
    .map((uri) => uri.trim())
    .filter(Boolean);
}

function readOptionalUrl(key: string, fallback: string): string {
  const raw = process.env[key];
  if (raw === undefined) {
    return fallback;
  }

  const trimmed = stripWrappingQuotes(raw.trim());
  const normalized = trimmed.startsWith("=") ? trimmed.slice(1) : trimmed;

  if (!normalized) {
    return fallback;
  }

  try {
    // Validate that the provided value is a fully qualified URL.
    new URL(normalized);
    return normalized;
  } catch {
    console.warn(`Ignoring invalid ${key} value "${normalized}". Using fallback.`);
    return fallback;
  }
}

export function getCanvaConfig(): CanvaConfig {
  const scopes = (process.env.CANVA_SCOPES ?? DEFAULT_SCOPES.join(" "))
    .split(/[,\s]+/)
    .map((scope) => scope.trim())
    .filter(Boolean);

  if (scopes.length === 0) {
    throw new Error("CANVA_SCOPES must include at least one scope");
  }

  const redirectEnv = readEnv("CANVA_REDIRECT_URI");
  const redirectUris = parseRedirectUris(redirectEnv);

  if (redirectUris.length === 0) {
    throw new Error("CANVA_REDIRECT_URI must include at least one URI");
  }

  return {
    clientId: readEnv("CANVA_CLIENT_ID"),
    clientSecret: readEnv("CANVA_CLIENT_SECRET"),
    redirectUri: redirectUris[0],
    redirectUris,
    authorizeUrl: readOptionalUrl("CANVA_AUTHORIZE_URL", DEFAULT_AUTHORIZE_URL),
    tokenUrl: readOptionalUrl("CANVA_TOKEN_URL", DEFAULT_TOKEN_URL),
    apiBaseUrl: readOptionalUrl("CANVA_API_URL", DEFAULT_API_URL),
    scopes,
    sessionSecret: readEnv("CANVA_SESSION_SECRET"),
  };
}

export function tryGetCanvaConfig(): CanvaConfig | null {
  try {
    return getCanvaConfig();
  } catch (error) {
    if (process.env.NODE_ENV !== "production") {
      console.warn("Canva integration is not fully configured:", (error as Error).message);
    }
    return null;
  }
}

export function resolveRedirectUri(config: CanvaConfig, preferredOrigin?: string | null): string {
  if (!preferredOrigin) {
    return config.redirectUri;
  }

  for (const candidate of config.redirectUris) {
    try {
      const candidateOrigin = new URL(candidate).origin;
      if (candidateOrigin === preferredOrigin) {
        return candidate;
      }
    } catch {
      // ignore malformed URI entries
    }
  }

  return config.redirectUri;
}
