"use client";

import React, { useState, useMemo } from 'react';
import { COMPONENT_REGISTRY, GENERIC_COMPONENTS } from '@/data/components';
import { DynamicIcon } from '@/components/ui/DynamicIcon';
import { Search, ChevronDown, ChevronRight, Star } from 'lucide-react';
import { useDiagramStore } from '@/store/diagramStore';

export function ComponentSidebar() {
  const recentComponentIds = useDiagramStore(state => state.recentComponents);
  const favoriteComponentIds = useDiagramStore(state => state.favoriteComponents);
  const toggleFavoriteComponent = useDiagramStore(state => state.toggleFavoriteComponent);

  const onDragStart = (event: React.DragEvent, componentId: string) => {
    event.dataTransfer.setData('application/reactflow', componentId);
    event.dataTransfer.effectAllowed = 'move';
  };

  const [searchQuery, setSearchQuery] = useState('');
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({});
  const [isBrowsingAll, setIsBrowsingAll] = useState(false);

  const toggleCategory = (category: string) => {
    setExpandedCategories(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

  const allComponents = useMemo(() => {
    return [...GENERIC_COMPONENTS, ...COMPONENT_REGISTRY];
  }, []);

  const searchResults = useMemo(() => {
    if (!searchQuery) return [];
    const q = searchQuery.toLowerCase();
    return allComponents.filter(c => 
      c.name.toLowerCase().includes(q) ||
      c.category.toLowerCase().includes(q) ||
      c.technology?.toLowerCase().includes(q) ||
      c.description?.toLowerCase().includes(q)
    );
  }, [searchQuery, allComponents]);

  const groupedSearchResults = useMemo(() => {
    return searchResults.reduce((acc, component) => {
      if (!acc[component.category]) acc[component.category] = [];
      acc[component.category].push(component);
      return acc;
    }, {} as Record<string, typeof allComponents>);
  }, [searchResults]);

  const groupedAllComponents = useMemo(() => {
    return allComponents.reduce((acc, component) => {
      if (!acc[component.category]) acc[component.category] = [];
      acc[component.category].push(component);
      return acc;
    }, {} as Record<string, typeof allComponents>);
  }, [allComponents]);

  const recentComponents = useMemo(() => 
    recentComponentIds.map(id => allComponents.find(c => c.id === id)).filter(Boolean), 
  [recentComponentIds, allComponents]);

  const favoriteComponents = useMemo(() => 
    favoriteComponentIds.map(id => allComponents.find(c => c.id === id)).filter(Boolean), 
  [favoriteComponentIds, allComponents]);

  const renderComponent = (component: any) => {
    if (!component) return null;
    const isFav = favoriteComponentIds.includes(component.id);
    return (
      <div
        key={component.id}
        className="relative group flex flex-col items-center justify-center p-3 gap-2 bg-background border rounded-lg cursor-grab hover:border-primary/50 hover:bg-muted/50 transition-colors shadow-sm"
        draggable
        onDragStart={(e) => onDragStart(e, component.id)}
        title={component.description}
      >
        <button 
          className={`absolute top-1 right-1 p-1 z-10 transition-opacity ${isFav ? 'opacity-100 text-yellow-500' : 'opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-yellow-500'}`}
          onClick={(e) => {
            e.stopPropagation();
            toggleFavoriteComponent(component.id);
          }}
          title={isFav ? "Remove from favorites" : "Add to favorites"}
        >
          <Star className={`w-3 h-3 ${isFav ? 'fill-yellow-500 text-yellow-500' : ''}`} />
        </button>
        <DynamicIcon 
          iconName={component.iconName} 
          iconType={component.iconType || 'lucide'} 
          className={`w-6 h-6 ${component.iconType === 'si' ? '' : 'text-foreground'}`} 
        />
        <span className="text-[10px] text-center font-medium leading-tight">
          {component.name}
        </span>
      </div>
    );
  };

  const renderComponentList = (title: string, components: any[], collapsible = false) => {
    if (!components.length) return null;
    const isExpanded = !collapsible || expandedCategories[title];
    return (
      <div key={title} className="flex flex-col gap-2 mb-4">
        <button 
          onClick={() => collapsible && toggleCategory(title)}
          className={`flex items-center justify-between w-full font-semibold text-xs text-muted-foreground uppercase tracking-wider sticky top-0 pb-1 z-10 hover:text-foreground transition-colors bg-muted/10 backdrop-blur-sm ${!collapsible && 'cursor-default'}`}
        >
          <span>{title}</span>
          {collapsible && (isExpanded ? <ChevronDown className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />)}
        </button>
        
        {isExpanded && (
          <div className="grid grid-cols-2 gap-2">
            {components.map(renderComponent)}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="w-64 flex-shrink-0 border-r bg-muted/10 flex flex-col h-full">
      <div className="p-4 border-b">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search components (Ctrl+K)..."
            className="w-full bg-background text-foreground rounded-md border border-input pl-9 pr-3 py-2 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      
      <div className="p-4 flex-1 overflow-y-auto flex flex-col gap-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {searchQuery ? (
          Object.entries(groupedSearchResults).length === 0 ? (
            <div className="text-center text-sm text-muted-foreground mt-4">
              No components found for "{searchQuery}"
            </div>
          ) : (
            Object.entries(groupedSearchResults).map(([category, components]) => renderComponentList(category, components, false))
          )
        ) : isBrowsingAll ? (
          <>
            <button 
              onClick={() => setIsBrowsingAll(false)}
              className="text-xs text-primary font-medium hover:underline mb-4 flex items-center gap-1"
            >
              <ChevronDown className="w-3 h-3 rotate-90" /> Back to default view
            </button>
            {Object.entries(groupedAllComponents).map(([category, components]) => renderComponentList(category, components, true))}
          </>
        ) : (
          <>
            {favoriteComponents.length > 0 && renderComponentList('Favorites', favoriteComponents, false)}
            {recentComponents.length > 0 && renderComponentList('Recent', recentComponents, false)}
            {renderComponentList('Most Used', GENERIC_COMPONENTS, false)}
            <button 
              onClick={() => setIsBrowsingAll(true)}
              className="mt-2 w-full py-2 text-sm font-medium text-primary bg-primary/10 hover:bg-primary/20 rounded-md transition-colors"
            >
              + Browse All
            </button>
          </>
        )}
      </div>
    </div>
  );
}
