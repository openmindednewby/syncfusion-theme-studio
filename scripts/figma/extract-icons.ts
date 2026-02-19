// Icon extraction from Figma document tree.
// Finds the "Icons" SECTION, collects icon node IDs, fetches SVGs via Images API.

import type { FigmaNode, IconExtractionData, IconNodeData } from './types';
import { SKIP_ICONS } from './icon-utils';

const FIGMA_API_BASE = 'https://api.figma.com/v1';
const MAX_RETRIES = 3;
const MAX_RETRY_WAIT_S = 60;
const CONCURRENT_DOWNLOADS = 10;

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/** Find a SECTION node by name (case-insensitive), recursively */
function findSectionByName(
  root: FigmaNode,
  name: string,
): FigmaNode | undefined {
  const lowerName = name.toLowerCase();
  if (
    root.name.toLowerCase() === lowerName &&
    (root.type === 'SECTION' || root.type === 'FRAME')
  ) {
    return root;
  }
  for (const child of root.children ?? []) {
    const found = findSectionByName(child, name);
    if (found) return found;
  }
  return undefined;
}

interface IconCandidate {
  nodeId: string;
  name: string;
}

/** Index of the stroke variant child within an icon frame (filled-small=0, filled-medium=1, stroke=2) */
const STROKE_VARIANT_INDEX = 2;

/**
 * Find the stroke variant child node within an icon frame.
 * Each icon frame contains 3 side-by-side variants; the 3rd (index 2) is the stroke variant.
 * Falls back to the frame itself if children aren't available.
 */
function findStrokeVariantNode(iconFrame: FigmaNode): FigmaNode {
  const children = iconFrame.children ?? [];
  if (children.length > STROKE_VARIANT_INDEX) {
    return children[STROKE_VARIANT_INDEX]!;
  }
  return iconFrame;
}

/**
 * Walk the Icons section tree to collect icon candidates.
 * Icons are organized in "row" frames; each child of a row is an icon instance.
 * Targets the stroke variant child for cleaner SVG output from the Images API.
 * We normalize the icon name to kebab-case and skip those in SKIP_ICONS.
 */
function collectIconNodes(section: FigmaNode): {
  candidates: IconCandidate[];
  skipped: number;
} {
  const candidates: IconCandidate[] = [];
  let skipped = 0;

  for (const row of section.children ?? []) {
    for (const icon of row.children ?? []) {
      const rawName = icon.name.trim().toLowerCase();
      if (SKIP_ICONS.has(rawName)) {
        skipped++;
        continue;
      }
      const target = findStrokeVariantNode(icon);
      candidates.push({ nodeId: target.id, name: rawName });
    }
  }

  return { candidates, skipped };
}

/** Fetch SVG image URLs from the Figma Images API with retry logic */
async function fetchSvgUrls(
  fileKey: string,
  token: string,
  nodeIds: string[],
): Promise<Record<string, string>> {
  const ids = nodeIds.join(',');
  const url = `${FIGMA_API_BASE}/images/${fileKey}?ids=${ids}&format=svg`;

  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    const response = await fetch(url, {
      headers: { 'X-FIGMA-TOKEN': token },
    });

    if (response.ok) {
      const data = (await response.json()) as { images: Record<string, string> };
      return data.images;
    }

    if (response.status === 429 && attempt < MAX_RETRIES) {
      const raw = Number(response.headers.get('retry-after') ?? '30');
      const waitS = Math.min(raw, MAX_RETRY_WAIT_S);
      console.log(`  Images API rate limited. Waiting ${waitS}s before retry...`);
      await sleep(waitS * 1000);
      continue;
    }

    const body = await response.text();
    throw new Error(`Figma Images API error ${response.status}: ${body}`);
  }

  throw new Error(`Images API failed after ${MAX_RETRIES} retries`);
}

/** Download a single SVG from a URL with retry logic */
async function downloadSvg(url: string): Promise<string> {
  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    const response = await fetch(url);
    if (response.ok) return response.text();

    if (response.status === 429 && attempt < MAX_RETRIES) {
      const raw = Number(response.headers.get('retry-after') ?? '5');
      const waitS = Math.min(raw, MAX_RETRY_WAIT_S);
      await sleep(waitS * 1000);
      continue;
    }

    throw new Error(`SVG download failed (${response.status}): ${url}`);
  }
  throw new Error(`SVG download failed after ${MAX_RETRIES} retries`);
}

/** Download SVGs concurrently with a concurrency limit */
async function downloadAllSvgs(
  candidates: IconCandidate[],
  imageUrls: Record<string, string>,
): Promise<IconNodeData[]> {
  const icons: IconNodeData[] = [];
  const tasks = candidates.filter((c) => imageUrls[c.nodeId]);

  for (let i = 0; i < tasks.length; i += CONCURRENT_DOWNLOADS) {
    const chunk = tasks.slice(i, i + CONCURRENT_DOWNLOADS);
    const results = await Promise.all(
      chunk.map(async (candidate) => {
        const svgContent = await downloadSvg(imageUrls[candidate.nodeId]!);
        return {
          nodeId: candidate.nodeId,
          name: candidate.name,
          svgContent,
        };
      }),
    );
    icons.push(...results);
  }

  return icons;
}

/**
 * Extract icons from the Figma document.
 * Finds the "Icons" section, collects node IDs, fetches SVGs via Images API.
 */
export async function extractIcons(
  document: FigmaNode,
  fileKey: string,
  token: string,
): Promise<IconExtractionData | undefined> {
  const section = findSectionByName(document, 'Icons');
  if (!section) {
    console.warn('Icons section not found in Figma document');
    return undefined;
  }

  const { candidates, skipped } = collectIconNodes(section);
  const totalFound = candidates.length + skipped;
  console.log(
    `Icons: found ${totalFound} total, skipping ${skipped} (in AppIcons), processing ${candidates.length}`,
  );

  if (candidates.length === 0) {
    return { totalFound, skipped, icons: [] };
  }

  // Fetch SVG URLs from Figma Images API
  const nodeIds = candidates.map((c) => c.nodeId);
  console.log(`  Fetching SVG URLs for ${nodeIds.length} icons...`);
  const imageUrls = await fetchSvgUrls(fileKey, token, nodeIds);

  const missingCount = candidates.filter((c) => !imageUrls[c.nodeId]).length;
  if (missingCount > 0) {
    console.warn(`  ${missingCount} icons returned no SVG URL`);
  }

  // Download all SVGs with concurrency limit
  console.log('  Downloading SVGs...');
  const icons = await downloadAllSvgs(candidates, imageUrls);
  console.log(`  Downloaded ${icons.length} SVGs`);

  return { totalFound, skipped, icons };
}
