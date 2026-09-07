import { Node, Edge } from '@xyflow/react';

export function getIncomingConnections(nodeId: string, edges: Edge[]): Edge[] {
  return edges.filter(e => e.target === nodeId);
}

export function getOutgoingConnections(nodeId: string, edges: Edge[]): Edge[] {
  return edges.filter(e => e.source === nodeId);
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
