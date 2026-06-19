import { useState, useEffect, useRef } from "react";
import "./index.css";

const NAV_LINKS = ["About", "Projects", "Skills", "Contact"];

const PROJECTS = [
  {
    title: "Student LMS",
    tag: "MERN Stack",
    desc: "Full-stack Learning Management System with role-based access for Admins, Teachers, and Students. Secure JWT auth, RESTful APIs for users/classes/courses/enrollments, and MongoDB Atlas cloud storage.",
    tech: ["React", "Node.js", "Express", "MongoDB", "JWT"],
    color: "#6C63FF",
    icon: "⬡",
    github: "https://github.com/ahmad-1725",
  },
  {
    title: "DigiStore",
    tag: "E-Commerce",
    desc: "Full-stack e-commerce app with JWT auth, product management, search/filter/pagination, cart & order system, product reviews, Admin Dashboard, and role-based API authorization.",
    tech: ["React", "Node.js", "Express", "MongoDB", "Tailwind"],
    color: "#00C9A7",
    icon: "◈",
    github: "https://github.com/ahmad-1725",
  },
  {
    title: "Smart Expense Tracker",
    tag: "AI-Powered",
    desc: "AI-powered expense tracker with interactive spending charts, AI-generated financial insights, and budgeting recommendations. Full MERN stack with JWT auth and responsive Tailwind dashboard.",
    tech: ["React", "Node.js", "MongoDB", "AI/ML", "Tailwind"],
    color: "#FF6B6B",
    icon: "◉",
    github: "https://github.com/ahmad-1725",
  },
  {
    title: "Article Summarizer",
    tag: "Python / Flask",
    desc: "Web app that auto-summarizes articles from any URL using Flask and Playwright. Achieved 35% increase in data accuracy and 40% reduction in processing time through automated content extraction.",
    tech: ["Python", "Flask", "Playwright", "REST API"],
    color: "#FFB347",
    icon: "◆",
    github: "https://github.com/ahmad-1725",
  },
  {
    title: "Job Tracker",
    tag: "React",
    desc: "React application for managing job applications with full CRUD operations, form validation, state management, and a responsive UI to track application statuses at a glance.",
    tech: ["React", "JavaScript", "CSS"],
    color: "#A78BFA",
    icon: "◇",
    github: "https://github.com/ahmad-1725",
  },
];

const SKILLS = {
  Frontend: ["React.js", "JavaScript", "HTML & CSS", "Tailwind CSS", "Bootstrap"],
  Backend: ["Node.js", "Express.js", "REST APIs", "PHP", "Python / Flask"],
  Database: ["MongoDB", "MongoDB Atlas", "MySQL", "phpMyAdmin", "SQL"],
  Tools: ["Git & GitHub", "Playwright", "JWT Auth", "Assembly", "C++"],
};

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
}

function FadeIn({ children, delay = 0, className = "" }) {
  const [ref, inView] = useInView();
  return (
    <div ref={ref} className={className} style={{
      opacity: inView ? 1 : 0,
      transform: inView ? "translateY(0)" : "translateY(28px)",
      transition: `opacity 0.65s ease ${delay}s, transform 0.65s ease ${delay}s`,
    }}>
      {children}
    </div>
  );
}

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);
  const scrollTo = (id) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };
  return (
    <nav className={`navbar ${scrolled ? "navbar--scrolled" : ""}`}>
      <div className="navbar__inner">
        <span className="navbar__logo" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
          <span className="logo-bracket">&lt;</span>Ahmad<span className="logo-bracket">/&gt;</span>
        </span>
        <ul className="navbar__links">
          {NAV_LINKS.map((l) => <li key={l}><button onClick={() => scrollTo(l)}>{l}</button></li>)}
        </ul>
        {/* <a className="navbar__cta" href="mailto:ahmadd.ilyas25@gmail.com">Hire me</a> */}
        <button className="navbar__burger" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
          <span /><span /><span />
        </button>
      </div>
      {menuOpen && (
        <div className="navbar__mobile">
          {NAV_LINKS.map((l) => <button key={l} onClick={() => scrollTo(l)}>{l}</button>)}
          <button className="mobile-cta" onClick={() => scrollTo("Contact")}>Hire me →</button>
        </div>
      )}
    </nav>
  );
}

