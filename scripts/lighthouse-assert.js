/* global process, console */
/**
 * Lighthouse Score Assertion Script
 *
 * Reads the Lighthouse JSON report and validates that all scores meet the required thresholds.
 * Fails with exit code 1 if any score is below the threshold.
 *
 * Required thresholds (configurable below):
 * - Performance: 95%
 * - Accessibility: 100%
 * - Best Practices: 100%
 * - SEO: 100%
 */

import { readFileSync, existsSync } from 'fs';
import { resolve } from 'path';

const DEFAULT_REPORT = resolve(process.cwd(), 'reports', 'lighthouse.json');
const REPORT_PATH = process.argv[2]
  ? resolve(process.cwd(), process.argv[2])
  : DEFAULT_REPORT;

// Score thresholds (0-1 scale)
const THRESHOLDS = {
  performance: 0.95,
  accessibility: 1.0,
  'best-practices': 1.0,
  seo: 1.0,
};

// ANSI colors for console output
const GREEN = '\x1b[32m';
const RED = '\x1b[31m';
const YELLOW = '\x1b[33m';
const RESET = '\x1b[0m';
const BOLD = '\x1b[1m';

function formatScore(score) {
  return Math.round(score * 100);
}

function getScoreColor(score, threshold) {
  if (score >= threshold) return GREEN;
  if (score >= threshold * 0.9) return YELLOW;
  return RED;
}

function main() {
  console.log(`\n${BOLD}Lighthouse Score Assertion${RESET}\n`);

  if (!existsSync(REPORT_PATH)) {
    console.error(`${RED}Error: Lighthouse report not found at ${REPORT_PATH}${RESET}`);
    console.error('Run "npm run lighthouse:ci" first to generate the report.');
    process.exit(1);
  }

  let report;
  try {
    const content = readFileSync(REPORT_PATH, 'utf-8');
    report = JSON.parse(content);
  } catch (error) {
    console.error(`${RED}Error reading Lighthouse report: ${error.message}${RESET}`);
    process.exit(1);
  }

  const categories = report.categories;
  let allPassed = true;
  const results = [];

  for (const [key, threshold] of Object.entries(THRESHOLDS)) {
    const category = categories[key];
    if (!category) {
      console.error(`${RED}Warning: Category "${key}" not found in report${RESET}`);
      continue;
    }

    const score = category.score;
    const passed = score >= threshold;
    const color = getScoreColor(score, threshold);
    const status = passed ? `${GREEN}PASS${RESET}` : `${RED}FAIL${RESET}`;

    results.push({
      name: category.title,
      score: formatScore(score),
      threshold: formatScore(threshold),
      passed,
      color,
      status,
    });

    if (!passed) allPassed = false;
  }

  // Print results table
  console.log('┌────────────────────┬───────┬───────────┬────────┐');
  console.log('│ Category           │ Score │ Threshold │ Status │');
  console.log('├────────────────────┼───────┼───────────┼────────┤');

  for (const result of results) {
    const name = result.name.padEnd(18);
    const score = `${result.color}${result.score}%${RESET}`.padEnd(15);
    const threshold = `${result.threshold}%`.padEnd(9);
    console.log(`│ ${name} │ ${score} │ ${threshold} │ ${result.status} │`);
  }

  console.log('└────────────────────┴───────┴───────────┴────────┘\n');

  // Print timing metrics
  if (report.audits) {
    console.log(`${BOLD}Core Web Vitals:${RESET}`);
    const metrics = [
      { key: 'first-contentful-paint', name: 'First Contentful Paint' },
      { key: 'largest-contentful-paint', name: 'Largest Contentful Paint' },
      { key: 'total-blocking-time', name: 'Total Blocking Time' },
      { key: 'cumulative-layout-shift', name: 'Cumulative Layout Shift' },
      { key: 'speed-index', name: 'Speed Index' },
    ];

    for (const metric of metrics) {
      const audit = report.audits[metric.key];
      if (audit) {
        const value = audit.displayValue || audit.numericValue;
        const scoreColor = audit.score >= 0.9 ? GREEN : audit.score >= 0.5 ? YELLOW : RED;
        console.log(`  ${metric.name}: ${scoreColor}${value}${RESET}`);
      }
    }
    console.log('');
  }

  if (allPassed) {
    console.log(`${GREEN}${BOLD}All Lighthouse assertions passed!${RESET}\n`);
    process.exit(0);
  } else {
    console.log(`${RED}${BOLD}Some Lighthouse assertions failed.${RESET}`);
    console.log('Review the scores above and optimize the application.\n');
    process.exit(1);
  }
}

main();
