import { useState, useEffect } from 'react';
import { FaTimes, FaExternalLinkAlt, FaAward } from 'react-icons/fa';
import { achievements } from '../../data/achievements';
import SectionHeading from '../ui/SectionHeading';

export default function Achievements() {
  const [selectedAchievement, setSelectedAchievement] = useState(null);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (selectedAchievement) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedAchievement]);

  return (
    <section id="achievements" className="py-24 relative">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeading
          eyebrow="My Accomplishments"
          title="Achievements & Honors"
          subtitle="A collection of certificates, hackathons, and recognitions earned along the way."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {achievements.map((ach, idx) => (
            <div
              key={idx}
              data-aos="fade-up"
              data-aos-delay={idx * 100}
              onClick={() => setSelectedAchievement(ach)}
              className="group cursor-pointer rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md p-6 hover:border-nebula-purple/50 hover:bg-white/10 transition duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-lg bg-nebula-purple/10 flex items-center justify-center text-nebula-purple mb-4 group-hover:scale-110 transition duration-300">
                  <FaAward className="text-xl" />
                </div>
                <h3 className="text-white font-display font-semibold text-lg leading-snug group-hover:text-nebula-blue transition duration-300">
                  {ach.title}
                </h3>
                <p className="text-slate-400 text-xs mt-2">{ach.organization}</p>
                <p className="text-slate-300 text-sm mt-3 line-clamp-3">
                  {ach.description}
                </p>
              </div>

              <div className="flex justify-between items-center mt-6">
                <span className="text-xs text-slate-500 font-medium">{ach.date}</span>
                <span className="text-xs text-nebula-blue font-semibold group-hover:underline flex items-center gap-1">
                  View Certificate <FaExternalLinkAlt className="text-[10px]" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Glassmorphic Modal overlay */}
      {selectedAchievement && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-space-900/85 backdrop-blur-md transition-opacity duration-300"
          onClick={() => setSelectedAchievement(null)}
        >
          <div
            className="relative w-full max-w-3xl rounded-2xl bg-[#0d0d21]/95 border border-white/10 p-6 md:p-8 shadow-2xl flex flex-col gap-6 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedAchievement(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white transition p-2 rounded-full hover:bg-white/5"
            >
              <FaTimes className="text-xl" />
            </button>

            {/* Modal Content */}
            <div className="flex flex-col gap-6">
              <div>
                <span className="text-xs text-nebula-blue font-semibold tracking-wider uppercase">
                  {selectedAchievement.organization}
                </span>
                <h2 className="text-2xl md:text-3xl font-display font-bold text-white mt-1">
                  {selectedAchievement.title}
                </h2>
                <p className="text-xs text-slate-400 mt-1">{selectedAchievement.date}</p>
              </div>

              {/* Certificate Image Preview */}
              <div className="w-full rounded-lg overflow-hidden border border-white/5 bg-space-950 flex items-center justify-center min-h-[200px]">
                <img
                  src={selectedAchievement.image}
                  alt={selectedAchievement.title}
                  className="w-full h-auto object-contain max-h-[50vh] hover:scale-[1.01] transition duration-500"
                />
              </div>

              <div className="space-y-2">
                <h4 className="text-white font-semibold text-sm">About this achievement:</h4>
                <p className="text-slate-300 text-sm leading-relaxed">
                  {selectedAchievement.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}