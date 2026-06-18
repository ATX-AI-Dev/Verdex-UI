<script setup lang="ts">
/** Barre d'outils horizontale. Slots `#start`, défaut (titre/centre), `#end`. */
defineProps<{
  /** Titre affiché à gauche. */
  title?: string
}>()
</script>

<template>
  <div class="vx-toolbar" role="toolbar">
    <div class="vx-toolbar__start">
      <slot name="start" />
      <span v-if="title" class="vx-toolbar__title">{{ title }}</span>
    </div>
    <div class="vx-toolbar__mid">
      <slot />
    </div>
    <div class="vx-toolbar__end">
      <slot name="end" />
    </div>
  </div>
</template>

<style scoped>
.vx-toolbar {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 12px;
  background: var(--vx-paper2);
  border: 1.5px solid var(--vx-line);
  border-radius: var(--vx-radius, 9px 11px 8px 12px);
}
.vx-toolbar__start,
.vx-toolbar__end {
  display: flex;
  align-items: center;
  gap: 8px;
}
.vx-toolbar__mid {
  display: flex;
  align-items: center;
  gap: 8px;
  flex: 1;
}
.vx-toolbar__end {
  margin-left: auto;
}
.vx-toolbar__title {
  font-family: var(--vx-font-mono);
  font-size: 12px;
  color: var(--vx-ink);
  letter-spacing: 0.04em;
}
</style>
