import React from 'react';
import { NodeProps } from '@xyflow/react';
import { BaseNode } from './BaseNode';
import { SystemNodeData } from './SystemNode';
import { getIconComponent } from '@/data/components';

export function ServerNode(props: NodeProps) {
  const nodeData = props.data as unknown as SystemNodeData;
  const Icon = getIconComponent(nodeData.iconName);

  return (
    <BaseNode
      {...props}
      nodeTitle={nodeData.label}
      nodeDescription={nodeData.description}
      className="w-32 h-40" // Tall rectangular for rack/server
    >
      <div className="flex flex-col w-full h-full bg-card border-2 border-foreground/40 rounded-md shadow-sm overflow-hidden">
        {/* Server slots */}
        <div className="flex-1 border-b-2 border-foreground/40 flex items-center justify-center text-foreground bg-muted/30">
          <Icon className="w-8 h-8 opacity-80" strokeWidth={1.5} />
        </div>
        <div className="h-6 bg-muted border-b-2 border-foreground/40 flex items-center px-2 space-x-1">
           <div className="w-1.5 h-1.5 rounded-full bg-green-500/80 shadow-[0_0_4px_rgba(34,197,94,0.6)]" />
           <div className="w-1.5 h-1.5 rounded-full bg-foreground/40" />
        </div>
        <div className="h-6 bg-muted flex items-center px-2 space-x-1">
           <div className="w-1.5 h-1.5 rounded-full bg-green-500/80 shadow-[0_0_4px_rgba(34,197,94,0.6)]" />
           <div className="w-1.5 h-1.5 rounded-full bg-foreground/40" />
        </div>
      </div>
    </BaseNode>
  );
}
