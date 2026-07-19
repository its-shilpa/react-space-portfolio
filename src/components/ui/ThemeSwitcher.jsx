import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPalette, FaTimes, FaUndo } from 'react-icons/fa';
import { useTheme } from '../../hooks/ThemeContext';

export default function ThemeSwitcher() {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, setTheme, configs } = useTheme();
  const panelRef = useRef(null);

  // Close panel on clicks outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (panelRef.current && !panelRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);


  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end" ref={panelRef}>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 30 }}
            transition={{ type: 'spring', damping: 20, stiffness: 200 }}
            className="mb-4 w-80 rounded-3xl border border-white/10 bg-space-950/80 p-5 backdrop-blur-2xl shadow-2xl origin-bottom-right"
            style={{
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.6), 0 0 40px rgba(124, 58, 237, 0.15)',
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-white/5 pb-3 mb-4">
              <span className="font-display font-bold text-sm tracking-wider text-white flex items-center gap-2">
                <FaPalette className="text-nebula-blue animate-pulse" /> Environmental Themes
              </span>
              <button
                onClick={() => setIsOpen(false)}
                className="text-slate-400 hover:text-white transition duration-200 cursor-pointer"
                aria-label="Close theme panel"
              >
                <FaTimes className="text-xs" />
              </button>
            </div>

            {/* Themes Grid */}
            <div className="grid grid-cols-2 gap-2.5 max-h-[300px] overflow-y-auto pr-1">
              {configs.map((cfg) => {
                const isActive = theme === cfg.id;
                return (
                  <motion.button
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    key={cfg.id}
                    onClick={() => {
                      setTheme(cfg.id);
                      if (window.innerWidth < 768) {
                        setIsOpen(false);
                      }
                    }}
                    className={`flex flex-col items-start gap-2 rounded-2xl border p-3 text-left transition-colors duration-300 cursor-pointer ${
                      isActive
                        ? 'border-nebula-blue bg-nebula-blue/12 shadow-[0_0_15px_rgba(6,182,212,0.15)]'
                        : 'border-white/5 bg-white/5 hover:border-white/15 hover:bg-white/8'
                    }`}
                  >
                    <div className="flex items-center gap-2 w-full">
                      <span className="text-lg select-none">{cfg.icon}</span>
                      <span className="font-display font-bold text-xs text-white truncate">
                        {cfg.name}
                      </span>
                    </div>

                    {/* Palette Dot indicators */}
                    <div className="flex gap-1.5 mt-0.5">
                      <span
                        className="w-3 h-3 rounded-full border border-white/10"
                        style={{ backgroundColor: cfg.colors['space-900'] }}
                        title="Background"
                      />
                      <span
                        className="w-3 h-3 rounded-full border border-white/10"
                        style={{ backgroundColor: cfg.colors['theme-from'] }}
                        title="Gradient From"
                      />
                      <span
                        className="w-3 h-3 rounded-full border border-white/10"
                        style={{ backgroundColor: cfg.colors['nebula-blue'] }}
                        title="Accent"
                      />
                    </div>
                  </motion.button>
                );
              })}
            </div>

            {/* Reset to Default Option */}
            {theme !== 'space' && (
              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setTheme('space')}
                className="w-full mt-4 py-2.5 text-xs font-display font-bold rounded-2xl border border-dashed border-white/20 hover:border-nebula-purple hover:text-nebula-purple transition-all duration-300 flex items-center justify-center gap-2 bg-white/5 cursor-pointer"
              >
                <FaUndo className="text-[10px]" /> Reset to Default (Space)
              </motion.button>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Toggle Trigger Button */}
      <motion.button
        whileHover={{ scale: 1.1, rotate: 15 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-tr from-nebula-purple to-nebula-blue text-white shadow-2xl cursor-pointer"
        style={{
          boxShadow: '0 8px 25px rgba(124, 58, 237, 0.35), 0 0 25px var(--nebula-blue)/20',
        }}
        aria-label="Open theme options menu"
      >
        <span className="absolute inset-[1px] rounded-full bg-space-950 transition-opacity duration-300 opacity-0 group-hover:opacity-15" />
        <FaPalette className={`text-xl transition-transform duration-500 ${isOpen ? 'rotate-90 text-white' : 'text-white'}`} />
      </motion.button>
    </div>
  );
}
