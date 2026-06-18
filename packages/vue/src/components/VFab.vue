<script setup lang="ts">
/** Bouton d'action flottant (Floating Action Button). `label` requis pour l'a11y. */
withDefaults(
  defineProps<{
    /** Texte alternatif (aria-label). */
    label: string
    /** Position fixe à l'écran. */
    position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left'
    /** Variante. */
    variant?: 'primary' | 'secondary'
    /** Étend le FAB pour afficher aussi le libellé. */
    extended?: boolean
  }>(),
  { position: 'bottom-right', variant: 'primary' },
)

defineEmits<{ click: [event: MouseEvent] }>()
</script>

<template>
  <button
    class="vx-fab"
    :class="[`vx-fab--${position}`, `vx-fab--${variant}`, { 'vx-fab--extended': extended }]"
    type="button"
    :aria-label="label"
    :title="label"
    @click="$emit('click', $event)"
  >
    <span class="vx-fab__icon"><slot /></span>
    <span v-if="extended" class="vx-fab__label">{{ label }}</span>
  </button>
</template>

<style scoped>
.vx-fab {
  position: fixed;
  z-index: 40;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  height: 52px;
  min-width: 52px;
  padding: 0;
  border: 2px solid var(--vx-accent);
  border-radius: 16px 18px 15px 18px;
  background: var(--vx-accent);
  color: var(--vx-accent-ink);
  cursor: pointer;
  font-size: 22px;
  box-shadow: var(--vx-shadow), 0 0 0 4px color-mix(in oklab, var(--vx-accent) 16%, transparent);
  transition: transform 0.15s, filter 0.15s;
}
.vx-fab:hover {
  filter: brightness(1.06);
  transform: translateY(-2px);
}
.vx-fab:focus-visible {
  outline: none;
  box-shadow: var(--vx-ring, 0 0 0 3px color-mix(in oklab, var(--vx-accent) 22%, transparent));
}
.vx-fab--secondary {
  background: var(--vx-paper);
  color: var(--vx-ink);
  border-color: var(--vx-line);
}
.vx-fab--extended {
  padding: 0 18px;
  border-radius: var(--vx-radius-lg, 14px 16px 13px 16px);
}
.vx-fab__label {
  font-family: var(--vx-font-mono);
  font-size: 12px;
  font-weight: 700;
}
.vx-fab--bottom-right { right: 24px; bottom: 24px; }
.vx-fab--bottom-left { left: 24px; bottom: 24px; }
.vx-fab--top-right { right: 24px; top: 24px; }
.vx-fab--top-left { left: 24px; top: 24px; }
</style>
