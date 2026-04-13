# ENT-01: Auth Guards + Protected Routes

## Status: TODO
## Priority: Critical
## Depends on: None
## Agent: frontend-dev

## Objective

Implement real authentication flow with route protection so the app behaves like an actual enterprise admin platform — unauthenticated users are redirected to login, and tokens are managed properly.

## Current State

- Login page exists with mock `POST /api/auth/login` (accepts any credentials, returns `mock-jwt-{guid}`)
- No route guards — every route is accessible without login
- No token storage, no refresh flow, no logout

## Implementation Plan

### 1. Auth Store (Zustand + localStorage)

- Create `src/stores/useAuthStore.ts`
- State: `token`, `user` (decoded from JWT or fetched), `isAuthenticated`, `isLoading`
- Actions: `login(email, password)`, `logout()`, `checkAuth()` (rehydrate from localStorage)
- Persist token to localStorage, clear on logout

### 2. Auth Provider

- Create `src/app/providers/AuthProvider.tsx`
- On mount: check localStorage for token, validate (mock validation — just check existence)
- Set `isAuthenticated` in store

### 3. Protected Route Wrapper

- Create `src/components/common/ProtectedRoute.tsx`
- If not authenticated → redirect to `/login`
- If authenticated + on `/login` → redirect to `/dashboard`
- Show loading spinner while checking auth

### 4. Update Router

- Wrap all dashboard/admin/feature routes in `<ProtectedRoute>`
- Keep `/login` and error pages public
- Add `/logout` route that clears auth and redirects to `/login`

### 5. Update Login Page

- On successful login → store token → redirect to `/dashboard`
- Show error toast on failed login (currently all logins succeed — add a "wrong password" mock scenario)

### 6. Update Header

- Show user info (name/avatar) from auth store
- Add logout button/menu

### 7. Axios Interceptor

- Attach `Authorization: Bearer {token}` header to all API requests
- On 401 response → clear auth → redirect to `/login`

## Success Criteria

- [ ] Visiting any protected route without login redirects to `/login`
- [ ] After login, user is redirected to `/dashboard`
- [ ] Token persists across page refresh (localStorage)
- [ ] Logout clears token and redirects to `/login`
- [ ] 401 API response triggers automatic logout
- [ ] Login page redirects to `/dashboard` if already authenticated
