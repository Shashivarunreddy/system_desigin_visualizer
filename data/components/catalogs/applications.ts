import { SystemComponent } from '../types';

export const APPLICATION_COMPONENTS: SystemComponent[] = [
  {
    id: 'app-generic',
    name: 'Generic Application',
    category: 'Applications',
    description: 'Software Application',
    iconName: 'Box',
    iconType: 'lucide',
    visualType: 'application',
    role: 'application',
    tags: ['app', 'software']
  },
  {
    id: 'service-generic',
    name: 'Generic Service',
    category: 'Applications',
    description: 'Microservice or Service',
    iconName: 'Cpu',
    iconType: 'lucide',
    visualType: 'application',
    role: 'service',
    tags: ['service', 'microservice']
  },
  {
    id: 'app-react',
    name: 'React',
    category: 'Applications',
    description: 'Frontend Library',
    iconName: 'SiReact',
    iconType: 'si',
    visualType: 'application',
    role: 'application',
    technology: 'React',
    tags: ['frontend', 'ui']
  },
  {
    id: 'app-nextjs',
    name: 'Next.js',
    category: 'Applications',
    description: 'React Framework',
    iconName: 'SiNextdotjs',
    iconType: 'si',
    visualType: 'application',
    role: 'application',
    technology: 'Next.js',
    tags: ['frontend', 'react', 'ssr']
  },
  {
    id: 'app-nodejs',
    name: 'Node.js',
    category: 'Applications',
    description: 'JavaScript Runtime',
    iconName: 'SiNodedotjs',
    iconType: 'si',
    visualType: 'application',
    role: 'service',
    technology: 'Node.js',
    tags: ['backend', 'js']
  },
  {
    id: 'app-python',
    name: 'Python',
    category: 'Applications',
    description: 'Python Application/Service',
    iconName: 'SiPython',
    iconType: 'si',
    visualType: 'application',
    role: 'service',
    technology: 'Python',
    tags: ['backend']
  }
];
