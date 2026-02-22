"use client";

import { supabase } from "../supabaseClient";

import { CSRF_COOKIE_NAME } from "./constants";

type HeaderValue = Record<string, string>;

function readCookie(name: string) {
  if (typeof document === "undefined") return null;
  const encodedName = `${encodeURIComponent(name)}=`;
  const part = document.cookie
    .split(";")
    .map((chunk) => chunk.trim())
    .find((chunk) => chunk.startsWith(encodedName));

  if (!part) return null;
  return decodeURIComponent(part.slice(encodedName.length));
}

function buildBaseHeaders(contentType: string | null = "application/json") {
  const headers: HeaderValue = {};
  if (contentType) {
    headers["Content-Type"] = contentType;
  }

  const csrfToken = readCookie(CSRF_COOKIE_NAME);
  if (csrfToken) {
    headers["X-CSRF-Token"] = csrfToken;
  }

  return headers;
}

export function buildPublicApiHeaders(contentType: string | null = "application/json") {
  return buildBaseHeaders(contentType);
}

export async function buildAuthenticatedApiHeaders(
  contentType: string | null = "application/json",
) {
  const headers = buildBaseHeaders(contentType);
  const { data } = await supabase.auth.getSession();
  const token = data.session?.access_token;
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  return headers;
}