function Hero() {
  const [typed, setTyped] = useState("");
  const roles = ["Full-Stack Developer", "MERN Stack Developer", "Problem Solver","BS-IT Student"];
  const roleIdx = useRef(0);
  const charIdx = useRef(0);
  const deleting = useRef(false);
  useEffect(() => {
    let timeout;
    const tick = () => {
      const current = roles[roleIdx.current];
      if (!deleting.current) {
        setTyped(current.slice(0, charIdx.current + 1));
        charIdx.current++;
        if (charIdx.current === current.length) {
          deleting.current = true;
          timeout = setTimeout(tick, 1800);
          return;
        }
      } else {
        setTyped(current.slice(0, charIdx.current - 1));
        charIdx.current--;
        if (charIdx.current === 0) {
          deleting.current = false;
          roleIdx.current = (roleIdx.current + 1) % roles.length;
        }
      }
      timeout = setTimeout(tick, deleting.current ? 55 : 90);
    };
    timeout = setTimeout(tick, 400);
    return () => clearTimeout(timeout);
  }, []);
  return (
    <section className="hero" id="about">
      <div className="hero__bg">
        {[...Array(6)].map((_, i) => <div key={i} className={`blob blob--${i + 1}`} />)}
      </div>
      <div className="hero__content">
        <h1 className="hero__name">Hi, I'm <span className="hero__highlight">Ahmad Ilyas</span></h1>
        <div className="hero__role"><span>{typed}</span><span className="cursor">|</span></div>
        <p className="hero__sub">
          BS-IT student at University of Gujrat, building full-stack web applications with the MERN stack. Passionate about AI-powered tools and shipping software that solves real problems.
        </p>
        <div className="hero__certs">
          <span className="cert-badge">🏅 IBM Full Stack Developer</span>
          <span className="cert-badge">🏅 IBM Front-End Developer</span>
        </div>
        <div className="hero__actions">
          <button className="btn btn--primary" onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}>
            See my work →
          </button>
          <a className="btn btn--ghost" href="/Ahmad_Ilyas___Resume.pdf" >Download CV</a>
        </div>
        <div className="hero__socials">
          <a href="https://github.com/ahmad-1725" target="_blank" rel="noopener noreferrer" aria-label="GitHub"><GithubIcon /></a>
          <a href="https://www.linkedin.com/in/ahmadd-ilyas" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><LinkedInIcon /></a>
          <a href="mailto:ahmadd.ilyas25@gmail.com" aria-label="Email"><MailIcon /></a>
        </div>
      </div>
      <div className="hero__visual">
        <div className="code-card">
          <div className="code-card__dots">
            <span style={{ background: "#ff5f57" }} />
            <span style={{ background: "#ffbd2e" }} />
            <span style={{ background: "#28c840" }} />
          </div>
          <pre className="code-card__body">{`const ahmad = {
  name: "Ahmad Ilyas",
  role: "Full-Stack Dev",
  stack: "MERN",
  gpa: 3.82,
  university: "UOG",
  certifications: [
    "IBM Full Stack",
    "IBM Front-End"
  ],
  available: true 🚀
};`}</pre>
        </div>
      </div>
    </section>
  );
}

