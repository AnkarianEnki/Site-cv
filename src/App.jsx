import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Background3D from './Background3D';
import CustomCursor from './CustomCursor';
import ThemeSettings from './ThemeSettings';
import {
  GithubLogo,
  LinkedinLogo,
  EnvelopeSimple,
  ArrowUpRight,
  CodeBlock,
  Database,
  TerminalWindow,
  Cpu,
  GraduationCap,
  MapPin,
  MagnifyingGlass,
  Briefcase,
  Wrench,
  Brain,
  Users,
  PenNib
} from '@phosphor-icons/react';

// --- DATA ---
const TIMELINE = [
  {
    year: '2026',
    title: 'Recherche de stage - 12 semaines',
    subtitle: 'Développement Logiciel / Web',
    desc: 'À la recherche d\'une opportunité pour valider ma 2ème année et appliquer mes compétences sur des projets réels.',
    icon: MagnifyingGlass,
    highlight: true,
  },
  {
    year: '2025 - 2026',
    title: 'Recherche d\'alternance - BUT 3',
    subtitle: 'Combiner formation et entreprise',
    desc: 'Ouvert aux opportunités d\'alternance pour ma 3ème année de BUT Informatique afin de me spécialiser.',
    icon: Briefcase,
    highlight: true,
  },
  {
    year: '2024 - Présent',
    title: 'BUT Informatique - 2ème année',
    subtitle: 'IUT d\'Arles - Aix-Marseille Université',
    desc: 'Spécialisation en développement d\'applications. Projets concrets, architecture logicielle, et gestion de flux de données complexes.',
    icon: GraduationCap,
  },
  {
    year: '2023 - 2024',
    title: 'BUT Informatique - 1ère année',
    subtitle: 'IUT d\'Arles - Aix-Marseille Université',
    desc: 'Fondamentaux de la programmation, bases de données, réseaux et algorithmique (C++, Python, SQL).',
    icon: CodeBlock,
  }
];

const SKILLS = [
  {
    category: 'Langages de programmation',
    icon: TerminalWindow,
    items: ['C++', 'Python', 'Java', 'JavaScript', 'TypeScript', 'HTML5', 'CSS3']
  },
  {
    category: 'Frameworks & Build tools',
    icon: Cpu,
    items: ['React', 'Node.js', 'Vite', 'Tailwind CSS', 'Framer Motion', 'Express']
  },
  {
    category: 'BDD & DevOps',
    icon: Database,
    items: ['PostgreSQL', 'MongoDB', 'Git / GitHub', 'Docker', 'Linux']
  },
  {
    category: 'IDEs & Éditeurs',
    icon: PenNib,
    items: ['VS Code', 'IntelliJ IDEA', 'Figma', 'Godot']
  },
  {
    category: 'Intelligence artificielle',
    icon: Brain,
    items: ['ChatGPT', 'Claude', 'GitHub Copilot']
  },
  {
    category: 'Soft Skills',
    icon: Users,
    items: ['Résolution de problèmes', 'Travail en équipe', 'Apprentissage continu', 'Curiosité']
  }
];

const PROJECTS = [
  {
    id: 1,
    title: 'Calculateur de Trajet',
    category: 'Logiciel',
    tags: ['C++', 'Algorithmique', 'Dijkstra'],
    desc: 'Application bureau utilisant l\'algorithme de Dijkstra (théorie des graphes) pour calculer les itinéraires optimaux.',
    image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&q=80&w=800',
    link: '#',
  },
  {
    id: 2,
    title: 'Gestionnaire de Dépenses',
    category: 'Web',
    tags: ['React', 'TypeScript', 'Electron'],
    desc: 'Plateforme complète de suivi des dépenses personnelles avec dashboards dynamiques et synchronisation locale.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800',
    link: '#',
  },
  {
    id: 3,
    title: 'ECHO - Roguelite 2D',
    category: 'Jeu Vidéo',
    tags: ['Godot 4', 'GDScript', 'Game Design'],
    desc: 'Action-RPG développé lors d\'un game jam de 32h. Mise en place de l\'architecture des nœuds et physiques.',
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=800',
    link: '#',
  },
  {
    id: 4,
    title: 'Campus Event Board',
    category: 'Web',
    tags: ['JavaScript', 'Node.js', 'PostgreSQL'],
    desc: 'Application de diffusion dévénements locaux avec authentification, rôle admin, et API REST.',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800',
    link: '#',
  }
];

