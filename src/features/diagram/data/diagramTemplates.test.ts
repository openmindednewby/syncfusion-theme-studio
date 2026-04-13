import { describe, it, expect } from 'vitest';

import { getDiagramTemplates } from './diagramTemplates';

import type { DiagramTemplate } from '../types';

describe('getDiagramTemplates', () => {
  it('returns exactly two templates', () => {
    const templates = getDiagramTemplates();
    expect(templates).toHaveLength(2);
  });

  it('includes a flowchart template', () => {
    const templates = getDiagramTemplates();
    const flowchart = templates.find((t) => t.id === 'flowchart');
    expect(flowchart).toBeDefined();
  });

  it('includes an org-chart template', () => {
    const templates = getDiagramTemplates();
    const orgChart = templates.find((t) => t.id === 'org-chart');
    expect(orgChart).toBeDefined();
  });

  it('assigns unique IDs to each template', () => {
    const templates = getDiagramTemplates();
    const ids = templates.map((t) => t.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('provides labelKey and descriptionKey for each template', () => {
    const templates = getDiagramTemplates();
    for (const template of templates) {
      expect(template.labelKey).toBeTruthy();
      expect(template.descriptionKey).toBeTruthy();
    }
  });
});

describe('Flowchart template data', () => {
  function getFlowchart(): DiagramTemplate {
    return getDiagramTemplates().find((t) => t.id === 'flowchart')!;
  }

  it('has 5 nodes (start, process1, decision, process2, end)', () => {
    expect(getFlowchart().nodes).toHaveLength(5);
  });

  it('has 4 connectors linking the nodes', () => {
    expect(getFlowchart().connectors).toHaveLength(4);
  });

  it('all nodes have unique IDs', () => {
    const nodeIds = getFlowchart().nodes.map((n) => n.id);
    expect(new Set(nodeIds).size).toBe(nodeIds.length);
  });

  it('all connectors have unique IDs', () => {
    const connectorIds = getFlowchart().connectors.map((c) => c.id);
    expect(new Set(connectorIds).size).toBe(connectorIds.length);
  });

  it('every connector references valid source and target node IDs', () => {
    const flowchart = getFlowchart();
    const nodeIds = new Set(flowchart.nodes.map((n) => n.id));
    for (const connector of flowchart.connectors) {
      expect(nodeIds.has(connector.sourceID)).toBe(true);
      expect(nodeIds.has(connector.targetID)).toBe(true);
    }
  });

  it('every node has at least one annotation', () => {
    for (const node of getFlowchart().nodes) {
      expect(node.annotations).toBeDefined();
      expect(node.annotations!.length).toBeGreaterThan(0);
    }
  });

  it('decision node uses Flow shape type with Decision shape', () => {
    const decision = getFlowchart().nodes.find((n) => n.id === 'fc-decision');
    expect(decision).toBeDefined();
    expect(decision!.shape).toEqual({ type: 'Flow', shape: 'Decision' });
  });

  it('decision node is wider and taller than process nodes', () => {
    const decision = getFlowchart().nodes.find((n) => n.id === 'fc-decision')!;
    const process = getFlowchart().nodes.find((n) => n.id === 'fc-process1')!;
    expect(decision.width!).toBeGreaterThan(process.width!);
    expect(decision.height!).toBeGreaterThan(process.height!);
  });
});

describe('Org chart template data', () => {
  function getOrgChart(): DiagramTemplate {
    return getDiagramTemplates().find((t) => t.id === 'org-chart')!;
  }

  it('has 6 nodes (CEO, CTO, CFO, Dev Lead, QA Lead, Finance Mgr)', () => {
    expect(getOrgChart().nodes).toHaveLength(6);
  });

  it('has 5 connectors forming the hierarchy', () => {
    expect(getOrgChart().connectors).toHaveLength(5);
  });

  it('all nodes have unique IDs', () => {
    const nodeIds = getOrgChart().nodes.map((n) => n.id);
    expect(new Set(nodeIds).size).toBe(nodeIds.length);
  });

  it('every connector references valid source and target node IDs', () => {
    const orgChart = getOrgChart();
    const nodeIds = new Set(orgChart.nodes.map((n) => n.id));
    for (const connector of orgChart.connectors) {
      expect(nodeIds.has(connector.sourceID)).toBe(true);
      expect(nodeIds.has(connector.targetID)).toBe(true);
    }
  });

  it('CEO node is the root (no connector targets it)', () => {
    const orgChart = getOrgChart();
    const targetIds = new Set(orgChart.connectors.map((c) => c.targetID));
    expect(targetIds.has('org-ceo')).toBe(false);
  });

  it('all connectors use Orthogonal routing', () => {
    for (const connector of getOrgChart().connectors) 
      expect(connector.type).toBe('Orthogonal');
    
  });
});
