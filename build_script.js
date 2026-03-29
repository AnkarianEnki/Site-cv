const fs = require('fs');

const css = \
@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;700&display=swap');
@import 'tailwindcss';

:root {
  --bg: #050505;
  --fg: #e2e8f0;
  --accent: #ccff00; /* Acid Yellow/Lime awwwards style */
  --accent-fg: #050505;
  --border: rgba(255, 255, 255, 0.15);
  --border-strong: rgba(255, 255, 255, 0.3);
  
  font-family: 'Space Grotesk', system-ui, sans-serif;
  background-color: var(--bg);
  color: var(--fg);
  color-scheme: dark;
}

body {
  margin: 0;
  overflow-x: hidden;
  -webkit-font-smoothing: antialiased;
}

.font-mono {
  font-family: 'JetBrains Mono', monospace;
}

/* Strict Brutalist Grid Background */
.grid-lines {
  background-image: 
    linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px);
  background-size: 64px 64px;
  background-position: center top;
}

::selection {
  background: var(--accent);
  color: var(--accent-fg);
}

.marquee {
  display: flex;
  overflow: hidden;
  user-select: none;
  background: var(--accent);
  color: var(--accent-fg);
}

.marquee-content {
  flex-shrink: 0;
  display: flex;
  min-width: 100%;
  animation: scrollText 12s linear infinite;
}

@keyframes scrollText {
  from { transform: translateX(0); }
  to { transform: translateX(-100%); }
}

.hover-invert {
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}
.hover-invert:hover {
  background: var(--fg);
  color: var(--bg);
}

.hover-accent {
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}
.hover-accent:hover {
  background: var(--accent);
  color: var(--accent-fg);
}

::-webkit-scrollbar { width: 10px; }
::-webkit-scrollbar-track { background: var(--bg); border-left: 1px solid var(--border); }
::-webkit-scrollbar-thumb { background: #333; border: 1px solid var(--bg); }
::-webkit-scrollbar-thumb:hover { background: var(--accent); }
\;

const jsx = \import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowDownRight, ArrowUpRight, GithubLogo, LinkedinLogo, MapPin, Code, Hash, Asterisk } from '@phosphor-icons/react';

const PROJECTS = [
  { id: '01', title: 'CALCULATEUR TRAJET', type: 'ALGO / C++', desc: 'Dijkstra & Optimisation Graphes' },
  { id: '02', title: 'GESTION DE DEPENSES', type: 'REACT / ELECTRON', desc: 'Interface SaaS & Synchro' },
  { id: '03', title: 'ECHO GAME', type: 'GODOT 4 / GDScript', desc: 'Action RPG - 32h Game Jam' },
  { id: '04', title: 'ARLES EVENT BOARD', type: 'NODE.JS / POSTGRES', desc: 'API REST & Platforme Locale' }
];

const SKILLS = [
  { title: 'FRONTEND', desc: 'React, Vite, Framer, Tailwind', icon: <Asterisk size={32} weight="bold"/> },
  { title: 'BACKEND', desc: 'Node.js, Postgres, Express', icon: <Hash size={32} weight="bold"/> },
  { title: 'SOFTWARE', desc: 'C++, Python, Java, Qt', icon: <Code size={32} weight="bold"/> },
  { title: 'DEVOPS', desc: 'Docker, Git, Linux', icon: <ArrowRight size={32} weight="bold"/> }
];

