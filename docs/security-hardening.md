# Security Hardening

This app now enforces OWASP-focused controls for API endpoints, authz, transport, and CI.

## Production Security Checklist

1. Copy `.env.example` to your deployment secrets manager.
2. Set `NODE_ENV=production`.
3. Set `NEXT_PUBLIC_SITE_URL` and `ALLOWED_ORIGINS` to exact production origins.
4. Set `ADMIN_EMAIL_ALLOWLIST` for admin-only API access.
5. Set `PESAPAL_IPN_SECRET` and keep `PESAPAL_IPN_SIGNATURE_REQUIRED=true`.
6. Keep `ENABLE_SUPABASE_TEST_ENDPOINT=false` in production.

## Implemented Controls

- Access control:
  - Deny-by-default API guard in `proxy.ts`.
  - Centralized auth and admin checks in `lib/security/auth.ts`.
  - Ownership enforcement for plan submissions (submitted email must match authenticated user).
- Misconfiguration:
  - Security headers and CSP in `proxy.ts`.
  - Strict origin and CORS checks for browser API requests.
  - Safe API error responses with request IDs.
- Supply chain:
  - `package-lock.json` checked in.
  - CI runs dependency audit, CodeQL SAST, and secret scanning.
- Crypto:
  - CSRF and request identifiers use cryptographically strong randomness.
  - Webhooks require HMAC SHA-256 signature verification.
  - Outbound and callback URLs enforce HTTPS in production.
  - Password hashing is delegated to Supabase Auth (managed provider), and this codebase does not store passwords directly.
- Injection/XSS:
  - Strict input validation and normalization for all mutable API routes.
  - Parameterized Supabase query builder usage.
  - Header/value sanitization for email fields.
- Auth/session:
  - Sensitive routes require server-side bearer token verification.
  - Brute-force/rate-limit controls on auth/sensitive endpoints.
  - Password reset endpoint returns generic responses to prevent account enumeration.
- Integrity:
  - Pesapal IPN signature verification and identifier validation.
  - CSRF double-submit token and origin checks for browser POST endpoints.
- Logging:
  - Security event logging for auth/access/rate-limit failures.
  - Redaction helper masks secrets and PII keys before logging.
- SSRF:
  - Outbound URL allowlist and private/local IP blocking for payment provider calls.

## Verification Commands

```bash
npm ci
npm run lint
npm run typecheck
npm run test:security
npm run build
npm run security:deps
```
