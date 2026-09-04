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
  Network
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

export interface SystemComponent {
  id: string;
  name: string;
  category: ComponentCategory;
  description: string;
  iconName: string; // Used to look up the Lucide icon dynamically or map it
}

export const COMPONENT_REGISTRY: SystemComponent[] = [
  // People
  { id: 'user', name: 'User', category: 'People', description: 'System User', iconName: 'User' },
  { id: 'client', name: 'Client', category: 'People', description: 'Client Application', iconName: 'Monitor' },
  
  // Applications
  { id: 'application', name: 'Application', category: 'Applications', description: 'Software Application', iconName: 'Box' },
  { id: 'service', name: 'Service', category: 'Applications', description: 'Microservice or Service', iconName: 'Cpu' },
  
  // Compute
  { id: 'server', name: 'Server', category: 'Compute', description: 'Physical or Virtual Server', iconName: 'Server' },
  
  // Data
  { id: 'database', name: 'Database', category: 'Data', description: 'Data Storage', iconName: 'Database' },
  { id: 'storage', name: 'Data Store', category: 'Data', description: 'File/Blob Storage', iconName: 'HardDrive' },
  
  // Communication
  { id: 'queue', name: 'Message Queue', category: 'Communication', description: 'Message Broker', iconName: 'MessageSquare' },
  
  // Networking
  { id: 'network', name: 'Network', category: 'Networking', description: 'Network Boundary', iconName: 'Network' },
  
  // Security
  { id: 'auth', name: 'Auth', category: 'Security', description: 'Authentication/Authorization', iconName: 'Lock' },
  
  // External
  { id: 'external', name: 'External Service', category: 'External', description: 'Third-party API', iconName: 'Globe' },
  { id: 'cloud', name: 'Cloud', category: 'External', description: 'Cloud Provider', iconName: 'Cloud' },
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
    Network
  };
  return icons[iconName] || Box;
};
