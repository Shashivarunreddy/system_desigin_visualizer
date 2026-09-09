"use client";

import { TopToolbar } from '@/components/toolbar/TopToolbar';
import { ComponentSidebar } from '@/components/sidebar/ComponentSidebar';
import { PropertiesPanel } from "@/components/properties/PropertiesPanel";
import dynamic from 'next/dynamic';
const Canvas = dynamic(() => import('@/components/canvas/Canvas').then(mod => mod.Canvas), { ssr: false, loading: () => <div className="flex-1 flex items-center justify-center bg-muted/10 h-full w-full relative"><span className="text-muted-foreground animate-pulse text-sm">Loading Canvas...</span></div> });
import { CommandPalette } from '@/components/sidebar/CommandPalette';

export default function Home() {
  return (
    <div className="flex flex-col h-screen overflow-hidden bg-background">
      <h1 className="sr-only">System Design Visualizer - Drag and Drop Cloud Architecture</h1>
      <TopToolbar />
      <CommandPalette />
      <div className="flex flex-1 h-[calc(100vh-3.5rem)]">
        <ComponentSidebar />
        <Canvas />
        <PropertiesPanel />
      </div>
    </div>
  );
}
