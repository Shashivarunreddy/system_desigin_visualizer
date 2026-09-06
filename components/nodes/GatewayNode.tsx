import React from 'react';
import { NodeProps } from '@xyflow/react';
import { BaseNode } from './BaseNode';
import { SystemNodeData } from './SystemNode';
import { DynamicIcon } from '@/components/ui/DynamicIcon';

export const GatewayNode = React.memo(function GatewayNode(props: NodeProps) {
  const nodeData = props.data as unknown as SystemNodeData;

  return (
    <BaseNode
      {...props}
      nodeTitle={nodeData.label}
      nodeDescription={nodeData.description}
      className="w-24 h-24" 
    >
      <div className="relative w-full h-full flex items-center justify-center p-2">
        <div className="absolute inset-0 bg-primary/10 border-2 border-primary rotate-45 transform origin-center rounded-sm shadow-sm transition-all" />
        <div className="relative z-10 text-primary w-full h-full flex items-center justify-center p-2">
          <DynamicIcon iconName={nodeData.iconName} iconType={nodeData.iconType || 'lucide'} className="w-[50%] h-[50%] max-w-[40px] max-h-[40px] min-w-[16px] min-h-[16px]" strokeWidth={2} />
        </div>
      </div>
    </BaseNode>
  );
});

