import { FaExternalLinkAlt, FaAward, FaReact, FaTrophy, FaPalette } from 'react-icons/fa';
import { achievements } from '../../data/achievements';
import SectionHeading from '../ui/SectionHeading';

const getIcon = (iconName) => {
  switch (iconName) {
    case 'react':
      return <FaReact className="text-xl" />;
    case 'hackathon':
      return <FaTrophy className="text-xl" />;
    case 'uiux':
      return <FaPalette className="text-xl" />;
    default:
      return <FaAward className="text-xl" />;
  }
};

export default function Achievements() {
  return (
    <section id="achievements" className="py-8 md:py-10 lg:py-12 relative overflow-hidden">
      {/* Decorative background nebula glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-nebula-purple/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="portfolio-container relative z-10">
        <SectionHeading
          eyebrow="My Accomplishments"
          title="Achievements & Honors"
          subtitle="A collection of certificates, hackathons, and recognitions earned along the way."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {achievements.map((ach, idx) => (
            <div
              key={idx}
              data-aos="fade-up"
              data-aos-delay={idx * 100}
              className="card-flip-container group w-full h-[400px] cursor-pointer"
            >
              {/* Card Inner Wrapper */}
              <div className="card-flip-inner">
                
                {/* Front Side */}
                <div className="card-flip-front rounded-2xl p-[1px] bg-gradient-to-br from-white/10 to-white/5 group-hover:from-nebula-purple/50 group-hover:to-nebula-blue/50 transition-all duration-500 shadow-xl">
                  <div className="w-full h-full rounded-2xl bg-space-950/90 backdrop-blur-xl p-6 flex flex-col justify-between overflow-hidden relative">
                    
                    {/* Galactic backdrop decorations */}
                    <div className="absolute top-0 right-0 w-24 h-24 bg-nebula-purple/10 rounded-full blur-2xl pointer-events-none group-hover:bg-nebula-purple/20 transition-all duration-500" />
                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-nebula-blue/10 rounded-full blur-2xl pointer-events-none group-hover:bg-nebula-blue/20 transition-all duration-500" />

                    <div>
                      {/* Icon & Date Header */}
                      <div className="flex justify-between items-start mb-6">
                        <div className="w-12 h-12 rounded-xl bg-nebula-purple/15 flex items-center justify-center text-nebula-purple border border-nebula-purple/20 group-hover:scale-110 group-hover:bg-nebula-purple/25 group-hover:text-nebula-blue group-hover:border-nebula-blue/30 transition-all duration-300">
                          {getIcon(ach.icon)}
                        </div>
                        <span className="text-[11px] text-slate-500 font-mono tracking-wider bg-white/5 px-2.5 py-1 rounded-full border border-white/5">
                          {ach.date}
                        </span>
                      </div>

                      {/* Title & Organization */}
                      <h3 className="text-white font-display font-bold text-lg md:text-xl leading-snug group-hover:text-nebula-blue transition duration-300">
                        {ach.title}
                      </h3>
                      <p className="text-nebula-purple/90 font-medium text-xs tracking-wider uppercase mt-2 font-mono">
                        {ach.organization}
                      </p>

                      {/* Description */}
                      <p className="text-slate-400 text-sm mt-4 leading-relaxed font-sans line-clamp-4">
                        {ach.description}
                      </p>
                    </div>

                    {/* Bottom Action Area */}
                    <div className="flex items-center justify-between pt-4 border-t border-white/5 mt-auto">
                      <span className="text-[10px] text-slate-500 font-medium tracking-wide">
                        CERTIFICATE PREVIEW
                      </span>
                      <span className="text-xs text-nebula-blue font-semibold flex items-center gap-1.5 group-hover:text-nebula-purple transition-all duration-300">
                        Hover to Flip <span className="inline-block animate-pulse">→</span>
                      </span>
                    </div>

                  </div>
                </div>

                {/* Back Side */}
                <div className="card-flip-back rounded-2xl p-[1px] bg-gradient-to-br from-nebula-purple/50 to-nebula-blue/50 shadow-2xl">
                  <div className="w-full h-full rounded-2xl bg-space-950 overflow-hidden relative">
                    
                    {/* Certificate Image - crisp, fully visible and sharp */}
                    <div className="w-full h-full p-3 flex items-center justify-center bg-space-950">
                      <img
                        src={ach.image}
                        alt={ach.title}
                        className="w-full h-full object-contain transition-transform duration-500 hover:scale-[1.02]"
                      />
                    </div>

                    {/* Open Full View Action Button at top right corner */}
                    <a
                      href={ach.image}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-space-900/90 border border-white/10 flex items-center justify-center text-slate-300 hover:text-nebula-blue hover:border-nebula-blue/50 transition-all duration-300 shadow-lg shadow-space-950/50"
                      title="Open Full View"
                    >
                      <FaExternalLinkAlt className="text-sm" />
                    </a>

                    {/* Bottom Metadata Bar */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-space-950 via-space-950/90 to-transparent flex flex-col gap-0.5 pointer-events-none">
                      <span className="text-[10px] text-nebula-blue font-bold tracking-wider font-mono uppercase">
                        {ach.organization}
                      </span>
                      <h4 className="text-white font-display font-semibold text-sm truncate">
                        {ach.title}
                      </h4>
                    </div>

                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}