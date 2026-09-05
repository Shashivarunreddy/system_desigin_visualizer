export type RelationshipType = 'request' | 'response' | 'data' | 'event' | 'dependency' | 'custom';
export type EdgeDirection = 'forward' | 'backward' | 'bidirectional';
export type EdgeStyleType = 'solid' | 'dashed' | 'dotted';

export interface SystemRelationship {
  id: RelationshipType;
  label: string;
  defaultLabel: string;
  defaultDirection: EdgeDirection;
  defaultStyle: EdgeStyleType;
}

export const RELATIONSHIP_REGISTRY: SystemRelationship[] = [
  {
    id: 'request',
    label: 'Request',
    defaultLabel: 'Request',
    defaultDirection: 'forward',
    defaultStyle: 'solid',
  },
  {
    id: 'response',
    label: 'Response',
    defaultLabel: 'Response',
    defaultDirection: 'backward',
    defaultStyle: 'solid',
  },
  {
    id: 'data',
    label: 'Data Flow',
    defaultLabel: 'Data',
    defaultDirection: 'forward',
    defaultStyle: 'solid',
  },
  {
    id: 'event',
    label: 'Event',
    defaultLabel: 'Event',
    defaultDirection: 'forward',
    defaultStyle: 'dashed',
  },
  {
    id: 'dependency',
    label: 'Dependency',
    defaultLabel: 'Depends On',
    defaultDirection: 'forward',
    defaultStyle: 'dotted',
  },
];
