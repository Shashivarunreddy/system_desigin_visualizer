import React from 'react';
import { NodeProps } from '@xyflow/react';
import { BaseNode } from './BaseNode';
import { IconType } from '@/data/components/types';
import { DynamicIcon } from '@/components/ui/DynamicIcon';

export type SystemNodeData = {
  label: string;
  description?: string;
  iconName: string;
  iconType?: IconType;
  componentId?: string;
  role: string;
  technology?: string;
};

export function SystemNode(props: NodeProps) {
  const nodeData = props.data as unknown as SystemNodeData;

  return (
    <BaseNode
      {...props}
      nodeTitle={nodeData.label}
      className="w-24 h-24" // Default aspect ratio for generic system nodes
    >
      <div className="flex w-full h-full bg-card border-2 border-border hover:border-primary/50 transition-colors rounded-xl shadow-sm overflow-hidden p-3 items-center justify-center">
        <DynamicIcon 
          iconName={nodeData.iconName} 
          iconType={nodeData.iconType || 'lucide'} 
          className="w-full h-full max-w-[48px] max-h-[48px] min-w-[24px] min-h-[24px] text-foreground" 
          strokeWidth={1.5} 
        />
      </div>
    </BaseNode>
  );
}
