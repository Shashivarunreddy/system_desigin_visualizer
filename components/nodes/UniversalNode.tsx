import React from 'react';
import { NodeProps } from '@xyflow/react';
import { BaseNode } from './BaseNode';
import { SystemNodeData } from './BaseNode';
import { DynamicIcon } from '@/components/ui/DynamicIcon';

export const UniversalNode = React.memo(function UniversalNode(props: NodeProps) {
  const nodeData = props.data as unknown as SystemNodeData;
  const { type } = props;

  let className = "w-24 h-24";
  let content = null;

  switch (type) {
    case 'api':
      className = "w-32 h-16";
      content = (
        <div className="relative flex items-center justify-center w-full h-full bg-primary/10 border-2 border-primary rounded-full shadow-sm">
          <div className="absolute left-0 w-3 h-full border-r-2 border-primary/30 rounded-l-full" />
          <div className="absolute right-0 w-3 h-full border-l-2 border-primary/30 rounded-r-full" />
          <div className="text-primary font-bold z-10 flex items-center justify-center space-x-2 w-full h-full p-2">
            <DynamicIcon iconName={nodeData.iconName} iconType={nodeData.iconType || 'lucide'} className="w-[30%] h-[30%] max-w-[40px] max-h-[40px] min-w-[16px] min-h-[16px]" strokeWidth={2} />
            <span className="text-sm tracking-wider">API</span>
          </div>
        </div>
      );
      break;

    case 'application':
      className = "w-40 h-24";
      content = (
        <div className="flex flex-col w-full h-full bg-card border-2 border-primary/50 rounded-lg shadow-sm overflow-hidden">
          <div className="h-[25%] min-h-[16px] max-h-[32px] bg-primary/10 border-b-2 border-primary/20 flex items-center px-2 space-x-1 shrink-0">
             <div className="w-[10%] max-w-[8px] aspect-square rounded-full bg-destructive/60" />
             <div className="w-[10%] max-w-[8px] aspect-square rounded-full bg-warning/60" />
             <div className="w-[10%] max-w-[8px] aspect-square rounded-full bg-green-500/60" />
          </div>
          <div className="flex-1 flex items-center justify-center text-primary p-2">
            <DynamicIcon iconName={nodeData.iconName} iconType={nodeData.iconType || 'lucide'} className="w-full h-full max-w-[40px] max-h-[40px] min-w-[20px] min-h-[20px]" strokeWidth={2} />
          </div>
        </div>
      );
      break;

    case 'database':
      className = "w-24 h-32";
      content = (
        <div className="relative flex flex-col w-full h-full">
          <div className="absolute top-0 w-full h-[20%] min-h-[16px] bg-card border-2 border-foreground/40 rounded-[50%] z-10" />
          <div className="absolute top-[10%] bottom-[10%] w-full bg-card border-x-2 border-foreground/40 z-0 flex items-center justify-center text-foreground p-2">
            <DynamicIcon iconName={nodeData.iconName} iconType={nodeData.iconType || 'lucide'} className="w-full h-full max-w-[48px] max-h-[48px] min-w-[24px] min-h-[24px] opacity-80" strokeWidth={1.5} />
          </div>
          <div className="absolute bottom-0 w-full h-[20%] min-h-[16px] bg-card border-x-2 border-b-2 border-t-0 border-foreground/40 rounded-b-[50%] z-10" />
        </div>
      );
      break;

    case 'external':
      className = "w-24 h-24";
      content = (
        <div className="flex w-full h-full border-[3px] border-foreground/40 border-dashed rounded-lg shadow-sm items-center justify-center text-foreground bg-muted/20">
          <DynamicIcon iconName={nodeData.iconName} iconType={nodeData.iconType || 'lucide'} className="w-8 h-8 opacity-80" strokeWidth={1.5} />
        </div>
      );
      break;

    case 'gateway':
      className = "w-24 h-24";
      content = (
        <div className="relative w-full h-full flex items-center justify-center p-2">
          <div className="absolute inset-0 bg-primary/10 border-2 border-primary rotate-45 transform origin-center rounded-sm shadow-sm transition-all" />
          <div className="relative z-10 text-primary w-full h-full flex items-center justify-center p-2">
            <DynamicIcon iconName={nodeData.iconName} iconType={nodeData.iconType || 'lucide'} className="w-[50%] h-[50%] max-w-[40px] max-h-[40px] min-w-[16px] min-h-[16px]" strokeWidth={2} />
          </div>
        </div>
      );
      break;

    case 'network':
      className = "w-20 h-20";
      content = (
        <div className="flex w-full h-full bg-card rounded-full border-[3px] border-foreground/40 shadow-sm items-center justify-center text-foreground">
          <DynamicIcon iconName={nodeData.iconName} iconType={nodeData.iconType || 'lucide'} className="w-8 h-8 opacity-80" strokeWidth={1.5} />
        </div>
      );
      break;

    case 'person':
      className = "w-16 h-16";
      content = (
        <div className="flex items-center justify-center w-full h-full text-primary">
          <DynamicIcon iconName={nodeData.iconName} iconType={nodeData.iconType || 'lucide'} className="w-12 h-12" strokeWidth={1.5} />
        </div>
      );
      break;

    case 'queue':
      className = "w-40 h-16";
      content = (
        <div className="flex w-full h-full bg-card border-2 border-foreground/40 border-dashed rounded-md overflow-hidden shadow-sm items-center justify-between px-2">
          <div className="flex space-x-1">
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
      );
      break;

    case 'security':
      className = "w-20 h-24";
      content = (
        <div className="flex w-full h-full bg-card border-[3px] border-foreground/40 rounded-t-full rounded-b-md shadow-sm items-center justify-center text-foreground relative">
          <DynamicIcon iconName={nodeData.iconName} iconType={nodeData.iconType || 'lucide'} className="w-8 h-8 opacity-80" strokeWidth={1.5} />
        </div>
      );
      break;

    case 'server':
      className = "w-32 h-40";
      content = (
        <div className="flex flex-col w-full h-full bg-card border-2 border-foreground/40 rounded-md shadow-sm overflow-hidden">
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
      );
      break;

    case 'systemNode':
    default:
      className = "w-24 h-24";
      content = (
        <div className="flex w-full h-full bg-card border-2 border-border hover:border-primary/50 transition-colors rounded-xl shadow-sm overflow-hidden p-3 items-center justify-center">
          <DynamicIcon 
            iconName={nodeData.iconName} 
            iconType={nodeData.iconType || 'lucide'} 
            className="w-full h-full max-w-[48px] max-h-[48px] min-w-[24px] min-h-[24px] text-foreground" 
            strokeWidth={1.5} 
          />
        </div>
      );
      break;
  }

  return (
    <BaseNode
      {...props}
      nodeTitle={nodeData.label}
      nodeDescription={nodeData.description}
      className={className}
    >
      {content}
    </BaseNode>
  );
});
