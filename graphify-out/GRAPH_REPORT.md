# Graph Report - system-design-editor  (2026-09-04)

## Corpus Check
- 27 files · ~3,648 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 162 nodes · 174 edges · 19 communities (11 shown, 8 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 2 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `0c1bc9c1`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- devDependencies
- compilerOptions
- dependencies
- include
- package.json
- layout.tsx
- page.tsx
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
1. `compilerOptions` - 16 edges
2. `useDiagramStore` - 7 edges
3. `include` - 7 edges
4. `tailwind` - 6 edges
5. `aliases` - 6 edges
6. `getIconComponent()` - 5 edges
7. `scripts` - 5 edges
8. `lib` - 4 edges
9. `FlowCanvas()` - 3 edges
10. `SystemNode()` - 3 edges

## Surprising Connections (you probably didn't know these)
- `FlowCanvas()` --calls--> `useDiagramStore`  [EXTRACTED]
  components/canvas/Canvas.tsx → store/diagramStore.ts
- `SystemNode()` --calls--> `getIconComponent()`  [EXTRACTED]
  components/nodes/SystemNode.tsx → data/components.ts
- `PropertiesPanel()` --calls--> `useDiagramStore`  [EXTRACTED]
  components/properties/PropertiesPanel.tsx → store/diagramStore.ts
- `ComponentSidebar()` --calls--> `getIconComponent()`  [EXTRACTED]
  components/sidebar/ComponentSidebar.tsx → data/components.ts
- `TopToolbar()` --calls--> `useDiagramStore`  [EXTRACTED]
  components/toolbar/TopToolbar.tsx → store/diagramStore.ts

## Import Cycles
- None detected.

## Communities (19 total, 8 thin omitted)

### Community 0 - "devDependencies"
Cohesion: 0.12
Nodes (17): eslint, eslint-config-next, devDependencies, eslint, eslint-config-next, tailwindcss, @tailwindcss/postcss, @types/node (+9 more)

### Community 1 - "compilerOptions"
Cohesion: 0.11
Nodes (19): dom, dom.iterable, esnext, compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules (+11 more)

### Community 2 - "dependencies"
Cohesion: 0.08
Nodes (25): @base-ui/react, class-variance-authority, cn, lucide-react, next, next-themes, dependencies, @base-ui/react (+17 more)

### Community 3 - "include"
Cohesion: 0.20
Nodes (9): **/*.mts, .next/dev/types/**/*.ts, next-env.d.ts, .next/types/**/*.ts, node_modules, **/*.ts, **/*.tsx, exclude (+1 more)

### Community 4 - "package.json"
Cohesion: 0.22
Nodes (8): name, private, scripts, build, dev, lint, start, version

### Community 5 - "layout.tsx"
Cohesion: 0.33
Nodes (4): geistMono, geistSans, metadata, ThemeProvider()

### Community 7 - "page.tsx"
Cohesion: 0.26
Nodes (7): Canvas(), PropertiesPanel(), ThemeToggle(), TopToolbar(), DiagramState, Tool, useDiagramStore

### Community 11 - "components.json"
Cohesion: 0.09
Nodes (21): aliases, components, hooks, lib, ui, utils, iconLibrary, menuAccent (+13 more)

### Community 19 - "README.md"
Cohesion: 0.50
Nodes (3): Deploy on Vercel, Getting Started, Learn More

### Community 31 - "Canvas.tsx"
Cohesion: 0.18
Nodes (12): edgeTypes, FlowCanvas(), getId(), nodeTypes, CustomEdge(), SystemNode(), SystemNodeData, ComponentSidebar() (+4 more)

## Knowledge Gaps
- **89 isolated node(s):** `geistSans`, `geistMono`, `metadata`, `$schema`, `style` (+84 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **8 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `dependencies` connect `dependencies` to `package.json`?**
  _High betweenness centrality (0.069) - this node is a cross-community bridge._
- **Why does `devDependencies` connect `devDependencies` to `package.json`?**
  _High betweenness centrality (0.051) - this node is a cross-community bridge._
- **Why does `compilerOptions` connect `compilerOptions` to `include`?**
  _High betweenness centrality (0.025) - this node is a cross-community bridge._
- **What connects `geistSans`, `geistMono`, `metadata` to the rest of the system?**
  _89 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `devDependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.11764705882352941 - nodes in this community are weakly interconnected._
- **Should `compilerOptions` be split into smaller, more focused modules?**
  _Cohesion score 0.10526315789473684 - nodes in this community are weakly interconnected._
- **Should `dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.08 - nodes in this community are weakly interconnected._