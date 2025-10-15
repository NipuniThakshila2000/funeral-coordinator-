import { NextRequest, NextResponse } from "next/server";
import { callCanva, CanvaApiError } from "@/lib/canva/api";
import type { CanvaExportJob } from "@/lib/canva/types";

export const dynamic = "force-dynamic";
export const revalidate = 0;

type RouteParams = {
  exportId: string;
};

export async function GET(_request: NextRequest, context: { params: RouteParams }) {
  const exportId = context.params.exportId;
  if (!exportId) {
    return NextResponse.json({ error: "exportId_required" }, { status: 400 });
  }

  try {
    const job = await callCanva<{ job: CanvaExportJob }>(`/v1/exports/${exportId}`);
    return NextResponse.json(job);
  } catch (error) {
    if (error instanceof CanvaApiError) {
      return NextResponse.json(
        { error: error.body ?? { message: error.message } },
        { status: error.status }
      );
    }

    console.error("Failed to fetch Canva export job", error);
    return NextResponse.json({ error: "unexpected_error" }, { status: 500 });
  }
}
