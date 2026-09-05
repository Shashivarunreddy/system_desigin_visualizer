import { SystemComponent } from '../types';

export const COMPUTE_COMPONENTS: SystemComponent[] = [
  {
    id: 'server-generic',
    name: 'Generic Server',
    category: 'Compute',
    description: 'Physical or Virtual Server',
    iconName: 'Server',
    iconType: 'lucide',
    visualType: 'server',
    role: 'compute',
    tags: ['server', 'vm']
  },
  {
    id: 'server-ec2',
    name: 'Amazon EC2',
    category: 'Compute',
    description: 'Virtual Server in AWS',
    iconName: 'SiAmazonec2',
    iconType: 'si',
    visualType: 'server',
    role: 'compute',
    technology: 'EC2',
    provider: 'AWS',
    tags: ['aws', 'vm', 'server']
  },
  {
    id: 'container-docker',
    name: 'Docker',
    category: 'Compute',
    description: 'Container Engine',
    iconName: 'SiDocker',
    iconType: 'si',
    visualType: 'server',
    role: 'compute',
    technology: 'Docker',
    tags: ['container']
  },
  {
    id: 'serverless-lambda',
    name: 'AWS Lambda',
    category: 'Compute',
    description: 'Serverless Compute',
    iconName: 'SiAwslambda',
    iconType: 'si',
    visualType: 'server',
    role: 'compute',
    technology: 'Lambda',
    provider: 'AWS',
    tags: ['serverless', 'function', 'aws']
  }
];
