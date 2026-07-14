import { FaCode, FaReact, FaWordpress, FaLaptopCode, FaPaintBrush, FaServer } from 'react-icons/fa';
import { services } from '../../data/services';
import SectionHeading from '../ui/SectionHeading';

const iconMap = {
  code: FaCode,
  react: FaReact,
  wordpress: FaWordpress,
  speed: FaLaptopCode,
  design: FaPaintBrush,
  stack: FaServer,
};

export default function Services() {
  return (
    <section id="services" className="py-24">
      <div className="portfolio-container">
        <SectionHeading
          eyebrow="What I Offer"
          title="Services I Offer"
          subtitle="Comprehensive frontend solutions to bring your digital vision to life with high quality."
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, i) => {
            const Icon = iconMap[s.icon] || FaCode;
            return (
              <div
                key={s.title}
                data-aos="fade-up"
                data-aos-delay={i * 100}
                className="rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md p-6 hover:border-nebula-blue/50 hover:bg-white/10 transition duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-nebula-blue/10 flex items-center justify-center text-nebula-blue mb-5">
                    <Icon className="text-2xl" />
                  </div>
                  <h3 className="text-white font-display font-semibold text-lg mb-3">{s.title}</h3>
                  <ul className="space-y-2 text-sm text-slate-400">
                    {s.points.map((p) => (
                      <li key={p} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-nebula-blue shrink-0" />
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}