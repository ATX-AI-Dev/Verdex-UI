<script setup lang="ts">
import { computed } from 'vue'

export interface TreeNode {
  /** Identifiant unique. */
  id: string
  /** Libellé. */
  label: string
  /** Icône (texte/emoji). */
  icon?: string
  /** Enfants. */
  children?: TreeNode[]
}

/** Arborescence repliable. `v-model` = nœud sélectionné, `v-model:expanded` = ids dépliés. */
const props = defineProps<{
  /** Nœuds racines. */
  nodes: TreeNode[]
}>()

const selected = defineModel<string>()
const expanded = defineModel<string[]>('expanded', { default: () => [] })

interface FlatNode {
  node: TreeNode
  depth: number
  hasChildren: boolean
  open: boolean
}

// Aplatit l'arbre selon l'état déplié (évite la récursion de composant).
const flat = computed<FlatNode[]>(() => {
  const out: FlatNode[] = []
  const walk = (list: TreeNode[], depth: number) => {
    for (const node of list) {
      const hasChildren = !!node.children?.length
      const open = expanded.value.includes(node.id)
      out.push({ node, depth, hasChildren, open })
      if (hasChildren && open) walk(node.children!, depth + 1)
    }
  }
  walk(props.nodes, 0)
  return out
})

function toggle(item: FlatNode) {
  if (!item.hasChildren) return
  const list = [...expanded.value]
  const idx = list.indexOf(item.node.id)
  if (idx === -1) list.push(item.node.id)
  else list.splice(idx, 1)
  expanded.value = list
}

function activate(item: FlatNode) {
  if (item.hasChildren) toggle(item)
  else selected.value = item.node.id
}
</script>

<template>
  <ul class="vx-tree" role="tree">
    <li
      v-for="item in flat"
      :key="item.node.id"
      class="vx-tree__row"
      :class="{ 'is-active': selected === item.node.id }"
      role="treeitem"
      :aria-expanded="item.hasChildren ? item.open : undefined"
      :aria-selected="selected === item.node.id"
      :style="{ paddingLeft: `${8 + item.depth * 18}px` }"
      tabindex="0"
      @click="activate(item)"
      @keydown.enter="activate(item)"
    >
      <span
        class="vx-tree__chev"
        :class="{ 'is-open': item.open, 'is-leaf': !item.hasChildren }"
        aria-hidden="true"
        @click.stop="toggle(item)"
      >▸</span>
      <span v-if="item.node.icon" class="vx-tree__icon">{{ item.node.icon }}</span>
      <span class="vx-tree__label">{{ item.node.label }}</span>
    </li>
  </ul>
</template>

<style scoped>
.vx-tree {
  list-style: none;
  margin: 0;
  padding: 0;
}
.vx-tree__row {
  display: flex;
  align-items: center;
  gap: 7px;
  padding: 6px 10px;
  border-radius: 7px;
  cursor: pointer;
  color: var(--vx-ink);
  font-size: 13px;
  transition: background 0.14s;
}
.vx-tree__row:hover {
  background: var(--vx-fill);
}
.vx-tree__row.is-active {
  background: color-mix(in oklab, var(--vx-accent) 14%, transparent);
  color: var(--vx-ink);
}
.vx-tree__row:focus-visible {
  outline: none;
  box-shadow: var(--vx-ring, 0 0 0 3px color-mix(in oklab, var(--vx-accent) 22%, transparent));
}
.vx-tree__chev {
  width: 14px;
  flex: none;
  color: var(--vx-muted);
  font-size: 10px;
  transition: transform 0.18s ease;
  text-align: center;
}
.vx-tree__chev.is-open {
  transform: rotate(90deg);
}
.vx-tree__chev.is-leaf {
  visibility: hidden;
}
.vx-tree__icon {
  color: var(--vx-muted);
  flex: none;
}
.vx-tree__label {
  flex: 1;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
