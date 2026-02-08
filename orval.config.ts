import { defineConfig } from 'orval';

export default defineConfig({
  dummyjson: {
    input: {
      target: './src/api/swagger/dummyjson.json',
      validation: false,
    },
    output: {
      target: './src/api/generated/index.ts',
      client: 'react-query',
      mode: 'tags-split',
      clean: true,
      prettier: true,
      schemas: './src/api/generated/models',
      override: {
        mutator: {
          path: './src/api/mutator.ts',
          name: 'apiInstance',
        },
        query: {
          useQuery: true,
          useMutation: true,
          signal: true,
        },
      },
    },
  },
});
