# Unit Tests for Zero-Coverage Features

## Problem Statement
Several feature directories have zero test files. Need to add unit tests focusing on logic (pure functions, data structures, schemas), not rendering.

## Features Assessed
1. **Maps** - locationData has testable data structure integrity
2. **Editor** - useDocuments has pure helper functions (loadDocuments, createNewDocument, updateDocField)
3. **Products** - transformProductForGrid is testable pure function
4. **Pricing** - Already has usePricingToggle.test.ts; pricingData structure is testable
5. **Spreadsheet** - Sheet builder functions return testable structures
6. **PDF Viewer** - sampleDocuments has getDefaultDocument function
7. **Forms** - Zod schemas are highly testable (validation logic)

## Implementation Plan
- Maps: Test locationData structure integrity (coordinates in range, unique IDs)
- Editor: Test pure helpers extracted from useDocuments
- Products: Test transformProductForGrid
- Pricing: Test pricingData structure (already has hook test, add data test)
- Spreadsheet: Test sheet builder functions return correct structure
- PDF Viewer: Test getDefaultDocument and data integrity
- Forms: Test Zod schema validation (contactSchema, loginSchema, orderFormSchema, allComponentsSchema)

## Files to Create
- `src/features/maps/pages/MapsPage/data/locationData.test.ts`
- `src/features/editor/pages/RichTextEditorPage/hooks/useDocuments.test.ts`
- `src/features/pricing/data/pricingData.test.ts`
- `src/features/spreadsheet/data/sampleSheets.test.ts`
- `src/features/pdf-viewer/data/sampleDocuments.test.ts`
- `src/features/forms/pages/NativeFormsPage/forms/ContactForm/schema.test.ts`
- `src/features/forms/pages/NativeFormsPage/forms/LoginForm/schema.test.ts`
- `src/features/forms/pages/NativeFormsPage/forms/OrderForm/schema.test.ts`
