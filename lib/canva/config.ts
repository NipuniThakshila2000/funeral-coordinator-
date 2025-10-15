const DEFAULT_SCOPES = [
  "profile:read",
  "design:meta:read",
  "design:content:read",
  "design:content:write",
  "brandtemplate:meta:read",
  "brandtemplate:content:read",
];

export type CanvaConfig = {
  clientId: string;
  clientSecret: string;
  redirectUri: string;
  authorizeUrl: string;
  tokenUrl: string;
  apiBaseUrl: string;
  scopes: string[];
  sessionSecret: string;
};

function readEnv(key: string, fallback?: string): string {
  const value = process.env[key] ?? fallback;
  if (!value || !value.trim()) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
  return value;
}

export function getCanvaConfig(): CanvaConfig {
  const scopes = (process.env.CANVA_SCOPES ?? DEFAULT_SCOPES.join(" "))
    .split(/[,\s]+/)
    .map((scope) => scope.trim())
    .filter(Boolean);

  if (scopes.length === 0) {
    throw new Error("CANVA_SCOPES must include at least one scope");
  }

  return {
    clientId: readEnv("CANVA_CLIENT_ID"),
    clientSecret: readEnv("CANVA_CLIENT_SECRET"),
    redirectUri: readEnv("CANVA_REDIRECT_URI"),
    authorizeUrl: process.env.CANVA_AUTHORIZE_URL ?? "https://www.canva.com/api/oauth/authorize",
    tokenUrl: process.env.CANVA_TOKEN_URL ?? "https://api.canva.com/rest/v1/oauth/token",
    apiBaseUrl: process.env.CANVA_API_URL ?? "https://api.canva.com/rest",
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
