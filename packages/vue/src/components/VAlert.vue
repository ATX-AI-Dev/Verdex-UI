<script setup lang="ts">
import { computed } from 'vue'
import type { AlertKind } from '../types'

/** Bandeau d'alerte contextuel. Optionnellement fermable. */
const props = withDefaults(
  defineProps<{
    /** Tonalité. */
    kind?: AlertKind
    /** Titre. */
    title?: string
    /** Affiche un bouton de fermeture. */
    dismissible?: boolean
  }>(),
  { kind: 'info' },
)

defineEmits<{ close: [] }>()

const icon = computed(
  () => ({ info: 'ℹ', success: '✓', warn: '⚠', err: '✕' })[props.kind],
)
</script>

<template>
  <div class="vx-alert" :class="`vx-alert--${kind}`" role="alert">
    <span class="vx-alert__icon" aria-hidden="true"><slot name="icon">{{ icon }}</slot></span>
    <div class="vx-alert__body">
      <p v-if="title" class="vx-alert__title">{{ title }}</p>
      <p class="vx-alert__msg"><slot /></p>
    </div>
    <button
      v-if="dismissible"
      class="vx-alert__close"
      type="button"
      aria-label="Fermer"
      @click="$emit('close')"
    >✕</button>
  </div>
</template>

<style scoped>
.vx-alert {
  display: flex;
  gap: 11px;
  align-items: flex-start;
  border: 1.5px solid var(--vx-line);
  border-left-width: 3px;
  border-radius: var(--vx-radius, 9px 11px 8px 12px);
  padding: 12px 14px;
  background: var(--vx-paper2);
  color: var(--vx-ink);
}
.vx-alert__icon { font-size: 16px; line-height: 1.3; flex: none; }
.vx-alert__body { flex: 1; min-width: 0; }
.vx-alert__title { font-weight: 600; font-size: 13.5px; margin: 0 0 2px; }
.vx-alert__msg { font-size: 12.5px; color: var(--vx-muted); margin: 0; line-height: 1.5; }
.vx-alert--info { border-left-color: var(--vx-info); }
.vx-alert--info .vx-alert__icon { color: var(--vx-info); }
.vx-alert--success { border-left-color: var(--vx-accent); }
.vx-alert--success .vx-alert__icon { color: var(--vx-accent); }
.vx-alert--warn { border-left-color: var(--vx-warn); }
.vx-alert--warn .vx-alert__icon { color: var(--vx-warn); }
.vx-alert--err { border-left-color: var(--vx-err); }
.vx-alert--err .vx-alert__icon { color: var(--vx-err); }
.vx-alert__close {
  border: 0;
  background: none;
  color: var(--vx-muted);
  cursor: pointer;
  font-size: 15px;
  line-height: 1;
  padding: 0 2px;
}
.vx-alert__close:hover { color: var(--vx-ink); }
</style>
