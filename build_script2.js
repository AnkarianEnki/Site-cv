const fs = require('fs');

const css = \
@import url('https://fonts.googleapis.com/css2?family=Patrick+Hand&display=swap');
@import 'tailwindcss';

:root {
  --bg-pastel: #e8d5f0;
  --bg-mid: #c9a8d8;
  --bg-dark: #7a5a8a;
  --accent: #b98acc;
  --text: #4a3555;
  --border: #c9a8d8;
  --btn-bg: #e8d5f0;
  --btn-hover: #b98acc;
  --shadow-color: 140, 100, 170;
}

* {
  box-sizing: border-box;
  cursor: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='20' height='24' style='font-size:18px'><text y='18'>?</text></svg>"), auto;
}

body {
  margin: 0;
  min-height: 100vh;
  background: var(--bg-pastel);
  color: var(--text);
  font-family: 'Patrick Hand', cursive;
  font-size: 1.1rem;
  overflow-x: hidden;
  transition: background 0.8s ease;
}

/* Paper texture overlay */
body::before {
  content: '';
  position: fixed;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  opacity: 0.06;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E");
}

/* Crayon scribble marks */
.stars {
  position: fixed;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  opacity: 0.035;
  background-image:
    radial-gradient(ellipse 80px 2px at 15% 25%, var(--bg-dark) 0%, transparent 100%),
    radial-gradient(ellipse 60px 1.5px at 75% 15%, var(--bg-dark) 0%, transparent 100%),
    radial-gradient(ellipse 90px 2px at 40% 75%, var(--bg-dark) 0%, transparent 100%),
    radial-gradient(ellipse 50px 1px at 85% 60%, var(--bg-dark) 0%, transparent 100%),
    radial-gradient(ellipse 70px 2px at 25% 90%, var(--bg-dark) 0%, transparent 100%),
    radial-gradient(ellipse 55px 1.5px at 60% 40%, var(--bg-dark) 0%, transparent 100%);
}

::selection {
  background: var(--bg-mid);
  color: #3a2545;
}

.title {
  font-family: 'Patrick Hand', cursive;
  color: var(--text);
  letter-spacing: 3px;
  text-transform: lowercase;
}

/* === WINDOW FRAME === */
.frame-window {
  border: 3px dashed var(--border);
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.45);
  box-shadow: 4px 4px 0px var(--border);
  position: relative;
  z-index: 10;
}

.window-titlebar {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 14px;
  background: rgba(255, 255, 255, 0.3);
  border-bottom: 2px dashed var(--border);
}

.window-dots {
  display: flex;
  gap: 5px;
}

.dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  border: 1.5px solid rgba(0, 0, 0, 0.12);
}
.dot.red { background: #f0a0a0; }
.dot.yellow { background: #f0d8a0; }
.dot.green { background: #a0d8a0; }

.window-title {
  font-family: 'Patrick Hand', cursive;
  font-size: 0.95rem;
  color: var(--text);
  letter-spacing: 1px;
  opacity: 0.6;
}

.nav-button {
  background: var(--btn-bg);
  border: 2.5px dashed var(--border);
  padding: 8px 20px;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: lowercase;
  letter-spacing: 2px;
  box-shadow: 3px 3px 0px var(--border);
}
.nav-button:hover {
  background: var(--btn-hover);
  transform: translate(-1px, -1px);
  box-shadow: 4px 4px 0px var(--border);
  color: white;
}
.nav-button:active {
  transform: translate(2px, 2px);
  box-shadow: 1px 1px 0px var(--border);
}

.sparkle {
  color: var(--accent);
  animation: sparkleAnim 1.5s ease-in-out infinite alternate;
}
.sparkle.flip {
  animation-delay: 0.75s;
}
@keyframes sparkleAnim {
  from { opacity: 0.4; transform: scale(0.9) rotate(-3deg); }
  to { opacity: 1; transform: scale(1.1) rotate(3deg); }
}

.card-item {
  background: rgba(255, 255, 255, 0.3);
  border: 2px dashed var(--border);
  border-radius: 10px;
  padding: 16px;
  box-shadow: 2px 2px 0px var(--border);
  transition: transform 0.2s, box-shadow 0.2s;
}
.card-item:hover {
  transform: translateY(-2px);
  box-shadow: 4px 4px 0px var(--border);
  background: rgba(255, 255, 255, 0.5);
}

.tag {
  background: var(--btn-bg);
  border: 1px dashed var(--bg-dark);
  padding: 2px 10px;
  border-radius: 20px;
  font-size: 0.9rem;
  color: var(--bg-dark);
}
::-webkit-scrollbar { width: 10px; }
::-webkit-scrollbar-track { background: var(--bg-pastel); }
::-webkit-scrollbar-thumb { background: var(--bg-mid); border: 2px dashed var(--bg-pastel); border-radius: 6px; }
::-webkit-scrollbar-thumb:hover { background: var(--accent); }
\;

const jsx = \import { useState } from 'react';
import { motion } from 'framer-motion';

const PROJECTS = [
  { id: 1, title: 'calculateur de trajet', tech: ['c++', 'dijkstra'], desc: 'logiciel d optimisation de chemin, tres pratique *u*' },
  { id: 2, title: 'gestion de depenses', tech: ['react', 'electron'], desc: 'pour eviter de trop depenser en goodies !!' },
  { id: 3, title: 'echo game', tech: ['godot 4'], desc: 'un petit jeu roguelite fait en 32h avec beaucoup de cafe.' },
  { id: 4, title: 'site iut arles', tech: ['html', 'css'], desc: 'refonte du site pour notre cher iut.' }
];

const SKILLS = [
  'react & vite', 'javascript / typescript', 'c++ (aïe)', 'python', 'node.js', 'figma'
];

export default function App() {
  const [tab, setTab] = useState('accueil');

  return (
    <>
      <div className="stars" />
      <div className="min-h-screen flex flex-col items-center p-4 md:p-12 relative z-10">
        
        {/* EN-TÊTE MIGNON */}
        <div className="flex gap-4 items-center mb-8">
          <span className="sparkle text-3xl">?</span>
          <h1 className="title text-5xl md:text-6xl font-bold">jerome chenallet</h1>
          <span className="sparkle flip text-3xl">?</span>
        </div>

        {/* FENÊTRE PRINCIPALE */}
        <motion.div 
          className="frame-window w-full max-w-[800px] flex flex-col"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* BARRE DE TITRE */}
          <div className="window-titlebar">
            <div className="window-dots">
              <div className="dot red" />
              <div className="dot yellow" />
              <div className="dot green" />
            </div>
            <div className="window-title mx-auto pr-[40px]">portfolio-jerome.exe</div>
          </div>

          {/* CONTENU FENÊTRE */}
          <div className="p-6 md:p-8 flex flex-col gap-8 flex-1">
            
            {/* NAVIGATION TABS */}
            <div className="flex flex-wrap gap-4 justify-center">
              <button className="nav-button" onClick={() => setTab('accueil')}>~ accueil ~</button>
              <button className="nav-button" onClick={() => setTab('parcours')}>~ parcours ~</button>
              <button className="nav-button" onClick={() => setTab('projets')}>~ projets ~</button>
              <button className="nav-button" onClick={() => setTab('contact')}>~ contact ~</button>
            </div>

            {/* ZONES DE CONTENU */}
            <div className="min-h-[300px] flex flex-col">
              {tab === 'accueil' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center text-center gap-4 my-auto">
                  <h2 className="text-3xl font-bold text-[var(--accent)]">bienvenue sur mon espace !!</h2>
                  <p className="max-w-md text-[1.2rem] leading-relaxed">
                    je suis étudiant en but informatique (2ème année) à arles. <br/><br/>
                    j'aime beaucoup le dev web, l'algorithmique et l'intégration d'interfaces un peu originales.
                  </p>
                  <p className="mt-4 opacity-70 italic text-sm">
                    ps: je recherche un stage de 12 semaines et/ou une alternance c:
                  </p>
                </motion.div>
              )}

              {tab === 'parcours' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col gap-4">
                   <h2 className="text-2xl font-bold text-[var(--bg-dark)] border-b-2 border-dashed border-[var(--border)] pb-2 mb-2">mon parcours !!</h2>
                   
                   <div className="card-item">
                     <span className="font-bold text-[var(--bg-dark)]">2024 - 2026:</span> BUT Informatique 2ème année (Arles)<br/>
                     <span className="opacity-70 text-sm">Spécialisation en développement logiciel et gestion de projets de groupe.</span>
                   </div>

                   <div className="card-item">
                     <span className="font-bold text-[var(--bg-dark)]">2023 - 2024:</span> BUT Informatique 1ère année<br/>
                     <span className="opacity-70 text-sm">Les bases de la survie: algos en C++, BDD, Linux...</span>
                   </div>

                   <h3 className="text-xl font-bold text-[var(--bg-dark)] mt-4">mes competences :</h3>
                   <div className="flex flex-wrap gap-2">
                     {SKILLS.map(s => <span key={s} className="tag">{s}</span>)}
                   </div>
                </motion.div>
              )}

              {tab === 'projets' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col gap-4">
                  <h2 className="text-2xl font-bold text-[var(--bg-dark)] border-b-2 border-dashed border-[var(--border)] pb-2 mb-2">ma galerie de code :3</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {PROJECTS.map(proj => (
                      <div key={proj.id} className="card-item flex flex-col gap-2">
                        <h3 className="font-bold text-xl">{proj.title}</h3>
                        <div className="flex flex-wrap gap-1">
                          {proj.tech.map(t => <span key={t} className="tag text-xs">{t}</span>)}
                        </div>
                        <p className="text-[1.05rem] mt-2 leading-tight">{proj.desc}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {tab === 'contact' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center justify-center gap-6 my-auto text-center">
                  <h2 className="text-3xl font-bold text-[var(--accent)]">n'hesitez pas a toquer a ma porte !</h2>
                  <p className="text-[1.1rem]">
                    pour parler de code, de projets ou pour me recruter (s'il vous plaît).
                  </p>
                  
                  <div className="flex gap-4 mt-4">
                     <a href="mailto:email@test.com" className="nav-button no-underline block text-center">
                       @ m'envoyer un mail
                     </a>
                     <a href="https://github.com" target="_blank" rel="noreferrer" className="nav-button no-underline block text-center">
                       {'>'} github
                     </a>
                  </div>
                </motion.div>
              )}
            </div>

          </div>
        </motion.div>

        {/* FOOTER */}
        <div className="mt-8 text-center opacity-60 text-sm flex gap-2 items-center">
           <span className="sparkle">?</span> fait avec amour, react et quelques crayons <span className="sparkle flip">?</span>
        </div>
      </div>
    </>
  );
}
\;

fs.writeFileSync('src/index.css', css);
fs.writeFileSync('src/App.jsx', jsx);
console.log('Script executed: Pastel 90s/2000s handmade UI rewrite complete.');
