# 🌟 Portfolio de Jean-Baptiste GOSSOT

[![Deploy to GitHub Pages](https://github.com/gossotjeanbaptiste/gossotjeanbaptiste.github.io/actions/workflows/deploy.yml/badge.svg)](https://github.com/gossotjeanbaptiste/gossotjeanbaptiste.github.io/actions/workflows/deploy.yml)

👉 **[gossotjeanbaptiste.github.io](https://gossotjeanbaptiste.github.io/)**

Étudiant développeur à Epitech Nancy, je cherche une **alternance d'un an** en développement, en Lorraine ou dans le Bas-Rhin. Ce site présente mon parcours, mes expériences et mes projets.

🇬🇧 [English version below](#-english-version)

## ✨ Ce qu'il y a sur le site

- 👋 **Hero animé** : avatar, nom révélé lettre par lettre, présentation
- 🎓 **Parcours** : timeline qui se dessine au scroll, avec des points qui s'allument
- 💼 **Expériences** : défilement horizontal épinglé sur desktop, avec les logos des entreprises
- 🗂️ **Projets** : cartes en tilt 3D qui suivent la souris, ou le gyroscope sur téléphone
- 💬 **Langues** et 📇 **contact**
- 🌍 **Bilingue FR / EN**, langue mémorisée d'une visite à l'autre
- ♿ **Accessible** : `prefers-reduced-motion` respecté, ARIA et contrastes vérifiés

## 🛠️ Stack

| Outil | Rôle |
|---|---|
| [Vite](https://vite.dev/) | Serveur de dev et build de production |
| [Tailwind CSS v4](https://tailwindcss.com/) | Styles |
| [GSAP](https://gsap.com/) (ScrollTrigger, SplitText) | Animations au scroll et découpage du texte |
| [Lenis](https://lenis.darkroom.engineering/) | Smooth scroll |
| GitHub Actions + GitHub Pages | Build et hébergement, sans backend |

## 🚀 Lancer le projet

Il faut [Node.js](https://nodejs.org/) 20 ou plus.

```bash
npm install       # installe les dépendances
npm run dev       # serveur de dev sur http://localhost:5173
npm run build     # build de production dans dist/
npm run preview   # sert dist/ pour tester la version de production
```

## 📦 Déploiement

Le site est 100 % statique. À chaque push sur `main`, le workflow [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) lance `npm run build` et publie le dossier `dist/` sur GitHub Pages. Aucun fichier buildé n'est commité.

> Dans les réglages du repo, *Settings → Pages → Source* doit être sur **GitHub Actions**.

Le développement se fait sur la branche `dev`, puis passe par une pull request vers `main`.

## 📁 Structure

```text
📦 gossotjeanbaptiste.github.io
├── 📄 index.html               # Page unique (structure + attributs data-i18n)
├── 📁 src/
│   ├── ⚡ main.js              # Animations, i18n, projets, interactions
│   └── 🎨 style.css            # Tailwind + thème + effets custom
├── 📁 public/                  # Copié tel quel dans dist/
│   ├── 📁 i18n/                # fr.json / en.json : tous les textes du site
│   ├── 📁 images/
│   │   ├── 📁 projects/        # Visuels des projets (WebP)
│   │   ├── 📁 companies/       # Logos des entreprises
│   │   ├── 📁 icons/           # LinkedIn, GitHub, Drive, globe
│   │   ├── 📁 flags/           # Drapeaux FR / UK
│   │   ├── 📁 schools/         # Logo Epitech
│   │   ├── 📁 profile/         # Avatar
│   │   └── 🖼️ og-preview.png   # Aperçu pour les réseaux sociaux
│   ├── 📁 fonts/               # Montserrat (WOFF2, sous-ensemble latin)
│   ├── 📁 icon/                # Favicon
│   ├── 🤖 robots.txt
│   └── 🗺️ sitemap.xml
├── 📁 .github/workflows/       # Déploiement GitHub Pages
├── ⚙️ vite.config.js
└── 📦 package.json
```

## ✏️ Modifier le contenu

- **Textes** : dans `public/i18n/fr.json` et `public/i18n/en.json`. Dans le HTML, chaque élément traduit porte un attribut `data-i18n="clé"`.
- **Projets** : dans le tableau `PROJECTS` en haut de `src/main.js` (image, date, repo, badge, technos). Les images vont dans `public/images/projects/`.
- **Images** : de préférence en WebP. Une image dans `public/images/x.webp` s'appelle avec `/images/x.webp`.

## ⚡ Performances

Mesuré avec Lighthouse sur le build de production :

| | Performance | Accessibilité | Bonnes pratiques | SEO |
|---|---|---|---|---|
| Desktop | 100 | 91 | 100 | 100 |
| Mobile | 98 | 95 | 100 | 100 |

Les images sont en WebP sans perte, la police est un WOFF2 de 54 Ko (contre 673 Ko pour le TTF d'origine) et le JavaScript pèse environ 60 Ko gzip.

## 📞 Contact

- 💼 **LinkedIn** : [Jean-Baptiste GOSSOT](https://www.linkedin.com/in/jbgossot/)
- 🐙 **GitHub** : [gossotjeanbaptiste](https://github.com/gossotjeanbaptiste)
- 📄 **CV** : [Voir mon CV](https://drive.google.com/file/d/1H5htxjXJdvQahL4jzqzQ7ikkn2V5BqhZ/view?usp=sharing)
- 📧 **E-mail** : [jean-baptiste.gossot@epitech.eu](mailto:jean-baptiste.gossot@epitech.eu)

---

# 🇬🇧 English version

👉 **[gossotjeanbaptiste.github.io](https://gossotjeanbaptiste.github.io/)**

Software development student at Epitech Nancy, looking for a **one-year work-study position** in software development in Lorraine or Bas-Rhin (France). This site presents my education, experience and projects.

## ✨ What's on the site

- 👋 **Animated hero**: avatar, name revealed letter by letter, introduction
- 🎓 **Education**: a timeline that draws itself as you scroll, with dots lighting up
- 💼 **Experience**: pinned horizontal scrolling on desktop, with company logos
- 🗂️ **Projects**: 3D tilt cards that follow the mouse, or the gyroscope on phones
- 💬 **Languages** and 📇 **contact**
- 🌍 **Bilingual FR / EN**, with the language remembered between visits
- ♿ **Accessible**: honors `prefers-reduced-motion`, checked ARIA and contrast

## 🛠️ Stack

| Tool | Purpose |
|---|---|
| [Vite](https://vite.dev/) | Dev server and production build |
| [Tailwind CSS v4](https://tailwindcss.com/) | Styling |
| [GSAP](https://gsap.com/) (ScrollTrigger, SplitText) | Scroll animations and text splitting |
| [Lenis](https://lenis.darkroom.engineering/) | Smooth scrolling |
| GitHub Actions + GitHub Pages | Build and hosting, no backend |

## 🚀 Running the project

Requires [Node.js](https://nodejs.org/) 20 or later.

```bash
npm install       # install dependencies
npm run dev       # dev server on http://localhost:5173
npm run build     # production build in dist/
npm run preview   # serve dist/ to test the production build
```

## 📦 Deployment

The site is fully static. On every push to `main`, the [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) workflow runs `npm run build` and publishes `dist/` to GitHub Pages. No build output is committed.

> In the repository settings, *Settings → Pages → Source* must be set to **GitHub Actions**.

Work happens on the `dev` branch and goes to `main` through a pull request.

## ✏️ Editing content

- **Text**: in `public/i18n/fr.json` and `public/i18n/en.json`. In the HTML, each translated element has a `data-i18n="key"` attribute.
- **Projects**: in the `PROJECTS` array at the top of `src/main.js` (image, date, repo, badge, technologies). Images go in `public/images/projects/`.
- **Images**: WebP preferred. An image at `public/images/x.webp` is referenced as `/images/x.webp`.

## 📞 Contact

- 💼 **LinkedIn**: [Jean-Baptiste GOSSOT](https://www.linkedin.com/in/jbgossot/)
- 🐙 **GitHub**: [gossotjeanbaptiste](https://github.com/gossotjeanbaptiste)
- 📄 **Resume**: [View my resume](https://drive.google.com/file/d/1H5htxjXJdvQahL4jzqzQ7ikkn2V5BqhZ/view?usp=sharing)
- 📧 **Email**: [jean-baptiste.gossot@epitech.eu](mailto:jean-baptiste.gossot@epitech.eu)

---

© 2021-2029 Jean-Baptiste GOSSOT
