/**
 * SIEM security alert data and Syncfusion column definitions.
 * Generates 592 alerts with modular arithmetic for deterministic variety.
 */
import type { ColumnModel } from '@syncfusion/ej2-grids';

import { FM } from '@/localization/helpers';

// Column width constants
const COL_WIDTH_ID = 100;
const COL_WIDTH_SEVERITY = 110;
const COL_WIDTH_SCORE = 80;
const COL_WIDTH_STATUS = 120;
const COL_WIDTH_CORRELATION = 220;
const COL_WIDTH_DATE = 150;
const COL_WIDTH_ASSET = 140;
const COL_WIDTH_TACTIC = 120;
const COL_WIDTH_TECHNIQUE = 140;
const COL_WIDTH_ASSIGNEE = 120;
const COL_WIDTH_SLA_STATUS = 150;
const COL_WIDTH_AUTOMATION = 180;
const COL_WIDTH_ACTIONS = 120;

const ALERT_COUNT = 592;

export interface SecurityAlert {
  id: number;
  severity: string;
  score: number;
  status: string;
  correlationName: string;
  dateCreated: string;
  affectedAsset: string;
  tactic: string;
  technique: string;
  assignee: string;
  slaStatus: string;
  slaRemaining: string;
  automationStatus: string;
}

const SEVERITIES = ['Critical', 'High', 'Medium', 'Low', 'Informational'];

const STATUSES = ['New', 'In Progress', 'Escalated', 'Resolved', 'Closed'];

const CORRELATION_NAMES = [
  'Brute Force Authentication',
  'Lateral Movement Detected',
  'Data Exfiltration Attempt',
  'Privilege Escalation',
  'Suspicious PowerShell',
  'Malware Beacon Activity',
  'Unauthorized Access Attempt',
  'DDoS Pattern Detected',
  'Phishing Campaign',
  'Insider Threat Indicator',
  'Ransomware Precursor',
  'C2 Communication',
];

const ASSETS = [
  'DC-01', 'WEB-PROD-03', 'DB-MAIN-01', 'MAIL-SRV-02',
  'FW-EDGE-01', 'APP-SRV-04', 'WORKSTATION-127', 'VPN-GW-01',
];

const TACTICS = [
  'Initial Access', 'Execution', 'Persistence', 'Privilege Escalation',
  'Defense Evasion', 'Credential Access', 'Discovery', 'Lateral Movement',
  'Collection', 'Exfiltration', 'Command and Control', 'Impact',
];

const TECHNIQUES = [
  'T1078 Valid Accounts', 'T1059 Command Scripting', 'T1547 Boot Autostart',
  'T1068 Exploitation', 'T1070 Indicator Removal', 'T1110 Brute Force',
  'T1018 Remote Discovery', 'T1021 Remote Services', 'T1560 Archive Data',
  'T1041 Exfil Over C2', 'T1071 Application Layer', 'T1486 Data Encrypted',
];

const ASSIGNEES = ['Sarah Chen', 'James Wilson', 'Maria Garcia', 'Alex Kumar', 'Unassigned'];
const SLA_STATUSES = ['Within SLA', 'At Risk', 'Breached'];
const AUTOMATION_STATUSES = ['Auto-Triaged', 'Manual Review', 'Auto-Enriched', 'Pending'];

const SCORE_CRITICAL = 95;
const SCORE_RANGE = 80;
const SCORE_JITTER = 7;
const SCORE_MIN = 10;
const SCORE_MAX = 100;
const HOUR_MS = 3600000;
const DAY_MS = 86400000;
const HOUR_MULTIPLIER = 3;
const DAY_MODULO = 5;
const SLA_MODULO = 6;
const STATUS_OFFSET = 2;
const ASSET_OFFSET = 1;
const ASSIGNEE_OFFSET = 3;
const AUTOMATION_OFFSET = 1;
const BASE_YEAR = 2026;
const BASE_MONTH = 1;
const BASE_DAY = 12;
const BASE_HOUR = 8;
const PAD_WIDTH = 2;

