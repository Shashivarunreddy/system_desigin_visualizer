import React from 'react';
import { NodeProps } from '@xyflow/react';
import { BaseNode } from './BaseNode';
import { SystemNodeData } from './SystemNode';
import { getIconComponent } from '@/data/components';

export function SecurityNode(props: NodeProps) {
  const nodeData = props.data as unknown as SystemNodeData;
  const Icon = getIconComponent(nodeData.iconName);

  return (
    <BaseNode
      {...props}
      nodeTitle={nodeData.label}
      nodeDescription={nodeData.description}
      className="w-20 h-24" 
    >
      <div className="flex w-full h-full bg-card border-[3px] border-foreground/40 rounded-t-full rounded-b-md shadow-sm items-center justify-center text-foreground relative">
        <Icon className="w-8 h-8 opacity-80" strokeWidth={1.5} />
      </div>
    </BaseNode>
  );
}
