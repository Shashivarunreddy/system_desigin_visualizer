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
