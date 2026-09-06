import React from 'react';
import { LucideIconMap, SimpleIconMap } from './IconMap';
import { Box } from 'lucide-react';
import { IconType } from '@/data/components/types';

interface DynamicIconProps extends React.SVGProps<SVGSVGElement> {
  iconName: string;
  iconType: IconType;
  className?: string;
  strokeWidth?: number;
}

export const DynamicIcon = React.memo(function DynamicIcon({ iconName, iconType, className, strokeWidth = 2, ...props }: DynamicIconProps) {
  if (iconType === 'si') {
    const SiIcon = SimpleIconMap[iconName];
    if (SiIcon) {
      return <SiIcon className={className} {...props} />;
    }
  }

  // Fallback to Lucide
  const LucideIcon = LucideIconMap[iconName];
  if (LucideIcon) {
    return <LucideIcon className={className} strokeWidth={strokeWidth} {...props} />;
  }

  // Final fallback
  return <Box className={className} strokeWidth={strokeWidth} {...props} />;
});
