import { Position, InternalNode } from '@xyflow/react';

// Returns the parameters (sx, sy, tx, ty, sourcePos, targetPos) for a floating edge.
export function getEdgeParams(source: InternalNode, target: InternalNode) {
  const sourceIntersectionPoint = getNodeIntersection(source, target);
  const targetIntersectionPoint = getNodeIntersection(target, source);

  const sourcePos = getEdgePosition(source, sourceIntersectionPoint);
  const targetPos = getEdgePosition(target, targetIntersectionPoint);

  return {
    sx: sourceIntersectionPoint.x,
    sy: sourceIntersectionPoint.y,
    tx: targetIntersectionPoint.x,
    ty: targetIntersectionPoint.y,
    sourcePos,
    targetPos,
  };
}

// Find the intersection between the center of node A and node B with node A's border
function getNodeIntersection(intersectionNode: InternalNode, targetNode: InternalNode) {
  // https://math.stackexchange.com/questions/1724792/an-algorithm-for-finding-the-intersection-point-between-a-center-of-vision-and-a
  const intersectionNodeWidth = intersectionNode.measured?.width ?? intersectionNode.width ?? 100;
  const intersectionNodeHeight = intersectionNode.measured?.height ?? intersectionNode.height ?? 100;
  // React Flow 12 puts positionAbsolute inside internals
  const intersectionNodePosition = intersectionNode.internals?.positionAbsolute ?? intersectionNode.position;

  const targetNodeWidth = targetNode.measured?.width ?? targetNode.width ?? 100;
  const targetNodeHeight = targetNode.measured?.height ?? targetNode.height ?? 100;
  const targetPosition = targetNode.internals?.positionAbsolute ?? targetNode.position;

  const w = intersectionNodeWidth / 2;
  const h = intersectionNodeHeight / 2;

  const x2 = intersectionNodePosition.x + w;
  const y2 = intersectionNodePosition.y + h;
  const x1 = targetPosition.x + targetNodeWidth / 2;
  const y1 = targetPosition.y + targetNodeHeight / 2;

  const xx1 = (x1 - x2) / (2 * w) - (y1 - y2) / (2 * h);
  const yy1 = (x1 - x2) / (2 * w) + (y1 - y2) / (2 * h);
  const a = 1 / (Math.abs(xx1) + Math.abs(yy1));
  const xx3 = a * xx1;
  const yy3 = a * yy1;
  const x = w * (xx3 + yy3) + x2;
  const y = h * (-xx3 + yy3) + y2;

  return { x, y };
}

// Determine which side of the node the intersection point is on
function getEdgePosition(node: InternalNode, intersectionPoint: { x: number; y: number }) {
  const positionAbsolute = node.internals?.positionAbsolute ?? node.position;
  const width = node.measured?.width ?? node.width ?? 100;
  const height = node.measured?.height ?? node.height ?? 100;

  const nx = Math.round(positionAbsolute.x);
  const ny = Math.round(positionAbsolute.y);
  const px = Math.round(intersectionPoint.x);
  const py = Math.round(intersectionPoint.y);

  if (px <= nx + 1) {
    return Position.Left;
  }
  if (px >= nx + width - 1) {
    return Position.Right;
  }
  if (py <= ny + 1) {
    return Position.Top;
  }
  if (py >= ny + height - 1) {
    return Position.Bottom;
  }

  return Position.Top;
}
