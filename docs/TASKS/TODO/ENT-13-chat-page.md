# ENT-13: Chat / Messaging Page

## Status: TODO
## Priority: Medium
## Depends on: None
## Agent: frontend-dev + backend-dev

## Objective

Add a Chat/Messaging page with real-time messaging using the existing SignalR hub (`/hubs/events`). This demonstrates WebSocket integration and is a common enterprise admin feature.

## Existing Infrastructure

- SignalR hub already configured at `/hubs/events` (EventsHub)
- Just needs chat-specific methods added

## Implementation Plan

### Backend (MockServer)

1. **ChatHub methods** (add to EventsHub or create separate ChatHub):
   - `SendMessage(channelId, message)` → broadcasts to channel
   - `JoinChannel(channelId)` → adds connection to group
   - `LeaveChannel(channelId)` → removes from group
   - `GetChannels()` → list available channels
   - `GetHistory(channelId)` → last 50 messages

2. **REST endpoints**:
   - `GET /api/chat/channels` — list channels
   - `GET /api/chat/channels/{id}/messages` — message history
   - `POST /api/chat/channels` — create channel

3. **Seed data**: 3-4 channels (General, Engineering, Design, Random), 20+ messages per channel with realistic mock conversations, varied timestamps

### Frontend

### 1. Page Structure

```
src/features/chat/
├── pages/
│   └── ChatPage/
│       ├── index.tsx
│       ├── components/
│       │   ├── ChannelList.tsx       # Left sidebar: channels
│       │   ├── MessageList.tsx       # Chat messages area
│       │   ├── MessageInput.tsx      # Text input + send button
│       │   ├── MessageBubble.tsx     # Individual message
│       │   ├── ChannelHeader.tsx     # Channel name, members, actions
│       │   └── UserPresence.tsx      # Online/offline indicator
│       └── hooks/
│           ├── useChatSignalR.ts     # SignalR connection + handlers
│           └── useChatMessages.ts
├── types.ts
└── constants.ts
```

### 2. Chat Features

- Channel list with unread count badges
- Message bubbles: sender avatar, name, timestamp, message text
- Real-time message delivery via SignalR
- Auto-scroll to newest message
- "User is typing" indicator
- Message timestamps (relative: "2 minutes ago")
- Emoji support (basic Unicode)
- Search messages

### 3. Route + Navigation

- Add `/chat` route
- Add "Chat" to sidebar under "Apps" section
- Show unread message count badge on nav item

## Success Criteria

- [ ] Chat page with channel list + message area
- [ ] Messages load from API history
- [ ] Real-time messages via SignalR
- [ ] Can switch channels
- [ ] Message input sends and displays immediately
- [ ] Respects dark/light theme
