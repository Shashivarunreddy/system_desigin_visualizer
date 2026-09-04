import React from 'react';
import { Handle, Position, NodeProps } from '@xyflow/react';
import { getIconComponent } from '@/data/components';
import { cn } from '@/lib/utils';

export type SystemNodeData = {
  label: string;
  description?: string;
  iconName: string;
};

export function SystemNode({ data, selected }: NodeProps) {
  const nodeData = data as unknown as SystemNodeData;
  const Icon = getIconComponent(nodeData.iconName);

  return (
    <div
      className={cn(
        "flex items-center gap-3 bg-card border-2 rounded-xl p-3 shadow-sm min-w-[200px]",
        "transition-colors duration-200",
        selected ? "border-primary ring-4 ring-primary/20" : "border-border hover:border-primary/50"
      )}
    >
      <Handle 
        type="target" 
        position={Position.Top} 
        id="target" 
        className="!w-full !h-full !top-0 !left-0 !transform-none !bg-transparent !border-none !rounded-none !z-0" 
      />
      
      <Handle type="source" position={Position.Top} id="top" className="w-3 h-3 bg-muted-foreground !z-10" />
      <Handle type="source" position={Position.Right} id="right" className="w-3 h-3 bg-muted-foreground !z-10" />
      <Handle type="source" position={Position.Bottom} id="bottom" className="w-3 h-3 bg-muted-foreground !z-10" />
      <Handle type="source" position={Position.Left} id="left" className="w-3 h-3 bg-muted-foreground !z-10" />

      <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-muted text-foreground relative z-10 pointer-events-none">
        <Icon className="w-6 h-6" />
      </div>
      <div className="flex flex-col flex-1 min-w-0 relative z-10 pointer-events-none">
        <div className="font-semibold text-sm truncate">{nodeData.label}</div>
        {nodeData.description && (
          <div className="text-xs text-muted-foreground truncate">{nodeData.description}</div>
        )}
      </div>
    </div>
  );
}
