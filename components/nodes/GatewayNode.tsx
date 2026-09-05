import React from 'react';
import { NodeProps } from '@xyflow/react';
import { BaseNode } from './BaseNode';
import { SystemNodeData } from './SystemNode';
import { getIconComponent } from '@/data/components';

export function GatewayNode(props: NodeProps) {
  const nodeData = props.data as unknown as SystemNodeData;
  const Icon = getIconComponent(nodeData.iconName);

  return (
    <BaseNode
      {...props}
      nodeTitle={nodeData.label}
      nodeDescription={nodeData.description}
      className="w-24 h-24" 
    >
      <div className="w-full h-full transform rotate-45 bg-card border-2 border-foreground/40 shadow-sm flex items-center justify-center overflow-hidden">
        <div className="transform -rotate-45 text-foreground">
          <Icon className="w-8 h-8 opacity-80" strokeWidth={1.5} />
        </div>
      </div>
    </BaseNode>
  );
}
