import { useEffect, useMemo, useState, type FormEvent } from 'react';
import { ArrowDownRight, ArrowUpRight, Check, Code2, ExternalLink, Github, Layers3, Linkedin, Mail, MapPin, Menu, Phone, Send, Sparkles, X } from 'lucide-react';
import { Route, Switch, useLocation, Router as WouterRouter } from 'wouter';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';

const queryClient = new QueryClient();

type Project = {
  id: string;
  title: string;
  type: string;
  year: string;
  description: string;
  stack: string[];
  visual: string;
  category: string;
  media: string;
};

const mediaUrl = (filename: string) => `${import.meta.env.BASE_URL}media/${filename}`;

const projects: Project[] = [
  {
    id: '01',
    title: 'SaaS, but sharper.',
    type: 'Product systems',
    year: '2025',
    description: 'A focused interface system for a growing digital product: less noise, quicker decisions, a frontend built to stay out of the way.',
    stack: ['React', 'TypeScript', 'Node.js'],
    visual: 'visual-one',
    category: 'Frontend',
    media: 'project-01.webm',
  },
  {
    id: '02',
    title: 'Commerce in motion.',
    type: 'Full-stack build',
    year: '2025',
    description: 'A conversion-minded commerce experience with a flexible backend and the kind of small details that make browsing feel natural.',
    stack: ['MERN', 'REST API', 'UX'],
    visual: 'visual-two',
    category: 'Full stack',
    media: 'project-02.webm',
  },
  {
    id: '03',
    title: 'The freelance toolkit.',
    type: 'Independent work',
    year: 'Ongoing',
    description: 'Tailored digital experiences for people with a point of view. Strategy, interface, code — delivered as one considered piece.',
    stack: ['Discovery', 'UI direction', 'Deployment'],
    visual: 'visual-three',
    category: 'Freelance',
    media: 'project-03.webm',
  },
  {
    id: '04',
    title: 'Interfaces with a pulse.',
    type: 'Product direction',
    year: '2026',
    description: 'A collection of interaction studies exploring how motion, hierarchy, and a clear point of view can make digital products feel more human.',
    stack: ['Motion', 'Interaction', 'Visual design'],
    visual: 'visual-four',
    category: 'Frontend',
    media: 'project-04.webm',
  },
];

const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'Projects', href: '#projects' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' },
];

function useScrollReveal(dependencies: readonly unknown[] = [], selector = '.reveal') {
  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll<HTMLElement>(selector));
    if (!('IntersectionObserver' in window)) {
      nodes.forEach((node) => node.classList.add('in-view'));
      return;
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.14 });
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [selector, ...dependencies]);
}

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  const closeMenu = () => setMenuOpen(false);
  return (
    <header className={`nav-wrap ${scrolled ? 'scrolled' : ''}`} data-testid="site-header">
      <div className="container-wide nav-inner">
        <a href="#home" className="brand" onClick={closeMenu} data-testid="link-brand">
          <span className="brand-mark">AT</span>
          <span>afnes / taha</span>
        </a>
        <nav className={`nav-links ${menuOpen ? 'open' : ''}`} aria-label="Primary navigation">
          {navItems.map((item) => (
            <a key={item.href} className="nav-link" href={item.href} onClick={closeMenu} data-testid={`link-nav-${item.label.toLowerCase()}`}>
              {item.label}
            </a>
          ))}
          <a className="nav-cta" href="#contact" onClick={closeMenu} data-testid="link-nav-start">
            Start a conversation <ArrowUpRight size={14} />
          </a>
        </nav>
        <button className="menu-button" type="button" aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen} onClick={() => setMenuOpen((open) => !open)} data-testid="button-mobile-menu">
          {menuOpen ? <X size={21} /> : <Menu size={21} />}
        </button>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section id="home" className="hero" data-testid="section-home">
      <div className="container-wide hero-grid">
        <div>
          <div className="hero-kicker eyebrow"><span className="kicker-dot" /> Available for select collaborations / 2026</div>
          <h1 className="display">I build <em>digital</em><br /><span className="gradient-text">experiences</span><br />with intent.</h1>
          <p className="hero-copy">I’m Afnes Taha, a full stack developer from Jijel, Algeria. I turn sharp ideas into fast, tailored products that feel as good as they work.</p>
          <div className="hero-actions">
            <a className="button-primary" href="#projects" data-testid="link-hero-projects">See selected work <ArrowDownRight size={15} /></a>
            <a className="button-ghost" href="#contact" data-testid="link-hero-contact">Let’s talk <ArrowUpRight size={15} /></a>
          </div>
          <div className="hero-note"><Sparkles size={14} /> Currently CEO &amp; Web Developer at T/A Company</div>
        </div>
        <div className="portrait-wrap" aria-label="Art-directed portrait monogram for Afnes Taha" data-testid="portrait-area">
          <div className="portrait-card">
            <img className="portrait-photo" src={mediaUrl('afnes-taha-portrait.jpg')} alt="Afnes Taha overlooking the coast of Jijel" data-testid="image-portrait" />
            <div className="portrait-photo-overlay" />
            <div className="portrait-tag">Jijel, DZ · 36°49′N</div>
          </div>
          <div className="portrait-orbit" />
          <div className="hero-index">FULL STACK / 001</div>
        </div>
      </div>
    </section>
  );
}

