<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import VCheckbox from './VCheckbox.vue'

export interface Column {
  /** Clé dans la ligne. */
  key: string
  /** Entête. */
  label: string
  /** Triable. */
  sortable?: boolean
  /** Alignement du contenu. */
  align?: 'left' | 'center' | 'right'
  /** Largeur CSS. */
  width?: string
  /** Rendu en police mono. */
  mono?: boolean
}

type Row = Record<string, unknown>

/** Table de données : tri, sélection, pagination. Slot `#cell-<clé>` pour un rendu custom. */
const props = withDefaults(
  defineProps<{
    /** Colonnes. */
    columns: Column[]
    /** Lignes. */
    rows: Row[]
    /** Champ identifiant unique. */
    rowKey?: string
    /** Active la colonne de sélection. */
    selectable?: boolean
    /** Taille de page (0 = pas de pagination). */
    pageSize?: number
  }>(),
  { rowKey: 'id', pageSize: 25 },
)

const emit = defineEmits<{ rowClick: [row: Row] }>()
const selected = defineModel<(string | number)[]>('selected', { default: () => [] })

// — Tri —
const sortKey = ref<string>('')
const sortDir = ref<'asc' | 'desc'>('asc')
function toggleSort(col: Column) {
  if (!col.sortable) return
  if (sortKey.value === col.key) {
    sortDir.value = sortDir.value === 'asc' ? 'desc' : 'asc'
  } else {
    sortKey.value = col.key
    sortDir.value = 'asc'
  }
}
const sortedRows = computed(() => {
  if (!sortKey.value) return props.rows
  const dir = sortDir.value === 'asc' ? 1 : -1
  return [...props.rows].sort((a, b) => {
    const av = a[sortKey.value]
    const bv = b[sortKey.value]
    if (av == null) return 1
    if (bv == null) return -1
    if (typeof av === 'number' && typeof bv === 'number') return (av - bv) * dir
    return String(av).localeCompare(String(bv)) * dir
  })
})

// — Pagination —
const page = ref(0)
const pageCount = computed(() =>
  props.pageSize > 0 ? Math.max(1, Math.ceil(sortedRows.value.length / props.pageSize)) : 1,
)
watch([pageCount, () => props.pageSize], () => {
  if (page.value > pageCount.value - 1) page.value = pageCount.value - 1
})
const pagedRows = computed(() => {
  if (props.pageSize <= 0) return sortedRows.value
  const start = page.value * props.pageSize
  return sortedRows.value.slice(start, start + props.pageSize)
})

// — Sélection —
const allKeys = computed(() => props.rows.map((r) => r[props.rowKey] as string | number))
const allSelected = computed(
  () => allKeys.value.length > 0 && allKeys.value.every((k) => selected.value.includes(k)),
)
const someSelected = computed(
  () => selected.value.length > 0 && !allSelected.value,
)
function toggleAll(checked: boolean) {
  selected.value = checked ? [...allKeys.value] : []
}
</script>

