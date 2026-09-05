"use client";

import React from 'react';
import { useDiagramStore } from '@/store/diagramStore';
import { useShallow } from 'zustand/react/shallow';
import { Trash2 } from 'lucide-react';

export function PropertiesPanel() {
  const selectedNodes = useDiagramStore(useShallow((state) => state.nodes.filter((n) => n.selected)));
  const selectedEdges = useDiagramStore(useShallow((state) => state.edges.filter((e) => e.selected)));
  const updateNodeData = useDiagramStore((state) => state.updateNodeData);
  const updateEdgeData = useDiagramStore((state) => state.updateEdgeData);
  const setNodes = useDiagramStore((state) => state.setNodes);
  const setEdges = useDiagramStore((state) => state.setEdges);
  const nodes = useDiagramStore((state) => state.nodes);
  const edges = useDiagramStore((state) => state.edges);

  if (selectedNodes.length === 0 && selectedEdges.length === 0) {
    return null;
  }

  const handleDeleteNode = (id: string) => {
    setNodes(nodes.filter(n => n.id !== id));
    setEdges(edges.filter(e => e.source !== id && e.target !== id));
  };

  const handleDeleteEdge = (id: string) => {
    setEdges(edges.filter(e => e.id !== id));
  };

  if (selectedNodes.length > 1 || selectedEdges.length > 1 || (selectedNodes.length > 0 && selectedEdges.length > 0)) {
    return (
      <div className="w-80 border-l bg-muted/10 h-full p-4 flex flex-col gap-4 overflow-y-auto border-t md:border-t-0">
        <div className="font-semibold text-sm uppercase tracking-wider text-muted-foreground">Multiple Selected</div>
        <div className="text-sm">Select a single item to view its properties.</div>
      </div>
    );
  }

  if (selectedNodes.length === 1) {
    const node = selectedNodes[0];
    const nodeData = node.data as { label?: string; description?: string };

    return (
      <div className="w-80 border-l bg-muted/10 h-full p-4 flex flex-col gap-4 overflow-y-auto border-t md:border-t-0">
        <div className="flex items-center justify-between mb-2">
          <div className="font-semibold text-sm uppercase tracking-wider text-muted-foreground">Node Properties</div>
          <button 
            onClick={() => handleDeleteNode(node.id)}
            className="p-1.5 text-muted-foreground hover:bg-destructive hover:text-destructive-foreground rounded-md transition-colors"
            title="Delete Node"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium">Label</label>
          <input
            type="text"
            className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
            value={nodeData.label || ''}
            onChange={(e) => updateNodeData(node.id, { label: e.target.value })}
            placeholder="e.g. API Gateway"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Description</label>
          <textarea
            className="flex min-h-[80px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 resize-y"
            value={nodeData.description || ''}
            onChange={(e) => updateNodeData(node.id, { description: e.target.value })}
            placeholder="Add some details..."
          />
        </div>
      </div>
    );
  }

  if (selectedEdges.length === 1) {
    const edge = selectedEdges[0];
    const edgeData = (edge.data || {}) as Record<string, any>;

    const handleRelationshipChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      const type = e.target.value;
      // In a real app we would import RELATIONSHIP_REGISTRY, but for simplicity here we hardcode the defaults
      let defaultStyle = 'solid';
      let defaultDirection = 'forward';
      let defaultLabel = '';

      switch (type) {
        case 'request': defaultLabel = 'Request'; defaultStyle = 'solid'; defaultDirection = 'forward'; break;
        case 'response': defaultLabel = 'Response'; defaultStyle = 'solid'; defaultDirection = 'backward'; break;
        case 'data': defaultLabel = 'Data'; defaultStyle = 'solid'; defaultDirection = 'forward'; break;
        case 'event': defaultLabel = 'Event'; defaultStyle = 'dashed'; defaultDirection = 'forward'; break;
        case 'dependency': defaultLabel = 'Depends On'; defaultStyle = 'dotted'; defaultDirection = 'forward'; break;
      }

      updateEdgeData(edge.id, { 
        label: defaultLabel,
        data: {
          relationship: type,
          styleType: defaultStyle,
          direction: defaultDirection,
        }
      });
    };

    return (
      <div className="w-80 border-l bg-muted/10 h-full p-4 flex flex-col gap-4 overflow-y-auto border-t md:border-t-0">
        <div className="flex items-center justify-between mb-2">
          <div className="font-semibold text-sm uppercase tracking-wider text-muted-foreground">Connection Properties</div>
          <button 
            onClick={() => handleDeleteEdge(edge.id)}
            className="p-1.5 text-muted-foreground hover:bg-destructive hover:text-destructive-foreground rounded-md transition-colors"
            title="Delete Connection"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Relationship</label>
          <select
            className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            value={edgeData.relationship || ''}
            onChange={handleRelationshipChange}
          >
            <option value="">Custom...</option>
            <option value="request">Request</option>
            <option value="response">Response</option>
            <option value="data">Data Flow</option>
            <option value="event">Event</option>
            <option value="dependency">Dependency</option>
          </select>
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium">Label</label>
          <input
            type="text"
            className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            value={edge.label as string || ''}
            onChange={(e) => updateEdgeData(edge.id, { label: e.target.value })}
            placeholder="e.g. calls, writes, reads"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Direction</label>
          <select
            className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            value={edgeData.direction || 'forward'}
            onChange={(e) => updateEdgeData(edge.id, { data: { direction: e.target.value } })}
          >
            <option value="forward">Forward</option>
            <option value="backward">Backward</option>
            <option value="bidirectional">Bidirectional</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Style</label>
          <select
            className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            value={edgeData.styleType || 'solid'}
            onChange={(e) => updateEdgeData(edge.id, { data: { styleType: e.target.value } })}
          >
            <option value="solid">Solid</option>
            <option value="dashed">Dashed</option>
            <option value="dotted">Dotted</option>
          </select>
        </div>

        <div className="flex items-center space-x-2 pt-2">
          <input
            type="checkbox"
            id="animated-edge"
            checked={edge.animated || false}
            onChange={(e) => updateEdgeData(edge.id, { animated: e.target.checked })}
            className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
          />
          <label htmlFor="animated-edge" className="text-sm font-medium cursor-pointer">
            Animated Flow
          </label>
        </div>

      </div>
    );
  }

  return null;
}
