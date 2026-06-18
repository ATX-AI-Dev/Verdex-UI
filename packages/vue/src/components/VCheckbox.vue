<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'

/**
 * Case à cocher. `v-model` accepte un booléen, ou un tableau combiné à `value`
 * (groupes de cases). Gère l'état indéterminé.
 */
const props = withDefaults(
  defineProps<{
    /** Valeur ajoutée/retirée du tableau en mode groupe. */
    value?: string | number
    /** Libellé. */
    label?: string
    /** Désactive la case. */
    disabled?: boolean
    /** État indéterminé (visuel uniquement). */
    indeterminate?: boolean
  }>(),
  {},
)

const model = defineModel<boolean | (string | number)[]>({ default: false })
const input = ref<HTMLInputElement>()

function syncIndeterminate() {
  if (input.value) input.value.indeterminate = props.indeterminate ?? false
}
onMounted(syncIndeterminate)
watch(() => props.indeterminate, syncIndeterminate)
</script>

<template>
  <label class="vx-check" :class="{ 'is-disabled': disabled }">
    <input
      ref="input"
      v-model="model"
      type="checkbox"
      class="vx-check__input"
      :value="value"
      :disabled="disabled"
    />
    <span class="vx-check__box" aria-hidden="true" />
    <span v-if="label || $slots.default" class="vx-check__label"><slot>{{ label }}</slot></span>
  </label>
</template>

<style scoped>
.vx-check {
  display: inline-flex;
  align-items: center;
  gap: 9px;
  cursor: pointer;
  font-family: var(--vx-font-sans);
  font-size: 13px;
  color: var(--vx-ink);
  user-select: none;
}
.vx-check.is-disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
.vx-check__input {
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
}
.vx-check__box {
  position: relative;
  width: 18px;
  height: 18px;
  flex: none;
  border: 1.5px solid var(--vx-line);
  border-radius: 5px 6px 5px 7px;
  background: var(--vx-paper2);
  transition:
    background 0.15s,
    border-color 0.15s;
}
.vx-check__box::after {
  content: '';
  position: absolute;
  left: 5px;
  top: 1px;
  width: 5px;
  height: 10px;
  border: solid var(--vx-accent-ink);
  border-width: 0 2px 2px 0;
  transform: rotate(45deg) scale(0);
  transition: transform 0.15s cubic-bezier(0.2, 0.7, 0.2, 1);
}
.vx-check__input:checked + .vx-check__box {
  background: var(--vx-accent);
  border-color: var(--vx-accent);
}
.vx-check__input:checked + .vx-check__box::after {
  transform: rotate(45deg) scale(1);
}
.vx-check__input:indeterminate + .vx-check__box {
  background: var(--vx-accent);
  border-color: var(--vx-accent);
}
.vx-check__input:indeterminate + .vx-check__box::after {
  transform: none;
  left: 3px;
  top: 7px;
  width: 10px;
  height: 0;
  border-width: 0 0 2px 0;
}
.vx-check__input:focus-visible + .vx-check__box {
  box-shadow: var(--vx-ring, 0 0 0 3px color-mix(in oklab, var(--vx-accent) 22%, transparent));
}
</style>
