<script setup lang="ts">
import { computed } from 'vue'

/** Indicateur de progression linéaire ou circulaire. */
const props = withDefaults(
  defineProps<{
    /** Valeur courante (0 → max). Ignorée si `indeterminate`. */
    value?: number
    /** Valeur maximale. */
    max?: number
    /** Mode indéterminé (animation continue). */
    indeterminate?: boolean
    /** Forme. */
    variant?: 'linear' | 'circular'
    /** Couleur. */
    kind?: 'accent' | 'warn' | 'err' | 'info'
    /** Taille du cercle (px) en mode circular. */
    size?: number
    /** Affiche le pourcentage. */
    showLabel?: boolean
  }>(),
  { value: 0, max: 100, variant: 'linear', kind: 'accent', size: 44 },
)

const pct = computed(() => Math.max(0, Math.min(100, (props.value / props.max) * 100)))
const color = computed(
  () => ({ accent: 'var(--vx-accent)', warn: 'var(--vx-warn)', err: 'var(--vx-err)', info: 'var(--vx-info)' })[props.kind],
)

// Cercle
const stroke = 4
const radius = computed(() => props.size / 2 - stroke)
const circ = computed(() => 2 * Math.PI * radius.value)
const offset = computed(() => circ.value * (1 - pct.value / 100))
</script>

<template>
  <div
    v-if="variant === 'linear'"
    class="vx-progress"
    role="progressbar"
    :aria-valuenow="indeterminate ? undefined : Math.round(pct)"
    aria-valuemin="0"
    aria-valuemax="100"
  >
    <div class="vx-progress__track">
      <div
        class="vx-progress__fill"
        :class="{ 'is-indeterminate': indeterminate }"
        :style="{ width: indeterminate ? undefined : `${pct}%`, background: color }"
      />
    </div>
    <span v-if="showLabel && !indeterminate" class="vx-progress__label">{{ Math.round(pct) }}%</span>
  </div>

  <div
    v-else
    class="vx-progress vx-progress--circular"
    role="progressbar"
    :aria-valuenow="indeterminate ? undefined : Math.round(pct)"
    aria-valuemin="0"
    aria-valuemax="100"
    :style="{ width: `${size}px`, height: `${size}px` }"
  >
    <svg :width="size" :height="size" :class="{ 'is-indeterminate': indeterminate }">
      <circle
        class="vx-progress__bg"
        :cx="size / 2"
        :cy="size / 2"
        :r="radius"
        :stroke-width="stroke"
        fill="none"
      />
      <circle
        class="vx-progress__arc"
        :cx="size / 2"
        :cy="size / 2"
        :r="radius"
        :stroke-width="stroke"
        :stroke="color"
        fill="none"
        stroke-linecap="round"
        :stroke-dasharray="circ"
        :stroke-dashoffset="indeterminate ? circ * 0.7 : offset"
        :transform="`rotate(-90 ${size / 2} ${size / 2})`"
      />
    </svg>
    <span v-if="showLabel && !indeterminate" class="vx-progress__center">{{ Math.round(pct) }}%</span>
  </div>
</template>

<style scoped>
.vx-progress {
  display: flex;
  align-items: center;
  gap: 10px;
}
.vx-progress__track {
  flex: 1;
  height: 8px;
  border-radius: 999px;
  background: var(--vx-fill-2);
  overflow: hidden;
}
.vx-progress__fill {
  height: 100%;
  border-radius: 999px;
  transition: width 0.4s cubic-bezier(0.2, 0.7, 0.2, 1);
}
.vx-progress__fill.is-indeterminate {
  width: 40%;
  animation: vx-progress-slide 1.3s ease-in-out infinite;
}
.vx-progress__label {
  font-family: var(--vx-font-mono);
  font-size: 11px;
  color: var(--vx-muted);
  min-width: 34px;
  text-align: right;
}
@keyframes vx-progress-slide {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(350%); }
}

/* circular */
.vx-progress--circular {
  position: relative;
  display: inline-grid;
  place-items: center;
}
.vx-progress__bg {
  stroke: var(--vx-fill-2);
}
.vx-progress__arc {
  transition: stroke-dashoffset 0.4s cubic-bezier(0.2, 0.7, 0.2, 1);
}
.vx-progress--circular svg.is-indeterminate {
  animation: vx-spin 0.9s linear infinite;
}
.vx-progress__center {
  position: absolute;
  font-family: var(--vx-font-mono);
  font-size: 11px;
  color: var(--vx-ink);
}
@keyframes vx-spin {
  to { transform: rotate(360deg); }
}
@media (prefers-reduced-motion: reduce) {
  .vx-progress__fill.is-indeterminate,
  .vx-progress--circular svg.is-indeterminate {
    animation-duration: 2.5s;
  }
}
</style>
