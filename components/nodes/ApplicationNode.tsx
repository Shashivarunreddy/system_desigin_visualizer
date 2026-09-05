import React from 'react';
import { NodeProps } from '@xyflow/react';
import { BaseNode } from './BaseNode';
import { SystemNodeData } from './SystemNode';
import { getIconComponent } from '@/data/components';

export function ApplicationNode(props: NodeProps) {
  const nodeData = props.data as unknown as SystemNodeData;
  const Icon = getIconComponent(nodeData.iconName);

  return (
    <BaseNode
      {...props}
      nodeTitle={nodeData.label}
      nodeDescription={nodeData.description}
      className="w-40 h-24" // Wider aspect ratio for applications
    >
      <div className="flex flex-col w-full h-full bg-card border-2 border-foreground/40 rounded-lg overflow-hidden shadow-sm">
        {/* Application Window Header */}
        <div className="h-4 bg-muted border-b-2 border-foreground/40 flex items-center px-1.5 space-x-1">
          <div className="w-1.5 h-1.5 rounded-full bg-foreground/40" />
          <div className="w-1.5 h-1.5 rounded-full bg-foreground/40" />
          <div className="w-1.5 h-1.5 rounded-full bg-foreground/40" />
        </div>
        {/* Application Content */}
        <div className="flex-1 flex items-center justify-center bg-card text-foreground">
          <Icon className="w-8 h-8 opacity-80" strokeWidth={1.5} />
        </div>
      </div>
    </BaseNode>
  );
}
