function SectionHeading({ eyebrow, title, description, align = 'left' }) {
  return (
    <div className={align === 'center' ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl'}>
      {eyebrow ? <p className="text-sm font-black uppercase text-[var(--accent)]">{eyebrow}</p> : null}
      <h2 className="mt-3 text-3xl font-black leading-tight text-[var(--text)] md:text-5xl">{title}</h2>
      {description ? <p className="mt-4 text-base leading-7 text-[var(--muted)] md:text-lg">{description}</p> : null}
    </div>
  );
}

export default SectionHeading;
