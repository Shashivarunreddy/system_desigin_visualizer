import React from 'react';
import { NodeProps } from '@xyflow/react';
import { BaseNode } from './BaseNode';
import { SystemNodeData } from './SystemNode';
import { DynamicIcon } from '@/components/ui/DynamicIcon';

export const ApiNode = React.memo(function ApiNode(props: NodeProps) {
  const nodeData = props.data as unknown as SystemNodeData;

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
        
        <div className="text-primary font-bold z-10 flex items-center justify-center space-x-2 w-full h-full p-2">
          <DynamicIcon iconName={nodeData.iconName} iconType={nodeData.iconType || 'lucide'} className="w-[30%] h-[30%] max-w-[40px] max-h-[40px] min-w-[16px] min-h-[16px]" strokeWidth={2} />
          <span className="text-sm tracking-wider">API</span>
        </div>
      </div>
    </BaseNode>
  );
});


