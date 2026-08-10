type SectionHeadingProps = {
  title: string;
  id: string;
};

export function SectionHeading({ title, id }: SectionHeadingProps) {
  return (
    <header className="border-b border-rule pb-4">
      <h2
        id={id}
        className="font-display text-3xl leading-tight font-medium tracking-[-0.01em] text-ink sm:text-4xl"
      >
        {title}
      </h2>
    </header>
  );
}
