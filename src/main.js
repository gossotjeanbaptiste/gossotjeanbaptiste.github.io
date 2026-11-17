import './style.css';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger, SplitText);
window.__booted = true; // désactive le filet de sécurité du <head>

const $ = (s, root = document) => root.querySelector(s);
const $$ = (s, root = document) => [...root.querySelectorAll(s)];

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const finePointer = window.matchMedia('(pointer: fine)').matches;

/* ============================================================
   DONNÉES PROJETS (les textes viennent des fichiers i18n)
   ============================================================ */
// badge : 'school' (défaut), 'personal', 'duo' · logo : image carrée affichée en entier
const BADGES = {
  school: 'border-white/15 bg-ink/50 text-slate-300',
  personal: 'border-amber-300/40 bg-amber-300/15 text-amber-200',
  duo: 'border-violet-300/40 bg-violet-300/15 text-violet-200',
};

// Ordre : projets perso puis projets Epitech, chacun du plus récent au plus ancien
// date : mois de création du dépôt (orgas Epitech pour les projets d'école)
const PROJECTS = [
  { key: 'lmagent', date: '11/2026', img: 'lmagent.webp', logo: true, repo: 'agent-alternance', badge: 'duo', tech: ['Python', 'Flask', 'LM Studio', 'IA locale'] },
  { key: 'echoingvoid', date: '07/2026', img: 'echoing_void.webp', repo: 'Echoing_Void', badge: 'personal', tech: ['Java', 'Fabric', 'Gradle', 'Minecraft'] },
  { key: 'mycms', date: '12/2025', img: 'mycms.webp', logo: true, repo: 'MyCMS', badge: 'personal', tech: ['Python', 'Flask', 'JavaScript', 'Git', 'Windows (.msi)'] },
  { key: 'zappy', date: '05/2026', img: 'zappy.webp', repo: 'Zappy', tech: ['C', 'C++', 'Python', 'TCP'] },
  { key: 'raytracer', date: '04/2026', img: 'raytracer.webp', repo: 'Raytracer', tech: ['C++', 'Multithreading', 'STL'] },
  { key: 'arcade', date: '03/2026', img: 'arcade.webp', repo: 'Arcade', tech: ['C++', 'ncurses', 'SDL2', 'raylib'] },
  { key: 'wolf3d', date: '04/2025', img: 'wolf3D.webp', repo: 'Wolf3D', tech: ['C', 'CSFML', 'Raycasting', '3D'] },
  { key: 'organized', date: '11/2024', img: 'organized.webp', repo: 'Organized', tech: ['C', 'Listes chaînées', 'Gestion mémoire'] },
];

function renderProjects() {
  $('#project-grid').innerHTML = PROJECTS.map(p => `
    <article class="project-card group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] [transform-style:preserve-3d]">
      <div class="relative aspect-[16/9] overflow-hidden">
        ${p.logo ? `
        <div class="absolute inset-0 grid place-items-center bg-[radial-gradient(circle_at_50%_60%,rgb(79_179_217/0.25),transparent_65%)]">
          <img src="/images/projects/${p.img}" alt="${p.repo}" loading="lazy"
               class="size-28 object-contain drop-shadow-[0_10px_30px_rgb(79_179_217/0.35)] transition-[scale] duration-700 group-hover:scale-110 sm:size-32">
        </div>` : `
        <img src="/images/projects/${p.img}" alt="${p.repo}" loading="lazy"
             class="project-img absolute -top-[10%] left-0 h-[120%] w-full object-cover transition-[scale] duration-700 group-hover:scale-110">`}
        <div class="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-transparent"></div>
        <span class="absolute top-4 left-5 text-sm font-black text-white/70">${p.date}</span>
        <span class="absolute top-3 right-4 rounded-full border px-3 py-1 text-xs font-semibold backdrop-blur ${BADGES[p.badge || 'school']}" data-i18n="projects.${p.badge || 'school'}"></span>
      </div>
      <div class="relative p-6 [transform:translateZ(40px)]">
        <div class="mb-3 flex items-center justify-between gap-4">
          <h3 class="text-2xl font-bold text-white" data-i18n="project.${p.key}.title"></h3>
          <a href="https://github.com/gossotjeanbaptiste/${p.repo}" target="_blank" rel="noopener" data-magnetic
             class="group/btn flex shrink-0 items-center gap-2 rounded-full border border-white/15 px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-white hover:text-ink">
            <img src="/images/icons/github_ico.svg" alt="" class="size-4 invert group-hover/btn:invert-0"><span data-i18n="projects.viewCode">Voir le code</span>
          </a>
        </div>
        <p class="text-sm leading-relaxed text-slate-400" data-i18n="project.${p.key}.text"></p>
        <ul class="mt-4 grid gap-1 text-sm text-slate-300">
          ${[1, 2, 3, 4].map(n => `<li class="flex gap-2"><span class="text-brand-light">▹</span><span data-i18n="project.${p.key}.li${n}"></span></li>`).join('')}
        </ul>
        <div class="mt-5 flex flex-wrap gap-2">
          ${p.tech.map(t => `<span class="rounded-full bg-brand/20 px-3 py-1 text-xs font-medium text-brand-light">${t}</span>`).join('')}
        </div>
      </div>
      <div class="tilt-glare pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
    </article>`).join('');
}

