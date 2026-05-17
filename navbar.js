(function () {
  const nav = document.createElement('nav');
  nav.className = 'navbar';
  nav.id = 'navbar';
  nav.innerHTML = `
    <a href="index.html" class="nav-logo">
      <span class="logo-bracket">[</span>OL<span class="logo-bracket">]</span>
    </a>
    <ul class="nav-links" id="nav-links">
      <li><a href="about.html"     class="nav-link">À propos</a></li>
      <li><a href="projects.html"  class="nav-link">Projets</a></li>
      <li><a href="parcours.html"  class="nav-link">Parcours</a></li>
      <li><a href="narratif.html"  class="nav-link">Récits</a></li>
      <li><a href="reflexion.html" class="nav-link">Réflexion</a></li>
      <li><a href="skills.html"    class="nav-link">Compétences</a></li>
      <li><a href="contact.html"   class="nav-link">Contact</a></li>
    </ul>
    <button class="nav-toggle" id="nav-toggle" aria-label="Menu">
      <span></span><span></span><span></span>
    </button>
  `;
  document.currentScript.replaceWith(nav);
})();
