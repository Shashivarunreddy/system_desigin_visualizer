# Graph Report - system-design-editor  (2026-09-04)

## Corpus Check
- 23 files · ~5,474 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 260 nodes · 248 edges · 33 communities (21 shown, 12 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `5b8334e9`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- devDependencies
- compilerOptions
- dependencies
- include
- package.json
- layout.tsx
- Product Requirements Document (PRD).md
- page.tsx
- eslint.config.mjs
- next.config.ts
- postcss.config.mjs
- components.json
- 58. MVP Scope
- 7. Component Library
- 64. Development Principles
- 5. Target Users
- 11. Canvas Types
- 39. Sharing — Future
- 56. AI — Future Optional Layer
- README.md
- button.tsx
- 1. Product Overview
- AGENTS.md
- rules/graphify.md
- workflows/graphify.md
- GEMINI.md
- 10. Canvas
- 21. Persistence
- 3. Product Goals
- 48. Core User Flow

## God Nodes (most connected - your core abstractions)
1. `compilerOptions` - 16 edges
2. `7. Component Library` - 10 edges
3. `58. MVP Scope` - 10 edges
4. `64. Development Principles` - 9 edges
5. `include` - 7 edges
6. `5. Target Users` - 7 edges
7. `tailwind` - 6 edges
8. `aliases` - 6 edges
9. `scripts` - 5 edges
10. `lib` - 4 edges

## Surprising Connections (you probably didn't know these)
- `FlowCanvas()` --calls--> `useDiagramStore`  [EXTRACTED]
  components/canvas/Canvas.tsx → store/diagramStore.ts

## Import Cycles
- None detected.

## Communities (33 total, 12 thin omitted)

### Community 0 - "devDependencies"
Cohesion: 0.12
Nodes (17): eslint, eslint-config-next, devDependencies, eslint, eslint-config-next, tailwindcss, @tailwindcss/postcss, @types/node (+9 more)

### Community 1 - "compilerOptions"
Cohesion: 0.11
Nodes (19): dom, dom.iterable, esnext, compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules (+11 more)

### Community 2 - "dependencies"
Cohesion: 0.09
Nodes (23): @base-ui/react, class-variance-authority, cn, lucide-react, next, dependencies, @base-ui/react, class-variance-authority (+15 more)

### Community 3 - "include"
Cohesion: 0.20
Nodes (9): **/*.mts, .next/dev/types/**/*.ts, next-env.d.ts, .next/types/**/*.ts, node_modules, **/*.ts, **/*.tsx, exclude (+1 more)

### Community 4 - "package.json"
Cohesion: 0.22
Nodes (8): name, private, scripts, build, dev, lint, start, version

### Community 5 - "layout.tsx"
Cohesion: 0.40
Nodes (3): geistMono, geistSans, metadata

### Community 6 - "Product Requirements Document (PRD).md"
Cohesion: 0.03
Nodes (58): 12. Component Interaction, 13. Drag and Drop, 14. Connections, 15. Connection Semantics, 16. Properties Panel, 17. Diagram Data Model, 18. Node Model, 19. Edge Model (+50 more)

### Community 7 - "page.tsx"
Cohesion: 0.22
Nodes (7): Canvas(), FlowCanvas(), ComponentSidebar(), TopToolbar(), DiagramState, Tool, useDiagramStore

### Community 11 - "components.json"
Cohesion: 0.09
Nodes (21): aliases, components, hooks, lib, ui, utils, iconLibrary, menuAccent (+13 more)

### Community 12 - "58. MVP Scope"
Cohesion: 0.20
Nodes (10): 58. MVP Scope, Canvas, Components, Connections, Editing, File, Image Export, Persistence (+2 more)

### Community 13 - "7. Component Library"
Cohesion: 0.20
Nodes (10): 7.1 People, 7.2 Applications, 7.3 Compute, 7.4 Data, 7.5 Communication, 7.6 Networking, 7.7 Security, 7.8 External (+2 more)

### Community 14 - "64. Development Principles"
Cohesion: 0.22
Nodes (9): 64. Development Principles, Component-driven, Extensible, Local-first, Model-first, Performance-first, Progressive enhancement, Technology-agnostic (+1 more)

### Community 15 - "5. Target Users"
Cohesion: 0.29
Nodes (7): 5.1 Developers, 5.2 System Design Interview Candidates, 5.3 Students, 5.4 Technical Educators, 5.5 Architects and Engineers, 5.6 Consultants, 5. Target Users

### Community 16 - "11. Canvas Types"
Cohesion: 0.50
Nodes (4): 11. Canvas Types, Fixed Canvas, Infinite Canvas, Orientation

### Community 17 - "39. Sharing — Future"
Cohesion: 0.50
Nodes (4): 39. Sharing — Future, Cloud Sharing, File Sharing, URL Sharing

### Community 18 - "56. AI — Future Optional Layer"
Cohesion: 0.50
Nodes (4): 56. AI — Future Optional Layer, Diagram → Documentation, Diagram → Explanation, Natural Language → Diagram

### Community 19 - "README.md"
Cohesion: 0.50
Nodes (3): Deploy on Vercel, Getting Started, Learn More

### Community 21 - "1. Product Overview"
Cohesion: 0.67
Nodes (3): 1.1 Product Name, 1.2 Product Vision, 1. Product Overview

## Knowledge Gaps
- **189 isolated node(s):** `geistSans`, `geistMono`, `metadata`, `$schema`, `style` (+184 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **12 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `7. Component Library` connect `7. Component Library` to `Product Requirements Document (PRD).md`?**
  _High betweenness centrality (0.030) - this node is a cross-community bridge._
- **Why does `58. MVP Scope` connect `58. MVP Scope` to `Product Requirements Document (PRD).md`?**
  _High betweenness centrality (0.030) - this node is a cross-community bridge._
- **Why does `64. Development Principles` connect `64. Development Principles` to `Product Requirements Document (PRD).md`?**
  _High betweenness centrality (0.027) - this node is a cross-community bridge._
- **What connects `geistSans`, `geistMono`, `metadata` to the rest of the system?**
  _189 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `devDependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.11764705882352941 - nodes in this community are weakly interconnected._
- **Should `compilerOptions` be split into smaller, more focused modules?**
  _Cohesion score 0.10526315789473684 - nodes in this community are weakly interconnected._
- **Should `dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.08695652173913043 - nodes in this community are weakly interconnected._