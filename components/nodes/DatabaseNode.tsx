import React from 'react';
import { NodeProps } from '@xyflow/react';
import { BaseNode } from './BaseNode';
import { SystemNodeData } from './SystemNode';
import { getIconComponent } from '@/data/components';

export function DatabaseNode(props: NodeProps) {
  const nodeData = props.data as unknown as SystemNodeData;
  const Icon = getIconComponent(nodeData.iconName);

  return (
    <BaseNode
      {...props}
      nodeTitle={nodeData.label}
      nodeDescription={nodeData.description}
      className="w-24 h-32" // Tall aspect ratio for databases
    >
      {/* Cylinder Shape approximation using rounded borders */}
      <div className="relative flex flex-col w-full h-full">
        {/* Top ellipsis */}
        <div className="absolute top-0 w-full h-8 bg-card border-2 border-foreground/40 rounded-[50%] z-10" />
        {/* Body */}
        <div className="absolute top-4 bottom-4 w-full bg-card border-x-2 border-foreground/40 z-0 flex items-center justify-center text-foreground">
          <Icon className="w-8 h-8 opacity-80" strokeWidth={1.5} />
        </div>
        {/* Bottom ellipsis */}
        <div className="absolute bottom-0 w-full h-8 bg-card border-x-2 border-b-2 border-t-0 border-foreground/40 rounded-b-[50%] z-10" />
      </div>
    </BaseNode>
  );
}
