"use client";

import React from 'react';
import { useDiagramStore } from '@/store/diagramStore';
import { useShallow } from 'zustand/react/shallow';
import { Trash2, Network } from 'lucide-react';
import { getIncomingConnections, getOutgoingConnections } from '@/lib/architecture/graph';
import { getTechnologiesForRole, getComponent } from '@/data/components';

export function PropertiesPanel() {
  const selectedNodes = useDiagramStore(useShallow((state) => state.nodes.filter((n) => n.selected)));
  const selectedEdges = useDiagramStore(useShallow((state) => state.edges.filter((e) => e.selected)));
  const updateNodeData = useDiagramStore((state) => state.updateNodeData);
  const updateEdgeData = useDiagramStore((state) => state.updateEdgeData);
  const setNodes = useDiagramStore((state) => state.setNodes);
  const setEdges = useDiagramStore((state) => state.setEdges);
  const nodes = useDiagramStore((state) => state.nodes);
  const edges = useDiagramStore((state) => state.edges);
  const focusModeNodeId = useDiagramStore((state) => state.focusModeNodeId);
  const setFocusModeNodeId = useDiagramStore((state) => state.setFocusModeNodeId);

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
    const nodeData = (node.data || {}) as Record<string, any>;
    const incomingCount = getIncomingConnections(node.id, edges).length;
    const outgoingCount = getOutgoingConnections(node.id, edges).length;
    const isFocused = focusModeNodeId === node.id;

    return (
      <div className="w-80 border-l bg-muted/10 h-full p-4 flex flex-col gap-6 overflow-y-auto border-t md:border-t-0">
        <div className="flex items-center justify-between">
          <div className="font-semibold text-sm uppercase tracking-wider text-muted-foreground">Node Inspector</div>
          <button 
            onClick={() => handleDeleteNode(node.id)}
            className="p-1.5 text-muted-foreground hover:bg-destructive hover:text-destructive-foreground rounded-md transition-colors"
            title="Delete Node"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center text-sm border-b pb-2">
            <span className="text-muted-foreground">Semantic Role</span>
            <span className="font-mono bg-muted px-2 py-0.5 rounded capitalize text-xs font-medium">{nodeData.role || 'Unknown'}</span>
          </div>
          
          <div className="grid grid-cols-2 gap-2 text-center text-xs">
            <div className="bg-background rounded-md border p-2">
              <span className="block font-bold text-lg">{incomingCount}</span>
              <span className="text-muted-foreground uppercase tracking-wider">Incoming</span>
            </div>
            <div className="bg-background rounded-md border p-2">
              <span className="block font-bold text-lg">{outgoingCount}</span>
              <span className="text-muted-foreground uppercase tracking-wider">Outgoing</span>
            </div>
          </div>

          <button
            onClick={() => setFocusModeNodeId(isFocused ? null : node.id)}
            className={`w-full py-2 flex items-center justify-center space-x-2 text-sm font-medium rounded-md border transition-colors ${
              isFocused ? 'bg-primary text-primary-foreground border-primary' : 'bg-background hover:bg-muted'
            }`}
          >
            <Network className="w-4 h-4" />
            <span>{isFocused ? 'Exit Focus Mode' : 'Focus Connections'}</span>
          </button>
        </div>

        {nodeData.role && (
          <div className="space-y-2 pt-4 border-t">
            <label className="text-sm font-medium">Technology Variant</label>
            <select
              className="flex h-9 w-full rounded-md border border-input bg-background text-foreground px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              value={nodeData.componentId || ''}
              onChange={(e) => {
                const comp = getComponent(e.target.value);
                if (comp) {
                  updateNodeData(node.id, {
                    componentId: comp.id,
                    iconName: comp.iconName,
                    iconType: comp.iconType,
                    technology: comp.technology,
                    label: comp.name // auto-update label to match new tech
                  });
                }
              }}
            >
              {/* Show the generic component as an option too if we want, but let's just show available technologies */}
              <option value="" disabled>Select technology...</option>
              {getTechnologiesForRole(nodeData.role).map(tech => (
                <option key={tech.id} value={tech.id}>
                  {tech.name}
                </option>
              ))}
              {/* If the current component is a generic one, ensure it has a valid option */}
              {nodeData.componentId?.startsWith('generic-') && (
                <option value={nodeData.componentId}>
                  Generic {nodeData.role}
                </option>
              )}
            </select>
          </div>
        )}
        
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Label</label>
            <input
              type="text"
              className="flex h-9 w-full rounded-md border border-input bg-background text-foreground px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              value={nodeData.label || ''}
              onChange={(e) => updateNodeData(node.id, { label: e.target.value })}
              placeholder="e.g. API Gateway"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Description</label>
            <textarea
              className="flex min-h-[60px] w-full rounded-md border border-input bg-background text-foreground px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring resize-y"
              value={nodeData.description || ''}
              onChange={(e) => updateNodeData(node.id, { description: e.target.value })}
              placeholder="Add some details..."
            />
          </div>
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
            className="flex h-9 w-full rounded-md border border-input bg-background text-foreground px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
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
            className="flex h-9 w-full rounded-md border border-input bg-background text-foreground px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            value={edge.label as string || ''}
            onChange={(e) => updateEdgeData(edge.id, { label: e.target.value })}
            placeholder="e.g. calls, writes, reads"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Direction</label>
          <select
            className="flex h-9 w-full rounded-md border border-input bg-background text-foreground px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
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
            className="flex h-9 w-full rounded-md border border-input bg-background text-foreground px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
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
