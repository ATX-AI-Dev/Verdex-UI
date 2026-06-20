# Verdex-UI — Official Design & Component Charter

**The mandatory UI standard for all Ludo's projects.** Vue 3 · TypeScript · Tailwind CSS v3 · GSAP

Verdex-UI is Ludo's fork of the original Verdex-Workspace/Verdex-UI, fully audited and remediated across architecture, accessibility, security, performance, and testing (19 findings addressed). It is the single authoritative design and component standard for every future project in the ATX-AI-Dev ecosystem. **Mandatory** means: no new project starts without pulling this repo's tokens and components. GitHub: https://github.com/ATX-AI-Dev/Verdex-UI

---

## Monorepo Structure

Verdex-UI is a **pnpm workspace** with two published packages:

| Package | Path | Role |
|---------|------|------|
| `@verdex/tokens` | `packages/tokens` | CSS-only foundation: design tokens (`--vx-*` CSS variables), reset, fonts, utility classes. Framework-agnostic. |
| `@verdex/vue` | `packages/vue` | 61 Vue 3 components + 4 composables + validation library. TypeScript strict, Nuxt 3 compatible. |

Supporting resources:
- `examples/vanilla/` — plain HTML/CSS showcase templates
- `integration_guide.md` — full stack integration reference (Docker + PostgreSQL setup, Tailwind config, GSAP patterns)

---

## Mandatory Stack

- **Vue 3** — Composition API, `<script setup lang="ts">` syntax
- **TypeScript** — strict mode (`strict: true`, `noUnusedLocals`, `noUnusedParameters`)
- **Tailwind CSS v3** — NOT v4; config is CommonJS (`module.exports`), `darkMode: ['class', '[data-theme="dark"]']`
- **Node.js** — backend API layer
- **PostgreSQL** — via Docker, credentials via `.env` only (never hardcoded)
- **Docker** — dev environment
- **GSAP** — additive animation layer, not bundled in the library; consume at application level

---

## Installation

Install both packages:

```bash
pnpm add @verdex/vue @verdex/tokens vue
```

In your application's entry point (`main.ts`), import tokens and component styles:

```typescript
import '@verdex/tokens'          // CSS variables, fonts, reset
import '@verdex/vue/style.css'   // component styles
```

Set the theme on the `<html>` root element. Default is dark; override with a data attribute:

```html
<html data-theme="dark">   <!-- or "light" -->
```

Import components as needed:

```typescript
import { VButton, VInput, VCard } from '@verdex/vue'

// Or register all components globally:
import { Verdex } from '@verdex/vue'
app.use(Verdex)
```

### Nuxt 3 Integration

Create `plugins/verdex.ts`:

```typescript
import '@verdex/tokens'
import '@verdex/vue/style.css'
import { Verdex } from '@verdex/vue'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(Verdex)
})
```

In `nuxt.config.ts`:

```typescript
export default defineNuxtConfig({
  modules: [],
  plugins: ['~/plugins/verdex.ts'],
  // Ensure Tailwind is configured to use @verdex/tokens vars
})
```

Full Nuxt setup details are in `packages/vue/README.md`.

---

## Design Tokens (`@verdex/tokens`)

### Base CSS Variables — Dark Theme (Default)

All token values are defined as CSS custom properties on `:root` and overridden in `[data-theme="light"]`.

**Surfaces:**
- `--vx-bg` — main background
- `--vx-paper` — elevated surface (cards, modals)
- `--vx-paper2` — secondary elevated surface
- `--vx-chrome` — chroming/borders

**Text & Borders:**
- `--vx-ink` — primary text
- `--vx-muted` — secondary text (disabled, helper)
- `--vx-line` — default border color
- `--vx-line-2` — secondary border color

**Fills:**
- `--vx-fill` — default fill (form inputs, backgrounds)
- `--vx-fill-2` — secondary fill

**Accent & Status:**
- `--vx-accent` — Verdex green; `#8ac8af` (dark) / `#7ec3b0` (light)
- `--vx-accent-dim` — dimmed accent (disabled state)
- `--vx-accent-ink` — text on accent background
- `--vx-warn` — warning color; `#d6ab56` (dark)
- `--vx-err` — error color; `#db7369` (dark)
- `--vx-info` — info color; `#67aee8` (dark)

**Typography:**
- `--vx-font-sans` — defaults to `'Inter'` (CSS variable, not loaded by default)
- `--vx-font-mono` — defaults to `'JetBrains Mono'` (CSS variable, not loaded by default)

