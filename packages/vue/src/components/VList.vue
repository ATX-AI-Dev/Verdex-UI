<script setup lang="ts">
export interface ListItem {
  /** Valeur (v-model en mode sélectionnable). */
  value?: string | number
  /** Libellé principal. */
  label: string
  /** Texte secondaire. */
  sublabel?: string
  /** Icône (texte/emoji). */
  icon?: string
  /** Texte/valeur affichée à droite. */
  trailing?: string | number
  /** Désactive l'élément. */
  disabled?: boolean
}

/** Liste d'éléments. Sélectionnable (`v-model`) et/ou cliquable (`select`). */
withDefaults(
  defineProps<{
    /** Éléments. */
    items: ListItem[]
    /** Active la sélection (surbrillance + v-model). */
    selectable?: boolean
  }>(),
  {},
)

const emit = defineEmits<{ select: [item: ListItem, index: number] }>()
const model = defineModel<string | number>()

function onClick(item: ListItem, index: number) {
  if (item.disabled) return
  if (item.value != null) model.value = item.value
  emit('select', item, index)
}
</script>

<template>
  <ul class="vx-list" :class="{ 'is-selectable': selectable }">
    <li
      v-for="(item, i) in items"
      :key="item.value ?? i"
      class="vx-list__item"
      :class="{ 'is-active': selectable && item.value === model, 'is-disabled': item.disabled }"
      :tabindex="selectable && !item.disabled ? 0 : undefined"
      :role="selectable ? 'option' : undefined"
      :aria-selected="selectable ? item.value === model : undefined"
      @click="onClick(item, i)"
      @keydown.enter="onClick(item, i)"
    >
      <span v-if="item.icon" class="vx-list__icon">{{ item.icon }}</span>
      <div class="vx-list__text">
        <span class="vx-list__label">{{ item.label }}</span>
        <span v-if="item.sublabel" class="vx-list__sublabel">{{ item.sublabel }}</span>
      </div>
      <span v-if="item.trailing != null" class="vx-list__trailing">{{ item.trailing }}</span>
      <slot name="trailing" :item="item" :index="i" />
    </li>
  </ul>
</template>

<style scoped>
.vx-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
}
.vx-list__item {
  display: flex;
  align-items: center;
  gap: 11px;
  padding: 10px 12px;
  border-radius: var(--vx-radius-sm, 7px 9px 6px 10px);
  color: var(--vx-ink);
}
.vx-list__item + .vx-list__item {
  border-top: 1px solid var(--vx-line-2);
  border-radius: 0;
}
.vx-list.is-selectable .vx-list__item {
  cursor: pointer;
  border-radius: var(--vx-radius-sm, 7px 9px 6px 10px);
  border-top: 0;
  transition: background 0.14s;
}
.vx-list.is-selectable .vx-list__item:hover {
  background: var(--vx-fill);
}
.vx-list__item.is-active {
  background: color-mix(in oklab, var(--vx-accent) 14%, transparent);
  box-shadow: inset 2px 0 0 var(--vx-accent);
}
.vx-list__item.is-disabled {
  opacity: 0.45;
  cursor: not-allowed;
}
.vx-list__item:focus-visible {
  outline: none;
  box-shadow: var(--vx-ring, 0 0 0 3px color-mix(in oklab, var(--vx-accent) 22%, transparent));
}
.vx-list__icon {
  width: 20px;
  text-align: center;
  color: var(--vx-muted);
  flex: none;
}
.vx-list__text {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
}
.vx-list__label {
  font-size: 13.5px;
}
.vx-list__sublabel {
  font-size: 11.5px;
  color: var(--vx-muted);
}
.vx-list__trailing {
  font-family: var(--vx-font-mono);
  font-size: 11px;
  color: var(--vx-muted);
  flex: none;
}
</style>