const SLA_CRITICAL_HOURS = 1;
const SLA_HIGH_HOURS = 4;
const SLA_MEDIUM_HOURS = 8;
const SLA_LOW_HOURS = 24;
const SLA_INFO_HOURS = 72;
const SLA_HOURS = [SLA_CRITICAL_HOURS, SLA_HIGH_HOURS, SLA_MEDIUM_HOURS, SLA_LOW_HOURS, SLA_INFO_HOURS];
const SCORE_DECIMAL_FACTOR = 0.1;
const SCORE_ROUND_PRECISION = 10;
const ID_OFFSET = 26077000;

function pickFromArray<T>(arr: T[], index: number): T {
  // Array is guaranteed non-empty; modulo ensures valid index
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- index always in bounds via modulo
  return arr[index % arr.length]!;
}

export const SECURITY_ALERTS: SecurityAlert[] = Array.from(
  { length: ALERT_COUNT },
  (_, i) => {
    const severityIndex = i % SEVERITIES.length;
    const scoreRaw = SCORE_CRITICAL - (severityIndex * SCORE_RANGE) / SEVERITIES.length
      + (i % SCORE_JITTER) * SCORE_DECIMAL_FACTOR;
    const score = Math.round(scoreRaw * SCORE_ROUND_PRECISION) / SCORE_ROUND_PRECISION;
    const date = new Date(BASE_YEAR, BASE_MONTH, BASE_DAY, BASE_HOUR, 0, 0);
    date.setTime(
      date.getTime() - i * HOUR_MS * HOUR_MULTIPLIER - (i % DAY_MODULO) * DAY_MS,
    );
    const slaHoursValue = pickFromArray(SLA_HOURS, severityIndex);
    const remaining = slaHoursValue - (i % SLA_MODULO);

    return {
      id: ID_OFFSET + i,
      severity: pickFromArray(SEVERITIES, i),
      score: Math.max(SCORE_MIN, Math.min(SCORE_MAX, score)),
      status: pickFromArray(STATUSES, i + STATUS_OFFSET),
      correlationName: pickFromArray(CORRELATION_NAMES, i),
      dateCreated: `${String(date.getDate()).padStart(PAD_WIDTH, '0')}/${String(date.getMonth() + 1).padStart(PAD_WIDTH, '0')}/${String(date.getFullYear())}`,
      affectedAsset: pickFromArray(ASSETS, i + ASSET_OFFSET),
      tactic: pickFromArray(TACTICS, i),
      technique: pickFromArray(TECHNIQUES, i),
      assignee: pickFromArray(ASSIGNEES, i + ASSIGNEE_OFFSET),
      slaStatus: pickFromArray(SLA_STATUSES, i),
      slaRemaining: remaining > 0 ? `${String(remaining)} min remaining` : 'Breached',
      automationStatus: pickFromArray(AUTOMATION_STATUSES, i + AUTOMATION_OFFSET),
    };
  },
);

export const ALERT_COLUMNS: ColumnModel[] = [
  { field: 'id', headerText: FM('gridShowcase.alertId'), width: COL_WIDTH_ID },
  { field: 'severity', headerText: FM('gridShowcase.alertSeverity'), width: COL_WIDTH_SEVERITY },
  { field: 'score', headerText: FM('gridShowcase.alertScore'), width: COL_WIDTH_SCORE },
  { field: 'status', headerText: FM('common.status'), width: COL_WIDTH_STATUS },
  { field: 'correlationName', headerText: FM('gridShowcase.alertCorrelation'), width: COL_WIDTH_CORRELATION },
  { field: 'dateCreated', headerText: FM('gridShowcase.alertDateCreated'), width: COL_WIDTH_DATE },
  { field: 'affectedAsset', headerText: FM('gridShowcase.alertAsset'), width: COL_WIDTH_ASSET },
  { field: 'tactic', headerText: FM('gridShowcase.alertTactic'), width: COL_WIDTH_TACTIC },
  { field: 'technique', headerText: FM('gridShowcase.alertTechnique'), width: COL_WIDTH_TECHNIQUE },
  { field: 'assignee', headerText: FM('gridShowcase.alertAssignee'), width: COL_WIDTH_ASSIGNEE },
  { field: 'slaStatus', headerText: FM('gridShowcase.alertSlaStatus'), width: COL_WIDTH_SLA_STATUS },
  { field: 'automationStatus', headerText: FM('gridShowcase.alertAutomation'), width: COL_WIDTH_AUTOMATION },
  { field: 'actions', headerText: FM('gridShowcase.alertActions'), width: COL_WIDTH_ACTIONS },
];
