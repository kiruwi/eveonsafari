import { headers } from "next/headers";

type JsonLdScriptProps = {
  id: string;
  data: unknown;
  nonce?: string;
};

export async function JsonLdScript({ id, data, nonce: providedNonce }: JsonLdScriptProps) {
  const nonce = providedNonce ?? (await headers()).get("x-csp-nonce") ?? undefined;

  return (
    <script
      id={id}
      nonce={nonce}
      type="application/ld+json"
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
