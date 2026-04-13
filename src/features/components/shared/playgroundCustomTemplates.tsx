/** Shared template factories for custom column components in both playgrounds. */
import type { ReactNode } from 'react';

import { BadgeNativeVariant as BadgeVariant } from '@/components/ui/native';
import TagNative, { TagVariant } from '@/components/ui/native/TagNative';

import { AlertBadge } from './AlertBadge';
import { CustomComponentType } from './CustomComponentType';
import { ProgressBarCell } from './ProgressBarCell';

type TemplateRenderer = (data: Record<string, unknown>) => ReactNode;

// --- Variant maps ---
const STATUS_TO_BADGE: Record<string, BadgeVariant> = {
  Active: BadgeVariant.Success,
  Inactive: BadgeVariant.Error,
  'On Leave': BadgeVariant.Warning,
};

const ROLE_TO_TAG: Record<string, TagVariant> = {
  Manager: TagVariant.Primary,
  Developer: TagVariant.Success,
  Designer: TagVariant.Warning,
  Analyst: TagVariant.Default,
  Lead: TagVariant.Primary,
  QA: TagVariant.Danger,
};

const DEPT_TO_TAG: Record<string, TagVariant> = {
  Engineering: TagVariant.Primary,
  Marketing: TagVariant.Warning,
  Sales: TagVariant.Success,
  HR: TagVariant.Danger,
  Finance: TagVariant.Default,
  Design: TagVariant.Warning,
  Analytics: TagVariant.Default,
  Support: TagVariant.Success,
};

// --- Column meta ---
interface ColumnMeta { field: string; headerText: string; width: number }

const SF_META: Record<string, ColumnMeta> = {
  [CustomComponentType.AlertBadge]: { field: 'status', headerText: 'Status', width: 130 },
  [CustomComponentType.Tag]: { field: 'role', headerText: 'Role', width: 140 },
  [CustomComponentType.ProgressBar]: { field: 'salary', headerText: 'Salary', width: 180 },
};

const NATIVE_META: Record<string, ColumnMeta> = {
  [CustomComponentType.AlertBadge]: { field: 'active', headerText: 'Status', width: 130 },
  [CustomComponentType.Tag]: { field: 'department', headerText: 'Department', width: 140 },
  [CustomComponentType.ProgressBar]: { field: 'salary', headerText: 'Salary', width: 180 },
};

const MAX_SALARY = 110000;

const DEFAULT_META: ColumnMeta = { field: 'status', headerText: 'Status', width: 130 };

export function getSyncfusionCustomColumnMeta(type: string): ColumnMeta {
  return SF_META[type] ?? DEFAULT_META;
}

export function getNativeCustomColumnMeta(type: string): ColumnMeta {
  return NATIVE_META[type] ?? DEFAULT_META;
}

// --- Template renderers ---
 
function renderSfBadge(data: Record<string, unknown>): ReactNode {
  const status = String(data['status'] ?? 'Active');
  return <AlertBadge testId="pg-custom-badge" text={status} variant={STATUS_TO_BADGE[status] ?? BadgeVariant.Info} />;
}

 
function renderSfTag(data: Record<string, unknown>): ReactNode {
  const role = String(data['role'] ?? '');
  return <TagNative label={role} size="sm" testId="pg-custom-tag" variant={ROLE_TO_TAG[role] ?? TagVariant.Default} />;
}

 
function renderSfProgress(data: Record<string, unknown>): ReactNode {
  return <ProgressBarCell maxValue={MAX_SALARY} testId="pg-custom-progress" value={Number(data['salary'] ?? 0)} />;
}

// eslint-disable-next-line enforce-function-style/enforce-function-style -- must follow constants they reference (no-use-before-define)
function renderNativeBadge(row: Record<string, unknown>): ReactNode {
  const isActive = Boolean(row['active']);
  const label = isActive ? 'Active' : 'Inactive';
  return <AlertBadge testId="pg-custom-badge" text={label} variant={isActive ? BadgeVariant.Success : BadgeVariant.Error} />;
}

 
function renderNativeTag(row: Record<string, unknown>): ReactNode {
  const dept = String(row['department'] ?? '');
  return <TagNative label={dept} size="sm" testId="pg-custom-tag" variant={DEPT_TO_TAG[dept] ?? TagVariant.Default} />;
}

 
function renderNativeProgress(row: Record<string, unknown>): ReactNode {
  return <ProgressBarCell maxValue={MAX_SALARY} testId="pg-custom-progress" value={Number(row['salary'] ?? 0)} />;
}

// --- Template lookup maps ---
const SF_TEMPLATES: Record<string, TemplateRenderer> = {
  [CustomComponentType.AlertBadge]: renderSfBadge,
  [CustomComponentType.Tag]: renderSfTag,
  [CustomComponentType.ProgressBar]: renderSfProgress,
};

const NATIVE_TEMPLATES: Record<string, TemplateRenderer> = {
  [CustomComponentType.AlertBadge]: renderNativeBadge,
  [CustomComponentType.Tag]: renderNativeTag,
  [CustomComponentType.ProgressBar]: renderNativeProgress,
};

export function buildSyncfusionCustomTemplate(type: string): TemplateRenderer {
  return SF_TEMPLATES[type] ?? renderSfBadge;
}

export function buildNativeCustomTemplate(type: string): TemplateRenderer {
  return NATIVE_TEMPLATES[type] ?? renderNativeBadge;
}
