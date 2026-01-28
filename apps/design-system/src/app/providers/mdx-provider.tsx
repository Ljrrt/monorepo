import { ReactNode }                    from 'react';
import { MDXProvider as MDXJSProvider } from '@mdx-js/react';
import type { MDXComponents }           from 'mdx/types';

import { ComponentPreview } from 'app/components/component-preview';

const components: MDXComponents = {
  ComponentPreview,
  h1:   props => <h1 className="typo-header text-neutral-12 mb-6 text-4xl" {...props} />,
  h2:   props => <h2 className="typo-header text-neutral-12 mt-10 mb-4 text-2xl" {...props} />,
  h3:   props => <h3 className="typo-header text-neutral-11 mt-6 mb-3 text-xl" {...props} />,
  p:    props => <p className="typo-body text-neutral-10 mb-4 leading-relaxed" {...props} />,
  code: props => <code className="bg-neutral-3 text-accent-11 rounded px-1.5 py-0.5 text-sm" {...props} />,
  pre:  props => (
    <pre className="bg-neutral-1 border-neutral-6 typo-1 text-neutral-11 my-4 overflow-x-auto rounded-lg border p-4" {...props} />
  ),
  table: props => <table className="my-6 w-full border-collapse" {...props} />,
  thead: props => <thead className="bg-neutral-3" {...props} />,
  tr:    props => <tr className="border-neutral-6 border-b last:border-0" {...props} />,
  tbody: props => <tbody {...props} />,
  th:    props => <th className="bg-neutral-3 border-neutral-6 typo-2 text-neutral-11 border p-3 text-left" {...props} />,
  td:    props => <td className="border-neutral-6 typo-2 text-neutral-10 border p-3" {...props} />,
  ul:    props => <ul className="text-neutral-10 mb-4 list-inside list-disc" {...props} />,
  li:    props => <li className="mb-1" {...props} />,
};

interface Properties {
  children: ReactNode;
}

export function MDXProvider(properties: Properties) {
  const { children } = properties;

  return (
    <MDXJSProvider components={components}>
      {children}
    </MDXJSProvider>
  );
}
