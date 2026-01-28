interface Properties {
  title:     string;
  subtitle?: string;
}

export function DocumentHeader({ title, subtitle }: Properties) {
  return (
    <header className="mb-10 flex flex-col gap-4">
      <h1 className="typo-header typo-8 text-neutral-12">{title}</h1>
      {
        subtitle &&
        <p className="typo-body typo-3 text-neutral-11">{subtitle}</p>
      }
    </header>
  );
}
