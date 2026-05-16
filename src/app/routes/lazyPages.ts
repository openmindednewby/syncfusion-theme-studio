import { lazy } from 'react';

// Landing
export const LandingPage = lazy(async () => import('@/features/landing/pages/LandingPage'));

// Auth & Dashboard
export const LoginPage = lazy(async () => import('@/features/auth/pages/LoginPage'));
export const DashboardPage = lazy(async () => import('@/features/dashboard/pages/DashboardPage'));
export const DashboardMetricsPage = lazy(async () => import('@/features/dashboard/pages/DashboardMetricsPage'));
export const DashboardKpisPage = lazy(async () => import('@/features/dashboard/pages/DashboardKpisPage'));

// Products
export const NativeProductsPage = lazy(async () => import('@/features/products/pages/NativeProductsPage'));
export const ProductsListPage = lazy(async () => import('@/features/products/pages/ProductsListPage'));

// Components overview
export const NativeComponentsPage = lazy(async () => import('@/features/components/pages/NativeComponentsPage'));
export const SyncfusionComponentsPage = lazy(async () => import('@/features/components/pages/SyncfusionComponentsPage'));

// Grid showcase
export const NativeGridShowcase = lazy(async () => import('@/features/components/pages/NativeGridShowcase'));
export const SyncfusionGridShowcase = lazy(async () => import('@/features/components/pages/SyncfusionGridShowcase'));
export const SyncfusionGridPlayground = lazy(async () => import('@/features/components/pages/SyncfusionGridPlayground'));

// Button showcase
export const NativeButtonShowcase = lazy(async () => import('@/features/components/pages/NativeButtonShowcase'));
export const SyncfusionButtonShowcase = lazy(async () => import('@/features/components/pages/SyncfusionButtonShowcase'));

// Input showcase
export const NativeInputShowcase = lazy(async () => import('@/features/components/pages/NativeInputShowcase'));
export const SyncfusionInputShowcase = lazy(async () => import('@/features/components/pages/SyncfusionInputShowcase'));

// Select showcase
export const NativeSelectShowcase = lazy(async () => import('@/features/components/pages/NativeSelectShowcase'));
export const SyncfusionSelectShowcase = lazy(async () => import('@/features/components/pages/SyncfusionSelectShowcase'));

// DatePicker showcase
export const NativeDatePickerShowcase = lazy(async () => import('@/features/components/pages/NativeDatePickerShowcase'));
export const SyncfusionDatePickerShowcase = lazy(async () => import('@/features/components/pages/SyncfusionDatePickerShowcase'));

// Dialog showcase
export const NativeDialogShowcase = lazy(async () => import('@/features/components/pages/NativeDialogShowcase'));
export const SyncfusionDialogShowcase = lazy(async () => import('@/features/components/pages/SyncfusionDialogShowcase'));

// Alert showcase
export const NativeAlertShowcase = lazy(async () => import('@/features/components/pages/NativeAlertShowcase'));
export const SyncfusionAlertShowcase = lazy(async () => import('@/features/components/pages/SyncfusionAlertShowcase'));

// AlertBadge showcase
export const AlertBadgeShowcase = lazy(async () => import('@/features/components/pages/AlertBadgeShowcase'));

// PillBadge showcase
export const PillBadgeShowcase = lazy(async () => import('@/features/components/pages/PillBadgeShowcase'));

// Pagination showcase
export const PaginationShowcase = lazy(async () => import('@/features/components/pages/PaginationShowcase'));

// SearchPanel showcase
export const SearchPanelShowcase = lazy(async () => import('@/features/components/pages/SearchPanelShowcase'));

// FlexBox showcase
export const FlexBoxShowcase = lazy(async () => import('@/features/components/pages/FlexBoxShowcase'));

// Checkbox showcase
export const NativeCheckboxShowcase = lazy(async () => import('@/features/components/pages/NativeCheckboxShowcase'));
export const SyncfusionCheckboxShowcase = lazy(async () => import('@/features/components/pages/SyncfusionCheckboxShowcase'));

// Toast showcase
export const NativeToastShowcase = lazy(async () => import('@/features/components/pages/NativeToastShowcase'));
export const SyncfusionToastShowcase = lazy(async () => import('@/features/components/pages/SyncfusionToastShowcase'));

