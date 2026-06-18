<script setup lang="ts">
import type { Size } from '../types'

/** Bouton icône carré (icône seule). `label` est requis pour l'accessibilité. */
withDefaults(
  defineProps<{
    /** Texte alternatif (aria-label) — obligatoire car le bouton n'a pas de texte. */
    label: string
    /** Variante. */
    variant?: 'secondary' | 'ghost'
    /** Taille. */
    size?: Size
    /** Désactive le bouton. */
    disabled?: boolean
    /** Type HTML natif. */
    type?: 'button' | 'submit' | 'reset'
  }>(),
  { variant: 'secondary', size: 'md', type: 'button' },
)

defineEmits<{ click: [event: MouseEvent] }>()
</script>

<template>
  <button
    class="vx-iconbtn"
    :class="[`vx-iconbtn--${variant}`, { 'vx-iconbtn--sm': size === 'sm' }]"
    :type="type"
    :disabled="disabled"
    :aria-label="label"
    :title="label"
    @click="$emit('click', $event)"
  >
    <slot />
  </button>
</template>

<style scoped>
.vx-iconbtn {
  display: inline-grid;
  place-items: center;
  width: 32px;
  height: 32px;
  border-radius: var(--vx-radius-sm, 7px 9px 6px 10px);
  border: 1.5px solid var(--vx-line);
  background: var(--vx-paper2);
  color: var(--vx-ink);
  cursor: pointer;
  font-size: 15px;
  transition:
    border-color 0.2s,
    background 0.2s,
    box-shadow 0.2s;
}
.vx-iconbtn:hover:not(:disabled) {
  border-color: var(--vx-accent-dim);
}
.vx-iconbtn:focus-visible {
  outline: none;
  box-shadow: var(--vx-ring, 0 0 0 3px color-mix(in oklab, var(--vx-accent) 22%, transparent));
}
.vx-iconbtn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
.vx-iconbtn--ghost {
  border-color: transparent;
  background: transparent;
  color: var(--vx-muted);
}
.vx-iconbtn--ghost:hover:not(:disabled) {
  background: var(--vx-fill);
  color: var(--vx-ink);
}
.vx-iconbtn--sm {
  width: 26px;
  height: 26px;
  font-size: 13px;
}
</style>
