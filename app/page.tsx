import { TopToolbar } from '@/components/toolbar/TopToolbar';
import { ComponentSidebar } from '@/components/sidebar/ComponentSidebar';
import { PropertiesPanel } from "@/components/properties/PropertiesPanel";
import { Canvas } from '@/components/canvas/Canvas';

export default function Home() {
  return (
    <div className="flex flex-col h-screen overflow-hidden bg-background">
      <h1 className="sr-only">System Design Visualizer - Drag and Drop Cloud Architecture</h1>
      <TopToolbar />
      <div className="flex flex-1 h-[calc(100vh-3.5rem)]">
        <ComponentSidebar />
        <Canvas />
        <PropertiesPanel />
      </div>
    </div>
  );
}
