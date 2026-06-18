<script setup lang="ts">
/** Paragraphe / texte courant du design system. */
withDefaults(
  defineProps<{
    /** Couleur atténuée. */
    muted?: boolean
    /** Police mono. */
    mono?: boolean
    /** Taille. */
    size?: 'xs' | 'sm' | 'md'
    /** Balise de rendu. */
    as?: 'p' | 'span' | 'div'
  }>(),
  { size: 'md', as: 'p' },
)
</script>

<template>
  <component
    :is="as"
    class="vx-text"
    :class="[
      `vx-text--${size}`,
      { 'vx-text--muted': muted, 'vx-text--mono': mono },
    ]"
  >
    <slot />
  </component>
</template>

<style scoped>
.vx-text {
  margin: 0;
  font-family: var(--vx-font-sans);
  font-size: 13.5px;
  line-height: 1.55;
  color: var(--vx-ink);
}
.vx-text--muted { color: var(--vx-muted); }
.vx-text--mono { font-family: var(--vx-font-mono); }
.vx-text--sm { font-size: 12px; }
.vx-text--xs { font-size: 10.5px; }
</style>