export default function App() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen text-[var(--fg)] relative">
      
      {/* GRID BACKGROUND */}
      <div className="fixed inset-0 grid-lines pointer-events-none z-0" />

      {/* CUSTOM BRUTALIST MOUSE EFFECTS (Subtle) */}
      <div 
        className="fixed top-0 left-0 w-8 h-8 border flex items-center justify-center border-white/30 rounded-none pointer-events-none z-50 text-[10px] font-mono mix-blend-difference hidden md:flex transition-transform duration-75"
        style={{ transform: \\\	ranslate(\px, \px)\\\ }}
      >
        +
      </div>

      {/* MAIN CONTAINER */}
      <main className="max-w-[1400px] mx-auto border-x border-[var(--border)] relative z-10 bg-[var(--bg)] flex flex-col">
        
        {/* TOP NAV BAR */}
        <header className="grid grid-cols-2 md:grid-cols-12 border-b border-[var(--border)] font-mono text-xs tracking-widest uppercase items-stretch">
          <div className="col-span-1 md:col-span-2 p-6 font-bold text-lg hover-accent flex items-center justify-center border-r border-[var(--border)]">
            JC.
          </div>
          <div className="hidden md:flex col-span-8 divide-x divide-[var(--border)] border-r border-[var(--border)]">
            <a href="#about" className="flex-1 p-6 flex justify-center items-center hover-accent">Infos</a>
            <a href="#projects" className="flex-1 p-6 flex justify-center items-center hover-accent">Projets</a>
            <a href="#skills" className="flex-1 p-6 flex justify-center items-center hover-accent">Skills</a>
          </div>
          <a href="#contact" className="col-span-1 md:col-span-2 p-6 flex items-center justify-center text-[var(--accent)] hover:bg-[var(--accent)] hover:text-black transition-colors font-bold">
            CONTACT <ArrowUpRight className="ml-2"/>
          </a>
        </header>

        {/* HERO SECTION */}
        <section className="relative flex flex-col justify-end min-h-[85vh] border-b border-[var(--border)] p-6 md:p-12 lg:p-20 overflow-hidden">
          <div className="absolute top-12 left-12 md:left-20 flex gap-4 text-xs font-mono uppercase">
            <div className="border border-[var(--border)] px-4 py-2 flex items-center gap-2">
              <span className="w-2 h-2 bg-[var(--accent)] block" />
              AVAILABLE 2026
            </div>
            <div className="border border-[var(--border)] px-4 py-2 flex items-center gap-2 text-zinc-400">
              <MapPin /> ARLES, FR
            </div>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col z-10 mt-32"
          >
            <h1 className="text-[12vw] md:text-[8rem] lg:text-[11rem] leading-[0.8] font-bold tracking-tighter uppercase mb-8">
              JÉRÔME<br />
              <span className="text-transparent" style={{ WebkitTextStroke: '2px var(--fg)' }}>CHENALLET</span>
            </h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 border-t border-[var(--border)] pt-8">
              <p className="text-2xl md:text-3xl lg:text-4xl font-semibold tracking-tighter uppercase leading-none max-w-xl">
                Créatif Frontend & <br/> Ingénieur Logiciel.
              </p>
              <p className="font-mono text-xs md:text-sm tracking-widest text-zinc-400 uppercase leading-relaxed max-w-sm ml-auto md:text-right">
                Étudiant en BUT Informatique. À la recherche d'un stage (12 sem.) et d'une alternance pour transformer la technique en expériences qui marquent.
              </p>
            </div>
          </motion.div>
        </section>

        {/* BRUTALIST MARQUEE */}
        <div className="marquee border-b border-[var(--border)] py-4 text-xl md:text-3xl font-bold uppercase tracking-tighter">
          <div className="marquee-content gap-8 px-4">
            {Array(10).fill('ENGINEERING • UI/UX • ARCHITECTURE • CODE •').map((txt, i) => <span key={i}>{txt}</span>)}
          </div>
          <div className="marquee-content gap-8 px-4" aria-hidden="true">
            {Array(10).fill('ENGINEERING • UI/UX • ARCHITECTURE • CODE •').map((txt, i) => <span key={i}>{txt}</span>)}
          </div>
        </div>

        {/* ABOUT / TIMELINE */}
        <section id="about" className="border-b border-[var(--border)]">
          <div className="grid grid-cols-1 lg:grid-cols-4 divide-y lg:divide-y-0 lg:divide-x divide-[var(--border)]">
            <div className="p-8 md:p-12 hover-invert col-span-1 lg:col-span-2 group">
               <h2 className="text-[var(--accent)] text-xs font-mono tracking-widest mb-6 group-hover:text-black transition-colors">[ 01_PARCOURS ]</h2>
               <p className="text-4xl md:text-5xl font-bold uppercase tracking-tight leading-[1.1]">
                 Évolution Structurée. IUT d'Arles.
               </p>
            </div>
            
            <div className="p-8 md:p-12 hover-invert group">
               <div className="font-mono text-zinc-500 mb-4 group-hover:text-zinc-600 font-bold">2024 - 2026</div>
               <h3 className="text-2xl font-bold uppercase mb-4">BUT Info 2</h3>
               <p className="font-mono text-sm uppercase text-zinc-400 group-hover:text-zinc-800">
                 Spécialisation dev, apps complexes, algos avancés & gestion de projets.
               </p>
            </div>

            <div className="p-8 md:p-12 hover-invert group">
               <div className="font-mono text-zinc-500 mb-4 group-hover:text-zinc-600 font-bold">2023 - 2024</div>
               <h3 className="text-2xl font-bold uppercase mb-4">BUT Info 1</h3>
               <p className="font-mono text-sm uppercase text-zinc-400 group-hover:text-zinc-800">
                 Fondamentaux C++, Python, SQL, Linux & structures de données.
               </p>
            </div>
          </div>
        </section>

        {/* SKILLS - SHARP GRID */}
        <section id="skills" className="border-b border-[var(--border)] bg-[#050505] relative">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-[var(--border)] text-center">
            {SKILLS.map((skill, idx) => (
              <div key={idx} className="p-16 hover-accent flex flex-col justify-center items-center gap-6 group aspect-[4/3] md:aspect-square">
                 <div className="text-[var(--border-strong)] group-hover:text-black group-hover:scale-125 transition-transform duration-500">
                   {skill.icon}
                 </div>
                 <h4 className="text-2xl font-bold uppercase tracking-tighter mt-4">{skill.title}</h4>
                 <div className="w-full h-px bg-[var(--border)] group-hover:bg-black/20 my-2" />
                 <p className="font-mono text-xs font-bold uppercase tracking-widest text-zinc-500 group-hover:text-black/70">
                   {skill.desc}
                 </p>
              </div>
            ))}
          </div>
        </section>

        {/* PROJECTS - MASSIVE ROWS */}
        <section id="projects" className="border-b border-[var(--border)]">
          <div className="p-8 md:p-12 border-b border-[var(--border)] flex justify-between items-end">
            <div>
              <h2 className="text-[var(--accent)] text-xs font-mono tracking-widest mb-6">[ 02_PROJETS ]</h2>
              <p className="text-5xl md:text-[5rem] leading-[0.9] font-bold uppercase tracking-tighter">
                Travaux <br/> & Code.
              </p>
            </div>
            <ArrowDownRight size={80} className="text-[var(--border-strong)] hidden md:block" />
          </div>

          <div className="flex flex-col divide-y divide-[var(--border)]">
            {PROJECTS.map((proj) => (
              <a href="#" key={proj.id} className="grid grid-cols-1 md:grid-cols-12 items-center hover:bg-[var(--fg)] hover:text-[#050505] transition-colors group">
                <div className="md:col-span-2 p-6 md:p-10 text-3xl font-mono opacity-30 group-hover:opacity-100 font-bold border-r border-transparent md:border-[var(--border)] md:group-hover:border-[#050505]/20 h-full flex items-center">
                  {proj.id}
                </div>
                <div className="md:col-span-5 p-6 md:p-10 border-r border-transparent md:border-[var(--border)] md:group-hover:border-[#050505]/20 h-full flex items-center">
                  <h3 className="text-3xl lg:text-5xl font-bold uppercase tracking-tighter group-hover:translate-x-4 transition-transform duration-300">
                    {proj.title}
                  </h3>
                </div>
                <div className="md:col-span-4 p-6 md:p-10 font-mono text-xs tracking-widest uppercase border-r border-transparent md:border-[var(--border)] md:group-hover:border-[#050505]/20 h-full flex flex-col justify-center gap-2">
                  <span className="text-[var(--accent)] group-hover:text-black font-bold border border-current px-3 py-1 self-start">{proj.type}</span>
                  <span className="text-zinc-500 group-hover:text-zinc-800">{proj.desc}</span>
                </div>
                <div className="md:col-span-1 p-6 md:p-10 flex items-center justify-center h-full">
                  <ArrowUpRight size={40} className="group-hover:rotate-45 transition-transform duration-300" />
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* BRUTALIST FOOTER */}
        <footer id="contact" className="bg-[var(--accent)] text-black">
          <div className="p-12 md:p-24 border-b border-[#050505]/20 text-center">
            <h2 className="text-[12vw] leading-[0.8] font-bold uppercase tracking-tighter hover:scale-[1.02] transition-transform cursor-pointer origin-center mb-8">
              SAY HELLO.
            </h2>
            <a href="mailto:contact@jeromechenallet.com" className="inline-block border-2 border-black px-8 py-4 font-mono font-bold text-xl uppercase tracking-widest hover:bg-black hover:text-[var(--accent)] transition-colors">
              contact@jeromechenallet.com
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[#050505]/20 font-mono font-bold text-sm tracking-widest uppercase">
            <a href="#" className="p-8 hover:bg-black hover:text-[var(--accent)] transition-colors flex justify-center items-center gap-3">
              <GithubLogo size={24}/> Github
            </a>
            <a href="#" className="p-8 hover:bg-black hover:text-[var(--accent)] transition-colors flex justify-center items-center gap-3">
              <LinkedinLogo size={24}/> LinkedIn
            </a>
            <div className="p-8 flex items-center justify-center text-center opacity-60">
              © 2026 J. CHENALLET.
            </div>
          </div>
        </footer>

      </main>
    </div>
  );
}
\;

fs.writeFileSync('src/index.css', css);
fs.writeFileSync('src/App.jsx', jsx);
console.log('Script executed: Neo-brutalist rebuild complete.');
