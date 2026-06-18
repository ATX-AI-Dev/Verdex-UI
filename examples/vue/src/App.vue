<script setup lang="ts">
import { ref } from 'vue'
import { VButton, VDivider, VTitle, VText, VLink, VTabs, type TabItem } from '@verdex/vue'
import DemoCore from './DemoCore.vue'
import DemoForms from './DemoForms.vue'
import DemoNav from './DemoNav.vue'
import DemoData from './DemoData.vue'
import DemoAuth from './DemoAuth.vue'

const theme = ref<'dark' | 'light'>('dark')
function toggleTheme() {
  theme.value = theme.value === 'dark' ? 'light' : 'dark'
  document.documentElement.dataset.theme = theme.value
}

const views: TabItem[] = [
  { id: 'core', label: 'Noyau' },
  { id: 'forms', label: 'Formulaires' },
  { id: 'nav', label: 'Navigation' },
  { id: 'data', label: 'Données' },
  { id: 'auth', label: 'Auth & layouts' },
]
const view = ref('core')
</script>

<template>
  <div class="wrap">
    <div class="head">
      <VTitle :level="1" eyebrow="Design System">Verdex UI — Vue 3</VTitle>
      <VButton @click="toggleTheme">◐ Thème {{ theme }}</VButton>
    </div>

    <VText muted>52 composants, pages d'auth prêtes, overlays accessibles, DataTable triable, dark/light, typés TypeScript.</VText>

    <div class="switch">
      <VTabs v-model="view" :items="views" />
    </div>

    <DemoCore v-if="view === 'core'" />
    <DemoForms v-else-if="view === 'forms'" />
    <DemoNav v-else-if="view === 'nav'" />
    <DemoData v-else-if="view === 'data'" />
    <DemoAuth v-else />

    <VDivider label="fin" />
    <VText size="sm" muted>
      Construit avec <VLink href="https://github.com/Verdex-Workspace">Verdex Workspace</VLink>.
    </VText>
  </div>
</template>

<style scoped>
.wrap { max-width: 980px; margin: 0 auto; padding: 40px 24px 90px; }
.head { display: flex; align-items: center; justify-content: space-between; gap: 16px; margin-bottom: 14px; }
.switch { margin: 18px 0 24px; }
</style>
