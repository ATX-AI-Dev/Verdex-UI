<script setup lang="ts">
import type { StatusKind } from '../types'

export interface TimelineItem {
  /** Titre de l'événement. */
  title: string
  /** Horodatage / libellé secondaire. */
  time?: string
  /** Description. */
  description?: string
  /** Couleur de la pastille. */
  kind?: StatusKind
  /** Icône à la place de la pastille. */
  icon?: string
}

/** Frise chronologique verticale. */
defineProps<{
  /** Événements. */
  items: TimelineItem[]
}>()
</script>

<template>
  <ol class="vx-timeline">
    <li v-for="(item, i) in items" :key="i" class="vx-timeline__item">
      <span class="vx-timeline__marker" :class="`vx-timeline__marker--${item.kind ?? 'neutral'}`">
        <span v-if="item.icon" class="vx-timeline__icon">{{ item.icon }}</span>
      </span>
      <div class="vx-timeline__content">
        <div class="vx-timeline__head">
          <span class="vx-timeline__title">{{ item.title }}</span>
          <span v-if="item.time" class="vx-timeline__time">{{ item.time }}</span>
        </div>
        <p v-if="item.description" class="vx-timeline__desc">{{ item.description }}</p>
        <slot :name="`item-${i}`" />
      </div>
    </li>
  </ol>
</template>

<style scoped>
.vx-timeline {
  list-style: none;
  margin: 0;
  padding: 0;
}
.vx-timeline__item {
  position: relative;
  display: grid;
  grid-template-columns: 24px 1fr;
  gap: 12px;
  padding-bottom: 20px;
}
.vx-timeline__item::before {
  content: '';
  position: absolute;
  left: 11px;
  top: 20px;
  bottom: -2px;
  width: 1.5px;
  background: var(--vx-line);
}
.vx-timeline__item:last-child::before {
  display: none;
}
.vx-timeline__marker {
  position: relative;
  z-index: 1;
  display: grid;
  place-items: center;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: var(--vx-paper);
  border: 2px solid var(--vx-muted);
  font-size: 10px;
}
.vx-timeline__marker--ok { border-color: var(--vx-accent); color: var(--vx-accent); }
.vx-timeline__marker--warn { border-color: var(--vx-warn); color: var(--vx-warn); }
.vx-timeline__marker--err { border-color: var(--vx-err); color: var(--vx-err); }
.vx-timeline__marker--info { border-color: var(--vx-info); color: var(--vx-info); }
.vx-timeline__content {
  padding-top: 1px;
}
.vx-timeline__head {
  display: flex;
  align-items: baseline;
  gap: 10px;
  flex-wrap: wrap;
}
.vx-timeline__title {
  font-size: 13.5px;
  font-weight: 600;
  color: var(--vx-ink);
}
.vx-timeline__time {
  font-family: var(--vx-font-mono);
  font-size: 10.5px;
  color: var(--vx-muted);
}
.vx-timeline__desc {
  margin: 4px 0 0;
  font-size: 12.5px;
  color: var(--vx-muted);
  line-height: 1.5;
}
</style>
