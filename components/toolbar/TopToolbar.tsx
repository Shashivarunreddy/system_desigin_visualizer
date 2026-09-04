import React from 'react';
import { ThemeToggle } from '@/components/theme-toggle';

export function TopToolbar() {
  return (
    <div className="h-14 border-b flex items-center px-4 bg-background z-10 sticky top-0">
      <div className="font-semibold text-lg">System Design Visualizer</div>
      <div className="ml-auto flex items-center space-x-2">
        <ThemeToggle />
      </div>
    </div>
  );
}
