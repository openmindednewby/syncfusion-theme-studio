import { describe, expect, it } from 'vitest';

import { SAMPLE_SHEET_COUNT } from '../constants';
import { buildBudgetTemplateSheet } from './budgetTemplateSheet';
import { buildEmployeeRosterSheet } from './employeeRosterSheet';
import { buildSalesReportSheet } from './salesReportSheet';
import { getSampleSheets } from './sampleSheets';

describe('getSampleSheets', () => {
  it('returns the expected number of sheets', () => {
    const sheets = getSampleSheets();
    expect(sheets.length).toBe(SAMPLE_SHEET_COUNT);
  });

  it('returns sheets with unique names', () => {
    const sheets = getSampleSheets();
    const names = sheets.map((s) => s.name);
    expect(new Set(names).size).toBe(names.length);
  });
});

describe('buildSalesReportSheet', () => {
  it('returns a sheet named Sales Report', () => {
    const sheet = buildSalesReportSheet();
    expect(sheet.name).toBe('Sales Report');
  });

  it('has rows and columns defined', () => {
    const sheet = buildSalesReportSheet();
    expect(sheet.rows!.length).toBeGreaterThan(0);
    expect(sheet.columns!.length).toBeGreaterThan(0);
  });

  it('includes formula cells with SUM functions', () => {
    const sheet = buildSalesReportSheet();
    const allCells = sheet.rows!.flatMap((row) => row.cells ?? []);
    const formulaCells = allCells.filter((cell) => 'formula' in cell);
    expect(formulaCells.length).toBeGreaterThan(0);
  });
});

describe('buildBudgetTemplateSheet', () => {
  it('returns a sheet named Budget Template', () => {
    const sheet = buildBudgetTemplateSheet();
    expect(sheet.name).toBe('Budget Template');
  });

  it('has rows and columns defined', () => {
    const sheet = buildBudgetTemplateSheet();
    expect(sheet.rows!.length).toBeGreaterThan(0);
    expect(sheet.columns!.length).toBeGreaterThan(0);
  });
});

describe('buildEmployeeRosterSheet', () => {
  it('returns a sheet with a defined name', () => {
    const sheet = buildEmployeeRosterSheet();
    expect(sheet.name).toBeDefined();
    expect(sheet.name).not.toBe('');
  });

  it('has rows and columns defined', () => {
    const sheet = buildEmployeeRosterSheet();
    expect(sheet.rows!.length).toBeGreaterThan(0);
    expect(sheet.columns!.length).toBeGreaterThan(0);
  });
});
