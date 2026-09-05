import React from 'react';
import * as LucideIcons from 'lucide-react';
import * as SimpleIcons from 'react-icons/si';
import { IconType } from '@/data/components/types';

interface DynamicIconProps extends React.SVGProps<SVGSVGElement> {
  iconName: string;
  iconType: IconType;
  className?: string;
  strokeWidth?: number;
}

export function DynamicIcon({ iconName, iconType, className, strokeWidth = 2, ...props }: DynamicIconProps) {
  if (iconType === 'si') {
    const SiIcon = (SimpleIcons as any)[iconName];
    if (SiIcon) {
      return <SiIcon className={className} {...props} />;
    }
  }

  // Fallback to Lucide
  const LucideIcon = (LucideIcons as any)[iconName];
  if (LucideIcon) {
    return <LucideIcon className={className} strokeWidth={strokeWidth} {...props} />;
  }

  // Final fallback
  const FallbackIcon = LucideIcons.Box;
  return <FallbackIcon className={className} strokeWidth={strokeWidth} {...props} />;
}
