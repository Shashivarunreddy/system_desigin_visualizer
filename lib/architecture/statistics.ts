import { Node, Edge } from '@xyflow/react';

export function getArchitectureStatistics(nodes: Node[], edges: Edge[]) {
  const componentCounts = {
    total: nodes.length,
    services: 0,
    databases: 0,
    externalSystems: 0,
    queues: 0,
    networks: 0,
    actors: 0,
    applications: 0
  };

  nodes.forEach(node => {
    const role = node.data?.role;
    if (role === 'service') componentCounts.services++;
    if (role === 'database') componentCounts.databases++;
    if (role === 'external') componentCounts.externalSystems++;
    if (role === 'communication') componentCounts.queues++;
    if (role === 'network') componentCounts.networks++;
    if (role === 'actor') componentCounts.actors++;
    if (role === 'application') componentCounts.applications++;
  });

  const relationshipCounts = {
    total: edges.length,
    requests: 0,
    responses: 0,
    dependencies: 0,
    dataFlows: 0,
    events: 0
  };

  edges.forEach(edge => {
    const rel = (edge.data as any)?.relationship;
    if (rel === 'request') relationshipCounts.requests++;
    if (rel === 'response') relationshipCounts.responses++;
    if (rel === 'dependency') relationshipCounts.dependencies++;
    if (rel === 'data') relationshipCounts.dataFlows++;
    if (rel === 'event') relationshipCounts.events++;
  });

  return {
    componentCounts,
    relationshipCounts
  };
}
