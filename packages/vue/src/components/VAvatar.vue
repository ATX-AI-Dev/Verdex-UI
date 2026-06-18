<script setup lang="ts">
import { computed, ref } from 'vue'
import type { StatusKind } from '../types'

/** Avatar : image, ou initiales déduites du nom. Pastille de statut optionnelle. */
const props = withDefaults(
  defineProps<{
    /** URL de l'image. */
    src?: string
    /** Nom complet (sert aux initiales et à l'alt). */
    name?: string
    /** Taille en px. */
    size?: number
    /** Coins carrés (sinon rond). */
    square?: boolean
    /** Statut affiché en pastille. */
    status?: StatusKind
  }>(),
  { size: 36, status: 'neutral' },
)

const failed = ref(false)
const initials = computed(() => {
  if (!props.name) return '?'
  return props.name
    .split(/\s+/)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase() ?? '')
    .join('')
})
const showImg = computed(() => props.src && !failed.value)
const dotColor = computed(
  () =>
    ({
      neutral: 'var(--vx-muted)',
      ok: 'var(--vx-accent)',
      warn: 'var(--vx-warn)',
      err: 'var(--vx-err)',
      info: 'var(--vx-info)',
    })[props.status],
)
</script>

<template>
  <span
    class="vx-avatar"
    :class="{ 'vx-avatar--square': square }"
    :style="{ width: `${size}px`, height: `${size}px`, fontSize: `${size * 0.4}px` }"
  >
    <img v-if="showImg" :src="src" :alt="name || ''" class="vx-avatar__img" @error="failed = true" />
    <span v-else class="vx-avatar__initials">{{ initials }}</span>
    <span
      v-if="status !== 'neutral' || $slots.status"
      class="vx-avatar__status"
      :style="{ background: dotColor }"
    />
  </span>
</template>

<style scoped>
.vx-avatar {
  position: relative;
  display: inline-grid;
  place-items: center;
  flex: none;
  border-radius: 50%;
  background: var(--vx-fill-2);
  border: 1.5px solid var(--vx-line);
  color: var(--vx-ink);
  font-family: var(--vx-font-mono);
  font-weight: 700;
  overflow: visible;
  user-select: none;
}
.vx-avatar--square {
  border-radius: 28%;
}
.vx-avatar__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: inherit;
}
.vx-avatar__initials {
  line-height: 1;
}
.vx-avatar__status {
  position: absolute;
  right: -1px;
  bottom: -1px;
  width: 28%;
  height: 28%;
  min-width: 8px;
  min-height: 8px;
  border-radius: 50%;
  border: 2px solid var(--vx-bg);
}
</style>
