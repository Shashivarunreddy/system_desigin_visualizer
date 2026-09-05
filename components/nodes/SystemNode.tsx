import React from 'react';
import { Handle, Position, NodeProps } from '@xyflow/react';
import { DynamicIcon } from '@/components/ui/DynamicIcon';
import { IconType } from '@/data/components/types';
import { cn } from '@/lib/utils';

export type SystemNodeData = {
  label: string;
  description?: string;
  iconName: string;
  iconType?: IconType;
  componentId?: string;
  role: string;
  technology?: string;
};

export function SystemNode({ data, selected }: NodeProps) {
  const nodeData = data as unknown as SystemNodeData;

  return (
    <div
      className={cn(
        "flex items-center gap-3 bg-card border-2 rounded-xl p-3 shadow-sm min-w-[200px] relative",
        "transition-colors duration-200",
        selected ? "border-primary ring-4 ring-primary/20" : "border-border hover:border-primary/50"
      )}
    >
      {/* 4 simple handles on the edges, all type="source" because of Loose Connection Mode */}
      <Handle type="source" position={Position.Top} id="top" className="w-3 h-3 bg-primary border-2 border-background shadow-sm hover:w-4 hover:h-4 hover:-mt-1 transition-all rounded-full" />
      <Handle type="source" position={Position.Right} id="right" className="w-3 h-3 bg-primary border-2 border-background shadow-sm hover:w-4 hover:h-4 hover:-mr-1 transition-all rounded-full" />
      <Handle type="source" position={Position.Bottom} id="bottom" className="w-3 h-3 bg-primary border-2 border-background shadow-sm hover:w-4 hover:h-4 hover:-mb-1 transition-all rounded-full" />
      <Handle type="source" position={Position.Left} id="left" className="w-3 h-3 bg-primary border-2 border-background shadow-sm hover:w-4 hover:h-4 hover:-ml-1 transition-all rounded-full" />

      <div className="flex items-center justify-center w-[25%] h-full max-w-[64px] min-w-[40px] rounded-lg bg-muted text-foreground shrink-0 overflow-hidden p-1.5">
        <DynamicIcon iconName={nodeData.iconName} iconType={nodeData.iconType || 'lucide'} className="w-full h-full max-w-[32px] max-h-[32px] min-w-[16px] min-h-[16px]" />
      </div>
      <div className="flex flex-col flex-1 min-w-0">
        <div className="font-semibold text-sm truncate">{nodeData.label}</div>
        {nodeData.description && (
          <div className="text-xs text-muted-foreground truncate">{nodeData.description}</div>
        )}
      </div>
    </div>
  );
}
