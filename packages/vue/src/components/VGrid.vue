<script setup lang="ts">
import { computed } from 'vue'

/** Grille responsive. Soit un nombre de colonnes fixe, soit auto-fit via `minItemWidth`. */
const props = withDefaults(
  defineProps<{
    /** Nombre de colonnes fixe. */
    cols?: number
    /** Largeur mini d'un item (active auto-fit, ignore `cols`). */
    minItemWidth?: string
    /** Espacement CSS. */
    gap?: string
  }>(),
  { gap: '18px' },
)

const template = computed(() =>
  props.minItemWidth
    ? `repeat(auto-fit, minmax(${props.minItemWidth}, 1fr))`
    : `repeat(${props.cols ?? 3}, 1fr)`,
)
</script>

<template>
  <div class="vx-grid" :style="{ gridTemplateColumns: template, gap }">
    <slot />
  </div>
</template>

<style scoped>
.vx-grid {
  display: grid;
}
</style>
