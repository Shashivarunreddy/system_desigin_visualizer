"use client";

import React, { useCallback, useRef } from 'react';
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  ReactFlowProvider,
  useReactFlow,
  Node,
  ConnectionMode,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import { useDiagramStore } from '@/store/diagramStore';
import { SystemNode } from '@/components/nodes/SystemNode';
import { CustomEdge } from '@/components/edges/CustomEdge';
import { COMPONENT_REGISTRY } from '@/data/components';

const nodeTypes = {
  systemNode: SystemNode,
};

const edgeTypes = {
  customEdge: CustomEdge,
};

let idCounter = 1;
const getId = () => `node_${idCounter++}`;

function FlowCanvas() {
  const nodes = useDiagramStore((state) => state.nodes);
  const edges = useDiagramStore((state) => state.edges);
  const onNodesChange = useDiagramStore((state) => state.onNodesChange);
  const onEdgesChange = useDiagramStore((state) => state.onEdgesChange);
  const onConnect = useDiagramStore((state) => state.onConnect);
  const setNodes = useDiagramStore((state) => state.setNodes);
  
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const { screenToFlowPosition } = useReactFlow();

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();

      const componentId = event.dataTransfer.getData('application/reactflow');
      if (!componentId) return;

      const componentDef = COMPONENT_REGISTRY.find((c) => c.id === componentId);
      if (!componentDef) return;

      const position = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      const newNode: Node = {
        id: getId(),
        type: 'systemNode',
        position,
        data: {
          label: componentDef.name,
          description: componentDef.description,
          iconName: componentDef.iconName,
        },
      };

      setNodes([...nodes, newNode]);
    },
    [screenToFlowPosition, setNodes, nodes]
  );

  return (
    <div className="flex-1 h-full w-full relative" ref={reactFlowWrapper}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onDrop={onDrop}
        onDragOver={onDragOver}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        connectionMode={ConnectionMode.Loose}
        fitView
        className="bg-muted/10"
      >
        <Background color="hsl(var(--muted-foreground))" gap={16} size={1} className="opacity-20" />
        <Controls className="bg-background border shadow-sm rounded-md overflow-hidden" />
        <MiniMap 
          nodeColor="hsl(var(--primary))" 
          maskColor="hsl(var(--background) / 0.5)" 
          className="bg-background border shadow-sm rounded-md" 
        />
      </ReactFlow>
    </div>
  );
}

export function Canvas() {
  return (
    <div className="flex-1 h-full w-full relative">
      <ReactFlowProvider>
        <FlowCanvas />
      </ReactFlowProvider>
    </div>
  );
}
