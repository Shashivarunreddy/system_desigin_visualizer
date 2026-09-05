import { SystemComponent } from '../types';

export const OTHER_COMPONENTS: SystemComponent[] = [
  // People
  { id: 'user', name: 'User', category: 'People', description: 'System User', iconName: 'User', iconType: 'lucide', visualType: 'person', role: 'actor' },
  { id: 'client', name: 'Client', category: 'People', description: 'Client Application', iconName: 'Monitor', iconType: 'lucide', visualType: 'person', role: 'actor' },
  
  // Storage
  { id: 'storage-generic', name: 'Data Store', category: 'Data', description: 'File/Blob Storage', iconName: 'HardDrive', iconType: 'lucide', visualType: 'database', role: 'storage', tags: ['storage', 'file', 'blob'] },
  { id: 'storage-s3', name: 'Amazon S3', category: 'Data', description: 'Object Storage', iconName: 'SiAmazons3', iconType: 'si', visualType: 'database', role: 'storage', technology: 'S3', provider: 'AWS', tags: ['aws', 'object', 'blob'] },
  
  // Communication / API
  { id: 'api-generic', name: 'API', category: 'Communication', description: 'Application Programming Interface', iconName: 'ArrowRightLeft', iconType: 'lucide', visualType: 'api', role: 'communication' },
  
  // Networking
  { id: 'network-generic', name: 'Network', category: 'Networking', description: 'Network Boundary', iconName: 'Network', iconType: 'lucide', visualType: 'network', role: 'network' },
  { id: 'gateway-generic', name: 'Gateway', category: 'Networking', description: 'API Gateway or Entrypoint', iconName: 'Waypoints', iconType: 'lucide', visualType: 'gateway', role: 'network' },
  
  // Security
  { id: 'auth-generic', name: 'Auth', category: 'Security', description: 'Authentication/Authorization', iconName: 'Lock', iconType: 'lucide', visualType: 'security', role: 'security' },
  { id: 'auth-auth0', name: 'Auth0', category: 'Security', description: 'Identity Provider', iconName: 'SiAuth0', iconType: 'si', visualType: 'security', role: 'security', technology: 'Auth0', tags: ['identity', 'iam'] },
  
  // External
  { id: 'external-generic', name: 'External Service', category: 'External', description: 'Third-party API', iconName: 'Globe', iconType: 'lucide', visualType: 'external', role: 'external' },
  { id: 'cloud-generic', name: 'Cloud', category: 'External', description: 'Cloud Provider', iconName: 'Cloud', iconType: 'lucide', visualType: 'external', role: 'external' },
  { id: 'external-stripe', name: 'Stripe', category: 'External', description: 'Payment Gateway', iconName: 'SiStripe', iconType: 'si', visualType: 'external', role: 'external', technology: 'Stripe', tags: ['payment', 'billing'] }
];
