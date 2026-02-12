# Task 09: Update Orval Config + Vite Proxy

> **Parent**: [mock-server-master-plan.md](./mock-server-master-plan.md)
> **Status**: TODO
> **Agent**: `frontend-dev`
> **Depends on**: Task 05 (needs OpenAPI spec)
> **Blocks**: Task 10

---

## Objective

Add the mock server as a new Orval service entry and configure the Vite dev/preview proxy to route `/mockapi` requests to `http://localhost:5150`.

## Changes

### 1. orval.config.ts

Add a new `mockserver` entry following the existing `dummyjson` pattern:

```typescript
// ─── Mutator paths ──────────────────────────────────────────────────────────
const DUMMYJSON_MUTATOR = './src/api/mutators/dummyjsonMutator.ts';
const MOCKSERVER_MUTATOR = './src/api/mutators/mockserverMutator.ts';

export default defineConfig({
  // ... existing dummyjson config ...

  // ─── MockServer API ───────────────────────────────────────────────────
  mockserver: {
    input: {
      target: './src/api/swagger/mockserver.json',
      validation: false,
    },
    output: {
      ...sharedOutput,
      target: './src/api/generated/mockserver/index.ts',
      schemas: './src/api/generated/mockserver/models',
      override: {
        ...sharedOverride,
        mutator: {
          path: MOCKSERVER_MUTATOR,
          name: 'mockserverInstance',
        },
      },
    },
    hooks: {
      afterAllFilesWrite: [
        { command: 'npx prettier --write ./src/api/generated/mockserver' },
        { command: 'echo "✅ Orval: MockServer hooks generated"' },
      ],
    },
  },
});
```

### 2. vite.config.ts — Add proxy

Add `/mockapi` proxy to both `server.proxy` and `preview.proxy`:

```typescript
// In server.proxy:
'/mockapi': {
  target: 'http://localhost:5150',
  changeOrigin: true,
  rewrite: (p: string) => p.replace(/^\/mockapi/, ''),
},

// In preview.proxy:
'/mockapi': {
  target: 'http://localhost:5150',
  changeOrigin: true,
  rewrite: (p: string) => p.replace(/^\/mockapi/, ''),
},
```

### 3. Place OpenAPI spec

The OpenAPI spec should be exported from the running mock server (Task 08 handles this via Tiltfile). For initial development, you can also manually copy it:

```bash
# After mock server is running:
curl http://localhost:5150/swagger/v1/swagger.json -o src/api/swagger/mockserver.json
```

## Verification

```bash
cd SyncfusionThemeStudio
# With mock server running on port 5150:
npm run dev
# Then: curl http://localhost:4444/mockapi/api/products
# Should proxy to http://localhost:5150/api/products
```

## Success Criteria

- [ ] `orval.config.ts` has `mockserver` entry
- [ ] Vite dev proxy routes `/mockapi/*` to `localhost:5150`
- [ ] Vite preview proxy routes `/mockapi/*` to `localhost:5150`
- [ ] `src/api/swagger/mockserver.json` exists (placeholder or exported)
- [ ] `npm run api:generate` succeeds (generates hooks for both dummyjson and mockserver)
