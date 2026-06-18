<script setup lang="ts">
import { computed, nextTick, ref, useId, watch } from 'vue'
import { useClickOutside } from '../composables/useClickOutside'
import type { SelectOption } from '../types'

/**
 * Champ avec suggestions filtrées. `v-model` sur le texte saisi.
 * Émet `select` avec l'option choisie.
 */
const props = withDefaults(
  defineProps<{
    /** Options (chaînes ou objets). */
    options: (string | SelectOption)[]
    /** Libellé mono. */
    label?: string
    /** Placeholder. */
    placeholder?: string
    /** Indice. */
    hint?: string
    /** Message d'erreur. */
    error?: string
    /** Désactive le champ. */
    disabled?: boolean
    /** Nombre maximum de suggestions affichées. */
    maxItems?: number
  }>(),
  { maxItems: 8 },
)

const emit = defineEmits<{ select: [option: SelectOption] }>()
const model = defineModel<string>({ default: '' })

const root = ref<HTMLElement>()
const open = ref(false)
const activeIndex = ref(-1)
const baseId = useId()

const normalized = computed<SelectOption[]>(() =>
  props.options.map((o) => (typeof o === 'string' ? { value: o, label: o } : o)),
)

const matches = computed(() => {
  const q = model.value.trim().toLowerCase()
  const list = q
    ? normalized.value.filter((o) => o.label.toLowerCase().includes(q))
    : normalized.value
  return list.slice(0, props.maxItems)
})

useClickOutside(root, () => (open.value = false))

function onInput() {
  open.value = true
  activeIndex.value = -1
}

function choose(opt: SelectOption) {
  model.value = opt.label
  emit('select', opt)
  open.value = false
}

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'ArrowDown') {
    e.preventDefault()
    if (!open.value) open.value = true
    activeIndex.value = Math.min(activeIndex.value + 1, matches.value.length - 1)
  } else if (e.key === 'ArrowUp') {
    e.preventDefault()
    activeIndex.value = Math.max(activeIndex.value - 1, 0)
  } else if (e.key === 'Enter' && open.value && matches.value[activeIndex.value]) {
    e.preventDefault()
    choose(matches.value[activeIndex.value])
  } else if (e.key === 'Escape') {
    open.value = false
  }
}

watch(activeIndex, (i) => {
  nextTick(() => document.getElementById(`${baseId}-opt-${i}`)?.scrollIntoView({ block: 'nearest' }))
})
</script>

<template>
  <div ref="root" class="vx-field vx-ac" :class="{ 'vx-field--error': !!error }">
    <label v-if="label" :for="baseId" class="vx-field__label">{{ label }}</label>
    <div class="vx-field__wrap">
      <input
        :id="baseId"
        v-model="model"
        class="vx-input"
        type="text"
        role="combobox"
        autocomplete="off"
        :placeholder="placeholder"
        :disabled="disabled"
        :aria-expanded="open"
        :aria-controls="`${baseId}-list`"
        :aria-activedescendant="activeIndex >= 0 ? `${baseId}-opt-${activeIndex}` : undefined"
        @input="onInput"
        @focus="open = true"
        @keydown="onKeydown"
      />
    </div>

    <ul
      v-show="open && matches.length"
      :id="`${baseId}-list`"
      class="vx-ac__menu"
      role="listbox"
    >
      <li
        v-for="(opt, i) in matches"
        :id="`${baseId}-opt-${i}`"
        :key="opt.value"
        class="vx-ac__option"
        :class="{ 'is-active': i === activeIndex }"
        role="option"
        :aria-selected="i === activeIndex"
        @mousedown.prevent="choose(opt)"
        @mousemove="activeIndex = i"
      >
        {{ opt.label }}
      </li>
    </ul>

    <p v-if="error || hint" class="vx-field__hint" :class="{ 'vx-field__hint--error': !!error }">
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
.vx-ac {
  position: relative;
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
.vx-input::placeholder {
  color: var(--vx-muted);
  opacity: 0.7;
}
.vx-input:focus {
  border-color: var(--vx-accent-dim);
  box-shadow: var(--vx-ring, 0 0 0 3px color-mix(in oklab, var(--vx-accent) 22%, transparent));
}
.vx-field--error .vx-input {
  border-color: var(--vx-err);
}
.vx-ac__menu {
  position: absolute;
  top: calc(100% + 6px);
  left: 0;
  right: 0;
  z-index: 30;
  margin: 0;
  padding: 5px;
  list-style: none;
  max-height: 240px;
  overflow: auto;
  background: var(--vx-paper);
  border: 1.5px solid var(--vx-line);
  border-radius: var(--vx-radius, 9px 11px 8px 12px);
  box-shadow: var(--vx-shadow);
  animation: vx-rise 0.16s ease;
}
.vx-ac__option {
  padding: 8px 10px;
  border-radius: 7px;
  font-family: var(--vx-font-mono);
  font-size: 12.5px;
  color: var(--vx-ink);
  cursor: pointer;
}
.vx-ac__option.is-active {
  background: var(--vx-fill);
  color: var(--vx-accent);
}
.vx-field__hint {
  margin: 0;
  font-size: 11px;
  color: var(--vx-muted);
}
.vx-field__hint--error {
  color: var(--vx-err);
}
@keyframes vx-rise {
  from {
    transform: translateY(-4px);
    opacity: 0;
  }
  to {
    transform: none;
    opacity: 1;
  }
}
</style>
