import { Outlet } from 'react-router-dom';

import { MDXProvider } from 'app/providers/mdx-provider';

export function DocumentationLayout() {
  return (
    <MDXProvider>
      <div className="mx-auto max-w-3xl px-6 py-10">
        <Outlet />
      </div>
    </MDXProvider>
  );
}
