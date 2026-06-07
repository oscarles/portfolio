(function () {
  const nav = document.createElement('nav');
  nav.className = 'navbar';
  nav.id = 'navbar';
  nav.innerHTML = `
    <a href="/" class="nav-logo">
      <span class="logo-bracket">[</span>OL<span class="logo-bracket">]</span>
    </a>
    <ul class="nav-links" id="nav-links">
      <li><a href="/about"      class="nav-link">À propos</a></li>
      <li><a href="/projects"   class="nav-link">Projets</a></li>
      <li><a href="/parcours"   class="nav-link">Parcours</a></li>
      <li><a href="/narratif"   class="nav-link">Récits</a></li>
      <li><a href="/reflexion"  class="nav-link">Réflexion</a></li>
      <li><a href="/skills"     class="nav-link">Compétences</a></li>
      <li><a href="/contact"    class="nav-link">Contact</a></li>
    </ul>
    <button class="nav-toggle" id="nav-toggle" aria-label="Menu">
      <span></span><span></span><span></span>
    </button>
  `;
  document.currentScript.replaceWith(nav);
})();
