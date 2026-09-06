import React from 'react';
import { NodeProps } from '@xyflow/react';
import { BaseNode } from './BaseNode';
import { SystemNodeData } from './SystemNode';
import { DynamicIcon } from '@/components/ui/DynamicIcon';

export const ApplicationNode = React.memo(function ApplicationNode(props: NodeProps) {
  const nodeData = props.data as unknown as SystemNodeData;

  return (
    <BaseNode
      {...props}
      nodeTitle={nodeData.label}
      nodeDescription={nodeData.description}
      className="w-40 h-24" // Wider aspect ratio for applications
    >
      <div className="flex flex-col w-full h-full bg-card border-2 border-primary/50 rounded-lg shadow-sm overflow-hidden">
        {/* Header bar */}
        <div className="h-[25%] min-h-[16px] max-h-[32px] bg-primary/10 border-b-2 border-primary/20 flex items-center px-2 space-x-1 shrink-0">
           <div className="w-[10%] max-w-[8px] aspect-square rounded-full bg-destructive/60" />
           <div className="w-[10%] max-w-[8px] aspect-square rounded-full bg-warning/60" />
           <div className="w-[10%] max-w-[8px] aspect-square rounded-full bg-green-500/60" />
        </div>
        
        {/* Main body */}
        <div className="flex-1 flex items-center justify-center text-primary p-2">
          <DynamicIcon iconName={nodeData.iconName} iconType={nodeData.iconType || 'lucide'} className="w-full h-full max-w-[40px] max-h-[40px] min-w-[20px] min-h-[20px]" strokeWidth={2} />
        </div>
      </div>
    </BaseNode>
  );
});

