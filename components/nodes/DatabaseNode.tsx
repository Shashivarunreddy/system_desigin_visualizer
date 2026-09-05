import React from 'react';
import { NodeProps } from '@xyflow/react';
import { BaseNode } from './BaseNode';
import { SystemNodeData } from './SystemNode';
import { DynamicIcon } from '@/components/ui/DynamicIcon';

export function DatabaseNode(props: NodeProps) {
  const nodeData = props.data as unknown as SystemNodeData;

  return (
    <BaseNode
      {...props}
      nodeTitle={nodeData.label}
      nodeDescription={nodeData.description}
      className="w-24 h-32" // Default aspect ratio for databases
    >
      {/* Cylinder Shape approximation using rounded borders */}
      <div className="relative flex flex-col w-full h-full">
        {/* Top ellipsis */}
        <div className="absolute top-0 w-full h-[20%] min-h-[16px] bg-card border-2 border-foreground/40 rounded-[50%] z-10" />
        {/* Body */}
        <div className="absolute top-[10%] bottom-[10%] w-full bg-card border-x-2 border-foreground/40 z-0 flex items-center justify-center text-foreground p-2">
          <DynamicIcon iconName={nodeData.iconName} iconType={nodeData.iconType || 'lucide'} className="w-full h-full max-w-[48px] max-h-[48px] min-w-[24px] min-h-[24px] opacity-80" strokeWidth={1.5} />
        </div>
        {/* Bottom ellipsis */}
        <div className="absolute bottom-0 w-full h-[20%] min-h-[16px] bg-card border-x-2 border-b-2 border-t-0 border-foreground/40 rounded-b-[50%] z-10" />
      </div>
    </BaseNode>
  );
}

