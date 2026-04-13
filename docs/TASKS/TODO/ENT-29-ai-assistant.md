# ENT-29: AI Assistant Panel

## Status: TODO
## Priority: Low
## Depends on: None
## Agent: frontend-dev + backend-dev

## Objective

Add an AI assistant chat panel — a slide-out panel with streaming chat responses. Demonstrates modern AI integration pattern that's becoming standard in enterprise apps.

## Implementation Plan

### Backend (MockServer)

1. **Chat endpoint**: `POST /api/ai/chat`
   - Request: `{ messages: [{ role, content }] }`
   - Response: Server-Sent Events (SSE) stream simulating token-by-token response
   - Mock responses: canned answers for common questions about the app, data queries, help topics
   - Add 50-100ms delay between tokens to simulate streaming

2. **Suggestions endpoint**: `GET /api/ai/suggestions`
   - Returns contextual quick-action suggestions

### Frontend

### 1. Component Structure

```
src/features/ai-assistant/
├── components/
│   ├── AiPanel.tsx              # Slide-out panel (right side)
│   ├── AiMessageList.tsx        # Chat messages
│   ├── AiMessageBubble.tsx      # Individual message with markdown rendering
│   ├── AiInput.tsx              # Text input + send button
│   ├── AiSuggestions.tsx        # Quick suggestion chips
│   └── AiTypingIndicator.tsx    # "AI is thinking..." animation
├── hooks/
│   ├── useAiChat.ts             # Chat state + SSE streaming
│   └── useAiPanel.ts            # Panel open/close state
├── types.ts
└── constants.ts
```

### 2. Features

- Floating action button (bottom-right) to toggle panel
- Slide-out panel with chat interface
- Streaming responses (rendered token-by-token)
- Markdown rendering in responses (code blocks, lists, bold)
- Suggestion chips for quick queries ("Show revenue", "List users", "Help with settings")
- Chat history (session-scoped)
- "Clear conversation" button
- Keyboard shortcut to toggle (Ctrl+K or similar)

### 3. Integration

- Not a route — it's a global panel accessible from any page
- Button in header or floating action button
- Can reference current page context in suggestions

## Success Criteria

- [ ] AI panel opens/closes smoothly
- [ ] Streaming responses render token-by-token
- [ ] Markdown formatting in responses
- [ ] Suggestion chips trigger pre-canned responses
- [ ] Panel accessible from any page
- [ ] Theme-aware
