<script setup lang="ts">
import type { StatusKind } from '../types'

/** Étiquette compacte avec pastille de statut optionnelle. */
withDefaults(
  defineProps<{
    /** Statut (colore la pastille / la bordure). */
    kind?: StatusKind
    /** Affiche la pastille. */
    dot?: boolean
  }>(),
  { kind: 'neutral', dot: true },
)
</script>

<template>
  <span class="vx-chip" :class="kind !== 'neutral' && `vx-chip--${kind}`">
    <span v-if="dot" class="vx-chip__dot" aria-hidden="true" />
    <slot />
  </span>
</template>

<style scoped>
.vx-chip {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-family: var(--vx-font-mono);
  font-size: 10.5px;
  border: 1px solid var(--vx-line);
  border-radius: var(--vx-radius-pill, 999px);
  padding: 3px 9px;
  color: var(--vx-ink);
  background: var(--vx-paper2);
  white-space: nowrap;
}
.vx-chip__dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: var(--vx-muted);
}
.vx-chip--ok {
  border-color: color-mix(in oklab, var(--vx-accent) 50%, var(--vx-line));
}
.vx-chip--ok .vx-chip__dot { background: var(--vx-accent); }
.vx-chip--warn .vx-chip__dot { background: var(--vx-warn); }
.vx-chip--err .vx-chip__dot { background: var(--vx-err); }
.vx-chip--info .vx-chip__dot { background: var(--vx-info); }
</style>
