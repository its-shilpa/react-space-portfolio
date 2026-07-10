import { services } from '../../data/services';
import SectionHeading from '../ui/SectionHeading';

export default function Services() {
  return (
    <section id="services" className="py-24">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeading
          eyebrow="What I Offer"
          title="Services I Offer"
          subtitle="Comprehensive solutions to bring your digital vision to life."
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <div
              key={s.title}
              data-aos="fade-up"
              data-aos-delay={i * 100}
              className="rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md p-6 hover:border-nebula-blue/50 transition"
            >
              <h3 className="text-white font-display font-semibold mb-3">{s.title}</h3>
              <ul className="space-y-2 text-sm text-slate-400">
                {s.points.map((p) => (
                  <li key={p} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-nebula-blue" />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}