<script setup lang="ts">
import type { ButtonVariant, Size } from '../types'

/** Bouton du design system Verdex. */
withDefaults(
  defineProps<{
    /** Variante visuelle. */
    variant?: ButtonVariant
    /** Taille. */
    size?: Size
    /** Affiche un spinner et désactive le bouton. */
    loading?: boolean
    /** Désactive le bouton. */
    disabled?: boolean
    /** Largeur 100 %. */
    block?: boolean
    /** Type HTML natif. */
    type?: 'button' | 'submit' | 'reset'
  }>(),
  { variant: 'secondary', size: 'md', type: 'button' },
)

defineEmits<{ click: [event: MouseEvent] }>()
</script>

<template>
  <button
    class="vx-btn"
    :class="[
      `vx-btn--${variant}`,
      { 'vx-btn--sm': size === 'sm', 'vx-btn--block': block, 'is-loading': loading },
    ]"
    :type="type"
    :disabled="disabled || loading"
    :aria-busy="loading || undefined"
    @click="$emit('click', $event)"
  >
    <span v-if="loading" class="vx-btn__spinner" aria-hidden="true" />
    <slot name="icon-left" />
    <slot />
    <slot name="icon-right" />
  </button>
</template>

<style scoped>
.vx-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 7px;
  font-family: var(--vx-font-mono);
  font-size: 11px;
  line-height: 1;
  border: 1.5px solid var(--vx-line);
  border-radius: var(--vx-radius-sm, 7px 9px 6px 10px);
  padding: 8px 13px;
  background: var(--vx-paper2);
  color: var(--vx-ink);
  cursor: pointer;
  white-space: nowrap;
  transition:
    filter 0.15s,
    border-color 0.2s,
    box-shadow 0.2s,
    background 0.2s;
}
.vx-btn:hover:not(:disabled) {
  border-color: var(--vx-accent-dim);
}
.vx-btn:focus-visible {
  outline: none;
  box-shadow: var(--vx-ring, 0 0 0 3px color-mix(in oklab, var(--vx-accent) 22%, transparent));
}
.vx-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
.vx-btn--primary {
  background: var(--vx-accent);
  color: var(--vx-accent-ink);
  border-color: var(--vx-accent);
  font-weight: 700;
}
.vx-btn--primary:hover:not(:disabled) {
  filter: brightness(1.06);
  border-color: var(--vx-accent);
}
.vx-btn--ghost {
  background: transparent;
  border-color: transparent;
  color: var(--vx-muted);
}
.vx-btn--ghost:hover:not(:disabled) {
  background: var(--vx-fill);
  color: var(--vx-ink);
  border-color: transparent;
}
.vx-btn--sm {
  padding: 5px 10px;
  font-size: 10px;
}
.vx-btn--block {
  display: flex;
  width: 100%;
}
.vx-btn__spinner {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: 2px solid currentColor;
  border-top-color: transparent;
  animation: vx-spin 0.7s linear infinite;
}
@keyframes vx-spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
