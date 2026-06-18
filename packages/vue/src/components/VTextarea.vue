<script setup lang="ts">
import { useId } from 'vue'

/** Zone de texte multi-lignes, même grammaire que VInput. `v-model`. */
withDefaults(
  defineProps<{
    /** Libellé mono. */
    label?: string
    /** Indice. */
    hint?: string
    /** Message d'erreur. */
    error?: string
    /** Placeholder. */
    placeholder?: string
    /** Nombre de lignes visibles. */
    rows?: number
    /** Désactive le champ. */
    disabled?: boolean
    /** Champ requis. */
    required?: boolean
  }>(),
  { rows: 4 },
)

const model = defineModel<string>()
const fieldId = useId()
const hintId = useId()
</script>

<template>
  <div class="vx-field" :class="{ 'vx-field--error': !!error }">
    <label v-if="label" :for="fieldId" class="vx-field__label">{{ label }}</label>
    <textarea
      :id="fieldId"
      v-model="model"
      class="vx-input vx-textarea"
      :rows="rows"
      :placeholder="placeholder"
      :disabled="disabled"
      :required="required"
      :aria-invalid="!!error || undefined"
      :aria-describedby="hint || error ? hintId : undefined"
    />
    <p
      v-if="error || hint"
      :id="hintId"
      class="vx-field__hint"
      :class="{ 'vx-field__hint--error': !!error }"
    >
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
.vx-textarea {
  resize: vertical;
  min-height: 64px;
  line-height: 1.5;
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
