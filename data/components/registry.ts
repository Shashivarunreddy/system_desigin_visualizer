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

export const GENERIC_COMPONENTS: SystemComponent[] = [
  {
    id: 'generic-compute',
    name: 'Compute',
    category: 'Compute',
    description: 'Generic server or compute instance',
    iconName: 'Server',
    iconType: 'lucide',
    visualType: 'server',
    role: 'compute',
  },
  {
    id: 'generic-database',
    name: 'Database',
    category: 'Data',
    description: 'Generic database or data store',
    iconName: 'Database',
    iconType: 'lucide',
    visualType: 'database',
    role: 'database',
  },
  {
    id: 'generic-storage',
    name: 'Storage',
    category: 'Data',
    description: 'Generic block or object storage',
    iconName: 'HardDrive',
    iconType: 'lucide',
    visualType: 'database',
    role: 'storage',
  },
  {
    id: 'generic-queue',
    name: 'Messaging',
    category: 'Communication',
    description: 'Message queue or event stream',
    iconName: 'ListOrdered',
    iconType: 'lucide',
    visualType: 'queue',
    role: 'communication',
  },
  {
    id: 'generic-application',
    name: 'Application',
    category: 'Applications',
    description: 'Application service or microservice',
    iconName: 'AppWindow',
    iconType: 'lucide',
    visualType: 'application',
    role: 'application',
  },
  {
    id: 'generic-api',
    name: 'API Gateway',
    category: 'Networking',
    description: 'API gateway or ingress',
    iconName: 'Globe',
    iconType: 'lucide',
    visualType: 'api',
    role: 'network',
  },
  {
    id: 'generic-security',
    name: 'Security',
    category: 'Security',
    description: 'Security group or firewall',
    iconName: 'Shield',
    iconType: 'lucide',
    visualType: 'security',
    role: 'security',
  },
  {
    id: 'generic-person',
    name: 'User',
    category: 'People',
    description: 'User, client, or actor',
    iconName: 'User',
    iconType: 'lucide',
    visualType: 'person',
    role: 'actor',
  },
  {
    id: 'generic-external',
    name: 'External System',
    category: 'External',
    description: 'External third-party system',
    iconName: 'ExternalLink',
    iconType: 'lucide',
    visualType: 'external',
    role: 'external',
  }
];

export function getComponent(id: string): SystemComponent | undefined {
  return COMPONENT_REGISTRY.find(c => c.id === id) || GENERIC_COMPONENTS.find(c => c.id === id);
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
