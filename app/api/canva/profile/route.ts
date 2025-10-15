import { NextResponse } from "next/server";
import { callCanva, CanvaApiError } from "@/lib/canva/api";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  try {
    const profile = await callCanva<{ profile: { display_name?: string } }>("/v1/users/me/profile");
    return NextResponse.json(profile);
  } catch (error) {
    if (error instanceof CanvaApiError) {
      return NextResponse.json(
        { error: error.body ?? { message: error.message } },
        { status: error.status }
      );
    }

    console.error("Unexpected Canva profile error", error);
    return NextResponse.json({ error: "unexpected_error" }, { status: 500 });
  }
}
