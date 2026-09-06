import React from 'react';
import { Handle, Position, NodeProps, useConnection, NodeResizer, NodeToolbar } from '@xyflow/react';
import { cn } from '@/lib/utils';
import { SystemNodeData } from './SystemNode';
import { useDiagramStore } from '@/store/diagramStore';
import { getTechnologiesForRole, getComponent } from '@/data/components';

interface BaseNodeProps extends NodeProps {
  children: React.ReactNode;
  nodeTitle: string;
  nodeDescription?: string;
  className?: string;
}

export function BaseNode(props: BaseNodeProps) {
  const { id, data, selected, children, nodeTitle, nodeDescription, className, width, height } = props;
  const connection = useConnection();
  const updateNodeData = useDiagramStore((state) => state.updateNodeData);
  const isTarget = connection.inProgress && connection.fromNode.id !== id;
  const nodeData = data as unknown as SystemNodeData;

  const containerStyle = {
    width: width ? `${width}px` : undefined,
    height: height ? `${height}px` : undefined,
  };

  return (
    <>
      <NodeToolbar isVisible={selected} position={Position.Top} className="bg-background border rounded-md shadow-md p-1 mb-2 flex items-center">
        <select
          className="h-7 text-xs bg-background text-foreground rounded focus-visible:outline-none focus-visible:ring-0 cursor-pointer"
          value={nodeData.componentId || ''}
          onChange={(e) => {
            const comp = getComponent(e.target.value);
            if (comp) {
              updateNodeData(id, {
                componentId: comp.id,
                iconName: comp.iconName,
                iconType: comp.iconType,
                technology: comp.technology,
                label: comp.name
              });
            }
          }}
        >
          <option value="" disabled>Select technology...</option>
          {getTechnologiesForRole(nodeData.role).map(tech => (
            <option key={tech.id} value={tech.id}>
              {tech.name}
            </option>
          ))}
          {nodeData.componentId?.startsWith('generic-') && (
            <option value={nodeData.componentId}>
              Generic {nodeData.role}
            </option>
          )}
        </select>
      </NodeToolbar>
      <NodeResizer 
        minWidth={60} 
        minHeight={60} 
        isVisible={selected} 
        lineClassName="border-transparent" 
        lineStyle={{ border: 'none' }}
        handleClassName="h-3 w-3 bg-background border-2 border-primary rounded-sm" 
      />
      <div 
        style={containerStyle}
        className={cn(
          "group relative flex flex-col items-center justify-center transition-all",
          selected && "ring-2 ring-primary ring-offset-2 ring-offset-background rounded-md",
          className
        )}
      >
        {/* 4 simple handles on the edges, all type="source" because of Loose Connection Mode */}
        <Handle 
          type="source" 
          position={Position.Top} 
          id="top" 
          className={cn(
            "w-3 h-3 bg-primary border-2 border-background shadow-sm hover:w-4 hover:h-4 hover:-mt-1 transition-all rounded-full z-10",
            !isTarget && !selected && "opacity-0 group-hover:opacity-100" // Hide until hover or connecting or selected
          )} 
        />
        <Handle 
          type="source" 
          position={Position.Right} 
          id="right" 
          className={cn(
            "w-3 h-3 bg-primary border-2 border-background shadow-sm hover:w-4 hover:h-4 hover:-mr-1 transition-all rounded-full z-10",
            !isTarget && !selected && "opacity-0 group-hover:opacity-100"
          )} 
        />
        <Handle 
          type="source" 
          position={Position.Bottom} 
          id="bottom" 
          className={cn(
            "w-3 h-3 bg-primary border-2 border-background shadow-sm hover:w-4 hover:h-4 hover:-mb-1 transition-all rounded-full z-10",
            !isTarget && !selected && "opacity-0 group-hover:opacity-100"
          )} 
        />
        <Handle 
          type="source" 
          position={Position.Left} 
          id="left" 
          className={cn(
            "w-3 h-3 bg-primary border-2 border-background shadow-sm hover:w-4 hover:h-4 hover:-ml-1 transition-all rounded-full z-10",
            !isTarget && !selected && "opacity-0 group-hover:opacity-100"
          )} 
        />

        {/* The Visual Representation */}
        <div className="relative w-full h-full flex items-center justify-center">
          {children}
        </div>

        {/* Labels below the node */}
        <div className="absolute top-full mt-2 flex flex-col items-center text-center max-w-[150px]">
          <div className="text-xs font-semibold text-foreground px-2 py-0.5 bg-background/80 backdrop-blur-sm rounded border shadow-sm">
            {nodeTitle}
          </div>
          {nodeDescription && (
            <div className="text-[10px] text-muted-foreground mt-0.5 line-clamp-2 leading-tight">
              {nodeDescription}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
