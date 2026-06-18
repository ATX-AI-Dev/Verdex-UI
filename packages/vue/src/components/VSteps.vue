<script setup lang="ts">
export interface Step {
  /** Libellé. */
  label: string
  /** Description secondaire. */
  description?: string
}

/** Indicateur d'étapes. `v-model` sur l'index courant (0-based). */
withDefaults(
  defineProps<{
    /** Étapes. */
    steps: Step[]
    /** Orientation. */
    orientation?: 'horizontal' | 'vertical'
    /** Permet de cliquer une étape pour y aller. */
    clickable?: boolean
  }>(),
  { orientation: 'horizontal' },
)

const model = defineModel<number>({ default: 0 })

function statusOf(index: number, current: number) {
  if (index < current) return 'done'
  if (index === current) return 'active'
  return 'upcoming'
}
</script>

<template>
  <ol class="vx-steps" :class="`vx-steps--${orientation}`">
    <li
      v-for="(step, i) in steps"
      :key="i"
      class="vx-steps__step"
      :class="[`is-${statusOf(i, model)}`, { 'is-clickable': clickable }]"
    >
      <button
        class="vx-steps__marker"
        type="button"
        :disabled="!clickable"
        :aria-current="i === model ? 'step' : undefined"
        @click="clickable && (model = i)"
      >
        <span v-if="statusOf(i, model) === 'done'">✓</span>
        <span v-else>{{ i + 1 }}</span>
      </button>
      <div class="vx-steps__text">
        <span class="vx-steps__label">{{ step.label }}</span>
        <span v-if="step.description" class="vx-steps__desc">{{ step.description }}</span>
      </div>
      <span v-if="i < steps.length - 1" class="vx-steps__line" aria-hidden="true" />
    </li>
  </ol>
</template>

<style scoped>
.vx-steps {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
}
.vx-steps--vertical {
  flex-direction: column;
}
.vx-steps__step {
  position: relative;
  display: flex;
  align-items: center;
  gap: 10px;
  flex: 1;
}
.vx-steps--vertical .vx-steps__step {
  flex: none;
  align-items: flex-start;
  padding-bottom: 22px;
}
.vx-steps__marker {
  display: grid;
  place-items: center;
  width: 28px;
  height: 28px;
  flex: none;
  border-radius: 50%;
  border: 2px solid var(--vx-line);
  background: var(--vx-paper);
  color: var(--vx-muted);
  font-family: var(--vx-font-mono);
  font-size: 12px;
  font-weight: 700;
}
.vx-steps__step.is-clickable .vx-steps__marker {
  cursor: pointer;
}
.vx-steps__step.is-done .vx-steps__marker {
  border-color: var(--vx-accent);
  background: var(--vx-accent);
  color: var(--vx-accent-ink);
}
.vx-steps__step.is-active .vx-steps__marker {
  border-color: var(--vx-accent);
  color: var(--vx-accent);
  box-shadow: 0 0 0 4px color-mix(in oklab, var(--vx-accent) 16%, transparent);
}
.vx-steps__text {
  display: flex;
  flex-direction: column;
  gap: 1px;
}
.vx-steps__label {
  font-size: 13px;
  font-weight: 600;
  color: var(--vx-ink);
}
.vx-steps__step.is-upcoming .vx-steps__label {
  color: var(--vx-muted);
}
.vx-steps__desc {
  font-size: 11px;
  color: var(--vx-muted);
}
.vx-steps__line {
  flex: 1;
  height: 1.5px;
  background: var(--vx-line);
  margin: 0 6px;
}
.vx-steps__step.is-done .vx-steps__line {
  background: var(--vx-accent);
}
.vx-steps--vertical .vx-steps__line {
  position: absolute;
  left: 13px;
  top: 28px;
  bottom: 0;
  width: 1.5px;
  height: auto;
  flex: none;
  margin: 0;
}
</style>
