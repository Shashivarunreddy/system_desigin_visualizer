import { create } from 'zustand';
import { persist } from 'zustand/middleware';
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
  updateNodeData: (nodeId: string, data: Partial<Record<string, unknown>>) => void;
  updateEdgeData: (edgeId: string, data: Partial<Edge>) => void;
  clearCanvas: () => void;
}

export const useDiagramStore = create<DiagramState>()(
  persist(
    (set, get) => ({
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
      updateNodeData: (nodeId, data) => {
        set({
          nodes: get().nodes.map((node) => {
            if (node.id === nodeId) {
              return { ...node, data: { ...node.data, ...data } };
            }
            return node;
          }),
        });
      },
      updateEdgeData: (edgeId, data) => {
        set({
          edges: get().edges.map((edge) => {
            if (edge.id === edgeId) {
              return { ...edge, ...data };
            }
            return edge;
          }),
        });
      },
      clearCanvas: () => set({ nodes: [], edges: [] }),
    }),
    {
      name: 'system-design-editor-storage',
      partialize: (state) => ({ nodes: state.nodes, edges: state.edges }),
    }
  )
);
