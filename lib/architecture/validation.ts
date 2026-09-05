import { Node, Edge } from '@xyflow/react';
import { ArchitectureWarning } from './types';
import { getIncomingConnections, getOutgoingConnections } from './graph';

export function validateArchitecture(nodes: Node[], edges: Edge[]): ArchitectureWarning[] {
  const warnings: ArchitectureWarning[] = [];

  nodes.forEach(node => {
    const incoming = getIncomingConnections(node.id, edges);
    const outgoing = getOutgoingConnections(node.id, edges);
    
    // Check for disconnected nodes
    if (incoming.length === 0 && outgoing.length === 0) {
      warnings.push({
        id: `warn-disconnected-${node.id}`,
        type: 'disconnected-node',
        severity: 'warning',
        message: `${node.data?.label || 'A component'} is disconnected from the rest of the system.`,
        nodeId: node.id
      });
    }

    // Check for unused databases
    if (node.data?.role === 'database' && incoming.length === 0) {
      warnings.push({
        id: `warn-unused-db-${node.id}`,
        type: 'unused-database',
        severity: 'warning',
        message: `Database "${node.data?.label || 'Database'}" has no incoming data relationships.`,
        nodeId: node.id
      });
    }
  });

  edges.forEach(edge => {
    const edgeData = edge.data as Record<string, any> || {};
    // Check for missing relationship types
    if (!edgeData.relationship && !edge.label) {
      warnings.push({
        id: `warn-missing-rel-${edge.id}`,
        type: 'missing-relationship',
        severity: 'info',
        message: `A connection exists without a defined relationship type or label.`,
        edgeId: edge.id
      });
    }
  });

  return warnings;
}
