import React from 'react';
import { NodeProps } from '@xyflow/react';
import { BaseNode } from './BaseNode';
import { SystemNodeData } from './SystemNode';
import { DynamicIcon } from '@/components/ui/DynamicIcon';

export const QueueNode = React.memo(function QueueNode(props: NodeProps) {
  const nodeData = props.data as unknown as SystemNodeData;

  return (
    <BaseNode
      {...props}
      nodeTitle={nodeData.label}
      nodeDescription={nodeData.description}
      className="w-40 h-16" // Wide and short for queue
    >
      <div className="flex w-full h-full bg-card border-2 border-foreground/40 border-dashed rounded-md overflow-hidden shadow-sm items-center justify-between px-2">
        <div className="flex space-x-1">
           {/* Queue items indication */}
           <div className="w-[10%] max-w-[6px] min-w-[4px] h-[40%] bg-foreground/30 rounded-full" />
           <div className="w-[10%] max-w-[6px] min-w-[4px] h-[40%] bg-foreground/50 rounded-full" />
           <div className="w-[10%] max-w-[6px] min-w-[4px] h-[40%] bg-foreground/80 rounded-full" />
        </div>
        <div className="flex-1 flex items-center justify-center text-foreground w-full h-full p-1">
          <DynamicIcon iconName={nodeData.iconName} iconType={nodeData.iconType || 'lucide'} className="w-[50%] h-[50%] max-w-[32px] max-h-[32px] min-w-[12px] min-h-[12px] opacity-80" strokeWidth={1.5} />
        </div>
        <div className="flex space-x-1">
           <div className="w-[10%] max-w-[6px] min-w-[4px] h-[40%] bg-foreground/80 rounded-full" />
           <div className="w-[10%] max-w-[6px] min-w-[4px] h-[40%] bg-foreground/50 rounded-full" />
           <div className="w-[10%] max-w-[6px] min-w-[4px] h-[40%] bg-foreground/30 rounded-full" />
        </div>
      </div>
    </BaseNode>
  );
});

