# @verdex/vue

Composants Vue 3 du design system **Verdex**. Compatible Nuxt 3.

## Installation

```bash
pnpm add @verdex/vue @verdex/tokens vue
```

## Setup

Importer une fois le socle de théming + les styles des composants (ex. dans `main.ts`) :

```ts
import { createApp } from 'vue'
import '@verdex/tokens'          // variables, fonts, reset
import '@verdex/vue/style.css'   // styles des composants
import App from './App.vue'

createApp(App).mount('#app')
```

Poser le thème sur `<html data-theme="dark">` (ou `light`).

## Usage

À la carte :

```vue
<script setup>
import { VButton, VChip } from '@verdex/vue'
</script>

<template>
  <VButton variant="primary">Déployer</VButton>
  <VChip kind="ok">En ligne</VChip>
</template>
```

Ou en plugin global :

```ts
import { Verdex } from '@verdex/vue'
app.use(Verdex)
```

## Composants (Phase 1)

`VButton` · `VIconButton` · `VInput` · `VCard` · `VChip` · `VBadge` · `VTabs`
· `VDivider` · `VTitle` · `VText` · `VLink` · `VAlert` · `VSkeleton`

## Nuxt

Ajouter dans `nuxt.config.ts` :

```ts
export default defineNuxtConfig({
  css: ['@verdex/tokens', '@verdex/vue/style.css'],
})
```

et enregistrer le plugin via un fichier `plugins/verdex.ts` :

```ts
import { Verdex } from '@verdex/vue'
export default defineNuxtPlugin((nuxt) => nuxt.vueApp.use(Verdex))
```

## Browser Support

Verdex-UI targets modern evergreen browsers. The following CSS features are used and define the minimum browser baseline:

| Feature | Chrome | Firefox | Safari | Edge |
|---------|--------|---------|--------|------|
| CSS Custom Properties (`var()`) | 49+ | 31+ | 9.1+ | 15+ |
| `color-mix()` in `oklab`/`srgb` | 111+ | 113+ | 16.2+ | 111+ |
| `@media (prefers-reduced-motion)` | 74+ | 63+ | 10.1+ | 79+ |
| CSS `aspect-ratio` | 88+ | 89+ | 15+ | 88+ |

**Minimum recommended:** Chrome 111 / Firefox 113 / Safari 16.2 / Edge 111 (released Q1 2023).

Internet Explorer is not supported.
