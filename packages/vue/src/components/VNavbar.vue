<script setup lang="ts">
/** Barre de navigation supérieure. Slots `#brand`, défaut (centre), `#actions`. */
withDefaults(
  defineProps<{
    /** Reste collée en haut au scroll. */
    sticky?: boolean
  }>(),
  { sticky: true },
)
</script>

<template>
  <header class="vx-navbar" :class="{ 'is-sticky': sticky }">
    <div v-if="$slots.brand" class="vx-navbar__brand">
      <slot name="brand" />
    </div>
    <nav class="vx-navbar__nav">
      <slot />
    </nav>
    <div v-if="$slots.actions" class="vx-navbar__actions">
      <slot name="actions" />
    </div>
  </header>
</template>

<style scoped>
.vx-navbar {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 12px 22px;
  border-bottom: 1px solid var(--vx-line-2);
  background: color-mix(in oklab, var(--vx-chrome) 78%, transparent);
  backdrop-filter: blur(8px);
}
.vx-navbar.is-sticky {
  position: sticky;
  top: 0;
  z-index: 20;
}
.vx-navbar__brand {
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 700;
  letter-spacing: 0.2px;
}
.vx-navbar__nav {
  display: flex;
  align-items: center;
  gap: 4px;
  flex: 1;
}
.vx-navbar__actions {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-left: auto;
}
</style>
