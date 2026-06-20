<script setup lang="ts">
import { computed, nextTick, ref, useId, watch } from 'vue'
import { useClickOutside } from '../composables/useClickOutside'
import type { SelectOption } from '../types'

/** Liste déroulante stylée et accessible (listbox). `v-model` sur la valeur. */
const props = withDefaults(
  defineProps<{
    /** Options. */
    options: SelectOption[]
    /** Libellé mono. */
    label?: string
    /** Indice. */
    hint?: string
    /** Message d'erreur. */
    error?: string
    /** Texte quand rien n'est sélectionné. */
    placeholder?: string
    /** Désactive le select. */
    disabled?: boolean
    /** Autorise l'effacement de la sélection. */
    clearable?: boolean
  }>(),
  { placeholder: 'Sélectionner…' },
)

const model = defineModel<string | number | undefined>()

const root = ref<HTMLElement>()
const open = ref(false)
const activeIndex = ref(-1)
const baseId = useId()

const selected = computed(() => props.options.find((o) => o.value === model.value))

useClickOutside(root, () => (open.value = false))

function openMenu() {
  if (props.disabled) return
  open.value = true
  activeIndex.value = props.options.findIndex((o) => o.value === model.value)
  if (activeIndex.value < 0) activeIndex.value = nextEnabled(-1, 1)
}

function nextEnabled(from: number, dir: 1 | -1): number {
  const n = props.options.length
  for (let i = 1; i <= n; i++) {
    const idx = (from + dir * i + n) % n
    if (!props.options[idx]?.disabled) return idx
  }
  return from
}

function choose(opt: SelectOption) {
  if (opt.disabled) return
  model.value = opt.value
  close()
}

function clear() {
  model.value = undefined
}

function close() {
  open.value = false
  nextTick(() => trigger.value?.focus())
}

const trigger = ref<HTMLButtonElement>()