// --- COMPONENTS ---

const NavBar = () => (
  <header className="nav-pill hidden md:flex">
    <a href="#" className="font-mono text-lg font-bold tracking-tighter text-[var(--text-main)] mr-4">
      JC<span className="text-[var(--accent)]">.</span>
    </a>
    <nav className="flex gap-6 text-sm font-medium text-[var(--text-soft)]">
      <a href="#about" className="hover:text-[var(--text-main)] transition-colors">Parcours</a>
      <a href="#projects" className="hover:text-[var(--text-main)] transition-colors">Projets</a>
      <a href="#skills" className="hover:text-[var(--text-main)] transition-colors">Compétences</a>
    </nav>
    <div className="w-px h-6 bg-[var(--panel-inset)] mx-2"></div>
    <a href="#contact" className="px-4 py-1.5 rounded-full bg-[var(--panel-inset)] text-[var(--text-main)] text-sm hover:bg-[var(--border-strong)] transition-colors border border-[var(--border-subtle)]">
      Contact
    </a>
  </header>
);

const HeroSection = () => (
  <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6 flex flex-col justify-center items-center text-center overflow-hidden min-h-[100dvh]">
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="z-10 flex flex-col items-center"
    >
      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[rgba(var(--accent-rgb),0.3)] bg-[rgba(var(--accent-rgb),0.1)] text-[var(--accent)] text-xs font-mono font-medium mb-8">
        <span className="w-2 h-2 rounded-full bg-[var(--accent)] animate-pulse" />
        Étudiant en Informatique • BUT 2
      </div>
      
      <h1 className="text-5xl md:text-7xl lg:text-8xl font-semibold tracking-tighter leading-[1.05] max-w-5xl">
        Créer des expériences <br className="hidden md:block"/>
        <span className="heading-gradient">qui comptent.</span>
      </h1>
      
      <p className="mt-8 text-lg font-mono text-[var(--text-soft)] max-w-2xl leading-relaxed">
        Je suis <span className="text-[var(--text-main)]">Chenallet Jérôme</span>, passionné par le développement logiciel et web. 
        Je conçois des solutions numériques élégantes, avec un fort attrait pour l'ingénierie et la performance.
      </p>

      <div className="mt-10 flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
        <a href="#projects" className="group relative inline-flex items-center justify-center gap-2 bg-[var(--text-main)] text-[var(--bg-base)] px-6 py-3.5 rounded-full font-semibold text-sm transition-transform hover:scale-[1.02] active:scale-[0.98]">
          Voir mes projets
          <ArrowUpRight weight="bold" className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </a>
        <a href="mailto:contact@example.com" className="inline-flex items-center justify-center gap-2 glass-panel text-[var(--text-main)] px-6 py-3.5 rounded-full font-semibold text-sm transition-transform hover:scale-[1.02] active:scale-[0.98]">
          Me contacter
          <EnvelopeSimple />
        </a>
      </div>
    </motion.div>
  </section>
);

const TimelineSection = () => (
  <section id="about" className="py-24 px-6 max-w-[900px] mx-auto">
    <div className="mb-16">
      <h2 className="text-3xl md:text-5xl font-semibold tracking-tight">Mon Parcours <span className="text-[var(--accent)]">.</span></h2>
      <p className="mt-4 text-[var(--text-soft)] font-mono text-sm max-w-xl">
        Une évolution académique structurée, complétée par une recherche active d'opportunités d'immersion professionnelles.
      </p>
    </div>

    <div className="relative border-l border-[var(--border-strong)] ml-4 md:ml-8 flex flex-col gap-12">
      {TIMELINE.map((item, idx) => {
        const Icon = item.icon;
        return (
          <motion.div 
            key={idx}
            className="relative pl-8 md:pl-12"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
          >
            <div className={`absolute -left-4 top-0 w-8 h-8 rounded-full border-4 border-[var(--bg-base)] flex items-center justify-center ${item.highlight ? 'bg-[var(--accent)] shadow-[0_0_15px_rgba(var(--accent-rgb),0.6)]' : 'bg-[var(--panel-inset)]'}`}>
              <Icon weight={item.highlight ? "bold" : "regular"} className={item.highlight ? "text-[var(--text-main)] w-3 h-3" : "text-[var(--text-soft)] w-3 h-3"} />
            </div>
            
            <div className={`glass-panel p-6 rounded-2xl ${item.highlight ? 'border-[rgba(var(--accent-rgb),0.3)] bg-[rgba(var(--accent-rgb),0.05)]' : ''}`}>
              <span className="text-xs font-mono text-[var(--accent)] tracking-wider uppercase mb-2 block">{item.year}</span>
              <h3 className="text-xl font-semibold text-[var(--text-main)]">{item.title}</h3>
              <p className="text-sm font-medium text-[var(--text-soft)] mt-1 flex gap-2 items-center">
                <MapPin size={16} /> {item.subtitle}
              </p>
              <p className="mt-4 text-sm leading-relaxed text-[var(--text-soft)]">{item.desc}</p>
            </div>
          </motion.div>
        );
      })}
    </div>
  </section>
);

