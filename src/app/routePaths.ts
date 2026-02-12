/**
 * Centralized route path constants.
 * Re-exports from individual route enum files for backward compatibility.
 *
 * RoutePath  - Full absolute paths used for navigation (navigate(), NavLink, etc.)
 * RouteSegment - Relative segments used inside nested route definitions (children of /dashboard).
 * RoutePrefix - Shared prefixes used for active-state matching in the sidebar.
 */

export { RoutePath, RouteSegment, RouteRedirectTarget, RoutePrefix } from './routes/index';
