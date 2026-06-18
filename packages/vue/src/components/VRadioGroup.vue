<script setup lang="ts">
import { useId } from 'vue'
import type { SelectOption } from '../types'

/** Groupe de boutons radio. `v-model` sur la valeur sélectionnée. */
withDefaults(
  defineProps<{
    /** Options. */
    options: SelectOption[]
    /** Libellé du groupe. */
    label?: string
    /** Disposition. */
    inline?: boolean
    /** Désactive tout le groupe. */
    disabled?: boolean
    /** Message d'erreur. */
    error?: string
  }>(),
  {},
)

const model = defineModel<string | number>()
const name = useId()
</script>

<template>
  <fieldset class="vx-radiogroup" :class="{ 'is-inline': inline }">
    <legend v-if="label" class="vx-field__label">{{ label }}</legend>
    <label
      v-for="opt in options"
      :key="opt.value"
      class="vx-radio"
      :class="{ 'is-disabled': disabled || opt.disabled }"
    >
      <input
        v-model="model"
        type="radio"
        class="vx-radio__input"
        :name="name"
        :value="opt.value"
        :disabled="disabled || opt.disabled"
      />
      <span class="vx-radio__dot" aria-hidden="true" />
      <span class="vx-radio__label">{{ opt.label }}</span>
    </label>
    <p v-if="error" class="vx-field__hint vx-field__hint--error">{{ error }}</p>
  </fieldset>
</template>

<style scoped>
.vx-radiogroup {
  border: 0;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 9px;
}
.vx-radiogroup.is-inline {
  flex-direction: row;
  flex-wrap: wrap;
  gap: 16px;
  align-items: center;
}
.vx-field__label {
  font-family: var(--vx-font-mono);
  font-size: 10px;
  color: var(--vx-muted);
  letter-spacing: 0.08em;
  text-transform: uppercase;
  padding: 0;
}
.vx-radiogroup.is-inline .vx-field__label {
  flex-basis: 100%;
}
.vx-radio {
  display: inline-flex;
  align-items: center;
  gap: 9px;
  cursor: pointer;
  font-family: var(--vx-font-sans);
  font-size: 13px;
  color: var(--vx-ink);
  user-select: none;
}
.vx-radio.is-disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
.vx-radio__input {
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
}
.vx-radio__dot {
  position: relative;
  width: 18px;
  height: 18px;
  flex: none;
  border: 1.5px solid var(--vx-line);
  border-radius: 50%;
  background: var(--vx-paper2);
  transition: border-color 0.15s;
}
.vx-radio__dot::after {
  content: '';
  position: absolute;
  inset: 0;
  margin: auto;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--vx-accent);
  transform: scale(0);
  transition: transform 0.15s cubic-bezier(0.2, 0.7, 0.2, 1);
}
.vx-radio__input:checked + .vx-radio__dot {
  border-color: var(--vx-accent);
}
.vx-radio__input:checked + .vx-radio__dot::after {
  transform: scale(1);
}
.vx-radio__input:focus-visible + .vx-radio__dot {
  box-shadow: var(--vx-ring, 0 0 0 3px color-mix(in oklab, var(--vx-accent) 22%, transparent));
}
.vx-field__hint {
  margin: 0;
  font-size: 11px;
  color: var(--vx-muted);
}
.vx-field__hint--error {
  color: var(--vx-err);
}
</style>