/* ============================================================
   I18N (réutilise public/i18n/*.json)
   ============================================================ */
const i18n = { lang: safeGet('lang') || 'fr', dict: {} };

function safeGet(k) { try { return localStorage.getItem(k); } catch { return null; } }
function safeSet(k, v) { try { localStorage.setItem(k, v); } catch { /* ignore */ } }

async function loadTranslations() {
  const [fr, en] = await Promise.all(['fr', 'en'].map(l => fetch(`/i18n/${l}.json`).then(r => r.json())));
  i18n.dict = { fr, en };
}

function applyTranslations() {
  const dict = i18n.dict[i18n.lang];
  if (!dict) return;
  $$('[data-i18n]').forEach(el => {
    const text = dict[el.dataset.i18n];
    if (text === undefined) return;
    if (el.tagName === 'IMG') el.alt = text;
    else if (el.tagName === 'TITLE') el.textContent = text;
    else el.innerHTML = text;
  });
  $$('[data-i18n-title]').forEach(el => {
    const text = dict[el.dataset.i18nTitle];
    if (text !== undefined) el.title = text;
  });
  document.documentElement.lang = i18n.lang;
  // Le drapeau affiché = la langue vers laquelle on bascule
  $('#language-toggle img').src = i18n.lang === 'fr' ? '/images/flags/USUK.svg' : '/images/flags/FR.svg';
}

/* ============================================================
   SMOOTH SCROLL (Lenis) synchronisé avec GSAP
   ============================================================ */
let lenis = null;
function initSmoothScroll() {
  if (reduceMotion) return;
  lenis = new Lenis({ anchors: true, lerp: 0.1 });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add(t => lenis.raf(t * 1000));
  gsap.ticker.lagSmoothing(0);
}

/* ============================================================
   INTRO DU HERO (jouée une seule fois)
   ============================================================ */
function playIntro() {
  if (reduceMotion) {
    gsap.set('.reveal-init', { autoAlpha: 1 });
    return;
  }
  const first = SplitText.create('#name-first', { type: 'chars', mask: 'chars', aria: 'hidden' }); // le nom complet est porté par l'aria-label du <h1>

  gsap.timeline({ defaults: { ease: 'expo.out', duration: 1.2 } })
    .set('.reveal-init', { autoAlpha: 1 })
    .from('.hero-avatar', { scale: 0, rotate: -180, duration: 1.4, ease: 'back.out(1.6)', clearProps: 'transform' })
    .from('.hero-hello', { y: 20, autoAlpha: 0 }, '-=0.9')
    .from(first.chars, { yPercent: 110, rotate: 12, stagger: 0.035 }, '-=0.9')
    .from('#name-last', { yPercent: 110, duration: 1.4 }, '-=1')
    .from(['.hero-role', '.hero-tagline', '.hero-cta'], { y: 30, autoAlpha: 0, stagger: 0.12 }, '-=1')
    .from('#nav', { y: -100, autoAlpha: 0 }, '-=1')
    .from('.hero-scroll', { autoAlpha: 0 }, '-=0.6');

  gsap.to('.scroll-dot', { y: 16, autoAlpha: 0, duration: 1.4, repeat: -1, ease: 'power2.in' });

  // Grille révélée par un spotlight qui suit la souris
  const grid = $('.grid-bg');
  $('#hero').addEventListener('pointermove', e => {
    const r = grid.getBoundingClientRect();
    grid.style.setProperty('--mx', `${e.clientX - r.left}px`);
    grid.style.setProperty('--my', `${e.clientY - r.top}px`);
  });
}

