<script setup lang="ts">
/** Placeholder de chargement animé (shimmer). Respecte prefers-reduced-motion. */
withDefaults(
  defineProps<{
    /** Forme. */
    variant?: 'line' | 'box' | 'circle'
    /** Largeur CSS (ex. '60%', '120px'). */
    width?: string
    /** Hauteur CSS (ex. '120px'). */
    height?: string
    /** Pour `line` : variante fine. */
    sm?: boolean
    /** Nombre de lignes répétées (variant `line`). */
    lines?: number
  }>(),
  { variant: 'line', lines: 1 },
)
</script>

<template>
  <div v-if="variant === 'line' && lines > 1" class="vx-skeleton-group" aria-hidden="true">
    <span
      v-for="n in lines"
      :key="n"
      class="vx-skeleton vx-skeleton--line"
      :class="{ 'is-sm': sm }"
      :style="{ width: n === lines ? '70%' : width || '100%' }"
    />
  </div>
  <span
    v-else
    class="vx-skeleton"
    :class="[`vx-skeleton--${variant}`, { 'is-sm': sm }]"
    :style="{ width, height }"
    aria-hidden="true"
  />
</template>

<style scoped>
.vx-skeleton {
  display: block;
  position: relative;
  overflow: hidden;
  background: var(--vx-line);
  opacity: 0.85;
  border-radius: 5px;
}
.vx-skeleton::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(
    90deg,
    transparent,
    color-mix(in oklab, var(--vx-ink) 14%, transparent),
    transparent
  );
  background-size: 200% 100%;
  animation: vx-shimmer 1.4s ease-in-out infinite;
}
.vx-skeleton--line { height: 9px; }
.vx-skeleton--line.is-sm { height: 7px; }
.vx-skeleton--box { height: 100%; border-radius: var(--vx-radius, 9px 11px 8px 12px); }
.vx-skeleton--circle { border-radius: 50%; aspect-ratio: 1; }
.vx-skeleton-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
@keyframes vx-shimmer {
  from { background-position: 180% 0; }
  to { background-position: -180% 0; }
}
@media (prefers-reduced-motion: reduce) {
  .vx-skeleton::after { animation: none; }
}
</style>
