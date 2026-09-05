import React from 'react';
import { NodeProps } from '@xyflow/react';
import { BaseNode } from './BaseNode';
import { SystemNodeData } from './SystemNode';
import { getIconComponent } from '@/data/components';

export function ApiNode(props: NodeProps) {
  const nodeData = props.data as unknown as SystemNodeData;
  const Icon = getIconComponent(nodeData.iconName);

  return (
    <BaseNode
      {...props}
      nodeTitle={nodeData.label}
      nodeDescription={nodeData.description}
      className="w-32 h-16" 
    >
      <div className="relative flex items-center justify-center w-full h-full bg-primary/10 border-2 border-primary rounded-full shadow-sm">
        {/* Left/Right structural accents for API */}
        <div className="absolute left-0 w-3 h-full border-r-2 border-primary/30 rounded-l-full" />
        <div className="absolute right-0 w-3 h-full border-l-2 border-primary/30 rounded-r-full" />
        
        <div className="text-primary font-bold z-10 flex items-center space-x-2">
          <Icon className="w-5 h-5" strokeWidth={2} />
          <span className="text-sm tracking-wider">API</span>
        </div>
      </div>
    </BaseNode>
  );
}