/* ============================================================
   ANIMATIONS AU SCROLL (reconstruites au changement de langue)
   ============================================================ */
function buildScrollAnimations() {
  const mm = gsap.matchMedia();

  mm.add({
    motion: '(prefers-reduced-motion: no-preference)',
    desktop: '(min-width: 1024px)',
  }, (ctx) => {
    const { motion, desktop } = ctx.conditions;
    if (!motion) {
      $$('.edu-dot').forEach(dot => dot.classList.add('is-lit'));
      return;
    }

    // --- Barre de progression ---
    gsap.to('#progress', { scaleX: 1, ease: 'none', scrollTrigger: { start: 0, end: 'max', scrub: 0.3 } });

    // --- Parallax de sortie du hero ---
    gsap.to('#hero > div.relative', {
      yPercent: 35, autoAlpha: 0, scale: 0.92, ease: 'none',
      scrollTrigger: { trigger: '#hero', start: 'top top', end: 'bottom top', scrub: true },
    });

    // --- Titres de section : lettres qui montent ---
    $$('.section-title').forEach(title => {
      const split = SplitText.create(title, { type: 'chars,words', mask: 'chars' });
      gsap.from(split.chars, {
        yPercent: 110, stagger: 0.02, duration: 0.9, ease: 'expo.out',
        scrollTrigger: { trigger: title, start: 'top 85%' },
      });
    });

    // --- À propos : mots qui s'allument au fil du scroll ---
    const about = SplitText.create('#about-text', { type: 'words', aria: 'none' }); // mots lus normalement, pas d'aria-label interdit sur <p>
    gsap.fromTo(about.words, { opacity: 0.12 }, {
      opacity: 1, stagger: 0.1, ease: 'none',
      scrollTrigger: { trigger: '#about-text', start: 'top 80%', end: 'bottom 45%', scrub: true },
    });
    gsap.from('#about .section-kicker', { x: -40, autoAlpha: 0, duration: 1, scrollTrigger: { trigger: '#about', start: 'top 80%' } });

    // --- Timeline du parcours : la ligne se dessine ---
    gsap.to('#timeline-line', {
      scaleY: 1, ease: 'none',
      scrollTrigger: { trigger: '#education .space-y-16', start: 'top 65%', end: 'bottom 65%', scrub: true },
    });
    $$('.edu-item').forEach((item, i) => {
      const fromX = desktop || window.innerWidth >= 768 ? (i % 2 ? 80 : -80) : 40;
      gsap.from($('.spotlight-card', item), {
        x: fromX, autoAlpha: 0, rotateY: i % 2 ? -15 : 15, duration: 1, ease: 'expo.out',
        scrollTrigger: { trigger: item, start: 'top 80%' },
      });
      // Le point s'allume quand la ligne (dont la pointe est à 65 % de l'écran) l'atteint.
      // Il reste toujours visible (atténué) : pas d'état invisible qui pourrait rester bloqué.
      const dot = $('.edu-dot', item);
      ScrollTrigger.create({
        trigger: dot, start: 'center 65%',
        onEnter: () => dot.classList.add('is-lit'),
        onLeaveBack: () => dot.classList.remove('is-lit'),
      });
    });

    // --- Expériences : scroll horizontal épinglé (desktop) ---
    if (desktop) {
      // Passe la section en mise en page horizontale (classes pinned: du HTML) avant de mesurer la piste
      $('#experiences').classList.add('exp-pinned');
      const track = $('#exp-track');
      const distance = () => track.scrollWidth - window.innerWidth;
      const horizontal = gsap.to(track, {
        x: () => -distance(), ease: 'none',
        scrollTrigger: {
          trigger: '#experiences', start: 'top top', end: () => `+=${distance()}`,
          pin: true, scrub: 1, invalidateOnRefresh: true,
        },
      });
      $$('.exp-card').forEach(card => {
        gsap.from(card, {
          rotateY: -25, scale: 0.85, autoAlpha: 0.2, transformPerspective: 1000, ease: 'power2.out',
          scrollTrigger: { trigger: card, containerAnimation: horizontal, start: 'left 100%', end: 'center 70%', scrub: true },
        });
      });
    } else {
      $$('.exp-card').forEach(card => {
        gsap.from(card, { y: 60, autoAlpha: 0, duration: 1, ease: 'expo.out', scrollTrigger: { trigger: card, start: 'top 85%' } });
      });
    }

    // --- Cartes projets : apparition en cascade + parallax des images ---
    gsap.set('.project-card', { autoAlpha: 0, y: 80 });
    ScrollTrigger.batch('.project-card', {
      start: 'top 88%',
      onEnter: batch => gsap.to(batch, { autoAlpha: 1, y: 0, stagger: 0.15, duration: 1.1, ease: 'expo.out' }),
    });
    $$('.project-img').forEach(img => {
      gsap.fromTo(img, { yPercent: -8 }, {
        yPercent: 8, ease: 'none',
        scrollTrigger: { trigger: img.parentElement, start: 'top bottom', end: 'bottom top', scrub: true },
      });
    });

    // --- Éléments génériques ---
    ScrollTrigger.batch('.fade-up, .contact-card', {
      start: 'top 90%',
      onEnter: batch => gsap.fromTo(batch, { autoAlpha: 0, y: 50 }, { autoAlpha: 1, y: 0, stagger: 0.08, duration: 0.9, ease: 'expo.out', overwrite: true }),
    });

    // --- Lien actif dans la nav ---
    $$('.nav-link').forEach(link => {
      const section = $(link.getAttribute('href'));
      if (!section) return;
      ScrollTrigger.create({
        trigger: section, start: 'top 50%', end: 'bottom 50%',
        onToggle: self => {
          link.classList.toggle('!text-white', self.isActive);
          link.classList.toggle('bg-white/10', self.isActive);
        },
      });
    });

    // Nettoyage (changement de langue, passage en mobile…) : retour à la grille par défaut
    return () => $('#experiences').classList.remove('exp-pinned');
  });

  return mm;
}

