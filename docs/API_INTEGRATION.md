# API Integration & Error Handling

> Back to [README](../README.md)

This template uses the [Swagger Petstore API](https://petstore3.swagger.io/) for demonstration. API hooks are auto-generated using Orval.

```bash
# Regenerate API hooks after OpenAPI spec changes
npm run api:generate
```

---

## API Interceptors

All Axios interceptors live in `src/lib/api/interceptors/`. They are registered once on the shared Axios instance (with a `WeakSet` guard to prevent duplicate registration during Vite HMR reloads).

### Interceptor Pipeline

**Request interceptors** (execute in this order on every outgoing request):

| Interceptor | File                    | Purpose                                                                       |
| ----------- | ----------------------- | ----------------------------------------------------------------------------- |
| Auth        | `authInterceptor.ts`    | Attaches `Authorization` header (currently a no-op stub — auth mechanism TBD) |
| Tenant      | `tenantInterceptor.ts`  | Attaches `X-Tenant-Id` header (currently a no-op stub — tenant source TBD)    |
| Logging     | `loggingInterceptor.ts` | Stamps `x-request-start-time` on the request for response timing              |

**Response interceptors** (execute in this order on every incoming response):

| Interceptor      | File                    | Purpose                                                                                                                                |
| ---------------- | ----------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| Logging          | `loggingInterceptor.ts` | Logs `<- METHOD URL STATUS (Nms)`. Silenced in production via `import.meta.env.PROD`                                                   |
| Normalizer       | `responseNormalizer.ts` | Emits a success toast for mutating requests (POST/PUT/PATCH/DELETE). Skips `/api/alert`                                                |
| Error Classifier | `errorClassifier.ts`    | Classifies every Axios error, matches it against the error registry, and dispatches the appropriate UI action (toast, redirect, modal) |

---

## 401 Session Expiry → Login Redirect

When any API call returns HTTP 401, the app automatically kicks the user back to the login page:

```
1. API response returns 401
2. errorClassifier interceptor fires
3. classifyError() extracts { status: 401, url, method, errorCode }
4. matchError() scans errorRegistry → hits 'session-expired' rule
5. skipIf guard: is the URL an auth endpoint (/auth/login, /auth/refresh, /auth/verify-otp)?
   - Yes → skip (prevents redirect loops on login failures)
   - No  → proceed
6. executeErrorAction() → emits { type: 'redirect', target: '/' } on apiEventBus
7. ApiEventsProvider (mounted at app root in App.tsx) receives the event
8. handleRedirectEvent() → window.location.href = '/' (hard navigation)
9. Browser navigates to '/' → LoginPage renders
```

Key design decisions:

- **Hard navigation** (`window.location.href`), not React Router `navigate()` — ensures a clean state reset
- **No route guards** — there are no `PrivateRoute` or `AuthGuard` wrappers in the router. Auth is enforced reactively: the server returns 401 and the interceptor handles the redirect
- **Auth endpoint skip list** — 401s from `/auth/login`, `/auth/refresh`, and `/auth/verify-otp` do NOT trigger a redirect
- **Token/session clearing** — marked as TODO in `useApiEvents.ts`; not yet implemented

---

## 403 Forbidden Handling

| Error Code          | Action | UI                                           |
| ------------------- | ------ | -------------------------------------------- |
| Generic 403         | Toast  | Shows `errors.forbidden` message             |
| `FEATURE_GATED` 403 | Modal  | Opens a `FeatureGateModal` prompting upgrade |

---

## Error Registry

All error-to-action mappings are defined in `src/lib/api/errors/errorRegistry.ts`. Each rule specifies:

- **match** — HTTP status and optional error code to match against
- **action** — what to do (redirect, toast, modal)
- **messageKey** — i18n key for the user-facing message
- **priority** — higher-priority rules are checked first
- **skipIf** — optional guard function to skip the rule for specific URLs
