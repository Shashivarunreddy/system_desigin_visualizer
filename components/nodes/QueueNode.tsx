import React from 'react';
import { NodeProps } from '@xyflow/react';
import { BaseNode } from './BaseNode';
import { SystemNodeData } from './SystemNode';
import { getIconComponent } from '@/data/components';

export function QueueNode(props: NodeProps) {
  const nodeData = props.data as unknown as SystemNodeData;
  const Icon = getIconComponent(nodeData.iconName);

  return (
    <BaseNode
      {...props}
      nodeTitle={nodeData.label}
      nodeDescription={nodeData.description}
      className="w-40 h-16" // Wide and short for queue
    >
      <div className="flex w-full h-full bg-card border-2 border-foreground/40 border-dashed rounded-md overflow-hidden shadow-sm items-center justify-between px-2">
        <div className="flex space-x-1">
           {/* Queue items indication */}
           <div className="w-1.5 h-6 bg-foreground/30 rounded-full" />
           <div className="w-1.5 h-6 bg-foreground/50 rounded-full" />
           <div className="w-1.5 h-6 bg-foreground/80 rounded-full" />
        </div>
        <div className="flex-1 flex items-center justify-center text-foreground">
          <Icon className="w-6 h-6 opacity-80" strokeWidth={1.5} />
        </div>
        <div className="flex space-x-1">
           <div className="w-1.5 h-6 bg-foreground/80 rounded-full" />
           <div className="w-1.5 h-6 bg-foreground/50 rounded-full" />
           <div className="w-1.5 h-6 bg-foreground/30 rounded-full" />
        </div>
      </div>
    </BaseNode>
  );
}
