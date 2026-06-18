<script setup lang="ts">
import { computed, nextTick, ref } from 'vue'
import { useClickOutside } from '../composables/useClickOutside'

export interface MenuItem {
  /** Libellé. */
  label?: string
  /** Icône (texte / emoji). */
  icon?: string
  /** Valeur transmise à l'événement select. */
  value?: string | number
  /** Désactive l'élément. */
  disabled?: boolean
  /** Style « danger » (rouge). */
  danger?: boolean
  /** Affiche un séparateur à la place d'un élément. */
  divider?: boolean
}

/** Menu déroulant. Slot `#trigger` (avec `toggle`/`open`). Émet `select`. */
const props = withDefaults(
  defineProps<{
    /** Éléments du menu. */
    items: MenuItem[]
    /** Position d'ancrage. */
    placement?: 'bottom-start' | 'bottom-end' | 'top-start' | 'top-end'
  }>(),
  { placement: 'bottom-start' },
)

const emit = defineEmits<{ select: [item: MenuItem, index: number] }>()

const root = ref<HTMLElement>()
const open = ref(false)
const activeIndex = ref(-1)

const selectable = computed(() =>
  props.items.map((it, i) => ({ it, i })).filter(({ it }) => !it.divider && !it.disabled),
)

useClickOutside(root, () => (open.value = false))

function toggle() {
  open.value = !open.value
  if (open.value) activeIndex.value = selectable.value[0]?.i ?? -1
}

function choose(item: MenuItem, index: number) {
  if (item.disabled || item.divider) return
  emit('select', item, index)
  open.value = false
}

function move(dir: 1 | -1) {
  const list = selectable.value
  if (!list.length) return
  const pos = list.findIndex((x) => x.i === activeIndex.value)
  const next = (pos + dir + list.length) % list.length
  activeIndex.value = list[next].i
  nextTick(() => document.getElementById(`vx-menu-item-${activeIndex.value}`)?.focus())
}

function onKeydown(e: KeyboardEvent) {
  if (!open.value) {
    if (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      toggle()
    }
    return
  }
  switch (e.key) {
    case 'ArrowDown': e.preventDefault(); move(1); break
    case 'ArrowUp': e.preventDefault(); move(-1); break
    case 'Home': e.preventDefault(); activeIndex.value = selectable.value[0]?.i ?? -1; break
    case 'End': e.preventDefault(); activeIndex.value = selectable.value.at(-1)?.i ?? -1; break
    case 'Enter':
    case ' ':
      e.preventDefault()
      if (props.items[activeIndex.value]) choose(props.items[activeIndex.value], activeIndex.value)
      break
    case 'Escape': open.value = false; break
  }
}
</script>

<template>
  <div ref="root" class="vx-menu" @keydown="onKeydown">
    <div class="vx-menu__trigger">
      <slot name="trigger" :toggle="toggle" :open="open" />
    </div>
    <Transition name="vx-menu-pop">
      <ul v-if="open" class="vx-menu__list" :class="`vx-menu__list--${placement}`" role="menu">
        <template v-for="(item, i) in items" :key="i">
          <li v-if="item.divider" class="vx-menu__divider" role="separator" />
          <li
            v-else
            :id="`vx-menu-item-${i}`"
            class="vx-menu__item"
            :class="{ 'is-active': i === activeIndex, 'is-disabled': item.disabled, 'is-danger': item.danger }"
            role="menuitem"
            :tabindex="item.disabled ? undefined : -1"
            :aria-disabled="item.disabled || undefined"
            @click="choose(item, i)"
            @mousemove="activeIndex = i"
          >
            <span v-if="item.icon" class="vx-menu__icon">{{ item.icon }}</span>
            <span>{{ item.label }}</span>
          </li>
        </template>
      </ul>
    </Transition>
  </div>
</template>

<style scoped>
.vx-menu {
  position: relative;
  display: inline-flex;
}
.vx-menu__trigger {
  display: inline-flex;
}
.vx-menu__list {
  position: absolute;
  z-index: 50;
  min-width: 180px;
  margin: 0;
  padding: 5px;
  list-style: none;
  background: var(--vx-paper);
  border: 1.5px solid var(--vx-line);
  border-radius: var(--vx-radius, 9px 11px 8px 12px);
  box-shadow: var(--vx-shadow);
}
.vx-menu__list--bottom-start { top: calc(100% + 7px); left: 0; }
.vx-menu__list--bottom-end { top: calc(100% + 7px); right: 0; }
.vx-menu__list--top-start { bottom: calc(100% + 7px); left: 0; }
.vx-menu__list--top-end { bottom: calc(100% + 7px); right: 0; }
.vx-menu__item {
  display: flex;
  align-items: center;
  gap: 9px;
  padding: 8px 10px;
  border-radius: 7px;
  font-family: var(--vx-font-sans);
  font-size: 13px;
  color: var(--vx-ink);
  cursor: pointer;
  outline: none;
}
.vx-menu__item.is-active {
  background: var(--vx-fill);
}
.vx-menu__item.is-danger {
  color: var(--vx-err);
}
.vx-menu__item.is-disabled {
  opacity: 0.4;
  cursor: not-allowed;
}
.vx-menu__icon {
  width: 16px;
  text-align: center;
  color: var(--vx-muted);
}
.vx-menu__item.is-danger .vx-menu__icon {
  color: var(--vx-err);
}
.vx-menu__divider {
  height: 1px;
  background: var(--vx-line-2);
  margin: 5px 4px;
}
.vx-menu-pop-enter-active {
  transition: opacity 0.16s ease, transform 0.16s cubic-bezier(0.2, 0.7, 0.2, 1);
}
.vx-menu-pop-leave-active {
  transition: opacity 0.12s ease, transform 0.12s ease;
}
.vx-menu-pop-enter-from,
.vx-menu-pop-leave-to {
  opacity: 0;
  transform: translateY(-4px) scale(0.98);
}
</style>
