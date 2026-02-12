import { defineConfig } from 'orval';

/**
 * Orval v8 configuration for SyncfusionThemeStudio API hooks.
 *
 * Generates React Query hooks + TypeScript interfaces from OpenAPI specs.
 * Each backend service gets its own config entry with a dedicated mutator.
 *
 * Usage:
 *   npm run api:generate                                — regenerate all hooks
 *   npx orval --config orval.config.ts --project dummyjson — single service
 *
 * Adding a new service:
 *   1. Place the OpenAPI JSON spec in src/api/swagger/<service>.json
 *   2. Create a mutator in src/api/mutators/<service>Mutator.ts
 *   3. Add a config entry below following the dummyjson pattern
 */

// ─── Mutator paths ──────────────────────────────────────────────────────────
const DUMMYJSON_MUTATOR = './src/api/mutators/dummyjsonMutator.ts';

// ─── Shared output config applied to every service ──────────────────────────
const sharedOutput = {
  client: 'react-query' as const,
  mode: 'tags-split' as const,
  clean: true,
  prettier: true,
};

const sharedOverride = {
  useTypeOverInterfaces: false, // Force `interface Foo {}` instead of `type Foo = {}`
  query: {
    useQuery: true,
    useMutation: true,
    signal: true, // Enable AbortController signal for cancellation
  },
};

export default defineConfig({
  // ─── DummyJSON Demo API ─────────────────────────────────────────────────
  dummyjson: {
    input: {
      target: './src/api/swagger/dummyjson.json',
      validation: false,
    },
    output: {
      ...sharedOutput,
      target: './src/api/generated/dummyjson/index.ts',
      schemas: './src/api/generated/dummyjson/models',
      override: {
        ...sharedOverride,
        mutator: {
          path: DUMMYJSON_MUTATOR,
          name: 'dummyjsonInstance',
        },
      },
    },
    hooks: {
      afterAllFilesWrite: [
        { command: 'npx prettier --write ./src/api/generated/dummyjson' },
        { command: 'echo "✅ Orval: DummyJSON hooks generated"' },
      ],
    },
  },

  // ─── Future services ────────────────────────────────────────────────────
  // Add new service configs here following the pattern above.
  // Example:
  //
  // whitelabelApi: {
  //   input: {
  //     target: './src/api/swagger/whitelabel.json',
  //     validation: false,
  //   },
  //   output: {
  //     ...sharedOutput,
  //     target: './src/api/generated/whitelabel/index.ts',
  //     schemas: './src/api/generated/whitelabel/models',
  //     override: {
  //       ...sharedOverride,
  //       mutator: {
  //         path: './src/api/mutators/whitelabelMutator.ts',
  //         name: 'whitelabelInstance',
  //       },
  //     },
  //   },
  //   hooks: {
  //     afterAllFilesWrite: [
  //       { command: 'npx prettier --write ./src/api/generated/whitelabel' },
  //       { command: 'echo "✅ Orval: Whitelabel hooks generated"' },
  //     ],
  //   },
  // },
});
