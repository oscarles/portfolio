# 📁 Portfolio — Structure du projet

```
portfolio/
├── index.html    → Structure & contenu
├── style.css     → Tout le design
├── script.js     → Interactions & animations
└── cv.pdf        → Ton CV (à ajouter toi-même)
```

---

## ✏️ Comment personnaliser

### 1. Tes infos de base (index.html)
- `.nav-logo` → remplace `TP` par tes initiales
- `.hero-title` → ton prénom et nom
- `.hero-subtitle` → ta description personnelle
- `profil.json` dans la code card → tes vraies données
- Section À propos → ta biographie, tes hobbies
- `.stat-card` → tes vrais chiffres
- Skills → tes vraies compétences
- Projects → tes vrais projets (duplique les `<article class="project-card">`)
- Contact → ton vrai email, GitHub, LinkedIn

### 2. Changer la couleur accent (style.css)
Ligne ~9 : `--clr-accent: #00e5a0;`  
→ Change `#00e5a0` par ta couleur préférée (hex ou hsl).
Toute la teinte du site change automatiquement.

### 3. Changer la police (style.css)
Ligne ~14-15 : `--font-display` et `--font-mono`  
→ Change les noms et mets à jour le lien Google Fonts dans index.html.

### 4. Textes du typage animé (script.js)
Section 8, ligne `const texts = [...]`  
→ Remplace par tes propres phrases.

### 5. Ajouter un projet
Dans index.html, duplique ce bloc et modifie-le :
```html
<article class="project-card reveal">
  <div class="project-header">
    <span class="project-icon">🖥️</span>
    <div class="project-links">
      <a href="LIEN_GITHUB" class="icon-link">...</a>
      <a href="LIEN_DEMO"   class="icon-link">...</a>
    </div>
  </div>
  <h3 class="project-title">Nom du projet</h3>
  <p class="project-desc">Ta description...</p>
  <div class="project-techs">
    <span class="tech-badge">Techno 1</span>
  </div>
</article>
```

---

## 🚀 Mise en ligne (gratuit)
- **GitHub Pages** : push le dossier sur un repo, active Pages dans les Settings
- **Vercel / Netlify** : drag & drop du dossier sur leur interface
- **Domaine custom** : ajoute le tien dans les paramètres de l'hébergeur

---

## 🔧 Technologies utilisées
- HTML5 sémantique
- CSS3 (variables, grid, flexbox, animations, media queries)
- JavaScript vanilla (Intersection Observer, requestAnimationFrame)
- Google Fonts : Syne + DM Mono
- Aucun framework, aucune dépendance
