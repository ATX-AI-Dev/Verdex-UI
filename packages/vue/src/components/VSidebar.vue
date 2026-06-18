<script setup lang="ts">
export interface NavItem {
  /** Identifiant unique (valeur du v-model). */
  id: string
  /** Libellé. */
  label: string
  /** Icône (texte / emoji). */
  icon?: string
  /** Pastille / compteur affiché à droite. */
  badge?: string | number
}

export interface NavSection {
  /** Titre du groupe (mono, uppercase). */
  label?: string
  /** Éléments du groupe. */
  items: NavItem[]
}

/** Barre latérale de navigation. `v-model` sur l'id actif. Slots `#brand`, `#footer`. */
defineProps<{
  /** Sections de navigation. */
  sections: NavSection[]
}>()

const model = defineModel<string>()
</script>

<template>
  <aside class="vx-sidebar">
    <div v-if="$slots.brand" class="vx-sidebar__brand">
      <slot name="brand" />
    </div>
    <nav class="vx-sidebar__nav">
      <div v-for="(section, si) in sections" :key="si" class="vx-sidebar__group">
        <p v-if="section.label" class="vx-sidebar__grouplabel">{{ section.label }}</p>
        <button
          v-for="item in section.items"
          :key="item.id"
          class="vx-sidebar__item"
          :class="{ 'is-active': model === item.id }"
          type="button"
          :aria-current="model === item.id ? 'page' : undefined"
          @click="model = item.id"
        >
          <span v-if="item.icon" class="vx-sidebar__icon">{{ item.icon }}</span>
          <span class="vx-sidebar__label">{{ item.label }}</span>
          <span v-if="item.badge != null" class="vx-sidebar__badge">{{ item.badge }}</span>
        </button>
      </div>
    </nav>
    <div v-if="$slots.footer" class="vx-sidebar__footer">
      <slot name="footer" />
    </div>
  </aside>
</template>

<style scoped>
.vx-sidebar {
  display: flex;
  flex-direction: column;
  width: 248px;
  min-height: 0;
  background: var(--vx-chrome);
  border-right: 1px solid var(--vx-line-2);
}
.vx-sidebar__brand {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 18px 18px 14px;
}
.vx-sidebar__nav {
  overflow: auto;
  flex: 1;
  padding: 6px 10px 16px;
}
.vx-sidebar__grouplabel {
  margin: 12px 8px 4px;
  font-size: 10px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--vx-muted);
  font-family: var(--vx-font-mono);
}
.vx-sidebar__item {
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  padding: 8px 10px;
  border: 0;
  background: none;
  color: var(--vx-ink);
  cursor: pointer;
  border-radius: 9px;
  font-family: var(--vx-font-sans);
  font-size: 13px;
  text-align: left;
  transition: background 0.15s, color 0.15s;
}
.vx-sidebar__icon {
  width: 18px;
  text-align: center;
  color: var(--vx-muted);
  transition: color 0.15s;
}
.vx-sidebar__label {
  flex: 1;
}
.vx-sidebar__badge {
  font-family: var(--vx-font-mono);
  font-size: 10px;
  color: var(--vx-muted);
  background: var(--vx-fill-2);
  border-radius: 999px;
  padding: 1px 7px;
}
.vx-sidebar__item:hover {
  background: var(--vx-fill);
}
.vx-sidebar__item.is-active {
  background: color-mix(in oklab, var(--vx-accent) 16%, transparent);
  color: var(--vx-ink);
  box-shadow: inset 2px 0 0 var(--vx-accent);
}
.vx-sidebar__item.is-active .vx-sidebar__icon {
  color: var(--vx-accent);
}
.vx-sidebar__footer {
  padding: 12px 14px;
  border-top: 1px solid var(--vx-line-2);
}
</style>