Base CSS in `base.css` loads **Space Grotesk** and **Space Mono** from Google Fonts. Override the CSS variables on `:root` to switch to the loaded fonts or pair with any other family. Five reference pairings are documented in `integration_guide.md`.

**Border Radii (Asymmetric "Sketchy" Style):**
- `--vx-radius-sm`: `7px 9px 6px 10px`
- `--vx-radius`: `9px 11px 8px 12px`
- `--vx-radius-lg`: `14px 16px 13px 16px`
- `--vx-radius-pill`: `999px`

**Elevation & Misc:**
- `--vx-shadow` — default drop shadow
- `--vx-ring` — outline/ring for focus states
- `--vx-overlay` — overlay backdrop color

### Tailwind Integration

Use `tailwind.config.cjs` at the root to map `--vx-*` variables to Tailwind utility classes (`text-vx-ink`, `bg-vx-accent`, `border-vx-line`, etc.). Full configuration example is in `integration_guide.md`.

---

## Component Catalog

### Primitives & Typography
`VTitle` · `VText` · `VLink` · `VDivider`

### Actions
`VButton` · `VIconButton` · `VFab` · `VLogout`

### Forms & Inputs
`VInput` · `VTextarea` · `VCheckbox` · `VRadioGroup` · `VSwitch` · `VSelect` · `VAutoComplete` · `VCalendar`

### Form Management (Composables & Validators)
**Composable:** `useForm` — reactive values, errors, `isDirty`, `isValid`, `handleSubmit()`, `reset()`

**Validators:** `required` · `email` · `minLength` · `maxLength` · `pattern` · `sameAs` · `min` · `max`

### Feedback & Status
`VAlert` · `VBadge` · `VChip` · `VSkeleton` · `VProgress` · `VBanner` · `VEmptyState`

### Navigation
`VTabs` · `VBreadcrumbs` · `VNavbar` · `VSidebar` · `VToolbar` · `VMenu`

### Overlays & Dialogs
`VOverlay` · `VDialog` · `VDrawer` · `VPopover` · `VTooltip`

### Data Display
`VCard` · `VDataTable` · `VList` · `VTreeview` · `VGrid` · `VTimeline` · `VSteps` · `VExpansionPanel` · `VCarousel` · `VAvatar`

### Charts
`VLineChart` — SVG sparkline with smooth cubic-bezier interpolation and gradient fill. Supports accessible `summary` prop (sr-only `<p>` + `role="img"` + `<title>` inside SVG).

### Layouts & Auth
`VAppShell` · `VAuthLayout` · `VAuthCard` · `VFooter`

### Auth Forms
`VLoginForm` · `VRegisterForm` · `VForgotPasswordForm` · `VResetPasswordForm`

Validated with `useForm`, emit `submit` with typed values, support `loading` and `error` props, slots for `#oauth` and `#footer`.

### Composables (Internal, Also Exported)
`useClickOutside` · `useFocusTrap` · `useScrollLock` · `useForm`

**Important:** `useScrollLock` is a client-only singleton. Use in `onMounted` or guard with `typeof document !== 'undefined'` to avoid SSR errors.

---

## Accessibility Commitment

Verdex-UI components prioritize WCAG 2.1 AA conformance. All audits and remediation are ongoing.

- **Semantic HTML & ARIA**: `VSelect`/`VAutoComplete` use `role="combobox"` + `role="listbox"`. `VDialog` uses `role="dialog"` + `aria-modal`. `VCalendar` uses `role="grid"` + `role="row"` + `role="gridcell"` + `aria-selected`. `VLineChart` uses `role="img"` + `<title>` inside SVG.
- **Motion & `prefers-reduced-motion`**: All animations (VAppShell transitions, GSAP examples) respect `@media (prefers-reduced-motion: reduce)`. Motion is suppressed entirely when the user has requested reduced motion.
- **Live Regions**: `VBadge` supports `role="status"` via the `live` prop for dynamic notification counts.
- **Unbounded Rendering**: `VDataTable` defaults to `pageSize: 25` — no unbounded DOM rendering.
- **Unique IDs**: `useId()` is used throughout to generate unique IDs for `aria-labelledby`, `aria-controls`, and `aria-describedby`.
- **Keyboard Navigation**: `VSelect`, `VAutoComplete` support arrow keys, Enter, Escape, Tab, Home, End.
- **Target**: WCAG 2.1 AA

---

## GSAP Integration Pattern

