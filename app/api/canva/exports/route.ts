import { NextResponse } from "next/server";
import { callCanva, CanvaApiError } from "@/lib/canva/api";
import type { CanvaExportFormat, CanvaExportJob } from "@/lib/canva/types";

export const dynamic = "force-dynamic";
export const revalidate = 0;

type ExportRequestBody = {
  designId: string;
  format?: CanvaExportFormat;
  pages?: number[];
  pdf?: {
    size?: string;
    quality?: "standard" | "high";
  };
};

function buildFormatPayload(body: ExportRequestBody) {
  const format = body.format ?? "pdf";
  const payload: Record<string, unknown> = { type: format };

  if (body.pages && body.pages.length > 0) {
    payload.pages = body.pages;
  }

  if (format === "pdf" && body.pdf) {
    if (body.pdf.size) {
      payload.size = body.pdf.size;
    }
    if (body.pdf.quality) {
      payload.export_quality = body.pdf.quality;
    }
  }

  return payload;
}

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as ExportRequestBody | null;

  if (!body || !body.designId) {
    return NextResponse.json({ error: "designId_required" }, { status: 400 });
  }

  try {
    const response = await callCanva<{ job: CanvaExportJob }>("/v1/exports", {
      method: "POST",
      body: {
        design_id: body.designId,
        format: buildFormatPayload(body),
      },
    });

    return NextResponse.json(response);
  } catch (error) {
    if (error instanceof CanvaApiError) {
      return NextResponse.json(
        { error: error.body ?? { message: error.message } },
        { status: error.status }
      );
    }

    console.error("Failed to create Canva export job", error);
    return NextResponse.json({ error: "unexpected_error" }, { status: 500 });
  }
}
