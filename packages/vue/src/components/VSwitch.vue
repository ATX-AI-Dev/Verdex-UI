<script setup lang="ts">
/** Interrupteur on/off. `v-model` booléen. */
withDefaults(
  defineProps<{
    /** Libellé à droite. */
    label?: string
    /** Désactive l'interrupteur. */
    disabled?: boolean
  }>(),
  {},
)

const model = defineModel<boolean>({ default: false })
</script>

<template>
  <label class="vx-switch" :class="{ 'is-disabled': disabled }">
    <button
      type="button"
      role="switch"
      class="vx-switch__track"
      :class="{ 'is-on': model }"
      :aria-checked="model"
      :disabled="disabled"
      @click="model = !model"
    >
      <span class="vx-switch__thumb" />
    </button>
    <span v-if="label || $slots.default" class="vx-switch__label"><slot>{{ label }}</slot></span>
  </label>
</template>

<style scoped>
.vx-switch {
  display: inline-flex;
  align-items: center;
  gap: 9px;
  font-family: var(--vx-font-sans);
  font-size: 13px;
  color: var(--vx-ink);
  user-select: none;
}
.vx-switch.is-disabled {
  opacity: 0.5;
}
.vx-switch__track {
  position: relative;
  width: 38px;
  height: 22px;
  flex: none;
  border: 1.5px solid var(--vx-line);
  border-radius: 999px;
  background: var(--vx-paper2);
  cursor: pointer;
  padding: 0;
  transition:
    background 0.2s,
    border-color 0.2s;
}
.vx-switch__track:disabled {
  cursor: not-allowed;
}
.vx-switch__track.is-on {
  background: var(--vx-accent);
  border-color: var(--vx-accent);
}
.vx-switch__track:focus-visible {
  outline: none;
  box-shadow: var(--vx-ring, 0 0 0 3px color-mix(in oklab, var(--vx-accent) 22%, transparent));
}
.vx-switch__thumb {
  position: absolute;
  top: 1px;
  left: 1px;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: var(--vx-ink);
  transition: transform 0.22s cubic-bezier(0.2, 0.7, 0.2, 1);
}
.vx-switch__track.is-on .vx-switch__thumb {
  transform: translateX(16px);
  background: var(--vx-accent-ink);
}
</style>
