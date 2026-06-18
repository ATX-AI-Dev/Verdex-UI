<script setup lang="ts">
/** État vide : icône, titre, description et action optionnelle. */
defineProps<{
  /** Icône (texte/emoji) ou via slot `#icon`. */
  icon?: string
  /** Titre. */
  title?: string
  /** Description. */
  description?: string
}>()
</script>

<template>
  <div class="vx-empty">
    <div class="vx-empty__icon">
      <slot name="icon">{{ icon ?? '◌' }}</slot>
    </div>
    <p v-if="title" class="vx-empty__title">{{ title }}</p>
    <p v-if="description" class="vx-empty__desc">{{ description }}</p>
    <div v-if="$slots.default" class="vx-empty__action">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.vx-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 8px;
  padding: 40px 24px;
}
.vx-empty__icon {
  display: grid;
  place-items: center;
  width: 56px;
  height: 56px;
  margin-bottom: 6px;
  border-radius: 16px 18px 15px 18px;
  background: var(--vx-fill);
  border: 1.5px dashed var(--vx-line);
  font-size: 26px;
  color: var(--vx-muted);
}
.vx-empty__title {
  margin: 0;
  font-size: 15px;
  font-weight: 700;
  color: var(--vx-ink);
}
.vx-empty__desc {
  margin: 0;
  font-size: 13px;
  color: var(--vx-muted);
  max-width: 360px;
  line-height: 1.5;
}
.vx-empty__action {
  margin-top: 10px;
}
</style>
