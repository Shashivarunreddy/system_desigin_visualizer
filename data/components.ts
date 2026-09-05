export * from './components/types';
export * from './components/registry';

// We provide a fallback getIconComponent to avoid breaking old imports 
// that might still rely on it for now.
import * as LucideIcons from 'lucide-react';
export const getIconComponent = (iconName: string): React.ElementType => {
  const Icon = (LucideIcons as any)[iconName];
  return Icon || LucideIcons.Box;
};
