import { Node, Edge } from '@xyflow/react';

export function getIncomingConnections(nodeId: string, edges: Edge[]): Edge[] {
  return edges.filter(e => e.target === nodeId);
}

export function getOutgoingConnections(nodeId: string, edges: Edge[]): Edge[] {
  return edges.filter(e => e.source === nodeId);
}

export function getConnectedNodes(nodeId: string, edges: Edge[], nodes: Node[]): Node[] {
  const connectedIds = new Set<string>();
  edges.forEach(e => {
    if (e.source === nodeId) connectedIds.add(e.target);
    if (e.target === nodeId) connectedIds.add(e.source);
  });
  return nodes.filter(n => connectedIds.has(n.id));
}

export function getUpstreamNodes(nodeId: string, edges: Edge[], nodes: Node[]): Node[] {
  const incomingIds = new Set(getIncomingConnections(nodeId, edges).map(e => e.source));
  return nodes.filter(n => incomingIds.has(n.id));
}

export function getDownstreamNodes(nodeId: string, edges: Edge[], nodes: Node[]): Node[] {
  const outgoingIds = new Set(getOutgoingConnections(nodeId, edges).map(e => e.target));
  return nodes.filter(n => outgoingIds.has(n.id));
}

/**
 * Returns all nodes and edges in the same connected subgraph as the starting node.
 */
export function getConnectedSystem(startNodeId: string, nodes: Node[], edges: Edge[]): { nodes: Set<string>; edges: Set<string> } {
  const connectedNodes = new Set<string>();
  const connectedEdges = new Set<string>();
  
  const queue = [startNodeId];
  connectedNodes.add(startNodeId);

  while (queue.length > 0) {
    const curr = queue.shift()!;
    
    // Find all edges connected to curr
    edges.forEach(edge => {
      if (edge.source === curr || edge.target === curr) {
        connectedEdges.add(edge.id);
        
        const neighbor = edge.source === curr ? edge.target : edge.source;
        if (!connectedNodes.has(neighbor)) {
          connectedNodes.add(neighbor);
          queue.push(neighbor);
        }
      }
    });
  }

  return { nodes: connectedNodes, edges: connectedEdges };
}
