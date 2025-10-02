import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { sendCoordinatorEmail } from "@/lib/email";

export async function POST(request: Request) {
  const { name, phone, email, faithSlug, packageId, message, urgent } = await request.json();

  if (!name || !phone || !faithSlug) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const booking = await prisma.booking.create({
    data: {
      name,
      phone,
      email,
      faithSlug,
      packageId,
      message,
      urgent: Boolean(urgent),
    },
  });

  await sendCoordinatorEmail(
    `New ${urgent ? "URGENT " : ""}Booking: ${name}`,
    `<p>${name} (${phone})<br/>Faith: ${faithSlug}<br/>Package: ${packageId ?? "-"}</p><p>${message ?? ""}</p>`
  );

  return NextResponse.json({ ok: true, id: booking.id });
}
