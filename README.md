# Syncfusion Theme Studio

A high-performance, fully customizable React admin portal template with visual theme editor. Built with React 18, Vite, TypeScript, Tailwind CSS, and Syncfusion components.

## Features

- **Visual Theme Editor** - Real-time theme customization with live preview
- **100% CSS Variables** - All styling driven by CSS variables for runtime editing
- **Dark/Light Mode** - Full theme support with smooth transitions
- **Syncfusion Components** - Enterprise-grade UI components with custom wrappers
- **Type-Safe API Hooks** - Auto-generated with Orval from OpenAPI specs
- **Internationalization** - Built-in i18next support
- **Lazy Loading** - Optimized bundle splitting for fast initial load
- **Strict TypeScript** - Enterprise-grade type safety
- **Comprehensive Testing** - Unit tests (Vitest) and E2E tests (Playwright)

## Tech Stack

| Technology | Purpose |
|------------|---------|
| React 18 | UI Framework |
| Vite 5 | Build Tool |
| TypeScript 5 | Type Safety |
| Tailwind CSS 3 | Utility-First Styling |
| Syncfusion | Enterprise UI Components |
| TanStack Query | Server State Management |
| Zustand | Client State Management |
| React Router 6 | Routing |
| i18next | Internationalization |
| Orval | API Hook Generation |
| Vitest | Unit Testing |
| Playwright | E2E Testing |

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Run tests
npm run test
```

## Project Structure

```
src/
├── app/                    # Application shell
│   ├── App.tsx
│   ├── routes.tsx
│   └── providers/
├── components/
│   ├── layout/             # MainLayout, Sidebar, Header
│   ├── ui/                 # Syncfusion wrappers
│   └── common/             # Shared components
├── features/
│   ├── auth/               # Login page
│   ├── dashboard/          # Home page
│   ├── pets/               # Demo API integration
│   ├── showcase/           # Component showcase
│   └── theme-editor/       # Visual theme customization
├── api/                    # Orval-generated hooks
├── stores/                 # Zustand stores
├── localization/           # i18n setup
├── styles/                 # CSS layers and themes
└── utils/                  # Utility functions
```

## Theme Customization

The theme editor allows real-time customization of:

- **Primary Colors** - Full color scale (50-900)
- **Status Colors** - Success, warning, error, info
- **Layout** - Sidebar width, header height
- **Border Radius** - Component roundness
- **Typography** - Font families and sizes
- **Transitions** - Animation timing

All changes are applied instantly without page reload and persist across sessions.

### Export/Import Themes

```typescript
// Export current theme
const themeJson = exportTheme();

// Import custom theme
importTheme(customThemeJson);
```

## API Integration

This template uses the [Swagger Petstore API](https://petstore3.swagger.io/) for demonstration. API hooks are auto-generated using Orval.

```bash
# Regenerate API hooks after OpenAPI spec changes
npm run orval
```

## Code Standards

This project follows strict coding standards:

- ESLint with TypeScript strict rules
- Maximum file length: 300 lines
- Maximum function length: 50 lines
- No magic numbers
- Comprehensive accessibility support
- Unit test coverage > 80%

## License

MIT License - see [LICENSE](LICENSE) for details.

## Contributing

Contributions are welcome! Please read our contributing guidelines before submitting a PR.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request
