export default function SectionHeading({ eyebrow, title, subtitle }) {
  return (
    <div className="text-center mb-8 md:mb-10" data-aos="fade-up">
      {eyebrow && (
        <span className="text-nebula-blue text-sm tracking-widest uppercase">{eyebrow}</span>
      )}
      <h2 className="font-display text-3xl md:text-4xl font-bold bg-gradient-to-r from-theme-from via-theme-via to-theme-to bg-clip-text text-transparent mt-2">
        {title}
      </h2>
      {subtitle && <p className="text-theme-muted mt-3 max-w-xl mx-auto">{subtitle}</p>}
    </div>
  );
}