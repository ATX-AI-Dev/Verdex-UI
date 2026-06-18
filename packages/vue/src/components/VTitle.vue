<script setup lang="ts">
/** Titre du design system. `level` choisit la balise et la taille. */
withDefaults(
  defineProps<{
    /** Niveau hiérarchique (1–3) → h1/h2/h3. */
    level?: 1 | 2 | 3
    /** Sur-titre mono affiché au-dessus. */
    eyebrow?: string
  }>(),
  { level: 1 },
)
</script>

<template>
  <div class="vx-title-wrap">
    <span v-if="eyebrow" class="vx-eyebrow">{{ eyebrow }}</span>
    <component :is="`h${level}`" class="vx-title" :class="`vx-title--${level}`">
      <slot />
    </component>
  </div>
</template>

<style scoped>
.vx-title-wrap {
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.vx-eyebrow {
  font-family: var(--vx-font-mono);
  font-size: 10px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--vx-accent);
}
.vx-title {
  margin: 0;
  font-family: var(--vx-font-sans);
  font-weight: 700;
  letter-spacing: -0.01em;
  color: var(--vx-ink);
  line-height: 1.2;
}
.vx-title--1 { font-size: 27px; }
.vx-title--2 { font-size: 21px; }
.vx-title--3 { font-size: 17px; }
</style>
