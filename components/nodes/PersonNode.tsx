import React from 'react';
import { NodeProps } from '@xyflow/react';
import { BaseNode } from './BaseNode';
import { SystemNodeData } from './SystemNode';
import { getIconComponent } from '@/data/components';

export function PersonNode(props: NodeProps) {
  const nodeData = props.data as unknown as SystemNodeData;
  const Icon = getIconComponent(nodeData.iconName);

  return (
    <BaseNode
      {...props}
      nodeTitle={nodeData.label}
      nodeDescription={nodeData.description}
      className="w-16 h-16"
    >
      <div className="flex items-center justify-center w-full h-full text-primary">
        <Icon className="w-12 h-12" strokeWidth={1.5} />
      </div>
    </BaseNode>
  );
}
