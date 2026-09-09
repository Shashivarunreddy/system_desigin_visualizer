# Graph Report - system-design-editor  (2026-09-09)

## Corpus Check
- 47 files · ~31,385 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 241 nodes · 335 edges · 23 communities (15 shown, 8 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 2 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `973d14cd`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- devDependencies
- compilerOptions
- dependencies
- registry.ts
- FloatingEdge.tsx
- layout.tsx
- Canvas.tsx
- eslint.config.mjs
- next.config.ts
- postcss.config.mjs
- components.json
- include
- System Design Visualizer
- button.tsx
- AGENTS.md
- rules/graphify.md
- workflows/graphify.md
- GEMINI.md
- BaseNode.tsx

## God Nodes (most connected - your core abstractions)
1. `compilerOptions` - 16 edges
2. `useDiagramStore` - 13 edges
3. `getComponent()` - 9 edges
4. `SystemComponent` - 9 edges
5. `PropertiesPanel()` - 7 edges
6. `include` - 7 edges
7. `tailwind` - 6 edges
8. `aliases` - 6 edges
9. `BaseNode` - 6 edges
10. `System Design Visualizer` - 6 edges

## Surprising Connections (you probably didn't know these)
- `BaseNode` --calls--> `getComponent()`  [EXTRACTED]
  components/nodes/BaseNode.tsx → data/components/registry.ts
- `BaseNode` --calls--> `useDiagramStore`  [EXTRACTED]
  components/nodes/BaseNode.tsx → store/diagramStore.ts
- `PropertiesPanel()` --calls--> `getTechnologiesForRole()`  [EXTRACTED]
  components/properties/PropertiesPanel.tsx → data/components/registry.ts
- `FlowCanvas()` --calls--> `getComponent()`  [EXTRACTED]
  components/canvas/Canvas.tsx → data/components/registry.ts
- `FlowCanvas()` --calls--> `getConnectedSystem()`  [EXTRACTED]
  components/canvas/Canvas.tsx → lib/architecture/graph.ts

## Import Cycles
- None detected.

## Communities (23 total, 8 thin omitted)

### Community 0 - "devDependencies"
Cohesion: 0.08
Nodes (25): eslint, eslint-config-next, devDependencies, eslint, eslint-config-next, tailwindcss, @tailwindcss/postcss, @types/node (+17 more)

### Community 1 - "compilerOptions"
Cohesion: 0.11
Nodes (19): dom, dom.iterable, esnext, compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules (+11 more)

### Community 2 - "dependencies"
Cohesion: 0.06
Nodes (33): @base-ui/react, class-variance-authority, clsx, cn, html-to-image, lucide-react, next, next-themes (+25 more)

### Community 3 - "registry.ts"
Cohesion: 0.16
Nodes (13): APPLICATION_COMPONENTS, COMPUTE_COMPONENTS, DATABASE_COMPONENTS, EXTENDED_COMPONENTS, MESSAGING_COMPONENTS, OTHER_COMPONENTS, ComponentCategory, SystemComponent (+5 more)

### Community 4 - "FloatingEdge.tsx"
Cohesion: 0.29
Nodes (11): CustomEdgeData, CustomEdgeData, FloatingEdge(), EdgeDirection, EdgeStyleType, RELATIONSHIP_REGISTRY, RelationshipType, SystemRelationship (+3 more)

### Community 5 - "layout.tsx"
Cohesion: 0.29
Nodes (5): geistMono, geistSans, metadata, viewport, ThemeProvider()

### Community 7 - "Canvas.tsx"
Cohesion: 0.13
Nodes (21): Canvas(), edgeTypes, FlowCanvas(), getId(), nodeTypes, CustomEdge(), PropertiesPanel(), CommandPalette() (+13 more)

### Community 11 - "components.json"
Cohesion: 0.09
Nodes (21): aliases, components, hooks, lib, ui, utils, iconLibrary, menuAccent (+13 more)

### Community 14 - "include"
Cohesion: 0.20
Nodes (9): **/*.mts, .next/dev/types/**/*.ts, next-env.d.ts, .next/types/**/*.ts, node_modules, **/*.ts, **/*.tsx, exclude (+1 more)

### Community 19 - "System Design Visualizer"
Cohesion: 0.18
Nodes (10): Contributing, Features, Getting Started, How to Collaborate, Installation, License, Prerequisites, Roadmap / Good First Issues (+2 more)

### Community 31 - "BaseNode.tsx"
Cohesion: 0.21
Nodes (11): BaseNode, BaseNodeProps, SystemNodeData, UniversalNode, DynamicIcon, DynamicIconProps, LucideIconMap, SimpleIconMap (+3 more)

## Knowledge Gaps
- **104 isolated node(s):** `geistSans`, `geistMono`, `viewport`, `metadata`, `$schema` (+99 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **8 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `dependencies` connect `dependencies` to `devDependencies`?**
  _High betweenness centrality (0.046) - this node is a cross-community bridge._
- **Why does `getComponent()` connect `Canvas.tsx` to `registry.ts`, `BaseNode.tsx`?**
  _High betweenness centrality (0.014) - this node is a cross-community bridge._
- **What connects `geistSans`, `geistMono`, `viewport` to the rest of the system?**
  _104 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `devDependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.07692307692307693 - nodes in this community are weakly interconnected._
- **Should `compilerOptions` be split into smaller, more focused modules?**
  _Cohesion score 0.10526315789473684 - nodes in this community are weakly interconnected._
- **Should `dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.06060606060606061 - nodes in this community are weakly interconnected._
- **Should `Canvas.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.13257575757575757 - nodes in this community are weakly interconnected._