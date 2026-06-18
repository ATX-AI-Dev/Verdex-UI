<script setup lang="ts">
import { ref, useId } from 'vue'

/** Infobulle au survol/focus. Enveloppe l'élément déclencheur (slot par défaut). */
withDefaults(
  defineProps<{
    /** Texte de l'infobulle. */
    text: string
    /** Position. */
    placement?: 'top' | 'bottom' | 'left' | 'right'
    /** Délai d'apparition (ms). */
    delay?: number
  }>(),
  { placement: 'top', delay: 120 },
)

const visible = ref(false)
const tipId = useId()
let timer: ReturnType<typeof setTimeout> | undefined

function show(delay: number) {
  clearTimeout(timer)
  timer = setTimeout(() => (visible.value = true), delay)
}
function hide() {
  clearTimeout(timer)
  visible.value = false
}
</script>

<template>
  <span
    class="vx-tooltip"
    @mouseenter="show(delay)"
    @mouseleave="hide"
    @focusin="show(0)"
    @focusout="hide"
  >
    <span class="vx-tooltip__trigger" :aria-describedby="visible ? tipId : undefined">
      <slot />
    </span>
    <Transition name="vx-tooltip-fade">
      <span
        v-if="visible"
        :id="tipId"
        class="vx-tooltip__bubble"
        :class="`vx-tooltip__bubble--${placement}`"
        role="tooltip"
      >
        {{ text }}
      </span>
    </Transition>
  </span>
</template>

<style scoped>
.vx-tooltip {
  position: relative;
  display: inline-flex;
}
.vx-tooltip__trigger {
  display: inline-flex;
}
.vx-tooltip__bubble {
  position: absolute;
  z-index: 60;
  padding: 5px 9px;
  background: var(--vx-chrome);
  color: var(--vx-ink);
  border: 1px solid var(--vx-line);
  border-radius: 7px;
  font-family: var(--vx-font-mono);
  font-size: 10.5px;
  letter-spacing: 0.02em;
  white-space: nowrap;
  pointer-events: none;
  box-shadow: var(--vx-shadow);
}
.vx-tooltip__bubble--top {
  bottom: calc(100% + 7px);
  left: 50%;
  transform: translateX(-50%);
}
.vx-tooltip__bubble--bottom {
  top: calc(100% + 7px);
  left: 50%;
  transform: translateX(-50%);
}
.vx-tooltip__bubble--left {
  right: calc(100% + 7px);
  top: 50%;
  transform: translateY(-50%);
}
.vx-tooltip__bubble--right {
  left: calc(100% + 7px);
  top: 50%;
  transform: translateY(-50%);
}
.vx-tooltip-fade-enter-active,
.vx-tooltip-fade-leave-active {
  transition: opacity 0.14s ease;
}
.vx-tooltip-fade-enter-from,
.vx-tooltip-fade-leave-to {
  opacity: 0;
}
</style>
