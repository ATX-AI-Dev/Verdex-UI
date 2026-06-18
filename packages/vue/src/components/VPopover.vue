<script setup lang="ts">
import { ref } from 'vue'
import { useClickOutside } from '../composables/useClickOutside'

/**
 * Panneau flottant déclenché au clic. Slot `#trigger` (avec `toggle`) et slot par défaut
 * (contenu, avec `close`). `v-model` optionnel sur l'état ouvert.
 */
withDefaults(
  defineProps<{
    /** Position d'ancrage. */
    placement?: 'bottom-start' | 'bottom-end' | 'top-start' | 'top-end'
  }>(),
  { placement: 'bottom-start' },
)

const model = defineModel<boolean>({ default: false })
const root = ref<HTMLElement>()

useClickOutside(root, () => (model.value = false))

function toggle() {
  model.value = !model.value
}
function close() {
  model.value = false
}
</script>

<template>
  <div ref="root" class="vx-popover" @keydown.escape="close">
    <div class="vx-popover__trigger">
      <slot name="trigger" :toggle="toggle" :open="model" />
    </div>
    <Transition name="vx-popover-pop">
      <div v-if="model" class="vx-popover__panel" :class="`vx-popover__panel--${placement}`" role="dialog">
        <slot :close="close" />
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.vx-popover {
  position: relative;
  display: inline-flex;
}
.vx-popover__trigger {
  display: inline-flex;
}
.vx-popover__panel {
  position: absolute;
  z-index: 50;
  min-width: 200px;
  padding: 12px;
  background: var(--vx-paper);
  border: 1.5px solid var(--vx-line);
  border-radius: var(--vx-radius, 9px 11px 8px 12px);
  box-shadow: var(--vx-shadow);
}
.vx-popover__panel--bottom-start {
  top: calc(100% + 7px);
  left: 0;
}
.vx-popover__panel--bottom-end {
  top: calc(100% + 7px);
  right: 0;
}
.vx-popover__panel--top-start {
  bottom: calc(100% + 7px);
  left: 0;
}
.vx-popover__panel--top-end {
  bottom: calc(100% + 7px);
  right: 0;
}
.vx-popover-pop-enter-active {
  transition:
    opacity 0.16s ease,
    transform 0.16s cubic-bezier(0.2, 0.7, 0.2, 1);
}
.vx-popover-pop-leave-active {
  transition:
    opacity 0.12s ease,
    transform 0.12s ease;
}
.vx-popover-pop-enter-from,
.vx-popover-pop-leave-to {
  opacity: 0;
  transform: translateY(-4px) scale(0.98);
}
</style>
