import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { sendCoordinatorEmail } from "@/lib/email";

export async function POST(request: Request) {
  const data = await request.json();
  const { name, phone, email, faith, message, urgent } = data ?? {};

  if (!name || !phone) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const saved = await prisma.message.create({
    data: {
      name,
      phone,
      email,
      body: message ?? "",
      urgent: Boolean(urgent),
    },
  });

  await sendCoordinatorEmail(
    `New ${urgent ? "URGENT " : ""}Contact: ${name}`,
    `<p><b>Name:</b> ${name}<br/><b>Phone:</b> ${phone}<br/><b>Email:</b> ${email ?? "-"}<br/><b>Faith:</b> ${faith ?? "-"}<br/><b>Urgent:</b> ${urgent ? "Yes" : "No"}</p><p>${message ?? ""}</p>`
  );

  return NextResponse.json({ ok: true, id: saved.id });
}