GSAP is **not bundled** in the library. Install separately:

```bash
npm install gsap
```

Use this corrected pattern (with `killTweensOf` cleanup and `prefers-reduced-motion` guard):

```typescript
import { onMounted, onBeforeUnmount, ref } from 'vue'
import { gsap } from 'gsap'

const elementRef = ref<HTMLElement | null>(null)
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

onMounted(() => {
  if (elementRef.value && !prefersReducedMotion) {
    gsap.from(elementRef.value, {
      y: 30,
      opacity: 0,
      duration: 0.6,
      ease: 'power2.out'
    })
  }
})

onBeforeUnmount(() => {
  if (elementRef.value) {
    gsap.killTweensOf(elementRef.value)  // Prevent memory leaks
  }
})

const onMouseEnter = () => {
  if (elementRef.value && !prefersReducedMotion) {
    gsap.to(elementRef.value, {
      scale: 1.03,
      borderColor: 'var(--vx-accent)',
      duration: 0.3,
      ease: 'power2.out'
    })
  }
}

const onMouseLeave = () => {
  if (elementRef.value && !prefersReducedMotion) {
    gsap.to(elementRef.value, {
      scale: 1.0,
      borderColor: 'var(--vx-line)',
      duration: 0.3,
      ease: 'power2.out'
    })
  }
}
```

**Golden rules:**
- Always call `gsap.killTweensOf()` in `onBeforeUnmount` to prevent memory leaks.
- Always check `prefers-reduced-motion` before triggering animations.

---

## Browser Support

| Feature | Chrome | Firefox | Safari | Edge |
|---------|--------|---------|--------|------|
| CSS Custom Properties (`var()`) | 49+ | 31+ | 9.1+ | 15+ |
| `color-mix()` in oklab/srgb | 111+ | 113+ | 16.2+ | 111+ |
| `@media (prefers-reduced-motion)` | 74+ | 63+ | 10.1+ | 79+ |
| CSS `aspect-ratio` | 88+ | 89+ | 15+ | 88+ |

**Minimum recommended:** Chrome 111, Firefox 113, Safari 16.2, Edge 111 (Q1 2023).

**Internet Explorer:** Not supported.

---

## Testing

Run tests with Vitest:

```bash
pnpm --filter @verdex/vue test        # Run once
pnpm --filter @verdex/vue test:watch  # Watch mode
```

**Coverage:** 40 tests across 8 test files (Vitest 2 + @vue/test-utils + jsdom).

Test files: `validators.test.ts` · `useForm.test.ts` · `useClickOutside.test.ts` · `useScrollLock.test.ts` · `VInput.test.ts` · `VSelect.test.ts` · `VAutoComplete.test.ts` · `VLoginForm.test.ts`

---

## Build

Build tokens first, then components:

```bash
pnpm install                         # Install workspace dependencies
pnpm --filter @verdex/tokens build   # Build CSS → packages/tokens/dist/
pnpm --filter @verdex/vue build      # Build Vue → packages/vue/dist/
```

Or build all at once from root:

```bash
pnpm build
```

Outputs:
- `packages/tokens/dist/index.css` — Full CSS bundle (tokens + reset + utilities)
- `packages/vue/dist/verdex-vue.js` — ESM bundle
- `packages/vue/dist/verdex-vue.umd.cjs` — UMD bundle
- `packages/vue/dist/verdex-vue.css` — Component styles
- `packages/vue/dist/index.d.ts` — TypeScript declarations

---

## Governance

**Ownership:** This repository (ATX-AI-Dev/Verdex-UI) is Ludo's authoritative fork. It is no longer a pure tracking clone — it contains audited rework and is owned by Ludo.

**Upstream Tracking:** The original `Verdex-Workspace/Verdex-UI` is tracked read-only via the `upstream` remote. A Windows Task Scheduler job runs `sync-upstream.ps1` daily, which fetches upstream commits into a local `upstream-track` branch only. It does **not auto-merge** into `main`. Ludo manually reviews `upstream-track` vs `main` to decide what, if anything, to cherry-pick.

**Branching:** `main` is stable production. Feature and fix work happens on branches (`fix/*`, `feat/*`). PRs are reviewed and merged by Ludo.

**Consumption:** Do **not** use `Verdex-Workspace/Verdex-UI` directly in new projects. Always depend on this fork (`@verdex/tokens` and `@verdex/vue` from npm or pnpm workspace).

---

## License

See LICENSE file in the repository.
