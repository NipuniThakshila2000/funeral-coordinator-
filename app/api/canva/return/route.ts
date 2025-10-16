import { NextResponse } from "next/server";

import { extractCorrelationState, verifyCorrelationJwt } from "@/lib/canva/return-navigation";

export const dynamic = "force-dynamic";
export const revalidate = 0;

type RequestBody = {
  correlationJwt?: string;
};

export async function POST(request: Request) {
  let body: RequestBody = {};
  try {
    body = (await request.json()) as RequestBody;
  } catch (error) {
    console.error("Failed to parse correlation verification request", error);
  }

  const correlationJwt = body?.correlationJwt?.trim();

  if (!correlationJwt) {
    return NextResponse.json({ valid: false, error: "missing_jwt" }, { status: 400 });
  }

  try {
    const { payload } = await verifyCorrelationJwt(correlationJwt);
    const correlationState = extractCorrelationState(payload);

    return NextResponse.json({ valid: true, correlationState, payload });
  } catch (error) {
    console.error("Failed to verify correlation JWT", error);
    return NextResponse.json({ valid: false, error: "invalid_jwt" }, { status: 400 });
  }
}

