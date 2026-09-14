import { NextResponse } from "next/server";
import { contactSchema } from "@/lib/validations";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = contactSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message ?? "Invalid input" },
        { status: 400 },
      );
    }

    if (parsed.data.company) {
      return NextResponse.json({ ok: true });
    }

    // MVP: log enquiry. Connect Resend/Email later via env.
    console.info("[contact-enquiry]", {
      name: parsed.data.name,
      businessType: parsed.data.businessType,
      city: parsed.data.city,
      phone: parsed.data.phone,
      need: parsed.data.need,
      message: parsed.data.message,
      at: new Date().toISOString(),
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Unable to process enquiry" }, { status: 500 });
  }
}
