<script setup lang="ts">
/** Séparateur horizontal, avec libellé optionnel centré. */
defineProps<{
  /** Libellé mono centré (variante labellisée). */
  label?: string
}>()
</script>

<template>
  <div v-if="label" class="vx-divider vx-divider--labelled" role="separator">{{ label }}</div>
  <hr v-else class="vx-divider" />
</template>

<style scoped>
.vx-divider {
  height: 1px;
  border: 0;
  background: var(--vx-line-2);
  margin: 22px 0;
}
.vx-divider--labelled {
  display: flex;
  align-items: center;
  gap: 12px;
  height: auto;
  background: none;
  color: var(--vx-muted);
  font-family: var(--vx-font-mono);
  font-size: 10px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}
.vx-divider--labelled::before,
.vx-divider--labelled::after {
  content: '';
  flex: 1;
  height: 1px;
  background: var(--vx-line-2);
}
</style>
