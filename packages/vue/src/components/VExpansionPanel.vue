<script setup lang="ts">
import { useId } from 'vue'

/** Panneau dépliable (accordéon). `v-model` sur l'état ouvert. */
withDefaults(
  defineProps<{
    /** Titre de l'entête. */
    title?: string
    /** Icône à gauche. */
    icon?: string
  }>(),
  {},
)

const model = defineModel<boolean>({ default: false })
const bodyId = useId()
</script>

<template>
  <div class="vx-expansion" :class="{ 'is-open': model }">
    <button
      class="vx-expansion__head"
      type="button"
      :aria-expanded="model"
      :aria-controls="bodyId"
      @click="model = !model"
    >
      <span v-if="icon" class="vx-expansion__icon">{{ icon }}</span>
      <span class="vx-expansion__title"><slot name="title">{{ title }}</slot></span>
      <span class="vx-expansion__chev" aria-hidden="true">▾</span>
    </button>
    <div :id="bodyId" class="vx-expansion__wrap" role="region">
      <div class="vx-expansion__body">
        <slot />
      </div>
    </div>
  </div>
</template>

<style scoped>
.vx-expansion {
  border: 1.5px solid var(--vx-line);
  border-radius: var(--vx-radius, 9px 11px 8px 12px);
  background: var(--vx-paper);
  overflow: hidden;
}
.vx-expansion__head {
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  padding: 13px 15px;
  border: 0;
  background: none;
  color: var(--vx-ink);
  cursor: pointer;
  font-family: var(--vx-font-sans);
  font-size: 13.5px;
  font-weight: 600;
  text-align: left;
}
.vx-expansion__icon {
  color: var(--vx-muted);
}
.vx-expansion__title {
  flex: 1;
}
.vx-expansion__chev {
  color: var(--vx-muted);
  font-size: 12px;
  transition: transform 0.25s ease;
}
.vx-expansion.is-open .vx-expansion__chev {
  transform: rotate(180deg);
}
.vx-expansion__wrap {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows 0.28s cubic-bezier(0.2, 0.7, 0.2, 1);
}
.vx-expansion.is-open .vx-expansion__wrap {
  grid-template-rows: 1fr;
}
.vx-expansion__body {
  overflow: hidden;
  font-size: 13px;
  line-height: 1.55;
  color: var(--vx-muted);
}
.vx-expansion.is-open .vx-expansion__body {
  padding: 0 15px 14px;
}
@media (prefers-reduced-motion: reduce) {
  .vx-expansion__wrap { transition-duration: 0.01s; }
}
</style>
