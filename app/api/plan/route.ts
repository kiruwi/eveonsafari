import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

import { supabaseAdmin } from "@/lib/supabaseAdmin";

const isValidEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

async function parseBody(request: Request) {
  const contentType = request.headers.get("content-type") ?? "";

  if (contentType.includes("application/json")) {
    try {
      const data = await request.json();
      return (data as Record<string, unknown>) ?? null;
    } catch {
      return null;
    }
  }

  if (contentType.includes("application/x-www-form-urlencoded")) {
    const text = await request.text();
    return Object.fromEntries(new URLSearchParams(text));
  }

  try {
    const data = await request.json();
    return (data as Record<string, unknown>) ?? null;
  } catch {
    return null;
  }
}

const normalizeText = (value: unknown) =>
  typeof value === "string" ? value.trim() : "";

const normalizeOptionalText = (value: unknown) => {
  const text = normalizeText(value);
  return text.length ? text : null;
};

const normalizeGroupSize = (value: unknown) => {
  if (typeof value === "number" && Number.isFinite(value)) {
    return Math.max(1, Math.trunc(value));
  }
  if (typeof value === "string") {
    const parsed = Number.parseInt(value, 10);
    return Number.isNaN(parsed) ? null : Math.max(1, parsed);
  }
  return null;
};

const buildEmailBody = (payload: {
  fullName: string;
  email: string;
  travelDates: string | null;
  groupSize: number | null;
  interests: string | null;
  budgetRange: string | null;
  phone: string | null;
  packageSlug: string | null;
}) => {
  const safe = (value: string | number | null) =>
    value === null || value === "" ? "Not provided" : String(value);

  return [
    "New safari plan request",
    "",
    `Name: ${payload.fullName}`,
    `Email: ${payload.email}`,
    `Ideal travel dates: ${safe(payload.travelDates)}`,
    `Group size: ${safe(payload.groupSize)}`,
    `Interests: ${safe(payload.interests)}`,
    `Budget range: ${safe(payload.budgetRange)}`,
    `Phone/WhatsApp: ${safe(payload.phone)}`,
    `Package: ${safe(payload.packageSlug)}`,
  ].join("\n");
};

export async function POST(request: Request) {
  const body = await parseBody(request);
  const fullName = normalizeText(body?.fullName);
  const email = normalizeText(body?.email);

  if (!fullName) {
    return NextResponse.json(
      { ok: false, error: "Please enter your full name." },
      { status: 400 },
    );
  }

  if (!isValidEmail(email)) {
    return NextResponse.json(
      { ok: false, error: "Enter a valid email address." },
      { status: 400 },
    );
  }

  const travelDates = normalizeOptionalText(body?.travelDates);
  const groupSize = normalizeGroupSize(body?.groupSize);
  const interests = normalizeOptionalText(body?.interests);
  const budgetRange = normalizeOptionalText(body?.budgetRange);
  const phone = normalizeOptionalText(body?.phone);
  const packageSlug = normalizeOptionalText(body?.package);

  if (!travelDates) {
    return NextResponse.json(
      { ok: false, error: "Please provide your travel dates." },
      { status: 400 },
    );
  }

  if (!groupSize) {
    return NextResponse.json(
      { ok: false, error: "Please provide your group size." },
      { status: 400 },
    );
  }

  if (!interests) {
    return NextResponse.json(
      { ok: false, error: "Please select your interests." },
      { status: 400 },
    );
  }

  const destinations = [
    interests ? `Interests: ${interests}` : null,
    phone ? `Phone/WhatsApp: ${phone}` : null,
  ]
    .filter(Boolean)
    .join(" | ") || null;
  const wildlifeMoment = budgetRange ? `Budget range: ${budgetRange}` : null;

  const { error } = await supabaseAdmin.from("plan_requests").insert({
    full_name: fullName,
    email,
    travel_dates: travelDates,
    group_size: groupSize,
    destinations,
    wildlife_moment: wildlifeMoment,
    package_slug: packageSlug,
  });

  if (error) {
    return NextResponse.json(
      { ok: false, error: error.message },
      { status: 500 },
    );
  }

  const smtpHost = process.env.SMTP_HOST;
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;
  const smtpPort = Number.parseInt(process.env.SMTP_PORT ?? "", 10);
  const smtpSecureEnv = (process.env.SMTP_SECURE ?? "").toLowerCase();
  const smtpSecure =
    smtpSecureEnv === "true" || (!smtpSecureEnv && smtpPort === 465);
  const mailFrom = process.env.PLAN_EMAIL_FROM ?? smtpUser;
  const mailTo = process.env.PLAN_EMAIL_TO ?? smtpUser;

  let emailSent = false;

  if (smtpHost && smtpUser && smtpPass && mailFrom && mailTo && smtpPort) {
    try {
      const transporter = nodemailer.createTransport({
        host: smtpHost,
        port: smtpPort,
        secure: smtpSecure,
        auth: {
          user: smtpUser,
          pass: smtpPass,
        },
      });

      await transporter.sendMail({
        from: mailFrom,
        to: mailTo,
        replyTo: email,
        subject: `New safari plan request: ${fullName}`,
        text: buildEmailBody({
          fullName,
          email,
          travelDates,
          groupSize,
          interests,
          budgetRange,
          phone,
          packageSlug,
        }),
      });

      emailSent = true;
    } catch (sendError) {
      console.error("Plan form email failed:", sendError);
    }
  } else {
    console.error("Plan form email skipped: SMTP env vars are missing.");
  }

  return NextResponse.json({ ok: true, emailSent });
}
