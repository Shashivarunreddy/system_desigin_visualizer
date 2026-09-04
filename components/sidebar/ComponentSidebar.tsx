"use client";

import React from 'react';
import { COMPONENT_REGISTRY, getIconComponent, ComponentCategory } from '@/data/components';

export function ComponentSidebar() {
  const onDragStart = (event: React.DragEvent, componentId: string) => {
    event.dataTransfer.setData('application/reactflow', componentId);
    event.dataTransfer.effectAllowed = 'move';
  };

  // Group components by category
  const groupedComponents = COMPONENT_REGISTRY.reduce((acc, component) => {
    if (!acc[component.category]) acc[component.category] = [];
    acc[component.category].push(component);
    return acc;
  }, {} as Record<ComponentCategory, typeof COMPONENT_REGISTRY>);

  return (
    <div className="w-64 border-r bg-muted/10 h-full p-4 flex flex-col gap-6 overflow-y-auto">
      {Object.entries(groupedComponents).map(([category, components]) => (
        <div key={category} className="flex flex-col gap-2">
          <div className="font-semibold text-xs text-muted-foreground uppercase tracking-wider">
            {category}
          </div>
          <div className="grid grid-cols-2 gap-2">
            {components.map((component) => {
              const Icon = getIconComponent(component.iconName);
              return (
                <div
                  key={component.id}
                  className="flex flex-col items-center justify-center p-3 gap-2 bg-background border rounded-lg cursor-grab hover:border-primary/50 hover:bg-muted/50 transition-colors"
                  draggable
                  onDragStart={(e) => onDragStart(e, component.id)}
                  title={component.description}
                >
                  <Icon className="w-6 h-6 text-foreground" />
                  <span className="text-xs text-center font-medium">{component.name}</span>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
