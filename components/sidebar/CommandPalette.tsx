"use client";

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Search, ChevronRight } from 'lucide-react';
import { COMPONENT_REGISTRY, GENERIC_COMPONENTS } from '@/data/components';
import { DynamicIcon } from '@/components/ui/DynamicIcon';
import { useDiagramStore } from '@/store/diagramStore';
import { getComponent } from '@/data/components';
import { useDebounce } from '@/hooks/useDebounce';

export function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedSearchQuery = useDebounce(searchQuery, 150);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const addRecentComponent = useDiagramStore(state => state.addRecentComponent);
  const nodes = useDiagramStore(state => state.nodes);
  const setNodes = useDiagramStore(state => state.setNodes);

  // Toggle with Ctrl+K / Cmd+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    if (isOpen) {
      setSearchQuery('');
      setSelectedIndex(0);
      // Timeout ensures the element is rendered before focusing
      setTimeout(() => inputRef.current?.focus(), 10);
    }
  }, [isOpen]);

  const allComponents = useMemo(() => {
    return [...GENERIC_COMPONENTS, ...COMPONENT_REGISTRY];
  }, []);

  const searchResults = useMemo(() => {
    if (!debouncedSearchQuery) return [];
    const q = debouncedSearchQuery.toLowerCase();
    return allComponents.filter(c => 
      c.name.toLowerCase().includes(q) ||
      c.category.toLowerCase().includes(q) ||
      c.technology?.toLowerCase().includes(q) ||
      c.description?.toLowerCase().includes(q)
    ).slice(0, 10); // limit to top 10 results for palette
  }, [debouncedSearchQuery, allComponents]);

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsOpen(false);
      return;
    }
    
    if (searchResults.length === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev < searchResults.length - 1 ? prev + 1 : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : searchResults.length - 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      addComponentToCanvas(searchResults[selectedIndex].id);
    }
  };

  const addComponentToCanvas = (componentId: string) => {
    const componentDef = getComponent(componentId);
    if (!componentDef) return;

    let posX = 200;
    let posY = 150;

    if (nodes.length > 0) {
      const lastNode = nodes[nodes.length - 1];
      posX = lastNode.position.x + 150;
      posY = lastNode.position.y + 50;
    } else {
      const offset = (nodes.length % 5) * 20;
      posX += offset;
      posY += offset;
    }

    const newNode = {
      id: `node_${crypto.randomUUID()}`,
      type: componentDef.visualType || 'systemNode',
      position: { x: posX, y: posY },
      data: { 
        label: componentDef.name,
        iconName: componentDef.iconName,
        iconType: componentDef.iconType,
        description: componentDef.description,
        componentId: componentDef.id,
        role: componentDef.role || 'service',
        technology: componentDef.technology,
        metadata: {},
      },
    };

    setNodes([...nodes, newNode]);
    addRecentComponent(componentId);
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 bg-background/50 backdrop-blur-sm">
      <div 
        className="relative w-full max-w-lg bg-background border rounded-lg shadow-lg overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()} // Prevent clicks inside from closing
      >
        <div className="flex items-center p-3 border-b">
          <Search className="w-5 h-5 text-muted-foreground mr-3" />
          <input
            ref={inputRef}
            className="flex-1 bg-transparent border-none outline-none text-foreground placeholder:text-muted-foreground"
            placeholder="Search components..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setSelectedIndex(0);
            }}
            onKeyDown={handleKeyDown}
          />
          <div className="text-xs text-muted-foreground border rounded px-1.5 py-0.5 bg-muted">ESC</div>
        </div>

        {debouncedSearchQuery && searchResults.length > 0 && (
          <div className="max-h-80 overflow-y-auto p-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            {searchResults.map((component, index) => (
              <button
                key={component.id}
                className={`w-full flex items-center p-3 gap-3 rounded-md text-left transition-colors ${
                  index === selectedIndex ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'
                }`}
                onClick={() => addComponentToCanvas(component.id)}
                onMouseEnter={() => setSelectedIndex(index)}
              >
                <div className={`p-1.5 rounded-md ${index === selectedIndex ? 'bg-primary-foreground/20' : 'bg-muted'}`}>
                  <DynamicIcon 
                    iconName={component.iconName} 
                    iconType={component.iconType || 'lucide'} 
                    className={`w-5 h-5 ${component.iconType === 'si' ? '' : (index === selectedIndex ? 'text-primary-foreground' : 'text-foreground')}`} 
                  />
                </div>
                <div className="flex flex-col flex-1">
                  <span className="text-sm font-medium">{component.name}</span>
                  <span className={`text-xs ${index === selectedIndex ? 'text-primary-foreground/70' : 'text-muted-foreground'}`}>
                    {component.category}
                    {component.technology ? ` • ${component.technology}` : ''}
                  </span>
                </div>
                {index === selectedIndex && <ChevronRight className="w-4 h-4 opacity-50" />}
              </button>
            ))}
          </div>
        )}

        {debouncedSearchQuery && searchResults.length === 0 && (
          <div className="p-8 text-center text-sm text-muted-foreground">
            No components found for "{debouncedSearchQuery}"
          </div>
        )}
      </div>
      
      {/* Click outside to close */}
      <div className="absolute inset-0 z-[-1]" onClick={() => setIsOpen(false)} />
    </div>
  );
}
