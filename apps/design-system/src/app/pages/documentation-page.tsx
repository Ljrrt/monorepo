import { DocumentHeader }                                   from 'app/components/document-header';
import { ComponentType, Suspense, lazy, useMemo, useState } from 'react';
import { useParams }                                        from 'react-router-dom';
import { Frontmatter }                                      from 'utils';

const modules = import.meta.glob<{ default: ComponentType; frontmatter?: Frontmatter; }>(
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
  const { slug }                      = useParams<{ slug: string; }>();
  const [frontmatter, setFrontmatter] = useState<Frontmatter | undefined>(undefined);

  const MDXContent = useMemo(() => {
    const loader = modulesBySlug[slug ?? ''];

    if (!loader) return null;

    return lazy(async () => {
      const mod = await loader();
      setFrontmatter(mod.frontmatter ?? undefined);
      return mod;
    });
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
      { frontmatter && <DocumentHeader title={frontmatter.title} subtitle={frontmatter.subtitle} />}
      <MDXContent />
    </Suspense>
  );
}
