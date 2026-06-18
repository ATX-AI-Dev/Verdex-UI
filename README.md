# Verdex-UI

Le design system officiel **Verdex** : une bibliothèque de composants au charting
cohérent et reconnaissable, installable dans n'importe quel projet.

Esthétique « sketchy » (rayons asymétriques, bordures marquées), thème sombre par
défaut + clair, vert Verdex `#2ee59d`, typo Space Grotesk / Space Mono.

> Extrait et généralisé depuis le design system de
> [Verdex-Dashboard](https://github.com/Verdex-Workspace/Verdex-Dashboard).

## Monorepo

| Paquet | Rôle |
| --- | --- |
| [`@verdex/tokens`](packages/tokens) | Socle CSS agnostique : variables de thème, reset/fonts, primitives `.vx-*`. **Le livrable HTML/CSS.** |
| [`@verdex/vue`](packages/vue) | Composants Vue 3 (compatibles Nuxt). |
| [`@verdex/cli`](packages/cli) | `verdex init` — choix du framework dans le terminal + setup. |
| [`examples/vanilla`](examples/vanilla) | Vitrine HTML/CSS pur. |
| [`examples/vue`](examples/vue) | Banc d'essai Vue. |

## Démarrage

```bash
# Choisir son framework dans le terminal
npx @verdex/cli init
```

### Vanilla HTML/CSS

```html
<html data-theme="dark">
  <link rel="stylesheet" href="node_modules/@verdex/tokens/dist/index.css" />
  <button class="vx-btn vx-btn--primary">Déployer</button>
```

### Vue 3 / Nuxt

```bash
pnpm add @verdex/vue @verdex/tokens vue
```

```vue
<script setup>
import { VButton, VChip } from '@verdex/vue'
</script>
<template>
  <VButton variant="primary">Déployer</VButton>
  <VChip kind="ok">En ligne</VChip>
</template>
```

## Composants livrés

**Vague 1 — Noyau :** `VButton` · `VIconButton` · `VInput` · `VCard` · `VChip` ·
`VBadge` · `VTabs` · `VDivider` · `VTitle` · `VText` · `VLink` · `VAlert` · `VSkeleton`

**Vague 2 — Formulaires :** `VCheckbox` · `VRadioGroup` · `VSwitch` · `VTextarea` ·
`VSelect` · `VAutoComplete` · `VCalendar` + validation via `useForm` et les validators
(`required`, `email`, `minLength`, `maxLength`, `pattern`, `sameAs`, `min`, `max`).

**Vague 3 — Navigation & surfaces :** `VOverlay` · `VDialog` · `VDrawer` · `VTooltip` ·
`VPopover` · `VMenu` · `VNavbar` · `VSidebar` · `VToolbar` · `VBreadcrumbs` · `VFab`.
Les overlays (Dialog/Drawer) embarquent teleport, piège de focus, verrou de scroll et
fermeture Échap/scrim (composables `useFocusTrap`, `useScrollLock`, `useClickOutside`).

**Vague 4 — Données & affichage :** `VDataTable` (tri, sélection, pagination, cellules
slottées) · `VList` · `VTreeview` · `VGrid` · `VTimeline` · `VSteps` · `VProgress`
(linéaire/circulaire) · `VCarousel` · `VAvatar` · `VBanner` · `VEmptyState` · `VExpansionPanel`.

**Vague 5 — Auth & layouts :** `VAppShell` (sidebar+header responsive) · `VAuthLayout` ·
`VAuthCard` · `VFooter` · `VLoginForm` · `VRegisterForm` · `VForgotPasswordForm` ·
`VResetPasswordForm` · `VLogout`. Formulaires d'auth validés (`useForm`), slots
`#oauth`/`#footer`, props `loading`/`error`, émettent `submit` avec les valeurs.

Chacun : dark/light via tokens, accessibilité de base, typé TypeScript, équivalent
en classes CSS dans `@verdex/tokens`.

```ts
import { useForm, required, email, minLength } from '@verdex/vue'

const { values, errors, handleSubmit } = useForm({
  email: { value: '', rules: [required(), email()] },
  password: { value: '', rules: [required(), minLength(8)] },
})
const onSubmit = handleSubmit((v) => console.log(v))
// → <VInput v-model="values.email" :error="errors.email" />
```

## Roadmap

- **Vague 6 — Moteur React (+ Next)** : portage des composants, adaptateur CLI.
- **Doc** : site VitePress avec démos vivantes.

## Développement

```bash
pnpm install          # installe le workspace
pnpm build            # build tous les paquets
pnpm dev:vue          # banc d'essai Vue (localhost:5191)
```

## Licence

MIT
