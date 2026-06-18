<script setup lang="ts">
import type { AlertKind } from '../types'

/** Bandeau d'annonce pleine largeur, avec actions et fermeture optionnelles. */
withDefaults(
  defineProps<{
    /** Tonalité. */
    kind?: AlertKind
    /** Titre. */
    title?: string
    /** Icône (texte/emoji). */
    icon?: string
    /** Affiche un bouton de fermeture. */
    dismissible?: boolean
  }>(),
  { kind: 'info' },
)

defineEmits<{ close: [] }>()
</script>

<template>
  <div class="vx-banner" :class="`vx-banner--${kind}`" role="status">
    <span v-if="icon" class="vx-banner__icon" aria-hidden="true">{{ icon }}</span>
    <div class="vx-banner__body">
      <span v-if="title" class="vx-banner__title">{{ title }}</span>
      <span class="vx-banner__msg"><slot /></span>
    </div>
    <div v-if="$slots.actions" class="vx-banner__actions">
      <slot name="actions" />
    </div>
    <button
      v-if="dismissible"
      class="vx-banner__close"
      type="button"
      aria-label="Fermer"
      @click="$emit('close')"
    >✕</button>
  </div>
</template>

<style scoped>
.vx-banner {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 18px;
  border: 1.5px solid var(--vx-line);
  border-radius: var(--vx-radius, 9px 11px 8px 12px);
  background: var(--vx-paper2);
  color: var(--vx-ink);
}
.vx-banner__icon {
  font-size: 18px;
  flex: none;
}
.vx-banner__body {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 4px 10px;
}
.vx-banner__title {
  font-weight: 700;
  font-size: 13.5px;
}
.vx-banner__msg {
  font-size: 13px;
  color: var(--vx-muted);
}
.vx-banner__actions {
  display: flex;
  align-items: center;
  gap: 8px;
  flex: none;
}
.vx-banner__close {
  border: 0;
  background: none;
  color: var(--vx-muted);
  cursor: pointer;
  font-size: 15px;
  line-height: 1;
  flex: none;
}
.vx-banner__close:hover { color: var(--vx-ink); }
.vx-banner--info { border-left: 3px solid var(--vx-info); }
.vx-banner--success { border-left: 3px solid var(--vx-accent); }
.vx-banner--warn { border-left: 3px solid var(--vx-warn); }
.vx-banner--err { border-left: 3px solid var(--vx-err); }
</style>