function Ticker() {
  return (
    <div className="ticker" aria-label="Areas of practice" data-testid="ticker-skills">
      <div className="ticker-track">
        <strong>Full stack developer</strong><span className="ticker-separator">◆</span><span>MERN / React / Node</span><span className="ticker-separator">◆</span><span>Interfaces with a pulse</span><span className="ticker-separator">◆</span><strong>Jijel — Algeria</strong><span className="ticker-separator">◆</span><span>Full stack developer</span><span className="ticker-separator">◆</span><span>MERN / React / Node</span><span className="ticker-separator">◆</span><span>Interfaces with a pulse</span><span className="ticker-separator">◆</span><strong>Jijel — Algeria</strong>
      </div>
    </div>
  );
}

function Projects() {
  const [filter, setFilter] = useState('All');
  const filters = ['All', 'Frontend', 'Full stack', 'Freelance'];
  const filteredProjects = useMemo(() => filter === 'All' ? projects : projects.filter((project) => project.category === filter), [filter]);
  useScrollReveal([filter], '.project-card.reveal');
  return (
    <section id="projects" className="section" data-testid="section-projects">
      <div className="container-wide">
        <div className="section-heading reveal">
          <div><span className="eyebrow">02 / Selected work</span><h2 className="display">Things I’ve<br /><span className="gradient-text">made useful.</span></h2></div>
          <p>Selected directions from product builds, independent experiments, and work that found its shape in the browser.</p>
        </div>
        <div className="filter-row reveal delay-1" role="tablist" aria-label="Filter projects">
          {filters.map((item) => (
            <button key={item} className={`filter-button ${filter === item ? 'selected' : ''}`} role="tab" aria-selected={filter === item} onClick={() => setFilter(item)} data-testid={`button-filter-${item.toLowerCase().replace(' ', '-')}`}>
              {item}
            </button>
          ))}
        </div>
        <div className="project-grid" aria-live="polite">
          {filteredProjects.length > 0 ? filteredProjects.map((project, index) => (
            <article className={`project-card reveal delay-${(index % 3) + 1}`} key={project.id} data-testid={`card-project-${project.id}`}>
              <div className={`project-visual ${project.visual}`}>
                <video className="project-media" autoPlay muted loop playsInline preload="metadata" poster={mediaUrl('afnes-taha-portrait.jpg')} aria-label={`${project.title} project preview`} data-testid={`video-project-${project.id}`}>
                  <source src={mediaUrl(project.media)} type="video/webm" />
                </video>
                <div className="media-shade" />
              </div>
              <div className="project-content">
                <div className="project-top"><span className="project-type">{project.type}</span><span className="project-year">{project.year}</span></div>
                <div>
                  <h3 className="display">{project.title}</h3>
                  <p>{project.description}</p>
                  <div className="project-footer">
                    <div className="project-stack">{project.stack.map((tech) => <span className="stack-chip" key={tech}>{tech}</span>)}</div>
                    <a className="project-link" href="#contact" data-testid={`link-project-${project.id}`}>Discuss a build <ExternalLink size={13} /></a>
                  </div>
                </div>
              </div>
            </article>
          )) : <div className="project-empty" data-testid="empty-projects">No projects in this direction yet. Try another lens.</div>}
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="section about-section" data-testid="section-about">
      <div className="container-wide">
        <div className="section-heading reveal">
          <div><span className="eyebrow">03 / The person behind the pixels</span><h2 className="display">Curious by<br /><span className="gradient-text">default.</span></h2></div>
          <p>From the north coast of Algeria, working across the full stack with a strong bias for clarity.</p>
        </div>
        <div className="about-layout">
          <p className="about-lead reveal delay-1">Good software is a conversation between <span>people, systems,</span> and a little bit of nerve.</p>
          <div className="reveal delay-2">
            <p className="about-copy">I care about the space where a product’s story meets its technical reality. That means asking better questions, shaping a clean interface, and building the sturdy systems underneath it. I work comfortably from the first rough idea to the last deployed detail.</p>
            <div className="timeline" aria-label="Work experience">
              <div className="timeline-item" data-testid="experience-ta-company"><span className="timeline-date">DEC 2025 — NOW</span><div><h3 className="timeline-role">CEO &amp; Web Developer</h3><span className="timeline-place">T/A Company</span></div><span className="timeline-status">Current</span></div>
              <div className="timeline-item" data-testid="experience-softwear"><span className="timeline-date">JAN 2026</span><div><h3 className="timeline-role">Web Developer Intern</h3><span className="timeline-place">Softwear</span></div><span className="timeline-status">Experience</span></div>
              <div className="timeline-item" data-testid="experience-mern"><span className="timeline-date">ONGOING</span><div><h3 className="timeline-role">MERN &amp; Freelance Developer</h3><span className="timeline-place">Independent practice</span></div><span className="timeline-status">Building</span></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Skills() {
  return (
    <section id="skills" className="section" data-testid="section-skills">
      <div className="container-wide">
        <div className="section-heading reveal">
          <div><span className="eyebrow">04 / Toolkit</span><h2 className="display">Range, with<br /><span className="gradient-text">restraint.</span></h2></div>
          <p>Enough range to see the whole system. Enough restraint to know what it actually needs.</p>
        </div>
        <div className="skills-layout reveal delay-1">
          <div className="skill-cell"><Code2 className="skill-icon" size={22} /><h3>Frontend craft</h3><p>Interfaces that are fast, expressive, responsive, and quietly obsessive about the details.</p><div className="skill-list"><span>React</span><span>TypeScript</span><span>HTML / CSS</span><span>UI systems</span></div></div>
          <div className="skill-cell"><Layers3 className="skill-icon" size={22} /><h3>Full stack thinking</h3><p>Clean flows from browser to database, with APIs that are simple to reason about.</p><div className="skill-list"><span>Node.js</span><span>Express</span><span>MongoDB</span></div></div>
          <div className="skill-cell"><Sparkles className="skill-icon" size={22} /><h3>Product instinct</h3><p>Turning a fuzzy brief into a focused experience people can understand at a glance.</p><div className="skill-list"><span>Direction</span><span>UX sense</span><span>Iteration</span></div></div>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const [feedback, setFeedback] = useState('');
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get('name') ?? '');
    const email = String(data.get('email') ?? '');
    const message = String(data.get('message') ?? '');
    const subject = `Project inquiry from ${name}`;
    const body = `Hi Afnes,%0D%0A%0D%0A${encodeURIComponent(message)}%0D%0A%0D%0AReply to: ${encodeURIComponent(email)}`;
    setFeedback('Opening your email client — see you in the thread.');
    window.location.href = `mailto:afnesuniv@gmail.com?subject=${encodeURIComponent(subject)}&body=${body}`;
  };
  return (
    <section id="contact" className="section contact-section" data-testid="section-contact">
      <div className="container-wide">
        <div className="contact-panel reveal">
          <div>
            <span className="eyebrow">05 / Make something real</span>
            <h2 className="display contact-title">Have a good<br /><span className="gradient-text">problem?</span></h2>
            <p className="contact-copy">Tell me where you’re going, what’s getting in the way, or just send a hello. I’ll bring curiosity, structure, and a working browser.</p>
            <div className="contact-details">
              <a className="contact-detail" href="mailto:afnesuniv@gmail.com" data-testid="link-email"><Mail size={14} /> afnesuniv@gmail.com</a>
              <a className="contact-detail" href="tel:+213666630179" data-testid="link-phone"><Phone size={14} /> +213 666 63 01 79</a>
              <span className="contact-detail" data-testid="text-location"><MapPin size={14} /> Jijel, Algeria</span>
            </div>
          </div>
          <form className="contact-form" onSubmit={handleSubmit} data-testid="form-contact">
            <label className="field-label">Your name<input className="field-input" name="name" type="text" placeholder="How should I call you?" required data-testid="input-name" /></label>
            <label className="field-label">Your email<input className="field-input" name="email" type="email" placeholder="you@company.com" required data-testid="input-email" /></label>
            <label className="field-label">The brief<textarea className="field-input" name="message" placeholder="A few words about the thing you want to make..." required data-testid="input-message" /></label>
            <button className="button-primary form-submit" type="submit" data-testid="button-submit-contact">Send the note <Send size={14} /></button>
            <div className="form-feedback" role="status" data-testid="status-contact-form">{feedback}</div>
          </form>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="container-wide footer-inner">
        <span className="footer-copy">© {new Date().getFullYear()} Afnes Taha. Built in Jijel.</span>
        <div className="footer-links">
          <a className="footer-link" href="https://github.com/afnestaha" target="_blank" rel="noreferrer" data-testid="link-github"><Github size={14} /> GitHub</a>
          <a className="footer-link" href="https://www.linkedin.com/in/afnestaha/" target="_blank" rel="noreferrer" data-testid="link-linkedin"><Linkedin size={14} /> LinkedIn</a>
          <a className="footer-link" href="#home" data-testid="link-back-top">Back to top <ArrowUpRight size={13} /></a>
        </div>
      </div>
    </footer>
  );
}

function Home() {
  useScrollReveal();
  return (
    <div className="site-shell">
      <Header />
      <main>
        <Hero />
        <Ticker />
        <Projects />
        <About />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

function Router() {
  const [location] = useLocation();
  return (
    <ErrorBoundary resetKey={location}>
      <Switch>
        <Route path="/" component={Home} />
        <Route component={NotFound} />
      </Switch>
    </ErrorBoundary>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;