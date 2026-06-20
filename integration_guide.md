# Guide d'Intégration — Stack Technique Verdex

Ce guide explique comment mettre en place et configurer la stack technique de référence pour un projet de l'écosystème **Verdex** :
`Vue 3 + TypeScript + Tailwind CSS v3 + Node.js + PostgreSQL + Docker + GSAP`

---

## 1. Conteneurisation & Base de Données (Docker & PostgreSQL)

Le projet utilise Docker pour orchestrer l'environnement de développement local, incluant la base de données PostgreSQL.

### Fichier `.env` (à créer à la racine du projet, **ne jamais commiter**)

```dotenv
# .env — variables d'environnement locales. Copiez ce bloc dans un fichier .env
# et ajoutez .env à votre .gitignore. Ne commitez JAMAIS ce fichier.
POSTGRES_DB=verdex_db
POSTGRES_USER=verdex_user
POSTGRES_PASSWORD=changeme_local_strong_password   # ← remplacez par un vrai mot de passe
```

### Fichier `docker-compose.yml` (Racine du projet)

```yaml
version: '3.8'

services:
  database:
    image: postgres:15-alpine
    container_name: verdex-postgres
    restart: always
    environment:
      POSTGRES_DB: ${POSTGRES_DB}
      POSTGRES_USER: ${POSTGRES_USER}
      POSTGRES_PASSWORD: ${POSTGRES_PASSWORD}   # lu depuis .env — ne pas mettre de valeur ici
    ports:
      - "5432:5432"
    volumes:
      - pgdata:/var/lib/postgresql/data

  api-server:
    build:
      context: ./server
      dockerfile: Dockerfile
    container_name: verdex-api
    restart: always
    environment:
      PORT: 5000
      DATABASE_URL: postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@database:5432/${POSTGRES_DB}
      NODE_ENV: development
    ports:
      - "5000:5000"
    depends_on:
      - database

volumes:
  pgdata:
    driver: local
```

---

## 2. Configuration CSS & Tailwind CSS v3

Pour faire le lien entre la charte graphique de **Verdex-UI** (basée sur des variables CSS) et **Tailwind v3**, vous devez importer le paquet `@verdex/tokens` et configurer votre `tailwind.config.js`.

### Installation du socle CSS
Dans votre projet client :
```bash
npm install @verdex/tokens
```

### Importation globale du CSS
Dans le fichier principal de votre application (ex: `src/main.ts` ou `src/style.css`) :
```css
/* Import complet du design system (reset + fonts + tokens + utilities) */
import '@verdex/tokens/dist/index.css';
```

### Fichier `tailwind.config.js`
Pour utiliser les couleurs Verdex sous forme de classes Tailwind (ex: `text-vx-ink`, `bg-vx-accent`, etc.) :

```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  darkMode: ['class', '[data-theme="dark"]'], // Gère la bascule claire/sombre
  theme: {
    extend: {
      colors: {
        vx: {
          bg: 'var(--vx-bg)',
          paper: 'var(--vx-paper)',
          paper2: 'var(--vx-paper2)',
          chrome: 'var(--vx-chrome)',
          ink: 'var(--vx-ink)',
          muted: 'var(--vx-muted)',
          line: 'var(--vx-line)',
          'line-2': 'var(--vx-line-2)',
          fill: 'var(--vx-fill)',
          'fill-2': 'var(--vx-fill-2)',
          accent: 'var(--vx-accent)',
          'accent-dim': 'var(--vx-accent-dim)',
          'accent-ink': 'var(--vx-accent-ink)',
          warn: 'var(--vx-warn)',
          err: 'var(--vx-err)',
          info: 'var(--vx-info)',
        }
      },
      fontFamily: {
        sans: ['var(--vx-font-sans)', 'Space Grotesk', 'system-ui', 'sans-serif'],
        mono: ['var(--vx-font-mono)', 'Space Mono', 'SFMono-Regular', 'monospace'],
      },
      borderRadius: {
        'vx-sm': 'var(--vx-radius-sm)',
        'vx': 'var(--vx-radius)',
        'vx-lg': 'var(--vx-radius-lg)',
      },
      boxShadow: {
        'vx': 'var(--vx-shadow)',
      }
    },
  },
  plugins: [],
}
```

### Options Typographiques (Font Pairings) Recommandés

Pour adapter la charte Verdex à différents types de projets tout en conservant une esthétique moderne et élégante, vous pouvez écraser les variables `--vx-font-sans` et `--vx-font-mono` au niveau de `:root` dans votre CSS. Voici les 5 combinaisons de référence :

1. **Option 1 : Technique & Géométrique (Défaut)**
   * **Sans-serif :** `'Space Grotesk'` (punchy, tech)
   * **Monospace :** `'Space Mono'` (style code/tableau de bord)
   * *Usage :* Portails développeurs, Dashboards bruts.

