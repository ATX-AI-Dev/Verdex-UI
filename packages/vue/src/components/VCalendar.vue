<script setup lang="ts">
import { computed, ref, watch } from 'vue'

/**
 * Sélecteur de date (grille mensuelle). `v-model` sur une date ISO `YYYY-MM-DD`.
 * Semaine débutant le lundi.
 */
const props = withDefaults(
  defineProps<{
    /** Date minimale sélectionnable (ISO). */
    min?: string
    /** Date maximale sélectionnable (ISO). */
    max?: string
    /** Locale d'affichage. */
    locale?: string
  }>(),
  { locale: 'fr-FR' },
)

const model = defineModel<string>()

const pad = (n: number) => String(n).padStart(2, '0')
const toISO = (y: number, m: number, d: number) => `${y}-${pad(m + 1)}-${pad(d)}`
const todayISO = toISO(new Date().getFullYear(), new Date().getMonth(), new Date().getDate())

function parse(iso?: string) {
  if (!iso) return null
  const [y, m, d] = iso.split('-').map(Number)
  return { y, m: m - 1, d }
}

const initial = parse(model.value) ?? parse(todayISO)!
const viewYear = ref(initial.y)
const viewMonth = ref(initial.m)

watch(model, (v) => {
  const p = parse(v)
  if (p) {
    viewYear.value = p.y
    viewMonth.value = p.m
  }
})

const monthLabel = computed(() =>
  new Intl.DateTimeFormat(props.locale, { month: 'long', year: 'numeric' }).format(
    new Date(viewYear.value, viewMonth.value, 1),
  ),
)

// En-têtes de jours (lundi → dimanche), localisés.
const weekdays = computed(() => {
  const fmt = new Intl.DateTimeFormat(props.locale, { weekday: 'short' })
  // 2024-01-01 est un lundi.
  return Array.from({ length: 7 }, (_, i) =>
    fmt.format(new Date(2024, 0, 1 + i)).replace('.', ''),
  )
})

const cells = computed(() => {
  const first = new Date(viewYear.value, viewMonth.value, 1)
  const leading = (first.getDay() + 6) % 7 // lundi = 0
  const daysInMonth = new Date(viewYear.value, viewMonth.value + 1, 0).getDate()
  const out: (number | null)[] = []
  for (let i = 0; i < leading; i++) out.push(null)
  for (let d = 1; d <= daysInMonth; d++) out.push(d)
  return out
})

const rows = computed(() => {
  const result: (number | null)[][] = []
  const c = cells.value
  for (let i = 0; i < c.length; i += 7) {
    result.push(c.slice(i, i + 7))
  }
  return result
})

function isDisabled(d: number) {
  const iso = toISO(viewYear.value, viewMonth.value, d)
  if (props.min && iso < props.min) return true
  if (props.max && iso > props.max) return true
  return false
}
const isSelected = (d: number) => model.value === toISO(viewYear.value, viewMonth.value, d)
const isToday = (d: number) => todayISO === toISO(viewYear.value, viewMonth.value, d)

function pick(d: number) {
  if (isDisabled(d)) return
  model.value = toISO(viewYear.value, viewMonth.value, d)
}

function shift(delta: number) {
  const m = viewMonth.value + delta
  viewYear.value += Math.floor(m / 12)
  viewMonth.value = ((m % 12) + 12) % 12
}
</script>

<template>
  <div class="vx-cal" role="grid" :aria-label="monthLabel">
    <div class="vx-cal__head">
      <button type="button" class="vx-cal__nav" aria-label="Mois précédent" @click="shift(-1)">‹</button>
      <span class="vx-cal__title">{{ monthLabel }}</span>
      <button type="button" class="vx-cal__nav" aria-label="Mois suivant" @click="shift(1)">›</button>
    </div>
    <div class="vx-cal__weekdays" aria-hidden="true" role="row">
      <span v-for="w in weekdays" :key="w" class="vx-cal__wd" role="columnheader">{{ w }}</span>
    </div>
    <div class="vx-cal__grid">
      <div v-for="(row, rowIndex) in rows" :key="rowIndex" role="row" class="vx-cal__row">
        <template v-for="(d, cellIndex) in row" :key="cellIndex">
          <span v-if="d === null" class="vx-cal__blank" role="gridcell" />
          <button
            v-else
            type="button"
            class="vx-cal__day"
            role="gridcell"
            :class="{ 'is-selected': isSelected(d), 'is-today': isToday(d) }"
            :disabled="isDisabled(d)"
            :aria-selected="isSelected(d)"
            @click="pick(d)"
          >
            {{ d }}
          </button>
        </template>
      </div>
    </div>
  </div>
</template>

<style scoped>
.vx-cal {
  display: inline-block;
  background: var(--vx-paper);
  border: 1.5px solid var(--vx-line);
  border-radius: var(--vx-radius, 9px 11px 8px 12px);
  padding: 12px;
  width: 260px;
}
.vx-cal__head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
}
.vx-cal__title {
  font-family: var(--vx-font-mono);
  font-size: 12px;
  color: var(--vx-ink);
  text-transform: capitalize;
  letter-spacing: 0.02em;
}
.vx-cal__nav {
  width: 26px;
  height: 26px;
  border: 1.5px solid var(--vx-line);
  border-radius: 7px;
  background: var(--vx-paper2);
  color: var(--vx-ink);
  cursor: pointer;
  font-size: 15px;
  line-height: 1;
}
.vx-cal__nav:hover {
  border-color: var(--vx-accent-dim);
}
.vx-cal__grid {
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.vx-cal__row {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 2px;
}
.vx-cal__weekdays {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 2px;
}
.vx-cal__wd {
  text-align: center;
  font-family: var(--vx-font-mono);
  font-size: 9.5px;
  color: var(--vx-muted);
  text-transform: uppercase;
  letter-spacing: 0.04em;
  padding: 4px 0;
}
.vx-cal__blank {
  aspect-ratio: 1;
}
.vx-cal__day {
  aspect-ratio: 1;
  display: grid;
  place-items: center;
  border: 0;
  background: none;
  color: var(--vx-ink);
  font-family: var(--vx-font-mono);
  font-size: 12px;
  border-radius: 7px;
  cursor: pointer;
  transition:
    background 0.12s,
    color 0.12s;
}
.vx-cal__day:hover:not(:disabled) {
  background: var(--vx-fill);
}
.vx-cal__day:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}
.vx-cal__day.is-today {
  box-shadow: inset 0 0 0 1.5px var(--vx-line);
}
.vx-cal__day.is-selected {
  background: var(--vx-accent);
  color: var(--vx-accent-ink);
  font-weight: 700;
  box-shadow: none;
}
.vx-cal__day:focus-visible {
  outline: none;
  box-shadow: var(--vx-ring, 0 0 0 3px color-mix(in oklab, var(--vx-accent) 22%, transparent));
}
</style>