/* ============================================================
   MARQUEE dont la vitesse/direction suit le scroll
   ============================================================ */
function initMarquee() {
  const marquee = $('#marquee');
  const content = marquee.innerHTML;
  marquee.classList.remove('gap-12');
  marquee.innerHTML = `<div class="flex gap-12 pr-12">${content}</div>`.repeat(2);
  if (reduceMotion) return;

  const loop = gsap.to(marquee, { xPercent: -50, ease: 'none', duration: 30, repeat: -1 });
  loop.totalTime(loop.duration() * 100); // marge pour pouvoir jouer à l'envers
  ScrollTrigger.create({
    onUpdate(self) {
      const boost = gsap.utils.clamp(1, 6, 1 + Math.abs(self.getVelocity()) / 400);
      gsap.timeline()
        .to(loop, { timeScale: self.direction * boost, duration: 0.2, overwrite: true })
        .to(loop, { timeScale: self.direction, duration: 1.2 });
    },
  });
}

/* ============================================================
   INTERACTIONS SOURIS : curseur, boutons magnétiques, tilt 3D, spotlight
   ============================================================ */
function initPointerFx() {
  // Bordure lumineuse qui suit la souris
  document.addEventListener('pointermove', e => {
    const card = e.target.closest?.('.spotlight-card');
    if (!card) return;
    const r = card.getBoundingClientRect();
    card.style.setProperty('--x', `${e.clientX - r.left}px`);
    card.style.setProperty('--y', `${e.clientY - r.top}px`);
  });

  if (!finePointer || reduceMotion) return;

  // Curseur custom
  document.documentElement.classList.add('has-cursor');
  const dot = $('#cursor-dot');
  const ring = $('#cursor-ring');
  dot.classList.remove('hidden');
  ring.classList.remove('hidden');
  const dotX = gsap.quickTo(dot, 'x', { duration: 0.1 });
  const dotY = gsap.quickTo(dot, 'y', { duration: 0.1 });
  const ringX = gsap.quickTo(ring, 'x', { duration: 0.5, ease: 'power3' });
  const ringY = gsap.quickTo(ring, 'y', { duration: 0.5, ease: 'power3' });
  window.addEventListener('pointermove', e => { dotX(e.clientX); dotY(e.clientY); ringX(e.clientX); ringY(e.clientY); });
  document.addEventListener('pointerover', e => {
    const hit = e.target.closest('a, button');
    gsap.to(ring, { scale: hit ? 1.8 : 1, backgroundColor: hit ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0)', duration: 0.3 });
  });

  // Boutons magnétiques
  $$('[data-magnetic]').forEach(el => {
    const xTo = gsap.quickTo(el, 'x', { duration: 0.6, ease: 'elastic.out(1, 0.4)' });
    const yTo = gsap.quickTo(el, 'y', { duration: 0.6, ease: 'elastic.out(1, 0.4)' });
    el.addEventListener('pointermove', e => {
      const r = el.getBoundingClientRect();
      xTo((e.clientX - (r.left + r.width / 2)) * 0.35);
      yTo((e.clientY - (r.top + r.height / 2)) * 0.35);
    });
    el.addEventListener('pointerleave', () => { xTo(0); yTo(0); });
  });

  // Tilt 3D sur les cartes projets
  $$('.project-card').forEach(card => {
    gsap.set(card, { transformPerspective: 1200 });
    const rx = gsap.quickTo(card, 'rotationX', { duration: 0.6, ease: 'power3' });
    const ry = gsap.quickTo(card, 'rotationY', { duration: 0.6, ease: 'power3' });
    const glare = $('.tilt-glare', card);
    card.addEventListener('pointermove', e => {
      const r = card.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width;
      const py = (e.clientY - r.top) / r.height;
      ry((px - 0.5) * 12);
      rx((0.5 - py) * 12);
      glare.style.setProperty('--gx', `${px * 100}%`);
      glare.style.setProperty('--gy', `${py * 100}%`);
    });
    card.addEventListener('pointerleave', () => { rx(0); ry(0); });
  });
}

/* ============================================================
   MOBILE : tilt 3D des cartes projets piloté par l'orientation du téléphone
   ============================================================ */
function initDeviceTilt() {
  if (finePointer || reduceMotion || !('DeviceOrientationEvent' in window)) return;

  const MAX_TILT = 10;   // rotation max des cartes (degrés)
  const RANGE = 25;      // inclinaison du téléphone qui donne la rotation max (degrés)
  const cards = $$('.project-card').map(card => {
    gsap.set(card, { transformPerspective: 1200 });
    return {
      rx: gsap.quickTo(card, 'rotationX', { duration: 0.8, ease: 'power3' }),
      ry: gsap.quickTo(card, 'rotationY', { duration: 0.8, ease: 'power3' }),
      glare: $('.tilt-glare', card),
    };
  });

  // Position de référence : la façon dont l'utilisateur tient son téléphone.
  // Elle suit lentement la position réelle pour que l'effet se recentre tout seul.
  let base = null;
  const clamp = gsap.utils.clamp(-1, 1);

  const onOrientation = (e) => {
    if (e.beta == null || e.gamma == null) return;
    // En paysage, les axes sont inversés
    const angle = (screen.orientation?.angle ?? window.orientation ?? 0) % 360;
    let x = e.gamma, y = e.beta;
    if (angle === 90) [x, y] = [e.beta, -e.gamma];
    else if (angle === 270 || angle === -90) [x, y] = [-e.beta, e.gamma];

    if (!base) base = { x, y };
    base.x += (x - base.x) * 0.02;
    base.y += (y - base.y) * 0.02;

    const nx = clamp((x - base.x) / RANGE);
    const ny = clamp((y - base.y) / RANGE);
    const strength = Math.min(1, Math.hypot(nx, ny) * 1.5);

    cards.forEach(c => {
      c.ry(nx * MAX_TILT);
      c.rx(-ny * MAX_TILT);
      c.glare.style.setProperty('--gx', `${50 + nx * 50}%`);
      c.glare.style.setProperty('--gy', `${50 + ny * 50}%`);
      c.glare.style.opacity = strength;
    });
  };

  // --- Bouton activer / désactiver (choix mémorisé) ---
  const btn = $('#tilt-permission');
  const label = $('span', btn);
  const needsPermission = typeof DeviceOrientationEvent.requestPermission === 'function';
  let permitted = !needsPermission;
  let active = false;

  const setLabel = (key) => {
    label.dataset.i18n = key; // applyTranslations() reprendra la bonne clé au changement de langue
    const text = i18n.dict[i18n.lang]?.[key];
    if (text) label.innerHTML = text;
  };
  const render = () => {
    btn.setAttribute('aria-pressed', String(active));
    setLabel(active ? 'projects.disableTilt' : permitted ? 'projects.enableTiltShort' : 'projects.enableTilt');
  };
  const start = () => {
    active = true; base = null;
    window.addEventListener('deviceorientation', onOrientation);
    render();
  };
  const stop = () => {
    active = false;
    window.removeEventListener('deviceorientation', onOrientation);
    cards.forEach(c => { c.rx(0); c.ry(0); c.glare.style.opacity = 0; });
    render();
  };

  btn.classList.replace('hidden', 'inline-flex');
  btn.addEventListener('click', async () => {
    if (active) { stop(); safeSet('tilt', 'off'); return; }
    if (!permitted) {
      // iOS 13+ : l'accès aux capteurs doit être autorisé par un tap
      try { permitted = await DeviceOrientationEvent.requestPermission() === 'granted'; }
      catch (err) { console.warn('Orientation refusée', err); }
      if (!permitted) return;
    }
    start(); safeSet('tilt', 'on');
  });

  // Android : actif par défaut, sauf si l'utilisateur l'a désactivé. iOS : attend le tap.
  if (permitted && safeGet('tilt') !== 'off') start();
  else render();
}

/* ============================================================
   NAV : se cache en descendant, réapparaît en remontant
   ============================================================ */
function initNavHide() {
  const nav = $('#nav');
  let lastY = 0;
  let hidden = false;
  const onScroll = () => {
    const y = window.scrollY;
    const hide = y > lastY && y > 300;
    if (hide !== hidden) {
      hidden = hide;
      gsap.to(nav, { yPercent: hide ? -150 : 0, duration: 0.5, ease: 'power3.out', overwrite: 'auto' });
    }
    lastY = y;
  };
  if (lenis) lenis.on('scroll', onScroll); else window.addEventListener('scroll', onScroll, { passive: true });
}

/* ============================================================
   CHANGEMENT DE LANGUE avec transition
   ============================================================ */
let scrollAnims = null;
function initLanguageToggle() {
  $('#language-toggle').addEventListener('click', () => {
    const targets = ['main', 'footer'];
    // opacity seulement (pas autoAlpha) : un visibility:hidden sur <main> serait hérité par les cartes,
    // et GSAP enregistrerait alors « invisible » comme état final des animations reconstruites.
    gsap.to(targets, {
      opacity: 0, duration: 0.25, ease: 'power2.in',
      onComplete: () => {
        i18n.lang = i18n.lang === 'fr' ? 'en' : 'fr';
        safeSet('lang', i18n.lang);
        // On défait les SplitText, on traduit, puis on reconstruit les animations
        scrollAnims?.revert();
        applyTranslations();
        scrollAnims = buildScrollAnimations();
        ScrollTrigger.refresh();
        gsap.to(targets, { opacity: 1, duration: 0.4, ease: 'power2.out' });
      },
    });
  });
}

/* ============================================================
   LOGOS D'ENTREPRISE : initiales en secours si l'image manque
   ============================================================ */
function initCompanyLogos() {
  $$('.exp-logo').forEach(box => {
    const img = $('img', box);
    const fallback = () => {
      box.className = 'exp-logo grid size-16 place-items-center rounded-2xl bg-gradient-to-br from-brand to-violet-600 shadow-lg shadow-black/30';
      box.innerHTML = `<span class="text-lg font-black text-white">${box.dataset.initials}</span>`;
    };
    if (img.complete && img.naturalWidth === 0) fallback();
    else img.addEventListener('error', fallback, { once: true });
  });
}

/* ============================================================
   BOOT
   ============================================================ */
async function boot() {
  renderProjects();
  initCompanyLogos();
  try {
    await loadTranslations();
  } catch (err) {
    console.warn('Traductions indisponibles', err);
  }
  applyTranslations();
  await document.fonts.ready; // SplitText mesure mieux une fois la police chargée

  initSmoothScroll();
  initMarquee();
  initPointerFx();
  initDeviceTilt();
  initNavHide();
  initLanguageToggle();
  playIntro();
  scrollAnims = buildScrollAnimations();
  goToInitialHash();
}

// Arrivée via un lien #section : on y va une fois les pins GSAP en place (évite le saut de mise en page)
function goToInitialHash() {
  const hash = window.__initialHash;
  if (!hash) return;
  history.replaceState(null, '', hash);
  const target = document.querySelector(hash);
  if (!target) return;
  requestAnimationFrame(() => {
    ScrollTrigger.refresh();
    if (lenis) lenis.scrollTo(target, { immediate: true, force: true });
    else target.scrollIntoView();
  });
}

boot();
