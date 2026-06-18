<script setup lang="ts">
export interface Crumb {
  /** Libellé. */
  label: string
  /** Lien optionnel ; absent = élément courant. */
  href?: string
}

/** Fil d'Ariane. Le dernier élément est marqué comme courant. */
withDefaults(
  defineProps<{
    /** Éléments du chemin. */
    items: Crumb[]
    /** Séparateur. */
    separator?: string
  }>(),
  { separator: '/' },
)

const emit = defineEmits<{ navigate: [item: Crumb, index: number] }>()
</script>

<template>
  <nav class="vx-breadcrumbs" aria-label="Fil d'Ariane">
    <ol class="vx-breadcrumbs__list">
      <li v-for="(item, i) in items" :key="i" class="vx-breadcrumbs__item">
        <a
          v-if="item.href && i < items.length - 1"
          class="vx-breadcrumbs__link"
          :href="item.href"
          @click="emit('navigate', item, i)"
        >{{ item.label }}</a>
        <span
          v-else
          class="vx-breadcrumbs__current"
          :aria-current="i === items.length - 1 ? 'page' : undefined"
        >{{ item.label }}</span>
        <span v-if="i < items.length - 1" class="vx-breadcrumbs__sep" aria-hidden="true">{{ separator }}</span>
      </li>
    </ol>
  </nav>
</template>

<style scoped>
.vx-breadcrumbs__list {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 4px;
  margin: 0;
  padding: 0;
  list-style: none;
  font-family: var(--vx-font-mono);
  font-size: 11.5px;
  letter-spacing: 0.04em;
}
.vx-breadcrumbs__item {
  display: inline-flex;
  align-items: center;
  gap: 4px;
}
.vx-breadcrumbs__link {
  color: var(--vx-muted);
  text-decoration: none;
  transition: color 0.15s;
}
.vx-breadcrumbs__link:hover {
  color: var(--vx-accent);
}
.vx-breadcrumbs__current {
  color: var(--vx-ink);
  font-weight: 700;
}
.vx-breadcrumbs__sep {
  color: var(--vx-line);
  margin: 0 2px;
}
</style>
