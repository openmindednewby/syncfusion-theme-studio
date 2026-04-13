# Adding an API Spec & Generating Hooks (Before Backend Is Ready)

> Back to [README](../README.md) | See also: [API Integration](API_INTEGRATION.md) · [Create New Feature Guide](CREATE_NEW_FEATURE_GUIDE.md)

This guide shows you how to **write a sample OpenAPI spec** (JSON or YAML), configure Orval to generate type-safe React Query hooks from it, and wire everything up — so you can build frontend features **before** the real backend (YARP/Argosphere) or MockServer endpoints exist.

---

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Overview — What Files You'll Touch](#overview--what-files-youll-touch)
3. [Step 1 — Write the OpenAPI Spec](#step-1--write-the-openapi-spec)
4. [Step 2 — Create the Mutator](#step-2--create-the-mutator)
5. [Step 3 — Add the Orval Config Entry](#step-3--add-the-orval-config-entry)
6. [Step 4 — Add the Vite Proxy](#step-4--add-the-vite-proxy)
7. [Step 5 — Generate the Hooks](#step-5--generate-the-hooks)
8. [Step 6 — Use the Hooks in a Component](#step-6--use-the-hooks-in-a-component)
9. [Step 7 — Verify Everything Works](#step-7--verify-everything-works)
10. [Complete File Map](#complete-file-map)
11. [JSON vs YAML — Which to Use](#json-vs-yaml--which-to-use)
12. [Writing a Good OpenAPI Spec](#writing-a-good-openapi-spec)
13. [Migrating to a Real Backend Later](#migrating-to-a-real-backend-later)
14. [Common Mistakes](#common-mistakes)

---

## Prerequisites

Before starting, make sure:

```bash
npm install
npm run api:generate    # Existing hooks compile → confirms Orval works
npm run local           # Dev server runs on http://localhost:4444
```

Familiarize yourself with:

- **Orval** generates React Query hooks + TypeScript interfaces from OpenAPI specs
- Each backend service gets its own **mutator** (Axios wrapper that routes requests through the shared `apiClient`)
- The Vite **dev server proxy** forwards API requests to avoid CORS issues
- Generated files live in `src/api/generated/` and are **gitignored** — they must be regenerated after cloning

---

## Overview — What Files You'll Touch

| #   | What                   | File                                      |
| --- | ---------------------- | ----------------------------------------- |
| 1   | OpenAPI spec           | `src/api/swagger/billing.json`            |
| 2   | Mutator                | `src/api/mutators/billingMutator.ts`      |
| 3   | Orval config entry     | `orval.config.ts`                         |
| 4   | Vite proxy rule        | `vite.config.ts`                          |
| 5   | Generated hooks (auto) | `src/api/generated/billing/` (gitignored) |

> **Example scenario:** You're building a "Billing" feature but the backend team hasn't deployed the Billing API yet. You write a sample spec to unblock frontend work.

---

## Step 1 — Write the OpenAPI Spec

**File:** `src/api/swagger/billing.json`

Create a valid OpenAPI 3.0 spec describing the endpoints you expect. You can write this from scratch, paste from a Swagger UI, or convert from a YAML file.

### Minimal Example (JSON)

```json
{
  "openapi": "3.0.3",
  "info": {
    "title": "Billing API",
    "description": "Billing service — sample spec for frontend development",
    "version": "0.1.0"
  },
  "servers": [{ "url": "http://localhost:5200" }],
  "tags": [{ "name": "invoices", "description": "Invoice operations" }],
  "paths": {
    "/api/invoices": {
      "get": {
        "tags": ["invoices"],
        "summary": "List all invoices",
        "operationId": "listInvoices",
        "parameters": [
          {
            "name": "limit",
            "in": "query",
            "schema": { "type": "integer", "default": 20 }
          },
          {
            "name": "skip",
            "in": "query",
            "schema": { "type": "integer", "default": 0 }
          },
          {
            "name": "status",
            "in": "query",
            "description": "Filter by invoice status",
            "schema": { "type": "string", "enum": ["draft", "sent", "paid", "overdue"] }
          }
        ],
        "responses": {
          "200": {
            "description": "Paginated list of invoices",
            "content": {
              "application/json": {
                "schema": { "$ref": "#/components/schemas/InvoicesResponse" }
              }
            }
          }
        }
      },
      "post": {
        "tags": ["invoices"],
        "summary": "Create a new invoice",
        "operationId": "createInvoice",
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": { "$ref": "#/components/schemas/CreateInvoiceRequest" }
            }
          }
        },
        "responses": {
          "201": {
            "description": "Invoice created",
            "content": {
              "application/json": {
                "schema": { "$ref": "#/components/schemas/Invoice" }
              }
            }
          },
          "400": { "description": "Validation error" }
        }
      }
    },
    "/api/invoices/{id}": {
      "get": {
        "tags": ["invoices"],
        "summary": "Get invoice by ID",
        "operationId": "getInvoiceById",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": { "type": "integer" }
          }
        ],
        "responses": {
          "200": {
            "description": "Invoice details",
            "content": {
              "application/json": {
                "schema": { "$ref": "#/components/schemas/Invoice" }
              }
            }
          },
          "404": { "description": "Invoice not found" }
        }
      },
      "put": {
        "tags": ["invoices"],
        "summary": "Update an invoice",
        "operationId": "updateInvoice",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": { "type": "integer" }
          }
        ],
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": { "$ref": "#/components/schemas/UpdateInvoiceRequest" }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Invoice updated",
            "content": {
              "application/json": {
                "schema": { "$ref": "#/components/schemas/Invoice" }
              }
            }
          }
        }
      },
      "delete": {
        "tags": ["invoices"],
        "summary": "Delete an invoice",
        "operationId": "deleteInvoice",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": { "type": "integer" }
          }
        ],
        "responses": {
          "204": { "description": "Invoice deleted" }
        }
      }
    }
  },
  "components": {
    "schemas": {
      "Invoice": {
        "type": "object",
        "required": ["id", "customerName", "amount", "status", "createdAt"],
        "properties": {
          "id": { "type": "integer" },
          "customerName": { "type": "string" },
          "amount": { "type": "number", "format": "double" },
          "currency": { "type": "string", "default": "EUR" },
          "status": {
            "type": "string",
            "enum": ["draft", "sent", "paid", "overdue"]
          },
          "dueDate": { "type": "string", "format": "date" },
          "createdAt": { "type": "string", "format": "date-time" },
          "updatedAt": { "type": "string", "format": "date-time" }
        }
      },
      "CreateInvoiceRequest": {
        "type": "object",
        "required": ["customerName", "amount"],
        "properties": {
          "customerName": { "type": "string" },
          "amount": { "type": "number", "format": "double" },
          "currency": { "type": "string", "default": "EUR" },
          "dueDate": { "type": "string", "format": "date" }
        }
      },
      "UpdateInvoiceRequest": {
        "type": "object",
        "properties": {
          "customerName": { "type": "string" },
          "amount": { "type": "number", "format": "double" },
          "currency": { "type": "string" },
          "status": {
            "type": "string",
            "enum": ["draft", "sent", "paid", "overdue"]
          },
          "dueDate": { "type": "string", "format": "date" }
        }
      },
      "InvoicesResponse": {
        "type": "object",
        "required": ["invoices", "total"],
        "properties": {
          "invoices": {
            "type": "array",
            "items": { "$ref": "#/components/schemas/Invoice" }
          },
          "total": { "type": "integer" },
          "skip": { "type": "integer" },
          "limit": { "type": "integer" }
        }
      }
    }
  }
}
```

### Same Example in YAML (alternative)

If you prefer YAML, save as `src/api/swagger/billing.yaml`:

```yaml
openapi: '3.0.3'
info:
  title: Billing API
  description: Billing service — sample spec for frontend development
  version: '0.1.0'
servers:
  - url: http://localhost:5200
tags:
  - name: invoices
    description: Invoice operations
paths:
  /api/invoices:
    get:
      tags: [invoices]
      summary: List all invoices
      operationId: listInvoices
      parameters:
        - name: limit
          in: query
          schema:
            type: integer
            default: 20
        - name: skip
          in: query
          schema:
            type: integer
            default: 0
        - name: status
          in: query
          description: Filter by invoice status
          schema:
            type: string
            enum: [draft, sent, paid, overdue]
      responses:
        '200':
          description: Paginated list of invoices
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/InvoicesResponse'
    post:
      tags: [invoices]
      summary: Create a new invoice
      operationId: createInvoice
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/CreateInvoiceRequest'
      responses:
        '201':
          description: Invoice created
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Invoice'
        '400':
          description: Validation error
  /api/invoices/{id}:
    get:
      tags: [invoices]
      summary: Get invoice by ID
      operationId: getInvoiceById
      parameters:
        - name: id
          in: path
          required: true
          schema:
            type: integer
      responses:
        '200':
          description: Invoice details
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Invoice'
        '404':
          description: Invoice not found
    put:
      tags: [invoices]
      summary: Update an invoice
      operationId: updateInvoice
      parameters:
        - name: id
          in: path
          required: true
          schema:
            type: integer
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/UpdateInvoiceRequest'
      responses:
        '200':
          description: Invoice updated
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Invoice'
    delete:
      tags: [invoices]
      summary: Delete an invoice
      operationId: deleteInvoice
      parameters:
        - name: id
          in: path
          required: true
          schema:
            type: integer
      responses:
        '204':
          description: Invoice deleted
components:
  schemas:
    Invoice:
      type: object
      required: [id, customerName, amount, status, createdAt]
      properties:
        id:
          type: integer
        customerName:
          type: string
        amount:
          type: number
          format: double
        currency:
          type: string
          default: EUR
        status:
          type: string
          enum: [draft, sent, paid, overdue]
        dueDate:
          type: string
          format: date
        createdAt:
          type: string
          format: date-time
        updatedAt:
          type: string
          format: date-time
    CreateInvoiceRequest:
      type: object
      required: [customerName, amount]
      properties:
        customerName:
          type: string
        amount:
          type: number
          format: double
        currency:
          type: string
          default: EUR
        dueDate:
          type: string
          format: date
    UpdateInvoiceRequest:
      type: object
      properties:
        customerName:
          type: string
        amount:
          type: number
          format: double
        currency:
          type: string
        status:
          type: string
          enum: [draft, sent, paid, overdue]
        dueDate:
          type: string
          format: date
    InvoicesResponse:
      type: object
      required: [invoices, total]
      properties:
        invoices:
          type: array
          items:
            $ref: '#/components/schemas/Invoice'
        total:
          type: integer
        skip:
          type: integer
        limit:
          type: integer
```

> **Orval supports both JSON and YAML.** Use whichever format you're more comfortable with. The `input.target` in `orval.config.ts` accepts either extension.

---

## Step 2 — Create the Mutator

**File:** `src/api/mutators/billingMutator.ts`

The mutator is an Axios wrapper that routes requests through the shared `apiClient` (so interceptors like error handling, logging, and auth apply automatically).

Copy an existing mutator and change the base URL:

```ts
import { apiClient } from '@/lib/api/axiosInstance';

import type { AxiosRequestConfig, AxiosResponse, RawAxiosResponseHeaders } from 'axios';

/**
 * Convert axios headers to web-standard Headers object
 */
function convertHeaders(axiosHeaders: RawAxiosResponseHeaders): Headers {
  const headers = new Headers();
  Object.entries(axiosHeaders).forEach(([key, value]) => {
    if (typeof value === 'string') headers.append(key, value);
  });
  return headers;
}

// Proxy prefix — requests like /billingapi/api/invoices
// get rewritten by Vite proxy to http://localhost:5200/api/invoices
const BILLING_BASE_URL = '/billingapi';

/**
 * Orval 8.x compatible mutator for the Billing API.
 */
export async function billingInstance<T>(url: string, options?: RequestInit): Promise<T> {
  const method = options?.method ?? 'GET';
  const headersRecord: Record<string, string> = {};

  if (options?.headers instanceof Headers)
    options.headers.forEach((value, key) => {
      headersRecord[key] = value;
    });
  else if (options?.headers) Object.assign(headersRecord, options.headers);

  const config: AxiosRequestConfig = {
    url,
    method,
    baseURL: BILLING_BASE_URL,
    headers: headersRecord,
    data: options?.body,
  };

  if (options?.signal) config.signal = options.signal;

  const response: AxiosResponse<unknown> = await apiClient(config);

  const result: unknown = {
    data: response.data,
    status: response.status,
    headers: convertHeaders(response.headers),
  };

  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
  return result as T;
}

export default billingInstance;
```

### Choosing a `baseURL`

| Backend Status             | `baseURL` Value         | Explanation                                                                                      |
| -------------------------- | ----------------------- | ------------------------------------------------------------------------------------------------ |
| No backend yet (spec only) | `'/billingapi'`         | Requests will fail with 504 but types compile. You can use MSW or static data to mock responses. |
| MockServer ready           | `'/mockapi'`            | Reuse the existing MockServer mutator if endpoints are there                                     |
| Real backend running       | `'/billingapi'` or `''` | Add a matching Vite proxy rule (Step 4)                                                          |

> **Tip:** If you're only generating types and hooks to start coding the UI, you don't need a running backend at all. The hooks will compile, and you can use mock data in your components until the API is live.

---

## Step 3 — Add the Orval Config Entry

**File:** `orval.config.ts`

Add a new entry following the existing pattern:

```ts
// ─── Mutator paths ──────────────────────────────────────────────────────────
const DUMMYJSON_MUTATOR = './src/api/mutators/dummyjsonMutator.ts';
const MOCKSERVER_MUTATOR = './src/api/mutators/mockserverMutator.ts';
const ARGOSPHERE_MUTATOR = './src/api/mutators/argosphereMutator.ts';
const BILLING_MUTATOR = './src/api/mutators/billingMutator.ts'; // ← Add

export default defineConfig({
  // ... existing entries ...

  // ─── Billing API (sample spec — no backend yet) ─────────────────────────
  billing: {
    input: {
      target: './src/api/swagger/billing.json', // or billing.yaml
      validation: false,
    },
    output: {
      ...sharedOutput,
      target: './src/api/generated/billing/index.ts',
      schemas: './src/api/generated/billing/models',
      override: {
        ...sharedOverride,
        mutator: {
          path: BILLING_MUTATOR,
          name: 'billingInstance',
        },
      },
    },
    hooks: {
      afterAllFilesWrite: [
        { command: 'npx prettier --write ./src/api/generated/billing' },
        { command: 'echo "✅ Orval: Billing hooks generated"' },
      ],
    },
  },
});
```

### Key fields explained

| Field              | Value                                    | Why                                                                   |
| ------------------ | ---------------------------------------- | --------------------------------------------------------------------- |
| `input.target`     | `'./src/api/swagger/billing.json'`       | Path to the OpenAPI spec you wrote in Step 1                          |
| `input.validation` | `false`                                  | Skip strict OpenAPI validation (useful for hand-written sample specs) |
| `output.target`    | `'./src/api/generated/billing/index.ts'` | Where generated hook files go                                         |
| `output.schemas`   | `'./src/api/generated/billing/models'`   | Where generated TypeScript interfaces go                              |
| `output.mode`      | `'tags-split'` (from `sharedOutput`)     | Each OpenAPI tag gets its own file (e.g. `invoices/invoices.ts`)      |
| `output.clean`     | `true` (from `sharedOutput`)             | Deletes old generated files before regenerating                       |
| `mutator.path`     | Path to your mutator file                | Tells Orval which Axios wrapper to use in generated hooks             |
| `mutator.name`     | `'billingInstance'`                      | The exported function name from the mutator                           |

---

## Step 4 — Add the Vite Proxy

**File:** `vite.config.ts`

Add proxy rules in **both** the `server` and `preview` blocks so requests to `/billingapi/...` get forwarded to the backend:

```ts
// In server.proxy and preview.proxy:
'/billingapi': {
  target: 'http://localhost:5200',
  changeOrigin: true,
  rewrite: (p: string) => p.replace(/^\/billingapi/, ''),
},
```

This rewrites `/billingapi/api/invoices` → `http://localhost:5200/api/invoices`.

> **No backend yet?** You can still add the proxy rule — requests will simply fail with a connection error. The hooks and types still compile. When the backend comes online later, requests will start working automatically.

---

## Step 5 — Generate the Hooks

Run Orval to generate hooks from your spec:

```bash
# Generate all services (including your new one)
npm run api:generate

# Or generate only the billing service
npx orval --config orval.config.ts --project billing
```

After generation, you'll see:

```
src/api/generated/billing/
├── models/
│   ├── index.ts
│   ├── invoice.ts                    # Interface: Invoice
│   ├── createInvoiceRequest.ts       # Interface: CreateInvoiceRequest
│   ├── updateInvoiceRequest.ts       # Interface: UpdateInvoiceRequest
│   ├── invoicesResponse.ts           # Interface: InvoicesResponse
│   └── listInvoicesParams.ts         # Interface: ListInvoicesParams
└── invoices/
    └── invoices.ts                   # Hooks: useListInvoices, useGetInvoiceById, etc.
```

### What gets generated

For each endpoint in your spec, Orval generates:

| Spec Element                 | Generated Code                                                                    |
| ---------------------------- | --------------------------------------------------------------------------------- |
| `GET /api/invoices`          | `useListInvoices()` query hook                                                    |
| `POST /api/invoices`         | `useCreateInvoice()` mutation hook                                                |
| `GET /api/invoices/{id}`     | `useGetInvoiceById()` query hook                                                  |
| `PUT /api/invoices/{id}`     | `useUpdateInvoice()` mutation hook                                                |
| `DELETE /api/invoices/{id}`  | `useDeleteInvoice()` mutation hook                                                |
| `components.schemas.Invoice` | `interface Invoice { ... }`                                                       |
| Query parameters             | `interface ListInvoicesParams { limit?: number; skip?: number; status?: string }` |

> **Hook naming:** Orval uses the `operationId` from your spec. If you set `operationId: "listInvoices"`, the hook is `useListInvoices`. Always set meaningful `operationId` values.

---

## Step 6 — Use the Hooks in a Component

```tsx
import { useTranslation } from 'react-i18next';

import { useListInvoices } from '@/api/generated/billing/invoices/invoices';
import type { Invoice } from '@/api/generated/billing/models';
import { TestIds } from '@/shared/testIds';

const BillingPage = (): JSX.Element => {
  const { t } = useTranslation();

  // Type-safe query hook — params, return type, and error type are all inferred
  const { data, isLoading, error } = useListInvoices({ limit: 20, skip: 0 });

  if (isLoading) return <div>{t('common.loading')}</div>;
  if (error) return <div>{t('common.error')}</div>;

  const invoices: Invoice[] = data?.data?.invoices ?? [];

  return (
    <div data-testid={TestIds.BILLING_PAGE} className="p-6">
      <h1 className="text-2xl font-semibold text-[rgb(var(--color-text-primary))]">
        {t('billing.title')}
      </h1>
      <ul className="mt-4 space-y-2">
        {invoices.map((invoice) => (
          <li key={invoice.id} className="rounded border p-3">
            {invoice.customerName} — {invoice.amount} {invoice.currency} — {invoice.status}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BillingPage;
```

### Using mutation hooks

```tsx
import { useCreateInvoice } from '@/api/generated/billing/invoices/invoices';

const { mutate: createInvoice, isPending } = useCreateInvoice();

const handleSubmit = (formData: CreateInvoiceRequest): void => {
  createInvoice(
    { data: formData },
    {
      onSuccess: () => {
        // Handle success (toast, redirect, invalidate queries, etc.)
      },
    }
  );
};
```

---

## Step 7 — Verify Everything Works

```bash
# 1. Regenerate hooks
npm run api:generate

# 2. TypeScript compiles (confirms generated types are valid)
npm run typecheck

# 3. Lint passes
npm run lint

# 4. Tests pass
npm run test
```

Then manually verify:

- [ ] Generated files exist in `src/api/generated/billing/`
- [ ] `models/` contains TypeScript interfaces matching your spec's schemas
- [ ] Hook files exist under the tag name directory (e.g. `invoices/invoices.ts`)
- [ ] Importing a hook in a component gives full IntelliSense (params, return types)
- [ ] `npm run typecheck` passes with no errors

---

## Complete File Map

```
src/api/
├── swagger/
│   └── billing.json              ← Step 1 (your handwritten spec)
├── mutators/
│   └── billingMutator.ts         ← Step 2 (Axios wrapper)
└── generated/
    └── billing/                  ← Step 5 (auto-generated, gitignored)
        ├── models/
        │   ├── index.ts
        │   ├── invoice.ts
        │   ├── createInvoiceRequest.ts
        │   ├── updateInvoiceRequest.ts
        │   ├── invoicesResponse.ts
        │   └── listInvoicesParams.ts
        └── invoices/
            └── invoices.ts

orval.config.ts                   ← Step 3 (new entry)
vite.config.ts                    ← Step 4 (proxy rule)
```

---

## JSON vs YAML — Which to Use

| Aspect                            | JSON                                                   | YAML                        |
| --------------------------------- | ------------------------------------------------------ | --------------------------- |
| **Orval support**                 | Yes                                                    | Yes                         |
| **Auto-download from Swagger UI** | Native format (copy/paste)                             | Needs conversion            |
| **Human readability**             | Verbose but explicit                                   | Cleaner, less noise         |
| **Editing risk**                  | Syntax errors from trailing commas                     | Indentation-sensitive       |
| **Existing project convention**   | `dummyjson.json`, `mockserver.json`, `argosphere.json` | No existing YAML specs      |
| **Recommendation**                | **Preferred** — matches project convention             | Fine for hand-written specs |

> **Tip:** If you have a YAML spec, Orval reads it directly. Set `input.target` to `'./src/api/swagger/billing.yaml'` and it works.

---

## Writing a Good OpenAPI Spec

### Required elements

Every spec needs these at minimum:

```json
{
  "openapi": "3.0.3",
  "info": { "title": "...", "version": "..." },
  "paths": { ... },
  "components": { "schemas": { ... } }
}
```

### Tips for better code generation

| Tip                                    | Why                                         | Example                                               |
| -------------------------------------- | ------------------------------------------- | ----------------------------------------------------- |
| Always set `operationId`               | Controls the generated hook name            | `"operationId": "listInvoices"` → `useListInvoices()` |
| Use `tags` to group endpoints          | Controls generated file names               | `"tags": ["invoices"]` → `invoices/invoices.ts`       |
| Define schemas in `components.schemas` | Generates reusable TypeScript interfaces    | `"$ref": "#/components/schemas/Invoice"`              |
| Mark required fields                   | Makes properties non-optional in TypeScript | `"required": ["id", "name"]`                          |
| Use `enum` for string literals         | Generates union types                       | `"enum": ["draft", "sent", "paid"]`                   |
| Use `format: "date-time"`              | Signals date handling to consumers          | `"format": "date-time"`                               |
| Add `description` to parameters        | Shows in IntelliSense tooltips              | `"description": "Filter by status"`                   |
| Use `default` values                   | Sets parameter defaults in generated code   | `"default": 20`                                       |
| Spec `required: true` on path params   | Avoids optional `undefined` in TypeScript   | Always do this for path params                        |

### Common schema types

```json
{
  "type": "string"                              → string
  "type": "integer"                             → number
  "type": "number", "format": "double"          → number
  "type": "boolean"                             → boolean
  "type": "string", "format": "date"            → string (ISO date)
  "type": "string", "format": "date-time"       → string (ISO datetime)
  "type": "string", "enum": ["a", "b"]          → "a" | "b"
  "type": "array", "items": { "$ref": "..." }   → SomeType[]
  "$ref": "#/components/schemas/Foo"             → Foo (interface)
}
```

---

## Migrating to a Real Backend Later

When the real backend (MockServer, YARP/Argosphere, or a standalone service) is ready:

### Option A — Backend matches your sample spec exactly

1. **Replace** `src/api/swagger/billing.json` with the real spec downloaded from Swagger UI
2. **Re-run** `npm run api:generate`
3. **Fix** any minor type differences in your components
4. **Done** — the hooks now call the real backend

### Option B — Backend spec has differences

1. Download the real spec to `src/api/swagger/billing.json`
2. Run `npm run api:generate`
3. Fix compile errors — Orval regenerates different interfaces/hooks
4. Update component code to match new types

### Option C — Move endpoints to MockServer

If you want to route through the existing MockServer instead of a dedicated service:

1. Add the endpoints to MockServer (see [Local Development Pipeline](LOCAL_DEVELOPMENT_PIPELINE.md))
2. Delete `src/api/swagger/billing.json` and `src/api/mutators/billingMutator.ts`
3. Remove the `billing` entry from `orval.config.ts`
4. Regenerate: `npm run api:generate`
5. Update imports to use MockServer hooks instead

### Option D — Move endpoints to Argosphere/YARP

1. The backend team adds endpoints behind YARP routes
2. Run `npm run sync:upstream-openapi` to pull the updated spec
3. Run `npm run verify:yarp-swagger` then `npm run api:generate`
4. Delete your sample spec, mutator, and Orval config entry
5. Update imports to use Argosphere hooks

---

## Common Mistakes

| Mistake                                          | Consequence                                              | Fix                                                             |
| ------------------------------------------------ | -------------------------------------------------------- | --------------------------------------------------------------- |
| Missing `operationId`                            | Orval generates ugly hook names like `useGetApiInvoices` | Always set `operationId` on every endpoint                      |
| Missing `tags`                                   | All hooks go into a single file                          | Add `tags` to group by domain (invoices, payments, etc.)        |
| Inline schemas instead of `$ref`                 | Duplicate TypeScript types, hard to reuse                | Define schemas in `components.schemas` and use `$ref`           |
| Forgetting to add `required` on schemas          | All properties become optional (`prop?: type`)           | Mark mandatory fields in the `required` array                   |
| Wrong `mutator.name` in orval config             | Runtime error: function not found                        | Must match the exact export name from the mutator file          |
| Forgetting the Vite proxy rule                   | CORS errors in the browser                               | Add proxy rules in both `server.proxy` and `preview.proxy`      |
| Editing generated files manually                 | Changes are lost on next `npm run api:generate`          | Always edit the spec and regenerate — never edit generated code |
| Missing `servers` in spec                        | Orval works fine, but Swagger UI won't know the base URL | Add `servers: [{ url: "..." }]` for documentation               |
| `format: "int64"` on IDs                         | Generated type is `number` (JavaScript has no int64)     | Use `type: "integer"` — Orval maps it to `number` anyway        |
| Not running `npm run api:generate` after cloning | Import errors — `src/api/generated/` is gitignored       | Always regenerate after `npm install`                           |
