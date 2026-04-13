# ENT-13: Chat / Messaging Page

## Status: COMPLETED
## Priority: Medium
## Agent: frontend-dev

## Problem Statement

Add a Chat/Messaging page with real-time messaging using the existing SignalR hub. This demonstrates WebSocket integration and is a common enterprise admin feature.

## Implementation Summary

### Backend (MockServer) - Pre-existing
The backend was already fully implemented by a previous agent:
- ChatChannel and ChatMessage entities in Core
- DTOs in UseCases
- CQRS handlers (ListChannels, GetMessages, CreateChannel, SendMessage)
- REST endpoints in MockServer.Web/Chat/
- SignalR methods in EventsHub (JoinChannel, LeaveChannel, SendMessage)
- Added missing seed data for ChatChannels (4 channels) and ChatMessages (40+ messages)
- Also added missing GanttTask seed data (was causing build failure)

### Frontend - New Implementation
1. **Route infrastructure**: Added `/chat` route path, segment, and router entry
2. **Permissions**: Added `ViewChat` permission, granted to all roles
3. **TestIds**: Added 9 chat-related test IDs
4. **Sidebar navigation**: Added "Chat" nav item with MessageCircle icon
5. **Translations**: Added `chat.*` i18n keys (title, channels, messages, sendMessage, etc.)
6. **Lazy page**: Added lazy import for ChatPage

### Feature Files Created
```
src/features/chat/
  types.ts                           - ChatChannel, ChatMessage interfaces
  constants.ts                       - API URLs, query keys, current user config
  pages/ChatPage/
    index.tsx                        - Main page with channel selection + message area
    components/
      ChannelList.tsx                - Left sidebar with channel buttons
      ChannelHeader.tsx              - Active channel name, description, online indicator
      MessageList.tsx                - Scrollable message area with auto-scroll
      MessageBubble.tsx              - Individual message with avatar, name, timestamp
      MessageInput.tsx               - Text input with Enter-to-send + send button
    hooks/
      useChatMessages.ts             - TanStack Query hook for channels + messages + send mutation
      useChatSignalR.ts              - SignalR connection, channel group management, cache invalidation
```

### Files Modified
- `src/app/routes/routePath.ts` - Added Chat route path
- `src/app/routes/routeSegment.ts` - Added Chat route segment
- `src/app/routes/lazyPages.ts` - Added ChatPage lazy import
- `src/app/router.tsx` - Added Chat route entry
- `src/shared/testIds.ts` - Added chat test IDs
- `src/shared/permissions/utils/Permission.ts` - Added ViewChat permission
- `src/shared/permissions/utils/rolePermissions.ts` - Granted ViewChat to all roles
- `src/components/layout/Sidebar/sidebarNavData.ts` - Added Chat nav item
- `src/components/layout/Sidebar/utils/iconName.ts` - Added MessageCircle icon
- `src/components/layout/Sidebar/utils/iconMap.ts` - Mapped MessageCircle to IconMessageCircle
- `src/localization/locales/en.json` - Added chat translations + sidebar label
- `MockServer/src/MockServer.Infrastructure/Data/SeedData.cs` - Added chat + gantt seed data

## Verification Results

- [x] ESLint: All chat files pass with no errors
- [x] TypeScript: `tsc --noEmit` passes with zero errors
- [x] dotnet build: MockServer builds successfully
- [x] Build: Vite bundling succeeds (PWA post-build has pre-existing size limit issue unrelated to chat)
- [x] SignalR: @microsoft/signalr package installed

## Success Criteria

- [x] Chat page with channel list + message area
- [x] Messages load from API history
- [x] Real-time messages via SignalR
- [x] Can switch channels
- [x] Message input sends and displays immediately
- [x] Respects dark/light theme (uses theme tokens throughout)
- [x] Lint passes
- [x] TypeScript compiles
