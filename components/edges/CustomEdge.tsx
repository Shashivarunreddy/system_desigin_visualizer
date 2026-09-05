import React from 'react';
import {
  BaseEdge,
  EdgeLabelRenderer,
  EdgeProps,
  getSmoothStepPath,
  MarkerType,
} from '@xyflow/react';
import { EdgeDirection, EdgeStyleType, RelationshipType } from '@/data/relationships';

interface CustomEdgeData {
  direction?: EdgeDirection;
  styleType?: EdgeStyleType;
  animated?: boolean;
  relationship?: RelationshipType;
}

export function CustomEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  markerEnd,
  markerStart,
  label,
  data,
}: EdgeProps) {
  const edgeData = (data || {}) as CustomEdgeData;
  const direction = edgeData.direction || 'forward';
  const styleType = edgeData.styleType || 'solid';
  const animated = edgeData.animated || false;

  const [edgePath, labelX, labelY] = getSmoothStepPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  // Determine stroke dash array based on style type
  let strokeDasharray = 'none';
  if (styleType === 'dashed') {
    strokeDasharray = '5,5';
  } else if (styleType === 'dotted') {
    strokeDasharray = '2,5';
  }

  // Override markers based on direction
  let finalMarkerStart: string | undefined = markerStart;
  let finalMarkerEnd: string | undefined = markerEnd;

  if (direction === 'forward') {
    finalMarkerStart = undefined;
    finalMarkerEnd = markerEnd;
  } else if (direction === 'backward') {
    finalMarkerStart = markerEnd;
    finalMarkerEnd = undefined;
  } else if (direction === 'bidirectional') {
    finalMarkerStart = markerEnd;
    finalMarkerEnd = markerEnd;
  }

  // Merge dynamic styles
  const dynamicStyle = {
    ...style,
    strokeDasharray,
    strokeWidth: 2,
  };

  return (
    <>
      <BaseEdge
        path={edgePath}
        markerEnd={finalMarkerEnd}
        markerStart={finalMarkerStart}
        style={dynamicStyle}
        id={id}
      />
      
      {/* Invisible thicker edge for easier clicking/hovering */}
      <path
        d={edgePath}
        fill="none"
        strokeOpacity={0}
        strokeWidth={20}
        className="react-flow__edge-interaction"
      />

      {label && (
        <EdgeLabelRenderer>
          <div
            style={{
              position: 'absolute',
              transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
              pointerEvents: 'all',
            }}
            className="nodrag nopan bg-background text-foreground px-2.5 py-1 rounded-md border shadow-sm text-[11px] font-medium tracking-wide z-20"
          >
            {label}
          </div>
        </EdgeLabelRenderer>
      )}
    </>
  );
}
