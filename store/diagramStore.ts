import { create } from 'zustand';
import {
  Connection,
  Edge,
  EdgeChange,
  Node,
  NodeChange,
  addEdge,
  OnNodesChange,
  OnEdgesChange,
  OnConnect,
  applyNodeChanges,
  applyEdgeChanges,
  MarkerType,
} from '@xyflow/react';

export type Tool = 'select' | 'connect' | 'text' | 'note';

interface DiagramState {
  nodes: Node[];
  edges: Edge[];
  activeTool: Tool;
  onNodesChange: OnNodesChange;
  onEdgesChange: OnEdgesChange;
  onConnect: OnConnect;
  setNodes: (nodes: Node[]) => void;
  setEdges: (edges: Edge[]) => void;
  setActiveTool: (tool: Tool) => void;
}

export const useDiagramStore = create<DiagramState>((set, get) => ({
  nodes: [],
  edges: [],
  activeTool: 'select',
  onNodesChange: (changes: NodeChange[]) => {
    set({
      nodes: applyNodeChanges(changes, get().nodes),
    });
  },
  onEdgesChange: (changes: EdgeChange[]) => {
    set({
      edges: applyEdgeChanges(changes, get().edges),
    });
  },
  onConnect: (connection: Connection) => {
    const newEdge: Edge = {
      ...connection,
      id: `edge_${connection.source}_${connection.target}_${Date.now()}`,
      type: 'customEdge',
      markerEnd: { type: MarkerType.ArrowClosed },
      style: { strokeWidth: 2 },
    };
    set({
      edges: addEdge(newEdge, get().edges),
    });
  },
  setNodes: (nodes: Node[]) => set({ nodes }),
  setEdges: (edges: Edge[]) => set({ edges }),
  setActiveTool: (tool: Tool) => set({ activeTool: tool }),
}));
