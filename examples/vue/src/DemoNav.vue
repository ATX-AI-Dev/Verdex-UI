<script setup lang="ts">
import { ref } from 'vue'
import {
  VCard,
  VButton,
  VIconButton,
  VNavbar,
  VBreadcrumbs,
  VToolbar,
  VMenu,
  VPopover,
  VTooltip,
  VDialog,
  VDrawer,
  VSidebar,
  VFab,
  VInput,
  VText,
  VChip,
  type MenuItem,
  type Crumb,
  type NavSection,
} from '@verdex/vue'

const crumbs: Crumb[] = [
  { label: 'Verdex', href: '#' },
  { label: 'Projets', href: '#' },
  { label: 'Dashboard' },
]

const menuItems: MenuItem[] = [
  { label: 'Profil', icon: '👤', value: 'profile' },
  { label: 'Paramètres', icon: '⚙', value: 'settings' },
  { divider: true },
  { label: 'Déconnexion', icon: '↩', value: 'logout', danger: true },
]
const lastAction = ref('—')

const sections: NavSection[] = [
  {
    label: 'Pilotage',
    items: [
      { id: 'overview', label: 'Aperçu', icon: '◫' },
      { id: 'projects', label: 'Projets', icon: '◇', badge: 4 },
      { id: 'logs', label: 'Logs', icon: '≡' },
    ],
  },
  {
    label: 'Sécurité',
    items: [
      { id: 'cyber', label: 'Cyber', icon: '⚿' },
      { id: 'audit', label: 'Audits', icon: '✓' },
    ],
  },
]
const active = ref('projects')

const dialogOpen = ref(false)
const drawerOpen = ref(false)
const dialogEmail = ref('')
</script>

<template>
  <div class="stack">
    <VCard tag="Navbar" :ghost-tag="false">
      <VNavbar :sticky="false">
        <template #brand>
          <span class="glyph">V</span> Verdex
        </template>
        <VButton variant="ghost" size="sm">Aperçu</VButton>
        <VButton variant="ghost" size="sm">Projets</VButton>
        <VButton variant="ghost" size="sm">Cyber</VButton>
        <template #actions>
          <VTooltip text="Notifications" placement="bottom">
            <VIconButton label="Notifications">🔔</VIconButton>
          </VTooltip>
          <VMenu :items="menuItems" placement="bottom-end" @select="lastAction = String($event.value)">
            <template #trigger="{ toggle, open }">
              <VButton size="sm" :variant="open ? 'primary' : 'secondary'" @click="toggle">Compte ▾</VButton>
            </template>
          </VMenu>
        </template>
      </VNavbar>
      <VText mono size="sm" muted style="margin-top: 12px">Menu → {{ lastAction }}</VText>
    </VCard>

    <div class="grid">
      <VCard tag="Fil d'Ariane & toolbar">
        <div class="stack">
          <VBreadcrumbs :items="crumbs" />
          <VToolbar title="run.log">
            <template #start><VIconButton label="Lecture" size="sm">▶</VIconButton></template>
            <VChip kind="ok">live</VChip>
            <template #end>
              <VButton size="sm">Exporter</VButton>
              <VButton size="sm" variant="primary">Filtrer</VButton>
            </template>
          </VToolbar>
        </div>
      </VCard>

      <VCard tag="Overlays">
        <div class="row">
          <VButton variant="primary" @click="dialogOpen = true">Ouvrir dialog</VButton>
          <VButton @click="drawerOpen = true">Ouvrir drawer</VButton>
          <VPopover placement="bottom-start">
            <template #trigger="{ toggle }">
              <VButton variant="ghost" @click="toggle">Popover</VButton>
            </template>
            <template #default="{ close }">
              <VText size="sm" style="margin-bottom: 10px">Panneau flottant ancré au bouton.</VText>
              <VButton size="sm" @click="close">Fermer</VButton>
            </template>
          </VPopover>
          <VTooltip text="Astuce contextuelle"><VChip kind="info">survole-moi</VChip></VTooltip>
        </div>
      </VCard>
    </div>

    <VCard tag="Sidebar">
      <div class="sidebar-demo">
        <VSidebar v-model="active" :sections="sections">
          <template #brand><span class="glyph">V</span> Verdex</template>
          <template #footer><VText mono size="xs" muted>actif : {{ active }}</VText></template>
        </VSidebar>
        <div class="sidebar-demo__content">
          <VText muted>Section active : <strong>{{ active }}</strong></VText>
        </div>
      </div>
    </VCard>

    <!-- Overlays -->
    <VDialog v-model="dialogOpen" title="Inviter un membre" size="sm">
      <VText size="sm" muted style="margin-bottom: 14px">Saisissez l'email à inviter sur l'espace.</VText>
      <VInput v-model="dialogEmail" label="Email" placeholder="membre@verdex.io" />
      <template #footer="{ close }">
        <VButton @click="close">Annuler</VButton>
        <VButton variant="primary" @click="close">Inviter</VButton>
      </template>
    </VDialog>

    <VDrawer v-model="drawerOpen" title="Détails du projet" side="right">
      <VText muted size="sm">Panneau latéral coulissant avec piège de focus et verrou de scroll.</VText>
      <div class="stack" style="margin-top: 14px">
        <VChip kind="ok">build passing</VChip>
        <VChip kind="info">v0.3.0</VChip>
      </div>
      <template #footer="{ close }">
        <VButton variant="primary" @click="close">Fermer</VButton>
      </template>
    </VDrawer>

    <VFab label="Nouvelle action" extended>+</VFab>
  </div>
</template>

<style scoped>
.stack { display: flex; flex-direction: column; gap: 20px; }
.grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
.row { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; }
.glyph {
  display: inline-grid;
  place-items: center;
  width: 26px;
  height: 26px;
  border-radius: 8px;
  background: var(--vx-accent);
  color: var(--vx-accent-ink);
  font-family: var(--vx-font-mono);
  font-weight: 700;
}
.sidebar-demo {
  display: flex;
  border: 1.5px solid var(--vx-line);
  border-radius: var(--vx-radius);
  overflow: hidden;
  min-height: 260px;
}
.sidebar-demo__content {
  flex: 1;
  padding: 18px;
  display: grid;
  place-items: center;
}
@media (max-width: 760px) { .grid { grid-template-columns: 1fr; } }
</style>