const SkillsSection = () => (
  <section id="skills" className="py-24 px-6 max-w-[1200px] mx-auto">
    <div className="mb-16 md:text-center">
      <h2 className="text-3xl md:text-5xl font-semibold tracking-tight">Compétences <span className="text-[var(--accent)]">.</span></h2>
      <p className="mt-4 text-[var(--text-soft)] font-mono text-sm max-w-xl md:mx-auto">
        Technologies et outils que je maîtrise.
      </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {SKILLS.map((block, i) => {
        const Icon = block.icon;
        return (
          <motion.div 
            key={i}
            className="glass-panel p-8 rounded-3xl flex flex-col hover:border-[rgba(var(--accent-rgb),0.3)] transition-colors"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.6 }}
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-[var(--panel-bg)] border border-[var(--border-strong)] flex items-center justify-center">
                <Icon size={24} className="text-[var(--accent)]" />
              </div>
              <h3 className="text-lg font-semibold leading-tight flex-1">{block.category}</h3>
              <span className="text-2xl font-bold text-[var(--border-strong)] font-mono">{block.items.length}</span>
            </div>
            
            <div className="flex flex-wrap gap-2 mt-auto">
              {block.items.map(skill => (
                <span key={skill} className="px-3 py-1.5 rounded-md bg-[var(--panel-bg)] border border-[var(--border-subtle)] text-sm font-mono text-[var(--text-soft)] hover:text-[var(--text-main)] hover:bg-[var(--panel-inset)] transition-colors">
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>
        );
      })}
    </div>
    
    {/* Micro-interaction decoration */}
    <div className="mt-12 overflow-hidden py-8 border-y border-[var(--border-subtle)] relative">
      <div className="absolute inset-0 bg-gradient-to-r from-[var(--bg-base)] via-transparent to-[var(--bg-base)] z-10 pointer-events-none" />
      <div className="marquee-container">
         <div className="marquee-content font-mono text-xl tracking-widest text-[var(--text-soft)] opacity-20">
            <span>DEVELOPPEMENT</span><span>•</span>
            <span>ALGORITHMIQUE</span><span>•</span>
            <span>INTEGRATION WEB</span><span>•</span>
            <span>UI/UX</span><span>•</span>
            <span>BACKEND</span><span>•</span>
            <span>LOGICIEL</span><span>•</span>
         </div>
         <div className="marquee-content font-mono text-xl tracking-widest text-[var(--text-soft)] opacity-20" aria-hidden="true">
            <span>DEVELOPPEMENT</span><span>•</span>
            <span>ALGORITHMIQUE</span><span>•</span>
            <span>INTEGRATION WEB</span><span>•</span>
            <span>UI/UX</span><span>•</span>
            <span>BACKEND</span><span>•</span>
            <span>LOGICIEL</span><span>•</span>
         </div>
      </div>
    </div>
  </section>
);

const ProjectsSection = () => {
  const [filter, setFilter] = useState('Tous');
  const categories = ['Tous', ...Array.from(new Set(PROJECTS.map(p => p.category)))];
  
  const filtered = filter === 'Tous' ? PROJECTS : PROJECTS.filter(p => p.category === filter);

  return (
    <section id="projects" className="py-24 px-6 max-w-[1200px] mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div>
           <h2 className="text-3xl md:text-5xl font-semibold tracking-tight">Mes Projets <span className="text-[var(--accent)]">.</span></h2>
           <p className="mt-4 text-[var(--text-soft)] font-mono text-sm max-w-xl">
             Réalisations récentes en logiciel, web et game dev.
           </p>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors ${
                filter === cat 
                  ? 'bg-[var(--text-main)] text-[var(--bg-base)] border-[var(--text-main)]' 
                  : 'bg-transparent text-[var(--text-soft)] border-[var(--border-strong)] hover:border-[var(--border-strong)]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <AnimatePresence mode="popLayout">
          {filtered.map(proj => (
            <motion.a
              href={proj.link}
              key={proj.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ type: "spring", bounce: 0.3, duration: 0.6 }}
              className="group block glass-panel p-8 rounded-3xl hover-lift relative overflow-hidden"
            >
              {/* Overlay glow */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-[rgba(var(--accent-rgb),0.1)] blur-[60px] rounded-full pointer-events-none group-hover:bg-[rgba(var(--accent-rgb),0.2)] transition-colors" />
              
              <div className="flex justify-between items-start mb-6 relative z-10">
                <span className="text-xs font-mono text-[var(--text-soft)] border border-[var(--border-strong)] rounded-full px-3 py-1">
                  {proj.category}
                </span>
                <span className="w-8 h-8 rounded-full bg-[var(--panel-bg)] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <ArrowUpRight className="text-[var(--text-main)]" />
                </span>
              </div>

              {/* Image Overlay Feature */}
              {proj.image && (
                <div className="w-full h-48 mb-6 mt-2 rounded-xl overflow-hidden relative z-10 border border-[var(--border-strong)] group-hover:border-[rgba(var(--accent-rgb),0.3)] transition-colors">
                  <img src={proj.image} alt={proj.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                </div>
              )}

              <h3 className="text-2xl font-semibold text-[var(--text-main)] mb-3 relative z-10">{proj.title}</h3>
              <p className="text-[var(--text-soft)] text-sm leading-relaxed mb-8 relative z-10">{proj.desc}</p>
              
              <div className="flex flex-wrap gap-2 relative z-10">
                {proj.tags.map(t => (
                  <span key={t} className="text-xs font-medium text-[var(--accent)] bg-[rgba(var(--accent-rgb),0.1)] px-2.5 py-1 rounded-md">
                    {t}
                  </span>
                ))}
              </div>
            </motion.a>
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
};

const ContactSection = () => (
  <footer id="contact" className="border-t border-[var(--border-strong)] mt-24">
    <div className="max-w-[1200px] mx-auto px-6 py-20 flex flex-col md:flex-row justify-between items-center gap-8">
      <div className="text-center md:text-left">
        <h2 className="text-3xl font-semibold mb-2">Envie de collaborer ?</h2>
        <p className="text-[var(--text-soft)] text-sm">Je suis ouvert aux discussions pour de nouveaux projets ou opportunités (stage, alternance).</p>
      </div>
      
      <div className="flex items-center gap-4">
        <a href="https://github.com" target="_blank" className="w-12 h-12 rounded-full glass-panel flex items-center justify-center text-[var(--text-main)] hover:text-[var(--accent)] hover:border-blue-400/30 transition-colors">
          <GithubLogo size={24} weight="fill" />
        </a>
        <a href="https://linkedin.com" target="_blank" className="w-12 h-12 rounded-full glass-panel flex items-center justify-center text-[var(--text-main)] hover:text-[var(--accent)] hover:border-blue-400/30 transition-colors">
          <LinkedinLogo size={24} weight="fill" />
        </a>
        <a href="mailto:nom@exemple.com" className="px-6 py-3 rounded-full bg-[var(--text-main)] text-[var(--bg-base)] font-semibold text-sm hover:scale-[1.02] transition-transform">
          Envoyer un message
        </a>
      </div>
    </div>
    <div className="border-t border-[var(--border-subtle)] py-6 text-center text-xs font-mono text-[var(--text-soft)]">
      © {new Date().getFullYear()} Chenallet Jérôme. Design inspiré & repensé.
    </div>
  </footer>
);

export default function App() {
  return (
    <div className="text-[var(--text-main)] font-sans antialiased selection:bg-[rgba(var(--accent-rgb),0.3)]">
      <CustomCursor />
      <ThemeSettings />
      <Background3D />
      <NavBar />
      <main>
        <HeroSection />
        <TimelineSection />
        <ProjectsSection />
        <SkillsSection />
      </main>
      <ContactSection />
    </div>
  );
}
