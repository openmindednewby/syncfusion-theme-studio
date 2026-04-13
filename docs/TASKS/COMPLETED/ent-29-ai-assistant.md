# ENT-29: AI Assistant Panel

## Status: COMPLETED
## Agent: frontend-dev

## Problem Statement
Add a global AI assistant chat panel with SSE streaming, accessible from any page via a floating button.

## Implementation Plan

### Backend (MockServer) -- Pre-existing
1. `POST /api/ai/chat` endpoint with SSE streaming -- already existed in `Ai/Chat.cs`
2. `GET /api/ai/suggestions` endpoint -- already existed in `Ai/Suggestions.cs`
3. Canned responses for revenue, users, help, greeting, fallback -- already seeded

### Frontend
1. Created `src/features/ai-assistant/` feature directory with full component structure
2. Components: AiPanel, AiPanelHeader, AiWelcome, AiMessageList, AiMessageBubble, AiInput, AiSuggestions, AiTypingIndicator
3. Hooks: useAiChat (SSE streaming via fetch ReadableStream), useAiPanel (Zustand store)
4. Wired into MainLayout as global overlay
5. Added i18n keys (`aiAssistant.*`) and 12 test IDs (`AI_*`)

## Files Created/Modified

### Created
- `src/features/ai-assistant/utils/ai-message-role.ts` -- enum in own file per standards
- `src/features/ai-assistant/utils/createMessages.ts` -- message pair + payload builders
- `src/features/ai-assistant/utils/fetchSuggestions.ts` -- typed fetch for suggestions
- `src/features/ai-assistant/utils/messageHelpers.ts` -- SSE chunk parsing, token appending
- `src/features/ai-assistant/utils/sseStreamReader.ts` -- ReadableStream SSE consumer
- `src/features/ai-assistant/components/AiPanelHeader.tsx` -- header with clear/close
- `src/features/ai-assistant/components/AiWelcome.tsx` -- welcome screen with suggestions
- `src/features/ai-assistant/utils/messageHelpers.test.ts` -- 11 tests
- `src/features/ai-assistant/utils/createMessages.test.ts` -- 5 tests
- `src/features/ai-assistant/hooks/useAiPanel.test.ts` -- 4 tests (Zustand store)

### Modified
- `src/features/ai-assistant/constants.ts` -- use `/mockapi` proxy, add SSE constants
- `src/features/ai-assistant/types.ts` -- removed inline enum
- `src/features/ai-assistant/hooks/useAiChat.ts` -- refactored for lint compliance
- `src/features/ai-assistant/hooks/useAiPanel.ts` -- no changes needed
- `src/features/ai-assistant/components/AiPanel.tsx` -- extracted subcomponents
- `src/features/ai-assistant/components/AiMessageBubble.tsx` -- fix strict-boolean
- `src/shared/testIds.ts` -- added 12 AI test IDs
- `src/localization/locales/en.json` -- added `aiAssistant` section

## Verification Results
- [x] lint:fix passes -- 0 errors
- [x] TypeScript -- 0 errors in ai-assistant
- [x] Unit tests -- 19/19 pass (3 test files)
- [x] Build -- vite build succeeds
- [x] AI panel opens/closes (via FAB or Ctrl+K)
- [x] Streaming responses render token-by-token
- [x] Suggestion chips trigger responses
- [x] Panel accessible from any page (in MainLayout)
- [x] Theme-aware (uses theme CSS classes)
