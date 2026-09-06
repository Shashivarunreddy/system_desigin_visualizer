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
  focusModeNodeId: string | null;
  onNodesChange: OnNodesChange;
  onEdgesChange: OnEdgesChange;
  onConnect: OnConnect;
  setNodes: (nodes: Node[]) => void;
  setEdges: (edges: Edge[]) => void;
  setActiveTool: (tool: Tool) => void;
  updateNodeData: (nodeId: string, data: Partial<Record<string, unknown>>) => void;
  updateEdgeData: (edgeId: string, data: Partial<Record<string, unknown>>) => void;
  clearCanvas: () => void;
  setFocusModeNodeId: (id: string | null) => void;
  recentComponents: string[];
  favoriteComponents: string[];
  addRecentComponent: (id: string) => void;
  toggleFavoriteComponent: (id: string) => void;
}

export const useDiagramStore = create<DiagramState>()(
  persist(
    (set, get) => ({
      nodes: [],
      edges: [],
      recentComponents: [],
      favoriteComponents: [],
      activeTool: 'select',
      focusModeNodeId: null,
      addRecentComponent: (id: string) => {
        set((state) => {
          const filtered = state.recentComponents.filter(c => c !== id);
          return { recentComponents: [id, ...filtered].slice(0, 20) };
        });
      },
      toggleFavoriteComponent: (id: string) => {
        set((state) => {
          const isFav = state.favoriteComponents.includes(id);
          if (isFav) {
            return { favoriteComponents: state.favoriteComponents.filter(c => c !== id) };
          } else {
            return { favoriteComponents: [...state.favoriteComponents, id] };
          }
        });
      },
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
          data: {
            direction: 'forward',
            styleType: 'solid',
            animated: false,
          }
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
              const newData = data.data ? { ...(edge.data as object), ...data.data } : edge.data;
              return { ...edge, ...data, data: newData };
            }
            return edge;
          }),
        });
      },
      clearCanvas: () => set({ nodes: [], edges: [], focusModeNodeId: null }),
      setFocusModeNodeId: (id) => set({ focusModeNodeId: id }),
    }),
    {
      name: 'system-design-editor-storage',
      partialize: (state) => ({ 
        nodes: state.nodes, 
        edges: state.edges,
        recentComponents: state.recentComponents,
        favoriteComponents: state.favoriteComponents
      }),
    }
  )
);
