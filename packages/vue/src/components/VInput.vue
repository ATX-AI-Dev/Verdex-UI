<script setup lang="ts">
import { useId } from 'vue'

/** Champ de saisie avec label mono, indice et état d'erreur. `v-model`. */
withDefaults(
  defineProps<{
    /** Libellé (mono, uppercase). */
    label?: string
    /** Indice sous le champ. */
    hint?: string
    /** Message d'erreur (active l'état error). */
    error?: string
    /** Type HTML natif. */
    type?: string
    /** Placeholder. */
    placeholder?: string
    /** Désactive le champ. */
    disabled?: boolean
    /** Champ requis. */
    required?: boolean
    /** autocomplete natif. */
    autocomplete?: string
  }>(),
  { type: 'text' },
)

const model = defineModel<string>()
const fieldId = useId()
const hintId = useId()
</script>

<template>
  <div class="vx-field" :class="{ 'vx-field--error': !!error }">
    <label v-if="label" :for="fieldId" class="vx-field__label">{{ label }}</label>
    <div class="vx-field__wrap" :class="{ 'vx-field__wrap--icon': $slots.icon }">
      <span v-if="$slots.icon" class="vx-field__icon"><slot name="icon" /></span>
      <input
        :id="fieldId"
        v-model="model"
        class="vx-input"
        :type="type"
        :placeholder="placeholder"
        :disabled="disabled"
        :required="required"
        :autocomplete="autocomplete"
        :aria-invalid="!!error || undefined"
        :aria-describedby="hint || error ? hintId : undefined"
      />
    </div>
    <p v-if="error || hint" :id="hintId" class="vx-field__hint" :class="{ 'vx-field__hint--error': !!error }">
      {{ error || hint }}
    </p>
  </div>
</template>

<style scoped>
.vx-field {
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.vx-field__label {
  font-family: var(--vx-font-mono);
  font-size: 10px;
  color: var(--vx-muted);
  letter-spacing: 0.08em;
  text-transform: uppercase;
}
.vx-field__wrap {
  position: relative;
  display: flex;
  align-items: center;
}
.vx-field__icon {
  position: absolute;
  left: 11px;
  display: grid;
  place-items: center;
  color: var(--vx-muted);
  pointer-events: none;
  font-size: 14px;
}
.vx-input {
  width: 100%;
  border: 1.5px solid var(--vx-line);
  background: var(--vx-paper2);
  color: var(--vx-ink);
  font-family: var(--vx-font-mono);
  font-size: 13px;
  border-radius: var(--vx-radius-sm, 7px 9px 6px 10px);
  padding: 10px 12px;
  outline: none;
  transition:
    border-color 0.2s,
    box-shadow 0.2s;
}
.vx-field__wrap--icon .vx-input {
  padding-left: 32px;
}
.vx-input::placeholder {
  color: var(--vx-muted);
  opacity: 0.7;
}
.vx-input:focus {
  border-color: var(--vx-accent-dim);
  box-shadow: var(--vx-ring, 0 0 0 3px color-mix(in oklab, var(--vx-accent) 22%, transparent));
}
.vx-input:disabled {
  opacity: 0.55;
  cursor: not-allowed;
}
.vx-field--error .vx-input {
  border-color: var(--vx-err);
}
.vx-field--error .vx-input:focus {
  box-shadow: 0 0 0 3px color-mix(in oklab, var(--vx-err) 22%, transparent);
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
