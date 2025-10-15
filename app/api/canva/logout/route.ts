import { NextResponse } from "next/server";
import { clearCanvaSession, clearPkceSession } from "@/lib/canva/session";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function POST() {
  clearPkceSession();
  clearCanvaSession();
  return NextResponse.json({ ok: true });
}
