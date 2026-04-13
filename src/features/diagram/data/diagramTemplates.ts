import type { ConnectorModel, FlowShapes, NodeModel } from '@syncfusion/ej2-react-diagrams';

import type { DiagramTemplate } from '../types';

/** Returns all available diagram templates. */
export function getDiagramTemplates(): DiagramTemplate[] {
  return [
    {
      id: 'flowchart',
      labelKey: 'diagram.templates.flowchart.name',
      descriptionKey: 'diagram.templates.flowchart.description',
      nodes: flowchartNodes(),
      connectors: flowchartConnectors(),
    },
    {
      id: 'org-chart',
      labelKey: 'diagram.templates.orgChart.name',
      descriptionKey: 'diagram.templates.orgChart.description',
      nodes: orgChartNodes(),
      connectors: orgChartConnectors(),
    },
  ];
}

function flowchartConnectors(): ConnectorModel[] {
  return [
    { id: 'fc-c1', sourceID: 'fc-start', targetID: 'fc-process1', type: 'Orthogonal' },
    { id: 'fc-c2', sourceID: 'fc-process1', targetID: 'fc-decision', type: 'Orthogonal' },
    {
      id: 'fc-c3',
      sourceID: 'fc-decision',
      targetID: 'fc-process2',
      type: 'Orthogonal',
      annotations: [{ content: 'Yes', alignment: 'Before' }],
    },
    { id: 'fc-c4', sourceID: 'fc-process2', targetID: 'fc-end', type: 'Orthogonal' },
  ];
}

function orgChartConnectors(): ConnectorModel[] {
  return [
    { id: 'org-c1', sourceID: 'org-ceo', targetID: 'org-cto', type: 'Orthogonal' },
    { id: 'org-c2', sourceID: 'org-ceo', targetID: 'org-cfo', type: 'Orthogonal' },
    { id: 'org-c3', sourceID: 'org-cto', targetID: 'org-dev', type: 'Orthogonal' },
    { id: 'org-c4', sourceID: 'org-cto', targetID: 'org-qa', type: 'Orthogonal' },
    { id: 'org-c5', sourceID: 'org-cfo', targetID: 'org-fin', type: 'Orthogonal' },
  ];
}

/* ------------------------------------------------------------------ */
/*  Flowchart template data                                            */
/* ------------------------------------------------------------------ */

const FC_NODE_W = 140;
const FC_NODE_H = 60;
const FC_DECISION_W = 160;
const FC_DECISION_H = 80;
const FC_X = 300;
const FC_Y_BASE = 40;
const FC_Y_STEP = 120;

const FC_ROW_PROCESS_2 = 3;
const FC_ROW_END = 4;

function createFlowNode(id: string, yIndex: number, shape: FlowShapes, label: string): NodeModel {
  const isDecision = shape === 'Decision';
  return {
    id,
    offsetX: FC_X,
    offsetY: FC_Y_BASE + FC_Y_STEP * yIndex,
    width: isDecision ? FC_DECISION_W : FC_NODE_W,
    height: isDecision ? FC_DECISION_H : FC_NODE_H,
    shape: { type: 'Flow', shape },
    annotations: [{ content: label }],
  };
}

function flowchartNodes(): NodeModel[] {
  return [
    createFlowNode('fc-start', 0, 'Terminator', 'Start'),
    createFlowNode('fc-process1', 1, 'Process', 'Process Data'),
    createFlowNode('fc-decision', 2, 'Decision', 'Valid?'),
    createFlowNode('fc-process2', FC_ROW_PROCESS_2, 'Process', 'Save Results'),
    createFlowNode('fc-end', FC_ROW_END, 'Terminator', 'End'),
  ];
}

/* ------------------------------------------------------------------ */
/*  Org chart template data                                            */
/* ------------------------------------------------------------------ */

const ORG_W = 150;
const ORG_H = 50;
const ORG_X_CENTER = 400;
const ORG_Y_BASE = 40;
const ORG_Y_STEP = 100;
const ORG_X_LEFT = 200;
const ORG_X_RIGHT = 600;
const ORG_CHILD_OFFSET = 100;

function createOrgNode(id: string, x: number, y: number, label: string): NodeModel {
  return {
    id,
    offsetX: x,
    offsetY: y,
    width: ORG_W,
    height: ORG_H,
    annotations: [{ content: label }],
  };
}

function orgChartNodes(): NodeModel[] {
  const y1 = ORG_Y_BASE;
  const y2 = ORG_Y_BASE + ORG_Y_STEP;
  const y3 = ORG_Y_BASE + ORG_Y_STEP * 2;

  return [
    createOrgNode('org-ceo', ORG_X_CENTER, y1, 'CEO'),
    createOrgNode('org-cto', ORG_X_LEFT, y2, 'CTO'),
    createOrgNode('org-cfo', ORG_X_RIGHT, y2, 'CFO'),
    createOrgNode('org-dev', ORG_X_LEFT - ORG_CHILD_OFFSET, y3, 'Dev Lead'),
    createOrgNode('org-qa', ORG_X_LEFT + ORG_CHILD_OFFSET, y3, 'QA Lead'),
    createOrgNode('org-fin', ORG_X_RIGHT, y3, 'Finance Mgr'),
  ];
}
