<script setup lang="ts">
import { computed, ref, useId, watch } from 'vue'
import { useFocusTrap } from '../composables/useFocusTrap'
import { useScrollLock } from '../composables/useScrollLock'

/**
 * Surface superposée de base (teleport + scrim + piège de focus + verrou de scroll).
 * Brique partagée par VDialog et VDrawer. `v-model` sur l'état ouvert.
 *
 * Transition gérée manuellement (flag `render` + classe `is-leaving`) pour un
 * montage/démontage fiable sous Teleport, indépendamment du détecteur de <Transition>.
 */
const props = withDefaults(
  defineProps<{
    /** Empêche la fermeture au clic sur le scrim / Échap. */
    persistent?: boolean
    /** Affiche le voile sombre. */
    scrim?: boolean
    /** Alignement horizontal du panneau. */
    justify?: 'center' | 'start' | 'end'
    /** Alignement vertical du panneau. */
    align?: 'center' | 'start' | 'end' | 'stretch'
    /** Type d'animation du panneau. */
    motion?: 'fade' | 'drawer-right' | 'drawer-left'
    /** id de l'élément titre (aria-labelledby). */
    labelledby?: string
    /** Libellé accessible si pas de titre. */
    ariaLabel?: string
  }>(),
  { scrim: true, justify: 'center', align: 'center', motion: 'fade' },
)

const model = defineModel<boolean>({ required: true })
const panel = ref<HTMLElement>()
const baseId = useId()

const render = ref(model.value)
const leaving = ref(false)
const active = computed(() => model.value && render.value && !leaving.value)
let timer: ReturnType<typeof setTimeout> | undefined

const DURATION = computed(() => (props.motion === 'fade' ? 300 : 400))

watch(model, (open) => {
  clearTimeout(timer)
  if (open) {
    leaving.value = false
    render.value = true
  } else if (render.value) {
    leaving.value = true
    timer = setTimeout(() => {
      render.value = false
      leaving.value = false
    }, DURATION.value)
  }
})

useScrollLock(active)
useFocusTrap(panel, active)

function close() {
  if (!props.persistent) model.value = false
}

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape') {
    e.stopPropagation()
    close()
  }
}
</script>

<template>
  <Teleport to="body">
    <div
      v-if="render"
      class="vx-overlay"
      :class="[`vx-overlay--${motion}`, { 'is-leaving': leaving }]"
      :style="{
        '--vx-ov-justify': justify === 'start' ? 'flex-start' : justify === 'end' ? 'flex-end' : 'center',
        '--vx-ov-align': align === 'start' ? 'flex-start' : align === 'end' ? 'flex-end' : align === 'stretch' ? 'stretch' : 'center',
      }"
      @keydown="onKeydown"
    >
      <div v-if="scrim" class="vx-overlay__scrim" @click="close" />
      <div
        ref="panel"
        class="vx-overlay__panel"
        role="dialog"
        aria-modal="true"
        :aria-labelledby="labelledby || undefined"
        :aria-label="ariaLabel || undefined"
        tabindex="-1"
        :data-overlay-id="baseId"
      >
        <slot :close="() => (model = false)" />
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
.vx-overlay {
  position: fixed;
  inset: 0;
  z-index: 1000;
  display: flex;
  justify-content: var(--vx-ov-justify, center);
  align-items: var(--vx-ov-align, center);
}
.vx-overlay__scrim {
  position: absolute;
  inset: 0;
  background: rgba(2, 8, 6, 0.55);
  backdrop-filter: blur(2px);
  animation: vx-scrim-in 0.3s ease;
}
.vx-overlay__panel {
  position: relative;
  z-index: 1;
  outline: none;
  max-width: 100%;
  max-height: 100%;
}
.vx-overlay.is-leaving .vx-overlay__scrim {
  animation: vx-scrim-out 0.3s ease forwards;
}

/* — entrée — */
.vx-overlay--fade .vx-overlay__panel {
  animation: vx-pop-in 0.32s cubic-bezier(0.2, 0.7, 0.2, 1);
}
.vx-overlay--drawer-right .vx-overlay__panel {
  animation: vx-slide-right-in 0.4s cubic-bezier(0.22, 0.74, 0.2, 1);
}
.vx-overlay--drawer-left .vx-overlay__panel {
  animation: vx-slide-left-in 0.4s cubic-bezier(0.22, 0.74, 0.2, 1);
}

/* — sortie — */
.vx-overlay--fade.is-leaving .vx-overlay__panel {
  animation: vx-pop-out 0.2s ease forwards;
}
.vx-overlay--drawer-right.is-leaving .vx-overlay__panel {
  animation: vx-slide-right-out 0.4s ease forwards;
}
.vx-overlay--drawer-left.is-leaving .vx-overlay__panel {
  animation: vx-slide-left-out 0.4s ease forwards;
}

@keyframes vx-scrim-in { from { opacity: 0; } }
@keyframes vx-scrim-out { to { opacity: 0; } }
@keyframes vx-pop-in { from { transform: translateY(14px) scale(0.98); opacity: 0; } }
@keyframes vx-pop-out { to { transform: translateY(14px) scale(0.98); opacity: 0; } }
@keyframes vx-slide-right-in { from { transform: translateX(102%); } }
@keyframes vx-slide-right-out { to { transform: translateX(102%); } }
@keyframes vx-slide-left-in { from { transform: translateX(-102%); } }
@keyframes vx-slide-left-out { to { transform: translateX(-102%); } }

@media (prefers-reduced-motion: reduce) {
  .vx-overlay__scrim,
  .vx-overlay__panel {
    animation-duration: 0.01s !important;
  }
}
</style>
