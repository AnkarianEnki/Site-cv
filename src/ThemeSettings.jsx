import { useState, useEffect } from 'react';
import { Moon, Sun, Palette, X, PaintBrush } from '@phosphor-icons/react';
import { motion, AnimatePresence } from 'framer-motion';

const PRESETS = [
  { name: 'Blue', color: '#3b82f6' },
  { name: 'Emerald', color: '#10b981' },
  { name: 'Rose', color: '#f43f5e' },
  { name: 'Violet', color: '#8b5cf6' },
  { name: 'Amber', color: '#f59e0b' },
];

export default function ThemeSettings() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLight, setIsLight] = useState(false);
  const [accent, setAccent] = useState('#3b82f6');

  // Convert Hex to RGB for tailwind alpha variables
  const hexToRgb = (hex) => {
    let r = 0, g = 0, b = 0;
    if (hex.length === 4) {
      r = parseInt(hex[1] + hex[1], 16);
      g = parseInt(hex[2] + hex[2], 16);
      b = parseInt(hex[3] + hex[3], 16);
    } else if (hex.length === 7) {
      r = parseInt(hex.substring(1, 3), 16);
      g = parseInt(hex.substring(3, 5), 16);
      b = parseInt(hex.substring(5, 7), 16);
    }
    return `${r}, ${g}, ${b}`;
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme-light') === 'true';
    const savedAccent = localStorage.getItem('theme-accent') || '#3b82f6';
    setIsLight(savedTheme);
    setAccent(savedAccent);
    applyTheme(savedTheme, savedAccent);
  }, []);

  const applyTheme = (light, color) => {
    const root = document.documentElement;
    if (light) {
        root.setAttribute('data-theme', 'light');
    } else {
        root.removeAttribute('data-theme');
    }
    
    root.style.setProperty('--accent', color);
    root.style.setProperty('--accent-rgb', hexToRgb(color));
    
    window.dispatchEvent(new CustomEvent('theme-changed', { 
        detail: { accentHex: color, isLight: light } 
    }));
  };

  const handleToggleLight = () => {
    const newState = !isLight;
    setIsLight(newState);
    localStorage.setItem('theme-light', newState);
    applyTheme(newState, accent);
  };

  const handleColorChange = (color) => {
    setAccent(color);
    localStorage.setItem('theme-accent', color);
    applyTheme(isLight, color);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end gap-4">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="glass-panel p-5 rounded-2xl w-64 shadow-2xl origin-bottom-right"
          >
            <div className="flex justify-between items-center mb-6 border-b border-[var(--border-subtle)] pb-4">
              <h3 className="font-semibold text-sm text-[var(--text-main)]">Personnalisation</h3>
              <button onClick={() => setIsOpen(false)} className="text-[var(--text-soft)] hover:text-[var(--text-main)] transition-colors">
                <X size={16} />
              </button>
            </div>
            
            <div className="flex flex-col gap-6">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-[var(--text-soft)]">Mode clair</span>
                <button 
                  onClick={handleToggleLight}
                  className="w-10 h-6 rounded-full bg-[var(--panel-inset)] border border-[var(--border-subtle)] relative flex items-center p-1 transition-colors"
                >
                  <motion.div 
                    className="w-4 h-4 rounded-full flex items-center justify-center bg-white shadow-sm"
                    animate={{ x: isLight ? 16 : 0 }}
                  >
                     {isLight ? <Sun weight="fill" className="text-amber-500 w-3 h-3" /> : <Moon weight="fill" className="text-blue-500 w-3 h-3" />}
                  </motion.div>
                </button>
              </div>
              
              <div className="flex flex-col gap-3">
                <span className="text-sm font-medium text-[var(--text-soft)]">Couleur d'accent</span>
                <div className="flex gap-3 flex-wrap">
                  {PRESETS.map(p => (
                    <button
                      key={p.name}
                      onClick={() => handleColorChange(p.color)}
                      className={`w-6 h-6 rounded-full transition-transform hover:scale-110 ${accent === p.color ? 'ring-2 ring-offset-2 ring-offset-[var(--bg-base)]' : ''}`}
                      style={{ backgroundColor: p.color, "--tw-ring-color": p.color }}
                      aria-label={p.name}
                      title={p.name}
                    />
                  ))}
                  {/* Selecteur de couleur libre */}
                  <div 
                    className={`relative w-6 h-6 rounded-full overflow-hidden flex items-center justify-center bg-[var(--panel-inset)] border border-[var(--border-strong)] transition-transform hover:scale-110 ${!PRESETS.find(p => p.color === accent) ? 'ring-2 ring-offset-2 ring-offset-[var(--bg-base)]' : ''}`}
                    style={!PRESETS.find(p => p.color === accent) ? { "--tw-ring-color": accent } : {}}
                    title="Couleur personnalisée"
                  >
                    <input 
                        type="color" 
                        value={accent} 
                        onChange={(e) => handleColorChange(e.target.value)}
                        className="absolute top-[-10px] left-[-10px] w-12 h-12 cursor-pointer opacity-0"
                    />
                    <Palette size={14} className="text-[var(--text-main)] pointer-events-none" />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-12 h-12 rounded-full glass-panel flex items-center justify-center text-[var(--text-main)] shadow-lg hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors"
      >
        <PaintBrush size={24} weight={isOpen ? "fill" : "regular"} />
      </motion.button>
    </div>
  );
}