<template>
  <div class="vx-table-wrap">
    <table class="vx-table">
      <thead>
        <tr>
          <th v-if="selectable" class="vx-table__check">
            <VCheckbox
              :model-value="allSelected"
              :indeterminate="someSelected"
              @update:model-value="toggleAll($event as boolean)"
            />
          </th>
          <th
            v-for="col in columns"
            :key="col.key"
            :style="{ width: col.width, textAlign: col.align ?? 'left' }"
            :class="{ 'is-sortable': col.sortable, 'is-sorted': sortKey === col.key }"
            :aria-sort="sortKey === col.key ? (sortDir === 'asc' ? 'ascending' : 'descending') : undefined"
            @click="toggleSort(col)"
          >
            <span class="vx-table__th">
              {{ col.label }}
              <span v-if="col.sortable" class="vx-table__sort" :class="{ 'is-active': sortKey === col.key }">
                {{ sortKey === col.key ? (sortDir === 'asc' ? '↑' : '↓') : '↕' }}
              </span>
            </span>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="pagedRows.length === 0">
          <td :colspan="columns.length + (selectable ? 1 : 0)" class="vx-table__empty">
            <slot name="empty">Aucune donnée.</slot>
          </td>
        </tr>
        <tr
          v-for="row in pagedRows"
          :key="String(row[rowKey])"
          class="vx-table__row"
          :class="{ 'is-selected': selected.includes(row[rowKey] as string | number) }"
          @click="emit('rowClick', row)"
        >
          <td v-if="selectable" class="vx-table__check" @click.stop>
            <VCheckbox v-model="selected" :value="row[rowKey] as string | number" />
          </td>
          <td
            v-for="col in columns"
            :key="col.key"
            :style="{ textAlign: col.align ?? 'left' }"
            :class="{ 'vx-table__mono': col.mono }"
          >
            <slot :name="`cell-${col.key}`" :row="row" :value="row[col.key]">
              {{ row[col.key] }}
            </slot>
          </td>
        </tr>
      </tbody>
    </table>

    <div v-if="pageSize > 0 && pageCount > 1" class="vx-table__pagination">
      <span class="vx-table__pageinfo">
        {{ page * pageSize + 1 }}–{{ Math.min((page + 1) * pageSize, sortedRows.length) }} / {{ sortedRows.length }}
      </span>
      <div class="vx-table__pagebtns">
        <button type="button" class="vx-table__pagebtn" :disabled="page === 0" aria-label="Page précédente" @click="page--">‹</button>
        <span class="vx-table__pagecur">{{ page + 1 }} / {{ pageCount }}</span>
        <button type="button" class="vx-table__pagebtn" :disabled="page >= pageCount - 1" aria-label="Page suivante" @click="page++">›</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.vx-table-wrap {
  border: 1.5px solid var(--vx-line);
  border-radius: var(--vx-radius, 9px 11px 8px 12px);
  overflow: hidden;
}
.vx-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 13px;
}
.vx-table thead th {
  padding: 10px 14px;
  background: var(--vx-paper2);
  border-bottom: 1px solid var(--vx-line);
  color: var(--vx-muted);
  font-family: var(--vx-font-mono);
  font-size: 10.5px;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  font-weight: 700;
  white-space: nowrap;
  user-select: none;
}
.vx-table thead th.is-sortable {
  cursor: pointer;
}
.vx-table thead th.is-sortable:hover {
  color: var(--vx-ink);
}
.vx-table thead th.is-sorted {
  color: var(--vx-accent);
}
.vx-table__th {
  display: inline-flex;
  align-items: center;
  gap: 5px;
}
.vx-table__sort {
  opacity: 0.5;
}
.vx-table__sort.is-active {
  opacity: 1;
}
.vx-table__check {
  width: 1%;
  padding: 8px 14px;
}
.vx-table tbody td {
  padding: 11px 14px;
  border-bottom: 1px solid var(--vx-line-2);
  color: var(--vx-ink);
}
.vx-table tbody tr:last-child td {
  border-bottom: 0;
}
.vx-table__row {
  transition: background 0.12s;
}
.vx-table__row:hover {
  background: var(--vx-fill);
}
.vx-table__row.is-selected {
  background: color-mix(in oklab, var(--vx-accent) 12%, transparent);
}
.vx-table__mono {
  font-family: var(--vx-font-mono);
  font-size: 12px;
}
.vx-table__empty {
  text-align: center;
  padding: 30px;
  color: var(--vx-muted);
}
.vx-table__pagination {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 9px 14px;
  border-top: 1px solid var(--vx-line);
  background: var(--vx-paper2);
}
.vx-table__pageinfo {
  font-family: var(--vx-font-mono);
  font-size: 11px;
  color: var(--vx-muted);
}
.vx-table__pagebtns {
  display: flex;
  align-items: center;
  gap: 8px;
}
.vx-table__pagecur {
  font-family: var(--vx-font-mono);
  font-size: 11px;
  color: var(--vx-ink);
}
.vx-table__pagebtn {
  width: 26px;
  height: 26px;
  border: 1.5px solid var(--vx-line);
  border-radius: 7px;
  background: var(--vx-paper);
  color: var(--vx-ink);
  cursor: pointer;
  font-size: 14px;
}
.vx-table__pagebtn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}
.vx-table__pagebtn:not(:disabled):hover {
  border-color: var(--vx-accent-dim);
}
</style>
