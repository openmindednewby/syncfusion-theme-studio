# ENT-11: File Manager Page

## Status: TODO
## Priority: Medium
## Depends on: None
## Agent: frontend-dev + backend-dev

## Objective

Add a File Manager page using Syncfusion's FileManager component — browse, upload, rename, delete files in a familiar explorer-style interface.

## Syncfusion Package

- `@syncfusion/ej2-react-filemanager`

## Implementation Plan

### Backend (MockServer)

Syncfusion FileManager requires a specific API contract. Implement the FileManager service endpoints:

1. **File operations endpoint**: `POST /api/files/operations`
   - Handles: Read, Delete, Rename, Create (folder), Move, Copy, Search
   - Request/Response follows Syncfusion's FileManager API contract
2. **Upload endpoint**: `POST /api/files/upload`
3. **Download endpoint**: `GET /api/files/download`
4. **Image preview**: `GET /api/files/image`
5. **In-memory file system**: Mock file tree with folders (Documents, Images, Downloads, Projects) and sample files

### Frontend

### 1. Page Structure

```
src/features/file-manager/
├── pages/
│   └── FileManagerPage/
│       ├── index.tsx
│       ├── components/
│       │   ├── FileManagerView.tsx    # Syncfusion FileManager wrapper
│       │   └── FileManagerToolbar.tsx # Custom toolbar additions
│       └── hooks/
│           └── useFileManager.ts
├── types.ts
└── constants.ts
```

### 2. FileManager Features

- Navigation pane (folder tree)
- Details view (grid) and large icons view
- Breadcrumb path navigation
- Upload files (drag-and-drop zone)
- Context menu: Open, Download, Rename, Delete, Properties
- Search files
- File preview (images)
- Theme-aware

### 3. Route + Navigation

- Add `/file-manager` route
- Add "File Manager" to sidebar under "Apps" section

## Success Criteria

- [ ] FileManager component renders with folder tree
- [ ] Can navigate folders, view files in grid/icon view
- [ ] Upload, rename, delete, create folder work
- [ ] Search finds files across folders
- [ ] Context menu provides all standard operations
- [ ] Respects dark/light theme
