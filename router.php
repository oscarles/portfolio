<?php
/**
 * Routeur pour le serveur PHP intégré.
 * Lancement : php -S localhost:8000 router.php
 */

$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$uri = rtrim($uri, '/');

// Routes explicites
$routes = [
    ''            => 'index.html',
    '/index'      => 'index.html',
    '/about'      => 'about.html',
    '/projects'   => 'projects.html',
    '/parcours'   => 'parcours.html',
    '/narratif'   => 'narratif.html',
    '/reflexion'  => 'reflexion.html',
    '/skills'     => 'skills.html',
    '/contact'    => 'contact.html',
    '/project-chess'   => 'project-chess.html',
    '/project-cookies' => 'project-cookies.html',
    '/project-covoit'  => 'project-covoit.html',
    '/project-solana'  => 'project-solana.html',
    '/project-stage'   => 'project-stage.html',
];

// Fichier statique existant (CSS, JS, images, etc.)
if ($uri !== '' && file_exists(__DIR__ . $uri)) {
    return false;
}

// Route connue
if (isset($routes[$uri])) {
    $file = __DIR__ . '/' . $routes[$uri];
    header('Content-Type: text/html; charset=utf-8');
    readfile($file);
    exit;
}

// Tentative générique : /foo → foo.html
$candidate = __DIR__ . $uri . '.html';
if (file_exists($candidate)) {
    header('Content-Type: text/html; charset=utf-8');
    readfile($candidate);
    exit;
}

// 404
http_response_code(404);
header('Content-Type: text/html; charset=utf-8');
echo '<!doctype html><html lang="fr"><head><meta charset="UTF-8"><title>404</title></head>'
   . '<body><h1>404 — Page introuvable</h1><a href="/">Retour à l\'accueil</a></body></html>';
