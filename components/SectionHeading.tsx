type SectionHeadingProps = {
  title: string;
  id: string;
};

export function SectionHeading({ title, id }: SectionHeadingProps) {
  return (
    <header className="border-b border-rule pb-5">
      <h2
        id={id}
        className="font-script text-4xl leading-[1.15] font-semibold tracking-normal text-ink sm:text-5xl"
      >
        {title}
      </h2>
    </header>
  );
}
