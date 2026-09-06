import { ComponentRole } from '@/lib/architecture/types';

export type ComponentCategory =
  | 'People'
  | 'Applications'
  | 'Compute'
  | 'Data'
  | 'Communication'
  | 'Networking'
  | 'Security'
  | 'External'
  | 'AI / ML'
  | 'Data Processing'
  | 'Analytics & Data Platforms'
  | 'Workflow & Orchestration'
  | 'Integration'
  | 'Notifications'
  | 'Observability'
  | 'Reliability & Resilience'
  | 'Deployment & Environments'
  | 'Containers & Orchestration'
  | 'Distributed Systems'
  | 'Devices & IoT'
  | 'Legacy & Migration'
  | 'CI/CD & Software Delivery'
  | 'Configuration'
  | 'Diagram & Documentation';

export type VisualType = 
  | 'person'
  | 'application'
  | 'server'
  | 'database'
  | 'queue'
  | 'network'
  | 'security'
  | 'external'
  | 'api'
  | 'gateway'
  | 'systemNode';

export type IconType = 'lucide' | 'si';

export interface SystemComponent {
  id: string; // Unique identifier (e.g. 'database-postgresql')
  name: string; // Display name (e.g. 'PostgreSQL')
  category: ComponentCategory; // Sidebar grouping
  description: string; 
  iconName: string; // The specific icon name to look up
  iconType: IconType; // 'lucide' for generic, 'si' for simple-icons
  visualType?: VisualType; // How to render it (cylinder vs box)
  role: ComponentRole; // Architecture role
  technology?: string; // Optional specific technology tag
  provider?: string; // Optional provider tag
  tags?: string[]; // Used for search
}
