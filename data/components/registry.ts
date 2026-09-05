import { SystemComponent, ComponentCategory } from './types';
import { DATABASE_COMPONENTS } from './catalogs/databases';
import { MESSAGING_COMPONENTS } from './catalogs/messaging';
import { COMPUTE_COMPONENTS } from './catalogs/compute';
import { APPLICATION_COMPONENTS } from './catalogs/applications';
import { OTHER_COMPONENTS } from './catalogs/others';

export const COMPONENT_REGISTRY: SystemComponent[] = [
  ...DATABASE_COMPONENTS,
  ...MESSAGING_COMPONENTS,
  ...COMPUTE_COMPONENTS,
  ...APPLICATION_COMPONENTS,
  ...OTHER_COMPONENTS
];

export function getComponent(id: string): SystemComponent | undefined {
  return COMPONENT_REGISTRY.find(c => c.id === id);
}

export function searchComponents(query: string): SystemComponent[] {
  if (!query) return COMPONENT_REGISTRY;
  
  const q = query.toLowerCase();
  return COMPONENT_REGISTRY.filter(c => 
    c.name.toLowerCase().includes(q) ||
    c.category.toLowerCase().includes(q) ||
    c.technology?.toLowerCase().includes(q) ||
    c.tags?.some(t => t.toLowerCase().includes(q)) ||
    c.description?.toLowerCase().includes(q)
  );
}

export function getComponentsByCategory(category: ComponentCategory): SystemComponent[] {
  return COMPONENT_REGISTRY.filter(c => c.category === category);
}

export function getTechnologiesForRole(role: string): SystemComponent[] {
  return COMPONENT_REGISTRY.filter(c => c.role === role && c.technology);
}