2. **Option 2 : Professionnel & Neutre (Ultra-pro)**
   * **Sans-serif :** `'Inter'` (lisibilité parfaite)
   * **Monospace :** `'JetBrains Mono'` (très lisible)
   * *Usage :* SaaS d'entreprise, applications métier, consoles financières.

3. **Option 3 : Moderne Contemporain (Géo-chic)**
   * **Sans-serif :** `'Plus Jakarta Sans'` (géométrique frais et élégant)
   * **Monospace :** `'Fira Code'` (police développeur moderne avec ligatures)
   * *Usage :* Startups, plateformes SaaS modernes, outils collaboratifs.

4. **Option 4 : Moderne Doux & Fluide**
   * **Sans-serif :** `'Outfit'` (courbes douces et géométriques)
   * **Monospace :** `'Source Code Pro'` (classique intemporel)
   * *Usage :* Applications grand public, EdTech, portails de contenu.

5. **Option 5 : Éditorial Premium & Élégant (Haute Couture)**
   * **Sans-serif (Titre) :** `'Playfair Display'` (Sérif très élégant et prestigieux)
   * **Sans-serif (Texte) :** `'Inter'` (Lisibilité)
   * *Usage :* Landing pages haut de gamme, vitrines institutionnelles, sites marketing premium.

*Note : N'oubliez pas d'importer les polices depuis Google Fonts dans votre fichier HTML principal avant de redéfinir les variables.*

---

## 3. Frontend & Vue 3 + TypeScript

Les composants de la bibliothèque `@verdex/vue` sont entièrement typés TypeScript et compatibles avec l'importation par module dans Vue 3.

### Code de référence dans un composant Vue (`App.vue`)

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { VButton, VCard, VInput } from '@verdex/vue'

const email = ref('')
const loading = ref(false)

const handleDeploy = () => {
  loading.value = true
  setTimeout(() => {
    loading.value = false
  }, 2000)
}
</script>

<template>
  <div class="p-8 bg-vx-bg text-vx-ink min-h-screen font-sans">
    <VCard class="max-w-md mx-auto">
      <template #cap>
        <span class="vx-card__tag">Production deployment</span>
      </template>
      
      <div class="space-y-4">
        <h2 class="text-xl font-bold">Déployer sur le cluster</h2>
        <VInput v-model="email" label="Adresse Email de validation" placeholder="you@verdex.io" />
        <VButton variant="primary" :loading="loading" class="w-full" @click="handleDeploy">
          Lancer le conteneur
        </VButton>
      </div>
    </VCard>
  </div>
</template>
```

---

## 4. Animations Premium avec GSAP

La charte graphique Verdex met en avant des micro-interactions de haute qualité. Nous recommandons l'utilisation de **GSAP** avec des transitions fluides et amorties.

### Installation de GSAP
```bash
npm install gsap
```

### Exemple de transition de survol fluide et amortie
Pour animer des éléments au survol d'une carte :

```typescript
import { onMounted, onBeforeUnmount, ref } from 'vue'
import { gsap } from 'gsap'

const elementRef = ref<HTMLElement | null>(null)

// Check for user's motion preference — respects accessibility settings
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

onMounted(() => {
  if (elementRef.value && !prefersReducedMotion) {
    // Animation d'apparition initiale amortie
    gsap.from(elementRef.value, {
      y: 30,
      opacity: 0,
      duration: 0.6,
      ease: "power2.out"
    })
  }
})

onBeforeUnmount(() => {
  // Cleanup: kill all tweens on this element to prevent memory leaks
  if (elementRef.value) {
    gsap.killTweensOf(elementRef.value)
  }
})

const onMouseEnter = () => {
  if (elementRef.value && !prefersReducedMotion) {
    gsap.to(elementRef.value, {
      scale: 1.03,
      borderColor: "var(--vx-accent)",
      duration: 0.3,
      ease: "power2.out"
    })
  }
}

const onMouseLeave = () => {
  if (elementRef.value && !prefersReducedMotion) {
    gsap.to(elementRef.value, {
      scale: 1.0,
      borderColor: "var(--vx-line)",
      duration: 0.3,
      ease: "power2.out"
    })
  }
}
```

> **Note accessibilité :** Vérifiez toujours `prefers-reduced-motion` avant de déclencher une animation GSAP.
> Les utilisateurs ayant activé ce paramètre (troubles vestibulaires, épilepsie, etc.) doivent recevoir une expérience sans animation.
> Pensez également à appeler `gsap.killTweensOf()` dans `onBeforeUnmount` pour éviter les fuites mémoire.
