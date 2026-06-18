<script setup lang="ts">
import VAlert from './VAlert.vue'

/** Carte d'authentification : cadre + titre/sous-titre + erreur serveur. Base des formulaires auth. */
defineProps<{
  /** Titre. */
  title?: string
  /** Sous-titre. */
  subtitle?: string
  /** Message d'erreur serveur (affiché en alerte). */
  error?: string
}>()
</script>

<template>
  <div class="vx-authcard">
    <div class="vx-authcard__body">
      <h1 v-if="title" class="vx-authcard__title">{{ title }}</h1>
      <p v-if="subtitle" class="vx-authcard__subtitle">{{ subtitle }}</p>
      <VAlert v-if="error" kind="err" class="vx-authcard__error">{{ error }}</VAlert>
      <slot />
    </div>
    <div v-if="$slots.footer" class="vx-authcard__footer">
      <slot name="footer" />
    </div>
  </div>
</template>

<style scoped>
.vx-authcard {
  background: var(--vx-paper);
  border: 2px solid var(--vx-line);
  border-radius: var(--vx-radius-lg, 14px 16px 13px 16px);
  box-shadow: var(--vx-shadow);
  overflow: hidden;
}
.vx-authcard__body {
  padding: 22px;
}
.vx-authcard__title {
  margin: 0 0 4px;
  font-size: 18px;
  font-weight: 700;
  color: var(--vx-ink);
}
.vx-authcard__subtitle {
  margin: 0 0 16px;
  font-size: 12.5px;
  color: var(--vx-muted);
  line-height: 1.5;
}
.vx-authcard__error {
  margin-bottom: 14px;
}
.vx-authcard__footer {
  padding: 13px 22px;
  border-top: 1px solid var(--vx-line-2);
  background: var(--vx-paper2);
  text-align: center;
  font-size: 12.5px;
  color: var(--vx-muted);
}
</style>
