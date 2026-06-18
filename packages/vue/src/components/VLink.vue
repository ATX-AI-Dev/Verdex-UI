<script setup lang="ts">
import { computed } from 'vue'

/** Lien stylé Verdex. Détecte les liens externes (target _blank + rel). */
const props = withDefaults(
  defineProps<{
    /** Destination. */
    href: string
    /** Force le comportement externe. */
    external?: boolean
    /** Variante atténuée. */
    muted?: boolean
  }>(),
  {},
)

const isExternal = computed(() => props.external || /^https?:\/\//.test(props.href))
</script>

<template>
  <a
    class="vx-link"
    :class="{ 'vx-link--muted': muted }"
    :href="href"
    :target="isExternal ? '_blank' : undefined"
    :rel="isExternal ? 'noopener noreferrer' : undefined"
  >
    <slot />
    <span v-if="isExternal" class="vx-link__ext" aria-hidden="true">↗</span>
  </a>
</template>

<style scoped>
.vx-link {
  color: var(--vx-accent);
  text-decoration: none;
  border-bottom: 1px solid color-mix(in oklab, var(--vx-accent) 40%, transparent);
  transition:
    color 0.15s,
    border-color 0.15s;
  cursor: pointer;
}
.vx-link:hover {
  color: color-mix(in oklab, var(--vx-accent) 80%, var(--vx-ink));
  border-color: var(--vx-accent);
}
.vx-link:focus-visible {
  outline: none;
  box-shadow: var(--vx-ring, 0 0 0 3px color-mix(in oklab, var(--vx-accent) 22%, transparent));
  border-radius: 2px;
}
.vx-link--muted {
  color: var(--vx-muted);
  border-bottom-color: transparent;
}
.vx-link--muted:hover {
  color: var(--vx-ink);
}
.vx-link__ext {
  font-size: 0.85em;
  opacity: 0.7;
  margin-left: 2px;
}
</style>
