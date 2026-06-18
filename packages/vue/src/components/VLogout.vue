<script setup lang="ts">
import VButton from './VButton.vue'

/** Panneau de confirmation de déconnexion. Émet `confirm` / `cancel`. */
withDefaults(
  defineProps<{
    title?: string
    message?: string
    loading?: boolean
    confirmLabel?: string
    cancelLabel?: string
  }>(),
  {
    title: 'Se déconnecter ?',
    message: 'Vous devrez vous reconnecter pour accéder à votre espace.',
    confirmLabel: 'Se déconnecter',
    cancelLabel: 'Annuler',
  },
)

defineEmits<{ confirm: []; cancel: [] }>()
</script>

<template>
  <div class="vx-logout">
    <div class="vx-logout__icon" aria-hidden="true">↩</div>
    <h2 class="vx-logout__title">{{ title }}</h2>
    <p class="vx-logout__msg">{{ message }}</p>
    <div class="vx-logout__actions">
      <VButton @click="$emit('cancel')">{{ cancelLabel }}</VButton>
      <VButton variant="primary" :loading="loading" @click="$emit('confirm')">{{ confirmLabel }}</VButton>
    </div>
  </div>
</template>

<style scoped>
.vx-logout {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 8px;
  padding: 24px;
  background: var(--vx-paper);
  border: 2px solid var(--vx-line);
  border-radius: var(--vx-radius-lg, 14px 16px 13px 16px);
  box-shadow: var(--vx-shadow);
  max-width: 360px;
}
.vx-logout__icon {
  display: grid;
  place-items: center;
  width: 48px;
  height: 48px;
  margin-bottom: 4px;
  border-radius: 14px 16px 13px 16px;
  background: var(--vx-fill);
  border: 1.5px solid var(--vx-line);
  font-size: 22px;
  color: var(--vx-muted);
}
.vx-logout__title {
  margin: 0;
  font-size: 16px;
  font-weight: 700;
  color: var(--vx-ink);
}
.vx-logout__msg {
  margin: 0;
  font-size: 13px;
  color: var(--vx-muted);
  line-height: 1.5;
}
.vx-logout__actions {
  display: flex;
  gap: 10px;
  margin-top: 12px;
}
</style>
