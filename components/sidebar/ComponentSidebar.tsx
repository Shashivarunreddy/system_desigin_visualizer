"use client";

import React, { useState, useMemo } from 'react';
import { COMPONENT_REGISTRY, GENERIC_COMPONENTS } from '@/data/components';
import { DynamicIcon } from '@/components/ui/DynamicIcon';
import { Search, ChevronDown, ChevronRight } from 'lucide-react';

export function ComponentSidebar() {
  const onDragStart = (event: React.DragEvent, componentId: string) => {
    event.dataTransfer.setData('application/reactflow', componentId);
    event.dataTransfer.effectAllowed = 'move';
  };

  const [searchQuery, setSearchQuery] = useState('');
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({});

  const toggleCategory = (category: string) => {
    setExpandedCategories(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

  const allComponents = useMemo(() => {
    return [...GENERIC_COMPONENTS, ...COMPONENT_REGISTRY];
  }, []);

  const displayedComponents = useMemo(() => {
    if (!searchQuery) return allComponents;
    const q = searchQuery.toLowerCase();
    return allComponents.filter(c => 
      c.name.toLowerCase().includes(q) ||
      c.category.toLowerCase().includes(q) ||
      c.technology?.toLowerCase().includes(q) ||
      c.description?.toLowerCase().includes(q)
    );
  }, [searchQuery, allComponents]);

  const groupedComponents = useMemo(() => {
    return displayedComponents.reduce((acc, component) => {
      if (!acc[component.category]) acc[component.category] = [];
      acc[component.category].push(component);
      return acc;
    }, {} as Record<string, typeof allComponents>);
  }, [displayedComponents]);

  return (
    <div className="w-64 flex-shrink-0 border-r bg-muted/10 flex flex-col h-full">
      <div className="p-4 border-b">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search components..."
            className="w-full bg-background rounded-md border border-input pl-9 pr-3 py-2 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      
      <div className="p-4 flex-1 overflow-y-auto flex flex-col gap-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {Object.entries(groupedComponents).length === 0 ? (
          <div className="text-center text-sm text-muted-foreground mt-4">
            No components found
          </div>
        ) : (
          Object.entries(groupedComponents).map(([category, components]) => {
            const isExpanded = expandedCategories[category] || searchQuery.length > 0;
            return (
              <div key={category} className="flex flex-col gap-2">
                <button 
                  onClick={() => toggleCategory(category)}
                  className="flex items-center justify-between w-full font-semibold text-xs text-muted-foreground uppercase tracking-wider sticky top-0 pb-1 z-10 hover:text-foreground transition-colors bg-muted/10 backdrop-blur-sm"
                >
                  <span>{category} ({components.length})</span>
                  {isExpanded ? <ChevronDown className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />}
                </button>
                
                {isExpanded && (
                  <div className="grid grid-cols-2 gap-2">
                    {components.map((component) => (
                      <div
                        key={component.id}
                        className="flex flex-col items-center justify-center p-3 gap-2 bg-background border rounded-lg cursor-grab hover:border-primary/50 hover:bg-muted/50 transition-colors shadow-sm"
                        draggable
                        onDragStart={(e) => onDragStart(e, component.id)}
                        title={component.description}
                      >
                        <DynamicIcon 
                          iconName={component.iconName} 
                          iconType={component.iconType || 'lucide'} 
                          className={`w-6 h-6 ${component.iconType === 'si' ? '' : 'text-foreground'}`} 
                        />
                        <span className="text-[10px] text-center font-medium leading-tight">
                          {component.name}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
