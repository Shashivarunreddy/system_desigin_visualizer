import {
  User,
  Monitor,
  Server,
  Database,
  Globe,
  Lock,
  Cloud,
  Box,
  Cpu,
  HardDrive,
  MessageSquare,
  Network,
  ArrowRightLeft,
  Waypoints
} from 'lucide-react';
import React from 'react';

export type ComponentCategory =
  | 'People'
  | 'Applications'
  | 'Compute'
  | 'Data'
  | 'Communication'
  | 'Networking'
  | 'Security'
  | 'External';

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

export interface SystemComponent {
  id: string;
  name: string;
  category: ComponentCategory;
  description: string;
  iconName: string; // Used to look up the Lucide icon dynamically or map it
  visualType?: VisualType;
}

export const COMPONENT_REGISTRY: SystemComponent[] = [
  // People
  { id: 'user', name: 'User', category: 'People', description: 'System User', iconName: 'User', visualType: 'person' },
  { id: 'client', name: 'Client', category: 'People', description: 'Client Application', iconName: 'Monitor', visualType: 'person' },
  
  // Applications
  { id: 'application', name: 'Application', category: 'Applications', description: 'Software Application', iconName: 'Box', visualType: 'application' },
  { id: 'service', name: 'Service', category: 'Applications', description: 'Microservice or Service', iconName: 'Cpu', visualType: 'application' },
  
  // Compute
  { id: 'server', name: 'Server', category: 'Compute', description: 'Physical or Virtual Server', iconName: 'Server', visualType: 'server' },
  
  // Data
  { id: 'database', name: 'Database', category: 'Data', description: 'Data Storage', iconName: 'Database', visualType: 'database' },
  { id: 'storage', name: 'Data Store', category: 'Data', description: 'File/Blob Storage', iconName: 'HardDrive', visualType: 'database' },
  
  // Communication
  { id: 'api', name: 'API', category: 'Communication', description: 'Application Programming Interface', iconName: 'ArrowRightLeft', visualType: 'api' },
  { id: 'queue', name: 'Message Queue', category: 'Communication', description: 'Message Broker', iconName: 'MessageSquare', visualType: 'queue' },
  
  // Networking
  { id: 'network', name: 'Network', category: 'Networking', description: 'Network Boundary', iconName: 'Network', visualType: 'network' },
  { id: 'gateway', name: 'Gateway', category: 'Networking', description: 'API Gateway or Entrypoint', iconName: 'Waypoints', visualType: 'gateway' },
  
  // Security
  { id: 'auth', name: 'Auth', category: 'Security', description: 'Authentication/Authorization', iconName: 'Lock', visualType: 'security' },
  
  // External
  { id: 'external', name: 'External Service', category: 'External', description: 'Third-party API', iconName: 'Globe', visualType: 'external' },
  { id: 'cloud', name: 'Cloud', category: 'External', description: 'Cloud Provider', iconName: 'Cloud', visualType: 'external' },
];

export const getIconComponent = (iconName: string): React.ElementType => {
  const icons: Record<string, React.ElementType> = {
    User,
    Monitor,
    Server,
    Database,
    Globe,
    Lock,
    Cloud,
    Box,
    Cpu,
    HardDrive,
    MessageSquare,
    Network,
    ArrowRightLeft,
    Waypoints
  };
  return icons[iconName] || Box;
};
