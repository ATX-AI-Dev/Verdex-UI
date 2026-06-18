<script setup lang="ts">
import { ref } from 'vue'

/**
 * Coquille applicative : barre latérale + entête + zone de contenu.
 * Slots : `#sidebar`, `#header`, défaut (contenu). La sidebar passe en tiroir < 820px.
 */
const sidebarOpen = ref(false)

defineExpose({ sidebarOpen })
</script>

<template>
  <div class="vx-shell" :class="{ 'is-sidebar-open': sidebarOpen }">
    <div
      v-if="$slots.sidebar"
      class="vx-shell__scrim"
      @click="sidebarOpen = false"
    />
    <div v-if="$slots.sidebar" class="vx-shell__sidebar">
      <slot name="sidebar" :close="() => (sidebarOpen = false)" />
    </div>

    <div class="vx-shell__main">
      <header v-if="$slots.header" class="vx-shell__header">
        <button
          v-if="$slots.sidebar"
          class="vx-shell__burger"
          type="button"
          aria-label="Menu"
          @click="sidebarOpen = !sidebarOpen"
        >☰</button>
        <slot name="header" :toggle-sidebar="() => (sidebarOpen = !sidebarOpen)" />
      </header>
      <main class="vx-shell__content">
        <slot />
      </main>
    </div>
  </div>
</template>

<style scoped>
.vx-shell {
  display: grid;
  grid-template-columns: auto 1fr;
  height: 100%;
  min-height: 0;
}
.vx-shell__sidebar {
  min-height: 0;
  display: flex;
}
.vx-shell__main {
  display: flex;
  flex-direction: column;
  min-width: 0;
  min-height: 0;
}
.vx-shell__header {
  display: flex;
  align-items: center;
  gap: 12px;
}
.vx-shell__burger {
  display: none;
  width: 36px;
  height: 36px;
  border: 1.5px solid var(--vx-line);
  border-radius: 9px;
  background: var(--vx-paper2);
  color: var(--vx-ink);
  cursor: pointer;
  font-size: 16px;
}
.vx-shell__content {
  overflow: auto;
  flex: 1;
  min-height: 0;
}
.vx-shell__scrim {
  display: none;
}

@media (max-width: 820px) {
  .vx-shell {
    grid-template-columns: 1fr;
  }
  .vx-shell__burger {
    display: grid;
    place-items: center;
  }
  .vx-shell__sidebar {
    position: fixed;
    z-index: 50;
    top: 0;
    left: 0;
    height: 100%;
    transform: translateX(-100%);
    transition: transform 0.3s ease;
  }
  .vx-shell.is-sidebar-open .vx-shell__sidebar {
    transform: none;
  }
  .vx-shell__scrim {
    position: fixed;
    inset: 0;
    z-index: 49;
    background: rgba(2, 8, 6, 0.5);
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.3s ease;
  }
  .vx-shell.is-sidebar-open .vx-shell__scrim {
    display: block;
    opacity: 1;
    pointer-events: auto;
  }
}
</style>
