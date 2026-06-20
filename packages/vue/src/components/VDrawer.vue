<script setup lang="ts">
import { computed, useId } from 'vue'
import VOverlay from './VOverlay.vue'

/** Panneau latéral coulissant (slide-over). `v-model` sur l'état ouvert. */
const props = withDefaults(
  defineProps<{
    /** Côté d'apparition. */
    side?: 'left' | 'right'
    /** Titre de l'entête. */
    title?: string
    /** Empêche la fermeture au scrim / Échap. */
    persistent?: boolean
    /** Largeur CSS du panneau. */
    width?: string
  }>(),
  { side: 'right', width: 'min(660px, 92vw)' },
)

const model = defineModel<boolean>({ required: true })
const titleId = useId()
const motion = computed(() => `drawer-${props.side}` as 'drawer-left' | 'drawer-right')
</script>

<template>
  <VOverlay
    v-model="model"
    :persistent="persistent"
    :justify="side === 'left' ? 'start' : 'end'"
    align="stretch"
    :motion="motion"
    :labelledby="title ? titleId : undefined"
  >
    <template #default="{ close }">
      <aside class="vx-drawer" :class="`vx-drawer--${side}`" :style="{ width }">
        <header class="vx-drawer__head">
          <slot name="header">
            <h2 :id="titleId" class="vx-drawer__title">{{ title }}</h2>
          </slot>
          <button class="vx-drawer__close" type="button" aria-label="Fermer" @click="close">✕</button>
        </header>
        <div class="vx-drawer__body">
          <slot />
        </div>
        <footer v-if="$slots.footer" class="vx-drawer__footer">
          <slot name="footer" :close="close" />
        </footer>
      </aside>
    </template>
  </VOverlay>
</template>

<style scoped>
.vx-drawer {
  display: flex;
  flex-direction: column;
  height: 100%;
  background: var(--vx-paper);
}
.vx-drawer--right {
  border-left: 2px solid var(--vx-line);
  box-shadow: -30px 0 60px -30px var(--vx-overlay);
}
.vx-drawer--left {
  border-right: 2px solid var(--vx-line);
  box-shadow: 30px 0 60px -30px var(--vx-overlay);
}
.vx-drawer__head {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px 20px;
  border-bottom: 1px solid var(--vx-line-2);
}
.vx-drawer__title {
  margin: 0;
  font-size: 16px;
  font-weight: 700;
  color: var(--vx-ink);
  flex: 1;
}
.vx-drawer__close {
  width: 30px;
  height: 30px;
  border-radius: 8px;
  border: 1.5px solid var(--vx-line);
  background: var(--vx-paper2);
  color: var(--vx-ink);
  cursor: pointer;
  font-size: 14px;
  flex: none;
}
.vx-drawer__close:hover {
  border-color: var(--vx-accent-dim);
}
.vx-drawer__body {
  padding: 18px 20px 40px;
  overflow: auto;
  flex: 1;
}
.vx-drawer__footer {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 10px;
  padding: 14px 20px;
  border-top: 1px solid var(--vx-line-2);
  background: var(--vx-paper2);
}
</style>
