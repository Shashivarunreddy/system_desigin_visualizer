"use client";

import React, { useRef } from 'react';
import { ThemeToggle } from '@/components/theme-toggle';
import { useDiagramStore } from '@/store/diagramStore';
import { Trash2, Download, Upload } from 'lucide-react';
import { Edge, Node } from '@xyflow/react';

export function TopToolbar() {
  const clearCanvas = useDiagramStore((state) => state.clearCanvas);
  const nodes = useDiagramStore((state) => state.nodes);
  const edges = useDiagramStore((state) => state.edges);
  const setNodes = useDiagramStore((state) => state.setNodes);
  const setEdges = useDiagramStore((state) => state.setEdges);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleExport = () => {
    const data = { nodes, edges };
    const jsonString = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `system-design-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const jsonString = event.target?.result as string;
        const data = JSON.parse(jsonString) as { nodes: Node[]; edges: Edge[] };
        
        if (data && Array.isArray(data.nodes) && Array.isArray(data.edges)) {
          setNodes(data.nodes);
          setEdges(data.edges);
        } else {
          alert('Invalid JSON format for system design.');
        }
      } catch (error) {
        alert('Error parsing JSON file.');
      }
    };
    reader.readAsText(file);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="h-14 border-b flex items-center px-4 bg-background z-10 sticky top-0">
      <div className="font-semibold text-lg">System Design Visualizer</div>
      <div className="ml-auto flex items-center space-x-2">
        <input 
          type="file" 
          accept=".json" 
          className="hidden" 
          ref={fileInputRef} 
          onChange={handleImport} 
        />
        <button
          onClick={() => fileInputRef.current?.click()}
          className="inline-flex items-center justify-center rounded-md h-9 px-3 text-sm font-medium border border-input bg-background hover:bg-accent hover:text-accent-foreground transition-colors gap-2"
        >
          <Upload className="w-4 h-4" />
          Import
        </button>
        <button
          onClick={handleExport}
          className="inline-flex items-center justify-center rounded-md h-9 px-3 text-sm font-medium border border-input bg-background hover:bg-accent hover:text-accent-foreground transition-colors gap-2"
        >
          <Download className="w-4 h-4" />
          Export
        </button>
        <div className="w-px h-6 bg-border mx-1" />
        <button
          onClick={clearCanvas}
          className="inline-flex items-center justify-center rounded-md h-9 px-3 text-sm font-medium border border-input bg-background hover:bg-destructive hover:text-destructive-foreground transition-colors gap-2"
        >
          <Trash2 className="w-4 h-4" />
          Clear
        </button>
        <ThemeToggle />
      </div>
    </div>
  );
}
