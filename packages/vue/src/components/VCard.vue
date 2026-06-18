<script setup lang="ts">
/**
 * Carte « frame » du design system Verdex.
 * Slots : `cap` (titre + actions au-dessus de la barre), `bar` (barre mono optionnelle),
 * défaut (corps). Prop `tag` pour l'étiquette accent dans la cap.
 */
defineProps<{
  /** Étiquette accent affichée dans la cap. */
  tag?: string
  /** Étiquette en variante fantôme (bordure, sans fond). */
  ghostTag?: boolean
  /** Titre de la barre mono (active la barre). */
  barTitle?: string
}>()
</script>

<template>
  <div class="vx-card">
    <div v-if="$slots.cap || tag" class="vx-card__cap">
      <span v-if="tag" class="vx-card__tag" :class="{ 'vx-card__tag--ghost': ghostTag }">{{ tag }}</span>
      <slot name="cap" />
    </div>
    <div v-if="$slots.bar || barTitle" class="vx-card__bar">
      <span class="vx-card__dots" aria-hidden="true"><i /><i /><i /></span>
      <span v-if="barTitle">{{ barTitle }}</span>
      <slot name="bar" />
    </div>
    <div class="vx-card__body">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.vx-card {
  background: var(--vx-paper);
  border: 2px solid var(--vx-line);
  border-radius: var(--vx-radius-lg, 14px 16px 13px 16px);
  box-shadow: var(--vx-shadow);
  overflow: hidden;
  position: relative;
}
.vx-card__cap {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 14px 0;
  font-size: 14px;
  font-weight: 600;
  color: var(--vx-ink);
}
.vx-card__tag {
  font-family: var(--vx-font-mono);
  font-size: 10px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--vx-accent-ink);
  background: var(--vx-accent);
  border-radius: 6px;
  padding: 2px 7px;
  font-weight: 700;
  white-space: nowrap;
}
.vx-card__tag--ghost {
  background: transparent;
  color: var(--vx-muted);
  border: 1px solid var(--vx-line);
}
.vx-card__bar {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  border-bottom: 1px dashed var(--vx-line);
  background: var(--vx-paper2);
  font-family: var(--vx-font-mono);
  font-size: 11px;
  color: var(--vx-muted);
  letter-spacing: 0.06em;
}
.vx-card__dots {
  display: flex;
  gap: 5px;
}
.vx-card__dots i {
  width: 9px;
  height: 9px;
  border-radius: 50%;
  background: var(--vx-line);
  display: block;
}
.vx-card__body {
  padding: 14px;
}
</style>
