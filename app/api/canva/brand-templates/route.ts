import { NextRequest, NextResponse } from "next/server";
import { callCanva, CanvaApiError } from "@/lib/canva/api";
import type { CanvaBrandTemplate } from "@/lib/canva/types";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get("query") ?? undefined;
  const continuation = request.nextUrl.searchParams.get("continuation") ?? undefined;
  const sortBy = request.nextUrl.searchParams.get("sort_by") ?? undefined;

  try {
    const templates = await callCanva<{ items: CanvaBrandTemplate[]; continuation?: string }>(
      "/v1/brand-templates",
      {
        searchParams: {
          query,
          continuation,
          sort_by: sortBy,
        },
      }
    );
    return NextResponse.json(templates);
  } catch (error) {
    if (error instanceof CanvaApiError) {
      return NextResponse.json(
        { error: error.body ?? { message: error.message } },
        { status: error.status }
      );
    }

    console.error("Failed to list Canva brand templates", error);
    return NextResponse.json({ error: "unexpected_error" }, { status: 500 });
  }
}
