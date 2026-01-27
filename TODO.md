# Design System Documentation Structure

## Folder Structure

packages/ui/
└── src/
├── ui/
│   ├── spinner.tsx           # Component
│   ├── spinner.mdx           # Docs (colocated)
│   ├── icon.tsx
│   ├── icon.mdx
│   └── ...
├── effects/
│   ├── marquee.tsx
│   ├── marquee.mdx
│   ├── text-shimmer.tsx
│   ├── text-shimmer.mdx
│   └── ...
├── hooks/
│   ├── use-timer.tsx
│   ├── use-timer.mdx
│   └── ...
├── providers/
│   ├── theme-provider.tsx
│   ├── theme-provider.mdx
│   └── ...
└── index.ts

apps/design-system/
├── src/
│   ├── pages/                    # React Router pages
│   │   ├── docs/
│   │   │   └── [slug].tsx        # Renders MDX
│   │   └── index.tsx
│   ├── components/               # Docs site components
│   │   ├── component-preview.tsx # Renders live demos
│   │   ├── code-tabs.tsx         # Install tabs
│   │   └── props-table.tsx       # Props display
│   ├── examples/                 # All demo variations
│   │   ├── spinner-demo.tsx
│   │   ├── spinner-sizes.tsx
│   │   ├── spinner-types.tsx
│   │   ├── marquee-demo.tsx
│   │   └── ...
│   └── mdx-components.tsx        # Maps <ComponentPreview>, etc.
├── vite.config.ts                # MDX plugin config
└── package.json



---

## MDX Template

Each component has a colocated `.mdx` file:

```mdx
---
title: Spinner
description: A loading indicator with multiple animation styles.
---

<ComponentPreview name="spinner-demo" />

## Installation

\`\`\`bash
npm install @monorepo/ui
\`\`\`

## Usage

\`\`\`tsx
import { Spinner } from "@monorepo/ui"

<Spinner type="dotSpinner" size={40} />
\`\`\`

## API Reference

| Prop | Type | Default |
|------|------|---------|
| `type` | `SpinnerTypes` | `"dotSpinner"` |
| `size` | `number` | `24` |

## Examples

### Sizes
<ComponentPreview name="spinner-sizes" />

### Types
<ComponentPreview name="spinner-types" />
Example Files
Each example is a simple React component in apps/design-system/src/examples/:


// examples/spinner-demo.tsx
import { Spinner } from "@monorepo/ui"

export default function SpinnerDemo() {
  return <Spinner type="dotSpinner" size={40} />
}

// examples/spinner-sizes.tsx
import { Spinner } from "@monorepo/ui"

export default function SpinnerSizes() {
  return (
    <div className="flex items-center gap-4">
      <Spinner size={16} />
      <Spinner size={24} />
      <Spinner size={32} />
      <Spinner size={48} />
    </div>
  )
}
Setup Steps
Add MDX support to Vite (@mdx-js/rollup)
Configure Vite to read .mdx from packages/ui/src/
Create mdx-components.tsx mapping custom components
Build ComponentPreview to load examples dynamically
Write first .mdx as template
Create corresponding example files
Repeat for each component/effect/hook
Key Decisions
Decision	Choice
Doc format	.mdx
Doc location	Colocated with components
Examples location	apps/design-system/src/examples/
Distribution	Package import
Registry	Not needed
Framework	React + Vite

