import { TopToolbar } from '@/components/toolbar/TopToolbar';
import { ComponentSidebar } from '@/components/sidebar/ComponentSidebar';
import { PropertiesPanel } from "@/components/properties/PropertiesPanel";
import { Canvas } from '@/components/canvas/Canvas';

export default function Home() {
  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-background">
      <TopToolbar />
      <div className="flex flex-1 overflow-hidden">
        <ComponentSidebar />
        <Canvas />
        <PropertiesPanel />
      </div>
    </div>
  );
}
