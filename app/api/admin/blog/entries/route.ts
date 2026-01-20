import { NextResponse } from "next/server";

import { normalizeSlug } from "@/lib/blog";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

const allowedAdminEmail = "iankcheruiyot@gmail.com";

const getBearerToken = (request: Request) => {
  const header = request.headers.get("authorization") ?? "";
  if (!header.toLowerCase().startsWith("bearer ")) {
    return null;
  }
  return header.slice(7).trim();
};

const requireAuth = async (request: Request) => {
  const token = getBearerToken(request);
  if (!token) {
    return { error: NextResponse.json({ error: "Unauthorized" }, { status: 401 }) };
  }

  const { data, error } = await supabaseAdmin.auth.getUser(token);
  if (error || !data?.user) {
    return { error: NextResponse.json({ error: "Unauthorized" }, { status: 401 }) };
  }
  const userEmail = (data.user.email ?? "").toLowerCase();
  if (userEmail !== allowedAdminEmail) {
    return { error: NextResponse.json({ error: "Forbidden" }, { status: 403 }) };
  }

  return { user: data.user };
};

const toText = (value: unknown) => (typeof value === "string" ? value.trim() : "");
const toOptionalText = (value: unknown) => {
  const text = toText(value);
  return text.length ? text : null;
};
const toStatus = (value: unknown) => (value === "draft" ? "draft" : "published");

export async function GET(request: Request) {
  const auth = await requireAuth(request);
  if ("error" in auth) return auth.error;

  const { data, error } = await supabaseAdmin
    .from("blog_entries")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Admin blog entries fetch failed:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ data });
}

export async function POST(request: Request) {
  const auth = await requireAuth(request);
  if ("error" in auth) return auth.error;

  const body = await request.json().catch(() => null);
  const articleId = toText(body?.article_id);
  const title = toText(body?.title);
  const slugInput = toText(body?.slug);
  const slug = normalizeSlug(slugInput || title);
  const category = toText(body?.category);
  const location = toOptionalText(body?.location);
  const content = toText(body?.content_markdown);
  const featuredImage = toOptionalText(body?.featured_image_url);
  const status = toStatus(body?.status);

  if (!articleId || !title || !slug || !category || !content) {
    return NextResponse.json(
      { error: "Missing required fields." },
      { status: 400 },
    );
  }

  const { error } = await supabaseAdmin.from("blog_entries").insert({
    article_id: articleId,
    title,
    slug,
    category,
    location,
    content_markdown: content,
    featured_image_url: featuredImage,
    status,
  });

  if (error) {
    console.error("Failed to create entry:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}

export async function PATCH(request: Request) {
  const auth = await requireAuth(request);
  if ("error" in auth) return auth.error;

  const body = await request.json().catch(() => null);
  const id = toText(body?.id);
  const articleId = toText(body?.article_id);
  const title = toText(body?.title);
  const slugInput = toText(body?.slug);
  const slug = normalizeSlug(slugInput || title);
  const category = toText(body?.category);
  const location = toOptionalText(body?.location);
  const content = toText(body?.content_markdown);
  const featuredImage = toOptionalText(body?.featured_image_url);
  const status = toStatus(body?.status);

  if (!id || !articleId || !title || !slug || !category || !content) {
    return NextResponse.json(
      { error: "Missing required fields." },
      { status: 400 },
    );
  }

  const { error } = await supabaseAdmin
    .from("blog_entries")
    .update({
      article_id: articleId,
      title,
      slug,
      category,
      location,
      content_markdown: content,
      featured_image_url: featuredImage,
      status,
    })
    .eq("id", id);

  if (error) {
    console.error("Failed to update entry:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
