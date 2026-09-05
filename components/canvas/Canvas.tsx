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
import { PersonNode } from '@/components/nodes/PersonNode';
import { ApplicationNode } from '@/components/nodes/ApplicationNode';
import { DatabaseNode } from '@/components/nodes/DatabaseNode';
import { QueueNode } from '@/components/nodes/QueueNode';
import { ServerNode } from '@/components/nodes/ServerNode';
import { ApiNode } from '@/components/nodes/ApiNode';
import { GatewayNode } from '@/components/nodes/GatewayNode';
import { NetworkNode } from '@/components/nodes/NetworkNode';
import { SecurityNode } from '@/components/nodes/SecurityNode';
import { ExternalNode } from '@/components/nodes/ExternalNode';
import { CustomEdge } from '@/components/edges/CustomEdge';
import { COMPONENT_REGISTRY } from '@/data/components';

const nodeTypes = {
  systemNode: SystemNode,
  person: PersonNode,
  application: ApplicationNode,
  database: DatabaseNode,
  queue: QueueNode,
  server: ServerNode,
  api: ApiNode,
  gateway: GatewayNode,
  network: NetworkNode,
  security: SecurityNode,
  external: ExternalNode,
};

const edgeTypes = {
  customEdge: CustomEdge,
};

const getId = () => `node_${crypto.randomUUID()}`;

function FlowCanvas() {
  const storeNodes = useDiagramStore((state) => state.nodes);
  const edges = useDiagramStore((state) => state.edges);
  const onNodesChange = useDiagramStore((state) => state.onNodesChange);
  const onEdgesChange = useDiagramStore((state) => state.onEdgesChange);
  const onConnect = useDiagramStore((state) => state.onConnect);
  const setNodes = useDiagramStore((state) => state.setNodes);
  
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const { screenToFlowPosition } = useReactFlow();

  // Fix for corrupted local storage state that might have duplicate IDs
  const nodes = React.useMemo(() => {
    const seen = new Set();
    return storeNodes.filter(n => {
      if (seen.has(n.id)) return false;
      seen.add(n.id);
      return true;
    });
  }, [storeNodes]);

  // If we found duplicates, clean the store
  React.useEffect(() => {
    if (nodes.length !== storeNodes.length) {
      setNodes(nodes);
    }
  }, [nodes, storeNodes, setNodes]);

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
        type: componentDef.visualType || 'systemNode',
        position,
        data: { 
          label: componentDef.name,
          iconName: componentDef.iconName,
          description: componentDef.description,
          componentId: componentDef.id,
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