function onKeydown(e: KeyboardEvent) {
  if (props.disabled) return
  if (!open.value && (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ')) {
    e.preventDefault()
    openMenu()
    return
  }
  if (!open.value) return
  switch (e.key) {
    case 'ArrowDown':
      e.preventDefault()
      activeIndex.value = nextEnabled(activeIndex.value, 1)
      break
    case 'ArrowUp':
      e.preventDefault()
      activeIndex.value = nextEnabled(activeIndex.value, -1)
      break
    case 'Home':
      e.preventDefault()
      activeIndex.value = nextEnabled(-1, 1)
      break
    case 'End':
      e.preventDefault()
      activeIndex.value = nextEnabled(props.options.length, -1)
      break
    case 'Enter':
    case ' ':
      e.preventDefault()
      if (props.options[activeIndex.value]) choose(props.options[activeIndex.value])
      break
    case 'Escape':
      e.preventDefault()
      close()
      break
    case 'Tab':
      open.value = false
      break
  }
}

watch(activeIndex, (i) => {
  nextTick(() => {
    document.getElementById(`${baseId}-opt-${i}`)?.scrollIntoView({ block: 'nearest' })
  })
})
</script>

<template>
  <div ref="root" class="vx-field vx-select" :class="{ 'vx-field--error': !!error }">
    <label v-if="label" :id="`${baseId}-label`" class="vx-field__label">{{ label }}</label>
    <div class="vx-select__trigger-wrap">
      <button
        ref="trigger"
        type="button"
        class="vx-select__trigger"
        :class="{ 'is-open': open, 'is-placeholder': !selected, 'has-clear': clearable && selected && !disabled }"
        :disabled="disabled"
        role="combobox"
        aria-haspopup="listbox"
        :aria-expanded="open"
        :aria-controls="`${baseId}-list`"
        :aria-labelledby="label ? `${baseId}-label` : undefined"
        @click="open ? (open = false) : openMenu()"
        @keydown="onKeydown"
      >
        <span class="vx-select__value">{{ selected?.label ?? placeholder }}</span>
        <span class="vx-select__chev" aria-hidden="true">▾</span>
      </button>
      <button
        v-if="clearable && selected && !disabled"
        type="button"
        class="vx-select__clear"
        aria-label="Effacer"
        @click.stop="clear"
      >✕</button>
    </div>

    <ul
      v-show="open"
      :id="`${baseId}-list`"
      class="vx-select__menu"
      role="listbox"
      :aria-activedescendant="activeIndex >= 0 ? `${baseId}-opt-${activeIndex}` : undefined"
    >
      <li
        v-for="(opt, i) in options"
        :id="`${baseId}-opt-${i}`"
        :key="opt.value"
        class="vx-select__option"
        :class="{ 'is-active': i === activeIndex, 'is-selected': opt.value === model, 'is-disabled': opt.disabled }"
        role="option"
        :aria-selected="opt.value === model"
        :aria-disabled="opt.disabled || undefined"
        @click="choose(opt)"
        @mousemove="activeIndex = i"
      >
        <span>{{ opt.label }}</span>
        <span v-if="opt.value === model" class="vx-select__check" aria-hidden="true">✓</span>
      </li>
    </ul>

    <p
      v-if="error || hint"
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
.vx-select {
  position: relative;
}
.vx-field__label {
  font-family: var(--vx-font-mono);
  font-size: 10px;
  color: var(--vx-muted);
  letter-spacing: 0.08em;
  text-transform: uppercase;
}
.vx-select__trigger-wrap {
  position: relative;
  width: 100%;
}
.vx-select__trigger {
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  border: 1.5px solid var(--vx-line);
  background: var(--vx-paper2);
  color: var(--vx-ink);
  font-family: var(--vx-font-mono);
  font-size: 13px;
  border-radius: var(--vx-radius-sm, 7px 9px 6px 10px);
  padding: 10px 12px;
  padding-right: 32px;
  cursor: pointer;
  text-align: left;
  transition:
    border-color 0.2s,
    box-shadow 0.2s;
}
.vx-select__trigger.has-clear {
  padding-right: 48px;
}
.vx-select__trigger:hover:not(:disabled) {
  border-color: var(--vx-accent-dim);
}
.vx-select__trigger.is-open,
.vx-select__trigger:focus-visible {
  outline: none;
  border-color: var(--vx-accent-dim);
  box-shadow: var(--vx-ring, 0 0 0 3px color-mix(in oklab, var(--vx-accent) 22%, transparent));
}
.vx-select__trigger:disabled {
  opacity: 0.55;
  cursor: not-allowed;
}
.vx-select__trigger.is-placeholder .vx-select__value {
  color: var(--vx-muted);
}
.vx-select__value {
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.vx-select__chev {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--vx-muted);
  font-size: 11px;
  transition: transform 0.2s;
  pointer-events: none;
}
.vx-select__trigger.is-open .vx-select__chev {
  transform: translateY(-50%) rotate(180deg);
}
.vx-select__clear {
  position: absolute;
  top: 50%;
  right: 28px;
  transform: translateY(-50%);
  z-index: 2;
  border: 0;
  background: none;
  color: var(--vx-muted);
  cursor: pointer;
  font-size: 12px;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 1;
}
.vx-select__clear:hover {
  color: var(--vx-ink);
}
.vx-field--error .vx-select__trigger {
  border-color: var(--vx-err);
}
.vx-select__menu {
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
.vx-select__option {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  padding: 8px 10px;
  border-radius: 7px;
  font-family: var(--vx-font-mono);
  font-size: 12.5px;
  color: var(--vx-ink);
  cursor: pointer;
}
.vx-select__option.is-active {
  background: var(--vx-fill);
}
.vx-select__option.is-selected {
  color: var(--vx-accent);
}
.vx-select__option.is-disabled {
  opacity: 0.4;
  cursor: not-allowed;
}
.vx-select__check {
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
