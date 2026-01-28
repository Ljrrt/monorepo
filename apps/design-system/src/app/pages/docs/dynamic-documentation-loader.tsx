import { useParams }      from 'react-router-dom';
import { Suspense, lazy } from 'react';

export function DynamicDocumentationLoader() {
  const { slug } = useParams<{ slug: string; }>();

  const MDXContent = lazy(() => import(`@monorepo/ui/src/components/base-ui/${slug}.mdx`));

  return (
    <Suspense fallback={<div className="text-neutral-10">Loading...</div>}>
      <MDXContent />
    </Suspense>
  );
}
