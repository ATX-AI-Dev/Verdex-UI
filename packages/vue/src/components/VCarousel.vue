<script setup lang="ts">
import { onBeforeUnmount, watch, ref } from 'vue'

/** Carrousel de slides. Contenu via slot scoped `{ item, index }`. `v-model` sur l'index. */
const props = withDefaults(
  defineProps<{
    /** Données des slides. */
    items: unknown[]
    /** Lecture auto (ms) ; 0 = désactivé. */
    autoplay?: number
    /** Boucle aux extrémités. */
    loop?: boolean
    /** Affiche les puces de navigation. */
    indicators?: boolean
    /** Affiche les flèches. */
    arrows?: boolean
  }>(),
  { autoplay: 0, loop: true, indicators: true, arrows: true },
)

const index = defineModel<number>({ default: 0 })

function go(to: number) {
  const n = props.items.length
  if (n === 0) return
  if (to < 0) index.value = props.loop ? n - 1 : 0
  else if (to >= n) index.value = props.loop ? 0 : n - 1
  else index.value = to
}
const next = () => go(index.value + 1)
const prev = () => go(index.value - 1)

let timer: ReturnType<typeof setInterval> | undefined
function start() {
  stop()
  if (props.autoplay > 0) timer = setInterval(next, props.autoplay)
}
function stop() {
  if (timer) clearInterval(timer)
}
watch(() => props.autoplay, start, { immediate: true })
onBeforeUnmount(stop)

const hovering = ref(false)
watch(hovering, (h) => (h ? stop() : start()))
</script>

<template>
  <div
    class="vx-carousel"
    @mouseenter="hovering = true"
    @mouseleave="hovering = false"
    role="region"
    aria-roledescription="carrousel"
  >
    <div class="vx-carousel__viewport">
      <div class="vx-carousel__track" :style="{ transform: `translateX(-${index * 100}%)` }">
        <div
          v-for="(item, i) in items"
          :key="i"
          class="vx-carousel__slide"
          role="group"
          aria-roledescription="slide"
          :aria-hidden="i !== index"
        >
          <slot :item="item" :index="i" />
        </div>
      </div>

      <button
        v-if="arrows && items.length > 1"
        class="vx-carousel__arrow vx-carousel__arrow--prev"
        type="button"
        aria-label="Précédent"
        @click="prev"
      >‹</button>
      <button
        v-if="arrows && items.length > 1"
        class="vx-carousel__arrow vx-carousel__arrow--next"
        type="button"
        aria-label="Suivant"
        @click="next"
      >›</button>
    </div>

    <div v-if="indicators && items.length > 1" class="vx-carousel__dots">
      <button
        v-for="(_, i) in items"
        :key="i"
        class="vx-carousel__dot"
        :class="{ 'is-active': i === index }"
        type="button"
        :aria-label="`Aller au slide ${i + 1}`"
        :aria-current="i === index"
        @click="go(i)"
      />
    </div>
  </div>
</template>

<style scoped>
.vx-carousel {
  position: relative;
}
.vx-carousel__viewport {
  position: relative;
  overflow: hidden;
  border-radius: var(--vx-radius, 9px 11px 8px 12px);
}
.vx-carousel__track {
  display: flex;
  transition: transform 0.4s cubic-bezier(0.2, 0.7, 0.2, 1);
}
.vx-carousel__slide {
  flex: 0 0 100%;
  min-width: 0;
}
.vx-carousel__arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 34px;
  height: 34px;
  display: grid;
  place-items: center;
  border: 1.5px solid var(--vx-line);
  border-radius: 50%;
  background: color-mix(in oklab, var(--vx-paper) 86%, transparent);
  backdrop-filter: blur(4px);
  color: var(--vx-ink);
  font-size: 18px;
  cursor: pointer;
  transition: border-color 0.2s;
}
.vx-carousel__arrow:hover { border-color: var(--vx-accent-dim); }
.vx-carousel__arrow--prev { left: 10px; }
.vx-carousel__arrow--next { right: 10px; }
.vx-carousel__dots {
  display: flex;
  justify-content: center;
  gap: 6px;
  margin-top: 12px;
}
.vx-carousel__dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  border: 0;
  padding: 0;
  background: var(--vx-line);
  cursor: pointer;
  transition: background 0.2s, width 0.2s;
}
.vx-carousel__dot.is-active {
  background: var(--vx-accent);
  width: 20px;
  border-radius: 999px;
}
@media (prefers-reduced-motion: reduce) {
  .vx-carousel__track { transition-duration: 0.01s; }
}
</style>
