<script setup lang="ts">
import { useId } from 'vue'
import VOverlay from './VOverlay.vue'

/** Boîte de dialogue modale centrée. `v-model` sur l'état ouvert. */
withDefaults(
  defineProps<{
    /** Titre affiché dans l'entête. */
    title?: string
    /** Empêche la fermeture au scrim / Échap. */
    persistent?: boolean
    /** Largeur. */
    size?: 'sm' | 'md' | 'lg'
  }>(),
  { size: 'md' },
)

const model = defineModel<boolean>({ required: true })
const titleId = useId()
</script>

<template>
  <VOverlay v-model="model" :persistent="persistent" :labelledby="title ? titleId : undefined" motion="fade">
    <template #default="{ close }">
      <div class="vx-dialog" :class="`vx-dialog--${size}`">
        <header v-if="title || $slots.header" class="vx-dialog__head">
          <slot name="header">
            <h2 :id="titleId" class="vx-dialog__title">{{ title }}</h2>
          </slot>
          <button class="vx-dialog__close" type="button" aria-label="Fermer" @click="close">✕</button>
        </header>
        <div class="vx-dialog__body">
          <slot />
        </div>
        <footer v-if="$slots.footer" class="vx-dialog__footer">
          <slot name="footer" :close="close" />
        </footer>
      </div>
    </template>
  </VOverlay>
</template>

<style scoped>
.vx-dialog {
  display: flex;
  flex-direction: column;
  width: min(92vw, 480px);
  max-height: 86vh;
  margin: 16px;
  background: var(--vx-paper);
  border: 2px solid var(--vx-line);
  border-radius: var(--vx-radius-lg, 14px 16px 13px 16px);
  box-shadow: var(--vx-shadow);
  overflow: hidden;
}
.vx-dialog--sm { width: min(92vw, 360px); }
.vx-dialog--lg { width: min(94vw, 680px); }
.vx-dialog__head {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px 18px;
  border-bottom: 1px dashed var(--vx-line);
}
.vx-dialog__title {
  margin: 0;
  font-size: 16px;
  font-weight: 700;
  color: var(--vx-ink);
  flex: 1;
}
.vx-dialog__close {
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
.vx-dialog__close:hover {
  border-color: var(--vx-accent-dim);
}
.vx-dialog__body {
  padding: 18px;
  overflow: auto;
  font-size: 13.5px;
  line-height: 1.55;
  color: var(--vx-ink);
}
.vx-dialog__footer {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 10px;
  padding: 14px 18px;
  border-top: 1px solid var(--vx-line-2);
  background: var(--vx-paper2);
}
</style>
