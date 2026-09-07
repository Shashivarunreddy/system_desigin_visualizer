# Graph Report - system-design-editor  (2026-09-07)

## Corpus Check
- 57 files · ~19,013 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 254 nodes · 418 edges · 22 communities (14 shown, 8 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 2 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `9784358c`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- devDependencies
- compilerOptions
- dependencies
- registry.ts
- FloatingEdge.tsx
- layout.tsx
- useDiagramStore
- eslint.config.mjs
- next.config.ts
- postcss.config.mjs
- components.json
- README.md
- button.tsx
- AGENTS.md
- rules/graphify.md
- workflows/graphify.md
- GEMINI.md
- Canvas.tsx

## God Nodes (most connected - your core abstractions)
1. `BaseNode` - 16 edges
2. `compilerOptions` - 16 edges
3. `DynamicIcon` - 14 edges
4. `useDiagramStore` - 13 edges
5. `SystemNodeData` - 12 edges
6. `getComponent()` - 9 edges
7. `SystemComponent` - 9 edges
8. `PropertiesPanel()` - 7 edges
9. `include` - 7 edges
10. `tailwind` - 6 edges

## Surprising Connections (you probably didn't know these)
- `BaseNode` --calls--> `getComponent()`  [EXTRACTED]
  components/nodes/BaseNode.tsx → data/components/registry.ts
- `BaseNode` --calls--> `getTechnologiesForRole()`  [EXTRACTED]
  components/nodes/BaseNode.tsx → data/components/registry.ts
- `BaseNode` --calls--> `useDiagramStore`  [EXTRACTED]
  components/nodes/BaseNode.tsx → store/diagramStore.ts
- `FlowCanvas()` --calls--> `getComponent()`  [EXTRACTED]
  components/canvas/Canvas.tsx → data/components/registry.ts
- `FlowCanvas()` --calls--> `getConnectedSystem()`  [EXTRACTED]
  components/canvas/Canvas.tsx → lib/architecture/graph.ts

## Import Cycles
- None detected.

## Communities (22 total, 8 thin omitted)

### Community 0 - "devDependencies"
Cohesion: 0.08
Nodes (25): eslint, eslint-config-next, devDependencies, eslint, eslint-config-next, tailwindcss, @tailwindcss/postcss, @types/node (+17 more)

### Community 1 - "compilerOptions"
Cohesion: 0.07
Nodes (28): dom, dom.iterable, esnext, **/*.mts, .next/dev/types/**/*.ts, next-env.d.ts, .next/types/**/*.ts, node_modules (+20 more)

### Community 2 - "dependencies"
Cohesion: 0.06
Nodes (33): @base-ui/react, class-variance-authority, clsx, cn, html-to-image, lucide-react, next, next-themes (+25 more)

### Community 3 - "registry.ts"
Cohesion: 0.15
Nodes (13): APPLICATION_COMPONENTS, COMPUTE_COMPONENTS, DATABASE_COMPONENTS, EXTENDED_COMPONENTS, MESSAGING_COMPONENTS, OTHER_COMPONENTS, ComponentCategory, SystemComponent (+5 more)

### Community 4 - "FloatingEdge.tsx"
Cohesion: 0.26
Nodes (12): CustomEdge(), CustomEdgeData, CustomEdgeData, FloatingEdge(), EdgeDirection, EdgeStyleType, RELATIONSHIP_REGISTRY, RelationshipType (+4 more)

### Community 5 - "layout.tsx"
Cohesion: 0.29
Nodes (5): geistMono, geistSans, metadata, viewport, ThemeProvider()

### Community 7 - "useDiagramStore"
Cohesion: 0.15
Nodes (19): Canvas(), FlowCanvas(), getId(), PropertiesPanel(), CommandPalette(), ComponentSidebar(), SidebarItem, ThemeToggle() (+11 more)

### Community 11 - "components.json"
Cohesion: 0.09
Nodes (21): aliases, components, hooks, lib, ui, utils, iconLibrary, menuAccent (+13 more)

### Community 19 - "README.md"
Cohesion: 0.50
Nodes (3): Deploy on Vercel, Getting Started, Learn More

### Community 31 - "Canvas.tsx"
Cohesion: 0.17
Nodes (22): edgeTypes, nodeTypes, ApiNode, ApplicationNode, BaseNode, BaseNodeProps, DatabaseNode, ExternalNode (+14 more)

## Knowledge Gaps
- **100 isolated node(s):** `geistSans`, `geistMono`, `viewport`, `metadata`, `$schema` (+95 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **8 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `dependencies` connect `dependencies` to `devDependencies`?**
  _High betweenness centrality (0.041) - this node is a cross-community bridge._
- **Why does `getComponent()` connect `useDiagramStore` to `registry.ts`, `Canvas.tsx`?**
  _High betweenness centrality (0.015) - this node is a cross-community bridge._
- **What connects `geistSans`, `geistMono`, `viewport` to the rest of the system?**
  _100 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `devDependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.07692307692307693 - nodes in this community are weakly interconnected._
- **Should `compilerOptions` be split into smaller, more focused modules?**
  _Cohesion score 0.06896551724137931 - nodes in this community are weakly interconnected._
- **Should `dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.06060606060606061 - nodes in this community are weakly interconnected._
- **Should `registry.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.1476923076923077 - nodes in this community are weakly interconnected._