import React, { useCallback } from 'react';
import {
  BaseEdge,
  EdgeLabelRenderer,
  EdgeProps,
  getSmoothStepPath,
  useStore,
  InternalNode,
} from '@xyflow/react';
import { EdgeDirection, EdgeStyleType, RelationshipType } from '@/data/relationships';
import { getEdgeParams } from '@/lib/architecture/edgeUtils';

interface CustomEdgeData {
  direction?: EdgeDirection;
  styleType?: EdgeStyleType;
  animated?: boolean;
  relationship?: RelationshipType;
}

export function FloatingEdge({
  id,
  source,
  target,
  style = {},
  markerEnd,
  markerStart,
  label,
  data,
}: EdgeProps) {
  const sourceNode = useStore(useCallback((store) => store.nodeLookup.get(source), [source]));
  const targetNode = useStore(useCallback((store) => store.nodeLookup.get(target), [target]));

  if (!sourceNode || !targetNode) {
    return null;
  }

  const { sx, sy, tx, ty, sourcePos, targetPos } = getEdgeParams(
    sourceNode as unknown as InternalNode,
    targetNode as unknown as InternalNode
  );

  const edgeData = (data || {}) as CustomEdgeData;
  const direction = edgeData.direction || 'forward';
  const styleType = edgeData.styleType || 'solid';
  const animated = edgeData.animated || false;

  const [edgePath, labelX, labelY] = getSmoothStepPath({
    sourceX: sx,
    sourceY: sy,
    sourcePosition: sourcePos,
    targetX: tx,
    targetY: ty,
    targetPosition: targetPos,
  });

  // Determine stroke dash array based on style type
  let strokeDasharray = 'none';
  if (styleType === 'dashed') {
    strokeDasharray = '5,5';
  } else if (styleType === 'dotted') {
    strokeDasharray = '2,4';
  }

  // Override markers based on direction
  let finalMarkerStart = markerStart;
  let finalMarkerEnd = markerEnd;

  if (direction === 'forward') {
    finalMarkerStart = undefined;
    finalMarkerEnd = markerEnd;
  } else if (direction === 'backward') {
    // If markerEnd is an object (like {type: 'arrowclosed'}), we can reuse it
    // React Flow handles orient auto-start-reverse internally for markerStart
    finalMarkerStart = markerEnd;
    finalMarkerEnd = undefined;
  } else if (direction === 'bidirectional') {
    finalMarkerStart = markerEnd;
    finalMarkerEnd = markerEnd;
  }

  const mergedStyle = {
    ...style,
    strokeDasharray,
  };

  return (
    <>
      <BaseEdge
        path={edgePath}
        markerEnd={finalMarkerEnd}
        markerStart={finalMarkerStart}
        style={mergedStyle}
      />
      {label && (
        <EdgeLabelRenderer>
          <div
            style={{
              position: 'absolute',
              transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
              pointerEvents: 'all',
            }}
            className="nodrag nopan bg-background/90 text-foreground text-xs px-2 py-1 rounded shadow-sm border"
          >
            {label}
          </div>
        </EdgeLabelRenderer>
      )}
    </>
  );
}
