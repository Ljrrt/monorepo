import { ComponentType, Suspense, lazy, useMemo } from 'react';
import { useParams }                              from 'react-router-dom';

const modules = import.meta.glob<{ default: ComponentType; }>(
  '../docs/*.mdx',
);

function getSlugFromPath(path: string): string {
  const match = path.match(/\/([^/]+)\.mdx$/);
  return match ? match[1] : '';
}

const modulesBySlug = Object.fromEntries(
  Object.entries(modules).map(([path, loader]) => [getSlugFromPath(path), loader]),
);

export function DocumentationPage() {
  const { slug } = useParams<{ slug: string; }>();

  const MDXContent = useMemo(() => {
    const loader = modulesBySlug[slug ?? ''];
    if (!loader) return null;
    return lazy(loader);
  }, [slug]);

  if (!MDXContent) {
    return (
      <div className="text-error-9">
        Doc not found:
        {slug}
      </div>
    );
  }

  return (
    <Suspense fallback={<div className="text-neutral-10">Loading...</div>}>
      <MDXContent />
    </Suspense>
  );
}
