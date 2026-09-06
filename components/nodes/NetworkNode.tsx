import React from 'react';
import { NodeProps } from '@xyflow/react';
import { BaseNode } from './BaseNode';
import { SystemNodeData } from './SystemNode';
import { DynamicIcon } from '@/components/ui/DynamicIcon';

export const NetworkNode = React.memo(function NetworkNode(props: NodeProps) {
  const nodeData = props.data as unknown as SystemNodeData;

  return (
    <BaseNode
      {...props}
      nodeTitle={nodeData.label}
      nodeDescription={nodeData.description}
      className="w-20 h-20" 
    >
      <div className="flex w-full h-full bg-card rounded-full border-[3px] border-foreground/40 shadow-sm items-center justify-center text-foreground">
        <DynamicIcon iconName={nodeData.iconName} iconType={nodeData.iconType || 'lucide'} className="w-8 h-8 opacity-80" strokeWidth={1.5} />
      </div>
    </BaseNode>
  );
});



