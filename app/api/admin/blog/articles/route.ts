import { NextResponse } from "next/server";

import { supabaseAdmin } from "@/lib/supabaseAdmin";

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

  return { user: data.user };
};

const toText = (value: unknown) => (typeof value === "string" ? value.trim() : "");
const toOptionalText = (value: unknown) => {
  const text = toText(value);
  return text.length ? text : null;
};
const toStatus = (value: unknown) => (value === "published" ? "published" : "draft");

export async function GET(request: Request) {
  const auth = await requireAuth(request);
  if ("error" in auth) return auth.error;

  const { data, error } = await supabaseAdmin
    .from("blog_articles")
    .select("*")
    .order("updated_at", { ascending: false })
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Admin blog articles fetch failed:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ data });
}

export async function POST(request: Request) {
  const auth = await requireAuth(request);
  if ("error" in auth) return auth.error;

  const body = await request.json().catch(() => null);
  const title = toText(body?.title);
  const slug = toText(body?.slug);
  const excerpt = toOptionalText(body?.excerpt);
  const coverImage = toOptionalText(body?.cover_image_url);
  const intro = toOptionalText(body?.intro);
  const content = toText(body?.content_markdown);
  const authorName = toOptionalText(body?.author_name);
  const status = toStatus(body?.status);

  if (!title || !slug || !content) {
    return NextResponse.json(
      { error: "Missing required fields." },
      { status: 400 },
    );
  }

  const publishedAt =
    status === "published" ? new Date().toISOString() : null;

  const { error } = await supabaseAdmin.from("blog_articles").insert({
    title,
    slug,
    excerpt,
    cover_image_url: coverImage,
    intro,
    content_markdown: content,
    status,
    published_at: publishedAt,
    author_name: authorName,
  });

  if (error) {
    console.error("Failed to create article:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}

export async function PATCH(request: Request) {
  const auth = await requireAuth(request);
  if ("error" in auth) return auth.error;

  const body = await request.json().catch(() => null);
  const id = toText(body?.id);
  const title = toText(body?.title);
  const slug = toText(body?.slug);
  const excerpt = toOptionalText(body?.excerpt);
  const coverImage = toOptionalText(body?.cover_image_url);
  const intro = toOptionalText(body?.intro);
  const content = toText(body?.content_markdown);
  const authorName = toOptionalText(body?.author_name);
  const status = toStatus(body?.status);
  const publishedAtInput = toOptionalText(body?.published_at);

  if (!id || !title || !slug || !content) {
    return NextResponse.json(
      { error: "Missing required fields." },
      { status: 400 },
    );
  }

  const publishedAt =
    status === "published"
      ? publishedAtInput ?? new Date().toISOString()
      : null;

  const { error } = await supabaseAdmin
    .from("blog_articles")
    .update({
      title,
      slug,
      excerpt,
      cover_image_url: coverImage,
      intro,
      content_markdown: content,
      status,
      published_at: publishedAt,
      author_name: authorName,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id);

  if (error) {
    console.error("Failed to update article:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
