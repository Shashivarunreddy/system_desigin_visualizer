# System Design Visualizer

An intuitive, drag-and-drop cloud architecture diagramming tool built for developers. Design complex distributed systems, microservices, and cloud topologies with ease, speed, and precision.

> **Status:** Active Development — [Contributions Welcome!](#-contributing)

---

## Features

- **Drag & Drop Canvas**: Built on top of React Flow, offering a buttery smooth, interactive, and zoomable canvas.
- **Rich Component Library**: Includes 100+ generic and technology-specific components (Databases, Compute, Messaging, Applications).
- **Full-Color Tech Logos**: Automatic rendering of full-color brand SVG logos (powered by simpleicons & devicon) when specific technologies like Postgres, AWS DynamoDB, Kafka, or React are selected.
- **Command Palette (`Ctrl+K`)**: Lightning-fast keyboard navigation to search and insert components instantly onto your canvas.
- **Live Properties Panel**: Dynamically edit node labels, roles, specific technologies, and underlying infrastructure details.
- **Exporting Options**: Export your masterpiece as a high-quality PNG image for presentations or JSON for sharing and version control.
- **Dark Mode Native**: A sleek, premium developer-focused UI using Slate and Indigo accents.

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **UI & Styling**: React, [Tailwind CSS](https://tailwindcss.com/)
- **Canvas Engine**: [React Flow (@xyflow/react)](https://reactflow.dev/)
- **State Management**: [Zustand](https://zustand-demo.pmnd.rs/) (with persistent local storage)
- **Icons**: [Lucide React](https://lucide.dev/), Simple Icons, and Devicon CDNs
- **Exporting**: `html-to-image`

## Getting Started

### Prerequisites
Make sure you have Node.js (v18+) installed.

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Shashivarunreddy/system_desigin_visualizer.git
   cd system_desigin_visualizer
   ```

2. **Install dependencies:**
   ```bash
   npm install
   # or yarn / pnpm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Contributing

We would absolutely love for you to contribute! Whether it's adding new technologies to the component registry, improving the UI, or optimizing the canvas logic, this project is open for collaboration.

### How to Collaborate

1. **Fork the repo** and create your branch from `main`.
2. **If you've added code**, ensure your code follows the existing Tailwind + React patterns. 
3. **If you want to add a new technology**, check out `data/components/catalogs` (it's extremely easy to add a new JSON object to the registry!).
4. **Open a Pull Request** with a clear description of what you've added or fixed.

### Roadmap / Good First Issues
- [ ] Add Collaborative Multiplayer Editing (e.g., using Yjs or Liveblocks).
- [ ] Support more export formats (SVG, PDF).
- [ ] Implement automatic layout arrangement algorithms.
- [ ] Add connection styling (dashed lines, animated flows for data).

## License

This project is licensed under the MIT License - see the LICENSE file for details.
