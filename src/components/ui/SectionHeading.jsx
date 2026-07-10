export default function SectionHeading({ eyebrow, title, subtitle }) {
  return (
    <div className="text-center mb-14" data-aos="fade-up">
      {eyebrow && (
        <span className="text-nebula-blue text-sm tracking-widest uppercase">{eyebrow}</span>
      )}
      <h2 className="font-display text-3xl md:text-4xl font-bold text-white mt-2">
        {title}
      </h2>
      {subtitle && <p className="text-slate-400 mt-3 max-w-xl mx-auto">{subtitle}</p>}
    </div>
  );
}