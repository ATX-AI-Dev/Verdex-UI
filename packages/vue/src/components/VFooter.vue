<script setup lang="ts">
export interface FooterColumn {
  /** Titre de colonne. */
  title: string
  /** Liens. */
  links: { label: string; href: string }[]
}

/** Pied de page applicatif : colonnes de liens + barre de copyright. */
defineProps<{
  /** Colonnes de liens. */
  columns?: FooterColumn[]
  /** Texte de copyright (sinon slot #copyright). */
  copyright?: string
}>()
</script>

<template>
  <footer class="vx-footer">
    <div v-if="$slots.brand || columns?.length" class="vx-footer__top">
      <div v-if="$slots.brand" class="vx-footer__brand">
        <slot name="brand" />
      </div>
      <div v-if="columns?.length" class="vx-footer__cols">
        <div v-for="col in columns" :key="col.title" class="vx-footer__col">
          <p class="vx-footer__coltitle">{{ col.title }}</p>
          <a v-for="link in col.links" :key="link.href" class="vx-footer__link" :href="link.href">
            {{ link.label }}
          </a>
        </div>
      </div>
    </div>
    <div class="vx-footer__bar">
      <span class="vx-footer__copy"><slot name="copyright">{{ copyright }}</slot></span>
      <div v-if="$slots.default" class="vx-footer__actions">
        <slot />
      </div>
    </div>
  </footer>
</template>

<style scoped>
.vx-footer {
  background: var(--vx-chrome);
  border-top: 1px solid var(--vx-line-2);
  padding: 28px 28px 18px;
}
.vx-footer__top {
  display: flex;
  flex-wrap: wrap;
  gap: 28px 40px;
  justify-content: space-between;
  padding-bottom: 22px;
  border-bottom: 1px solid var(--vx-line-2);
}
.vx-footer__brand {
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 700;
}
.vx-footer__cols {
  display: flex;
  flex-wrap: wrap;
  gap: 40px;
}
.vx-footer__col {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.vx-footer__coltitle {
  margin: 0 0 2px;
  font-family: var(--vx-font-mono);
  font-size: 10px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--vx-muted);
}
.vx-footer__link {
  color: var(--vx-ink);
  text-decoration: none;
  font-size: 13px;
  transition: color 0.15s;
}
.vx-footer__link:hover {
  color: var(--vx-accent);
}
.vx-footer__bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
  flex-wrap: wrap;
  padding-top: 16px;
}
.vx-footer__copy {
  font-family: var(--vx-font-mono);
  font-size: 11px;
  color: var(--vx-muted);
}
.vx-footer__actions {
  display: flex;
  align-items: center;
  gap: 10px;
}
</style>
