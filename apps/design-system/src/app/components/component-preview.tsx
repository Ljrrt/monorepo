import { Suspense, lazy, useState } from 'react';

type ComponentPreviewProps = {
  name: string;
};

export function ComponentPreview({ name }: ComponentPreviewProps) {
  const [showCode, setShowCode] = useState(false);

  // Dynamically import from examples folder
  const Example = lazy(() => import(`../examples/${name}.tsx`));

  return (
    <div className="border-neutral-6 my-6 overflow-hidden rounded-lg border">
      {/* Preview area */}
      <div className="bg-neutral-2 p-6">
        <Suspense fallback={<div className="text-neutral-10">Loading...</div>}>
          <Example />
        </Suspense>
      </div>

      {/* Toolbar */}
      <div className="bg-neutral-3 border-neutral-6 flex items-center justify-between border-t px-4 py-2">
        <span className="typo-1 text-neutral-10">{name}</span>
        <button
          onClick={() => setShowCode(!showCode)}
          className="typo-1 text-neutral-11 hover:text-neutral-12 cs-transition"
        >
          {showCode ? 'Hide code' : 'Show code'}
        </button>
      </div>

      {/* Code area (optional) */}
      {showCode && (
        <div className="bg-neutral-1 border-neutral-6 border-t p-4">
          <pre className="typo-1 text-neutral-10 overflow-x-auto">
            {/* You can fetch the raw source here later */}
            <code>
              See: examples/
              {name}
              .tsx
            </code>
          </pre>
        </div>
      )}
    </div>
  );
}