// Toggle showcase
export const NativeToggleShowcase = lazy(async () => import('@/features/components/pages/NativeToggleShowcase'));
export const SyncfusionToggleShowcase = lazy(async () => import('@/features/components/pages/SyncfusionToggleShowcase'));

// Toolbar showcase
export const NativeToolbarShowcase = lazy(async () => import('@/features/components/pages/NativeToolbarShowcase'));
export const SyncfusionToolbarShowcase = lazy(async () => import('@/features/components/pages/SyncfusionToolbarShowcase'));

// Menu showcase
export const NativeMenuShowcase = lazy(async () => import('@/features/components/pages/NativeMenuShowcase'));
export const SyncfusionMenuShowcase = lazy(async () => import('@/features/components/pages/SyncfusionMenuShowcase'));

// Accordion showcase
export const NativeAccordionShowcase = lazy(async () => import('@/features/components/pages/NativeAccordionShowcase'));
export const SyncfusionAccordionShowcase = lazy(async () => import('@/features/components/pages/SyncfusionAccordionShowcase'));

// Breadcrumb showcase
export const NativeBreadcrumbShowcase = lazy(async () => import('@/features/components/pages/NativeBreadcrumbShowcase'));
export const SyncfusionBreadcrumbShowcase = lazy(async () => import('@/features/components/pages/SyncfusionBreadcrumbShowcase'));

// Tabs showcase
export const NativeTabsShowcase = lazy(async () => import('@/features/components/pages/NativeTabsShowcase'));
export const SyncfusionTabsShowcase = lazy(async () => import('@/features/components/pages/SyncfusionTabsShowcase'));

// Timeline showcase
export const NativeTimelineShowcase = lazy(async () => import('@/features/components/pages/NativeTimelineShowcase'));
export const SyncfusionTimelineShowcase = lazy(async () => import('@/features/components/pages/SyncfusionTimelineShowcase'));

// Tag showcase
export const NativeTagShowcase = lazy(async () => import('@/features/components/pages/NativeTagShowcase'));
export const SyncfusionTagShowcase = lazy(async () => import('@/features/components/pages/SyncfusionTagShowcase'));

// Badge showcase
export const NativeBadgeShowcase = lazy(async () => import('@/features/components/pages/NativeBadgeShowcase'));
export const SyncfusionBadgeShowcase = lazy(async () => import('@/features/components/pages/SyncfusionBadgeShowcase'));

// Avatar showcase
export const NativeAvatarShowcase = lazy(async () => import('@/features/components/pages/NativeAvatarShowcase'));
export const SyncfusionAvatarShowcase = lazy(async () => import('@/features/components/pages/SyncfusionAvatarShowcase'));

// Card showcase
export const NativeCardShowcase = lazy(async () => import('@/features/components/pages/NativeCardShowcase'));
export const SyncfusionCardShowcase = lazy(async () => import('@/features/components/pages/SyncfusionCardShowcase'));

// Chip showcase
export const NativeChipShowcase = lazy(async () => import('@/features/components/pages/NativeChipShowcase'));
export const SyncfusionChipShowcase = lazy(async () => import('@/features/components/pages/SyncfusionChipShowcase'));

// ProgressBar showcase
export const NativeProgressBarShowcase = lazy(async () => import('@/features/components/pages/NativeProgressBarShowcase'));
export const SyncfusionProgressBarShowcase = lazy(async () => import('@/features/components/pages/SyncfusionProgressBarShowcase'));

// Tooltip showcase
export const NativeTooltipShowcase = lazy(async () => import('@/features/components/pages/NativeTooltipShowcase'));
export const SyncfusionTooltipShowcase = lazy(async () => import('@/features/components/pages/SyncfusionTooltipShowcase'));

// Colors showcase
export const ColorsShowcase = lazy(async () => import('@/features/components/pages/ColorsShowcase'));

// Icons showcase
export const IconsShowcase = lazy(async () => import('@/features/components/pages/IconsShowcase'));

// TextDescription showcase
export const NativeTextDescriptionShowcase = lazy(async () => import('@/features/components/pages/NativeTextDescriptionShowcase'));
export const SyncfusionTextDescriptionShowcase = lazy(async () => import('@/features/components/pages/SyncfusionTextDescriptionShowcase'));

