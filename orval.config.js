import { defineConfig } from 'orval';

export default defineConfig({
  petstore: {
    input: {
      target: './src/api/swagger/petstore.json',
    },
    output: {
      target: './src/api/generated/index.ts',
      client: 'react-query',
      mode: 'tags-split',
      schemas: './src/api/generated/models',
      override: {
        mutator: {
          path: './src/api/mutator.ts',
          name: 'apiInstance',
        },
      },
    },
  },
});
