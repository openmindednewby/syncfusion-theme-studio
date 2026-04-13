import type { ConnectorModel, NodeModel } from '@syncfusion/ej2-react-diagrams';

/** A diagram template with pre-built nodes and connectors. */
export interface DiagramTemplate {
  readonly id: string;
  readonly labelKey: string;
  readonly descriptionKey: string;
  readonly nodes: NodeModel[];
  readonly connectors: ConnectorModel[];
}
