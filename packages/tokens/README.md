# @verdex/tokens

Socle CSS agnostique du design system **Verdex** : variables de thème (tokens),
reset/fonts et primitives utilitaires (`.vx-btn`, `.vx-card`, `.vx-chip`…).
Utilisable en HTML/CSS pur, ou comme couche de théming sous `@verdex/vue`.

## Installation

```bash
pnpm add @verdex/tokens
```

## Usage (HTML/CSS pur)

```html
<!doctype html>
<html lang="fr" data-theme="dark">
  <head>
    <link rel="stylesheet" href="node_modules/@verdex/tokens/dist/index.css" />
  </head>
  <body>
    <button class="vx-btn vx-btn--primary">Déployer</button>
    <span class="vx-chip vx-chip--ok"><span class="vx-chip__dot"></span> En ligne</span>
  </body>
</html>
```

Ou via un bundler :

```js
import '@verdex/tokens' // index.css complet
// ou à la carte :
import '@verdex/tokens/tokens.css' // variables uniquement
```

## Thème

Sombre par défaut. Thème clair :

```html
<html data-theme="light">
```

## Variables principales

| Token | Rôle |
| --- | --- |
| `--vx-bg` / `--vx-paper` | surfaces |
| `--vx-ink` / `--vx-muted` | texte |
| `--vx-line` / `--vx-line-2` | bordures |
| `--vx-accent` | vert Verdex |
| `--vx-warn` / `--vx-err` / `--vx-info` | statuts |
| `--vx-font-sans` / `--vx-font-mono` | Space Grotesk / Space Mono |
| `--vx-radius` / `--vx-radius-lg` | rayons « sketchy » |