// Typography showcase
export const NativeTypographyShowcase = lazy(async () => import('@/features/components/pages/NativeTypographyShowcase'));

// NavMenu showcase
export const NavMenuShowcase = lazy(async () => import('@/features/components/pages/NavMenuShowcase'));

// Sidebar showcase
export const SidebarShowcase = lazy(async () => import('@/features/components/pages/SidebarShowcase'));

// ExternalLink showcase
export const ExternalLinkShowcase = lazy(async () => import('@/features/components/pages/ExternalLinkShowcase'));

// Image showcase
export const ImageShowcase = lazy(async () => import('@/features/components/pages/ImageShowcase'));

// Loader showcase
export const NativeLoaderShowcase = lazy(async () => import('@/features/components/pages/NativeLoaderShowcase'));

// Slider showcase
export const NativeSliderShowcase = lazy(async () => import('@/features/components/pages/NativeSliderShowcase'));

// SkeletonLoader showcase
export const NativeSkeletonLoaderShowcase = lazy(async () => import('@/features/components/pages/NativeSkeletonLoaderShowcase'));

// ThemeToggle showcase
export const NativeThemeToggleShowcase = lazy(async () => import('@/features/components/pages/NativeThemeToggleShowcase'));

// Admin Hub
export const AdminUserManagementPage = lazy(async () => import('@/features/admin/pages/UserManagementPage'));
export const AdminRoleManagementPage = lazy(async () => import('@/features/admin/pages/AdminRoleManagementPage'));
export const AdminThemeEditorPage = lazy(async () => import('@/features/admin/pages/AdminThemeEditorPage'));
export const AdminSystemSettingsPage = lazy(async () => import('@/features/admin/pages/AdminSystemSettingsPage'));
export const AdminIntegrationsPage = lazy(async () => import('@/features/admin/pages/AdminIntegrationsPage'));
export const AdminPluginsPage = lazy(async () => import('@/features/admin/pages/AdminPluginsPage'));
export const AdminDocumentationPage = lazy(async () => import('@/features/admin/pages/AdminDocumentationPage'));
export const AdminSupportPage = lazy(async () => import('@/features/admin/pages/AdminSupportPage'));

// Forms
export const SyncfusionFormsPage = lazy(async () => import('@/features/forms/pages/SyncfusionFormsPage'));
export const NativeFormsPage = lazy(async () => import('@/features/forms/pages/NativeFormsPage'));

// Error Pages
export const UnauthorizedPage = lazy(async () => import('@/features/errors/UnauthorizedPage'));
export const ForbiddenPage = lazy(async () => import('@/features/errors/ForbiddenPage'));
export const ServerErrorPage = lazy(async () => import('@/features/errors/ServerErrorPage'));

// App Pages
export const NotificationsPage = lazy(async () => import('@/features/notifications/NotificationsPage'));
export const UserProfilePage = lazy(async () => import('@/features/profile/UserProfilePage'));
export const ActivityLogPage = lazy(async () => import('@/features/activity-log/ActivityLogPage'));

// Business Pages
export const CustomersPage = lazy(async () => import('@/features/customers/CustomersPage'));
export const InvoicesPage = lazy(async () => import('@/features/invoices/InvoicesPage'));
export const OrdersPage = lazy(async () => import('@/features/orders/OrdersPage'));
export const InventoryPage = lazy(async () => import('@/features/inventory/InventoryPage'));
export const SettingsPage = lazy(async () => import('@/features/settings/SettingsPage'));

// Calendar
export const CalendarPage = lazy(async () => import('@/features/calendar/pages/CalendarPage'));

// Kanban
export const KanbanPage = lazy(async () => import('@/features/kanban/pages/KanbanPage'));

// Maps
export const MapsPage = lazy(async () => import('@/features/maps/pages/MapsPage'));

// Chat
export const ChatPage = lazy(async () => import('@/features/chat/pages/ChatPage'));

// Diagram
export const DiagramPage = lazy(async () => import('@/features/diagram/pages/DiagramPage'));

// Pricing
export const PricingPage = lazy(async () => import('@/features/pricing/pages/PricingPage'));

// Not Found
export const NotFoundPage = lazy(async () => import('@/features/not-found/NotFoundPage'));
