# @verdex/cli

Initialise le design system **Verdex** dans un projet, avec choix du framework
dans le terminal.

```bash
npx @verdex/cli init
```

Flux :
1. Choisissez votre framework : `Vanilla HTML/CSS`, `Vue 3` ou `Nuxt 3`.
2. La CLI affiche la commande d'installation des bons paquets.
3. Elle injecte les Google Fonts dans `index.html` (si présent) et affiche le
   snippet de configuration.

Mode non interactif (CI) :

```bash
verdex init --framework vue --yes
```
