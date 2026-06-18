<script setup lang="ts">
export interface TabItem {
  id: string
  label: string
}

/** Groupe d'onglets segmentés. `v-model` sur l'id actif. */
defineProps<{ items: TabItem[] }>()
const model = defineModel<string>({ required: true })
</script>

<template>
  <div class="vx-tabs" role="tablist">
    <button
      v-for="it in items"
      :key="it.id"
      class="vx-tabs__tab"
      :class="{ 'is-active': model === it.id }"
      type="button"
      role="tab"
      :aria-selected="model === it.id"
      @click="model = it.id"
    >
      {{ it.label }}
    </button>
  </div>
</template>

<style scoped>
.vx-tabs {
  display: inline-flex;
  gap: 4px;
  background: var(--vx-fill);
  border: 1.5px solid var(--vx-line);
  border-radius: 11px;
  padding: 4px;
}
.vx-tabs__tab {
  border: 0;
  background: none;
  color: var(--vx-muted);
  font-family: var(--vx-font-mono);
  font-size: 11px;
  padding: 6px 12px;
  border-radius: 8px;
  cursor: pointer;
  letter-spacing: 0.04em;
  white-space: nowrap;
  transition: all 0.18s;
}
.vx-tabs__tab:focus-visible {
  outline: none;
  box-shadow: var(--vx-ring, 0 0 0 3px color-mix(in oklab, var(--vx-accent) 22%, transparent));
}
.vx-tabs__tab.is-active {
  background: var(--vx-paper);
  color: var(--vx-ink);
  box-shadow: 0 1px 0 var(--vx-line);
}
</style>
