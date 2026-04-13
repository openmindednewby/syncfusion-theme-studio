# ENT-12: Rich Text Editor Page

## Status: TODO
## Priority: Medium
## Depends on: None
## Agent: frontend-dev

## Objective

Add a Rich Text Editor page using Syncfusion's RichTextEditor — demonstrating content management capabilities with formatting, image embedding, and HTML/Markdown output.

## Syncfusion Package

- `@syncfusion/ej2-react-richtexteditor`

## Implementation Plan

### 1. Page Structure

```
src/features/editor/
├── pages/
│   └── RichTextEditorPage/
│       ├── index.tsx
│       ├── components/
│       │   ├── EditorView.tsx         # Syncfusion RTE wrapper
│       │   ├── EditorToolbar.tsx      # Custom toolbar (save, preview, mode toggle)
│       │   ├── DocumentList.tsx       # Sidebar: list of saved documents
│       │   └── PreviewPanel.tsx       # HTML/Markdown preview
│       └── hooks/
│           └── useDocuments.ts
├── types.ts
└── constants.ts
```

### 2. Editor Features

- Full formatting toolbar: Bold, Italic, Underline, Strikethrough
- Headings (H1-H6), Lists (ordered/unordered), Blockquote
- Insert: Image, Link, Table, Code block, Horizontal rule
- Font family, font size, text color, background color
- Undo/Redo, Find & Replace
- Source code view (raw HTML)
- Markdown mode toggle
- Full-screen editing mode
- Word/character count

### 3. Document Management (client-side)

- Save documents to localStorage (or mock API)
- Document list sidebar: select, rename, delete documents
- New document creation
- Pre-loaded sample documents (welcome doc, formatting guide)

### 4. Route + Navigation

- Add `/editor` route
- Add "Editor" to sidebar under "Apps" section

## Success Criteria

- [ ] RTE renders with full toolbar
- [ ] All formatting options work
- [ ] Can insert images, tables, links
- [ ] Markdown mode toggle works
- [ ] Document save/load from localStorage
- [ ] Respects dark/light theme
