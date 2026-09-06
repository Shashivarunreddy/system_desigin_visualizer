import React from 'react';
import { NodeProps } from '@xyflow/react';
import { BaseNode } from './BaseNode';
import { SystemNodeData } from './SystemNode';
import { DynamicIcon } from '@/components/ui/DynamicIcon';

export const ServerNode = React.memo(function ServerNode(props: NodeProps) {
  const nodeData = props.data as unknown as SystemNodeData;

  return (
    <BaseNode
      {...props}
      nodeTitle={nodeData.label}
      nodeDescription={nodeData.description}
      className="w-32 h-40" // Default rectangular for rack/server
    >
      <div className="flex flex-col w-full h-full bg-card border-2 border-foreground/40 rounded-md shadow-sm overflow-hidden">
        {/* Server slots */}
        <div className="flex-1 border-b-2 border-foreground/40 flex items-center justify-center text-foreground bg-muted/30 p-2">
          <DynamicIcon iconName={nodeData.iconName} iconType={nodeData.iconType || 'lucide'} className="w-full h-full max-w-[48px] max-h-[48px] min-w-[24px] min-h-[24px] opacity-80" strokeWidth={1.5} />
        </div>
        <div className="h-[15%] min-h-[12px] max-h-[24px] bg-muted border-b-2 border-foreground/40 flex items-center px-2 space-x-1 shrink-0">
           <div className="w-[10%] max-w-[6px] aspect-square rounded-full bg-green-500/80 shadow-[0_0_4px_rgba(34,197,94,0.6)]" />
           <div className="w-[10%] max-w-[6px] aspect-square rounded-full bg-foreground/40" />
        </div>
        <div className="h-[15%] min-h-[12px] max-h-[24px] bg-muted flex items-center px-2 space-x-1 shrink-0">
           <div className="w-[10%] max-w-[6px] aspect-square rounded-full bg-green-500/80 shadow-[0_0_4px_rgba(34,197,94,0.6)]" />
           <div className="w-[10%] max-w-[6px] aspect-square rounded-full bg-foreground/40" />
        </div>
      </div>
    </BaseNode>
  );
});


