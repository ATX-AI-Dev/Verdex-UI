<script setup lang="ts">
import { computed } from 'vue'

/**
 * Badge de notification. Deux usages :
 * - autonome : `<VBadge :content="3" />`
 * - superposé : entoure un enfant via le slot par défaut + `content`/`dot`.
 */
const props = withDefaults(
  defineProps<{
    /** Contenu numérique/texte. Ignoré si `dot`. */
    content?: string | number
    /** Valeur max avant troncature (ex. 99+). */
    max?: number
    /** Pastille simple, sans contenu. */
    dot?: boolean
    /** Tonalité. */
    kind?: 'accent' | 'neutral' | 'warn' | 'err' | 'info'
    /** Indique si le badge doit annoncer les changements (région active). */
    live?: boolean
  }>(),
  { kind: 'accent', max: 99, live: false },
)

const display = computed(() => {
  if (props.dot) return ''
  if (typeof props.content === 'number' && props.content > props.max) return `${props.max}+`
  return String(props.content ?? '')
})
</script>

<template>
  <!-- Mode superposé : un enfant est fourni -->
  <span v-if="$slots.default" class="vx-badge-wrap">
    <slot />
    <span
      class="vx-badge"
      :class="[`vx-badge--${kind}`, { 'vx-badge--dot': dot }]"
      :role="live ? 'status' : 'img'"
      :aria-label="dot ? 'notification' : display"
    >{{ display }}</span>
  </span>
  <!-- Mode autonome -->
  <span
    v-else
    class="vx-badge"
    :class="[`vx-badge--${kind}`, { 'vx-badge--dot': dot }]"
    :role="live ? 'status' : 'img'"
    :aria-label="dot ? 'notification' : display"
  >{{ display }}</span>
</template>

<style scoped>
.vx-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 18px;
  height: 18px;
  padding: 0 5px;
  border-radius: var(--vx-radius-pill, 999px);
  background: var(--vx-accent);
  color: var(--vx-accent-ink);
  font-family: var(--vx-font-mono);
  font-size: 10px;
  font-weight: 700;
  line-height: 1;
}
.vx-badge--neutral { background: var(--vx-fill-2); color: var(--vx-ink); }
.vx-badge--warn { background: var(--vx-warn); color: var(--vx-accent-ink); }
.vx-badge--err { background: var(--vx-err); color: var(--vx-bg); }
.vx-badge--info { background: var(--vx-info); color: var(--vx-accent-ink); }
.vx-badge--dot {
  min-width: 9px;
  width: 9px;
  height: 9px;
  padding: 0;
}
.vx-badge-wrap {
  position: relative;
  display: inline-flex;
}
.vx-badge-wrap > .vx-badge {
  position: absolute;
  top: -6px;
  right: -6px;
}
</style>