function Projects() {
  return (
    <section className="section projects" id="projects">
      <div className="container">
        <FadeIn>
          <p className="section__eyebrow">What I've built</p>
          <h2 className="section__title">Projects</h2>
        </FadeIn>
        <div className="projects__grid">
          {PROJECTS.map((p, i) => (
            <FadeIn key={p.title} delay={i * 0.1}>
              <div className="project-card" style={{ "--accent": p.color }}>
                <div className="project-card__top">
                  <span className="project-card__icon" style={{ color: p.color }}>{p.icon}</span>
                  <span className="project-card__tag">{p.tag}</span>
                </div>
                <h3 className="project-card__title">{p.title}</h3>
                <p className="project-card__desc">{p.desc}</p>
                <div className="project-card__tech">
                  {p.tech.map((t) => <span key={t} className="tech-pill">{t}</span>)}
                </div>
                <div className="project-card__links">
                  <a href={p.github} className="card-link" target="_blank" rel="noopener noreferrer">
                    <GithubIcon size={16} /> View on GitHub →
                  </a>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

function Skills() {
  return (
    <section className="section skills" id="skills">
      <div className="container">
        <FadeIn>
          <p className="section__eyebrow">What I work with</p>
          <h2 className="section__title">Skills</h2>
        </FadeIn>
        <div className="skills__grid">
          {Object.entries(SKILLS).map(([cat, items], i) => (
            <FadeIn key={cat} delay={i * 0.1}>
              <div className="skills__card">
                <h3 className="skills__cat">{cat}</h3>
                <ul className="skills__list">
                  {items.map((s) => (
                    <li key={s} className="skills__item">
                      <span className="skills__dot" />
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>
          ))}
        </div>
        <FadeIn delay={0.2}>
          <div className="edu-card">
            <div className="edu-card__left">
              <span className="edu-icon">🎓</span>
              <div>
                <p className="edu-card__degree">BS in Information Technology</p>
                <p className="edu-card__school">University of Gujrat</p>
              </div>
            </div>
            <div className="edu-card__right">
              <span className="edu-card__gpa">3.82 GPA</span>
              <span className="edu-card__year">2023 – 2027</span>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const submit = (e) => { e.preventDefault(); setSent(true); };
  return (
    <section className="section contact" id="contact">
      <div className="container container--narrow">
        <FadeIn>
          <p className="section__eyebrow">Get in touch</p>
          <h2 className="section__title">Let's work together</h2>
          <p className="contact__sub">
            I'm actively looking for full-stack roles, internships, and freelance projects. Whether you have an opportunity or just want to connect — I'd love to hear from you.
          </p>
        </FadeIn>
        <FadeIn delay={0.15}>
          {sent ? (
            <div className="contact__success">
              <span className="success-icon">✓</span>
              <h3>Message sent!</h3>
              <p>Thanks for reaching out, I'll reply within 24 hours.</p>
            </div>
          ) : (
            <form className="contact__form" onSubmit={submit} name="contact" method="POST" data-netlify="true">
              <input type="hidden" name="form-name" value="contact" />
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input id="name" name="name" type="text" placeholder="Jane Smith" required value={form.name} onChange={handle} />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input id="email" name="email" type="email" placeholder="jane@company.com" required value={form.email} onChange={handle} />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea id="message" name="message" rows="5" placeholder="Tell me about the opportunity..." required value={form.message} onChange={handle} />
              </div>
              <button type="submit" className="btn btn--primary btn--full">Send message →</button>
            </form>
          )}
        </FadeIn>
        <FadeIn delay={0.25}>
          <div className="contact__alts">
            <a href="mailto:ahmadd.ilyas25@gmail.com" className="alt-link"><MailIcon size={18} /> ahmadd.ilyas25@gmail.com</a>
            <a href="https://www.linkedin.com/in/ahmadd-ilyas" target="_blank" rel="noopener noreferrer" className="alt-link"><LinkedInIcon size={18} /> LinkedIn</a>
            <a href="https://github.com/ahmad-1725" target="_blank" rel="noopener noreferrer" className="alt-link"><GithubIcon size={18} /> github.com/ahmad-1725</a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <span className="navbar__logo">
          <span className="logo-bracket">&lt;</span>Ahmad<span className="logo-bracket">/&gt;</span>
        </span>
        <p className="footer__copy">© {new Date().getFullYear()} Ahmad Ilyas · Full-Stack Developer · Jhelum, Pakistan</p>
      </div>
    </footer>
  );
}

const GithubIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);
const LinkedInIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);
const MailIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Projects />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
