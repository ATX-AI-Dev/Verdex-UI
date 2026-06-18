<script setup lang="ts">
/**
 * Mise en page centrée pour les pages d'authentification.
 * Slots : `#brand` (logo + nom), défaut (la carte de formulaire), `#footer`.
 */
withDefaults(
  defineProps<{
    /** Nom de marque (si pas de slot #brand). */
    brand?: string
    /** Accroche sous la marque. */
    tagline?: string
  }>(),
  { brand: 'Verdex' },
)
</script>

<template>
  <div class="vx-auth">
    <div class="vx-auth__inner">
      <div class="vx-auth__brand">
        <slot name="brand">
          <span class="vx-auth__glyph">{{ brand.charAt(0) }}</span>
          <div>
            <b class="vx-auth__name">{{ brand }}</b>
            <small v-if="tagline" class="vx-auth__tagline">{{ tagline }}</small>
          </div>
        </slot>
      </div>

      <slot />

      <div v-if="$slots.footer" class="vx-auth__footer">
        <slot name="footer" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.vx-auth {
  min-height: 100%;
  display: grid;
  place-items: center;
  padding: 24px;
  background: var(--vx-bg);
}
.vx-auth__inner {
  width: min(400px, 100%);
  display: flex;
  flex-direction: column;
  gap: 18px;
}
.vx-auth__brand {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
}
.vx-auth__glyph {
  display: grid;
  place-items: center;
  width: 38px;
  height: 38px;
  border-radius: 11px;
  font-family: var(--vx-font-mono);
  font-size: 18px;
  font-weight: 700;
  background: var(--vx-accent);
  color: var(--vx-accent-ink);
  box-shadow: 0 0 0 4px color-mix(in oklab, var(--vx-accent) 18%, transparent);
}
.vx-auth__name {
  font-size: 18px;
  letter-spacing: 0.2px;
}
.vx-auth__tagline {
  display: block;
  color: var(--vx-muted);
  font-size: 10.5px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
}
.vx-auth__footer {
  text-align: center;
  font-size: 12px;
  color: var(--vx-muted);
}
</style>
