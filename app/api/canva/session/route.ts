import { NextResponse } from "next/server";
import { readCanvaSession } from "@/lib/canva/session";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  const session = readCanvaSession();
  if (!session) {
    return NextResponse.json({ connected: false });
  }
  return NextResponse.json({ connected: true, expiresAt: session.expiresAt, scope: session.scope });
}
