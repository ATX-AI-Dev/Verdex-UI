<script setup lang="ts">
import { ref } from 'vue'
import {
  VCard,
  VDataTable,
  VList,
  VTreeview,
  VTimeline,
  VSteps,
  VProgress,
  VCarousel,
  VAvatar,
  VBanner,
  VEmptyState,
  VExpansionPanel,
  VChip,
  VButton,
  VText,
  type Column,
  type TreeNode,
  type TimelineItem,
  type Step,
  type ListItem,
} from '@verdex/vue'

// DataTable
const columns: Column[] = [
  { key: 'name', label: 'Service', sortable: true },
  { key: 'status', label: 'État' },
  { key: 'uptime', label: 'Uptime', sortable: true, align: 'right', mono: true },
  { key: 'region', label: 'Région', sortable: true },
]
const rows = [
  { id: 1, name: 'api-gateway', status: 'ok', uptime: 99.98, region: 'eu-west' },
  { id: 2, name: 'auth-service', status: 'ok', uptime: 99.91, region: 'eu-west' },
  { id: 3, name: 'worker-pool', status: 'warn', uptime: 98.40, region: 'us-east' },
  { id: 4, name: 'redis-cache', status: 'ok', uptime: 99.99, region: 'eu-central' },
  { id: 5, name: 'pdf-render', status: 'err', uptime: 91.20, region: 'us-east' },
  { id: 6, name: 'cron-runner', status: 'ok', uptime: 99.70, region: 'eu-west' },
]
const selected = ref<(string | number)[]>([1])

// List
const listItems: ListItem[] = [
  { value: 'a', label: 'Anthropic', sublabel: 'Claude API', icon: '◆', trailing: '12' },
  { value: 'b', label: 'Supabase', sublabel: 'Postgres', icon: '◇', trailing: '4' },
  { value: 'c', label: 'Vercel', sublabel: 'Edge', icon: '▲', trailing: '8' },
]
const listSel = ref('a')

// Treeview
const tree: TreeNode[] = [
  {
    id: 'src', label: 'src', icon: '📁',
    children: [
      { id: 'comp', label: 'components', icon: '📁', children: [
        { id: 'btn', label: 'VButton.vue', icon: '📄' },
        { id: 'card', label: 'VCard.vue', icon: '📄' },
      ]},
      { id: 'main', label: 'main.ts', icon: '📄' },
    ],
  },
  { id: 'pkg', label: 'package.json', icon: '📄' },
]
const treeSel = ref('btn')
const expanded = ref(['src', 'comp'])

// Timeline
const events: TimelineItem[] = [
  { title: 'Déploiement v0.4.0', time: 'il y a 2 min', kind: 'ok', icon: '✓', description: 'Production mise à jour.' },
  { title: 'Pic de latence', time: 'il y a 1 h', kind: 'warn', description: 'p95 à 820 ms sur worker-pool.' },
  { title: 'Audit sécurité', time: 'hier', kind: 'info', description: '0 vulnérabilité critique.' },
]

// Steps
const steps: Step[] = [
  { label: 'Compte', description: 'Identité' },
  { label: 'Espace', description: 'Configuration' },
  { label: 'Équipe', description: 'Invitations' },
  { label: 'Fini' },
]
const current = ref(1)

// Carousel
const slides = ['#16221c', '#1b2a23', '#101f19']

// Progress
const prog = ref(64)

const panel1 = ref(true)
const panel2 = ref(false)
</script>

<template>
  <div class="stack">
    <VBanner kind="info" icon="✦" title="Nouveau" dismissible>
      La Vague 4 ajoute les composants de données.
      <template #actions><VButton size="sm" variant="primary">Voir</VButton></template>
    </VBanner>

    <VCard tag="DataTable">
      <VDataTable
        v-model:selected="selected"
        :columns="columns"
        :rows="rows"
        selectable
        :page-size="4"
      >
        <template #cell-status="{ value }">
          <VChip :kind="value === 'ok' ? 'ok' : value === 'warn' ? 'warn' : 'err'">{{ value }}</VChip>
        </template>
        <template #cell-uptime="{ value }">{{ value }}%</template>
      </VDataTable>
      <VText mono size="sm" muted style="margin-top: 10px">Sélection : [{{ selected.join(', ') }}]</VText>
    </VCard>

    <div class="grid">
      <VCard tag="List">
        <VList v-model="listSel" :items="listItems" selectable />
      </VCard>

      <VCard tag="Treeview">
        <VTreeview v-model="treeSel" v-model:expanded="expanded" :nodes="tree" />
      </VCard>

      <VCard tag="Timeline">
        <VTimeline :items="events" />
      </VCard>

      <VCard tag="Progress">
        <div class="stack">
          <VProgress :value="prog" show-label />
          <VProgress :value="40" kind="warn" />
          <VProgress indeterminate kind="info" />
          <div class="row">
            <VProgress variant="circular" :value="prog" show-label />
            <VProgress variant="circular" indeterminate />
            <VButton size="sm" @click="prog = (prog + 15) % 100">+15%</VButton>
          </div>
        </div>
      </VCard>
    </div>

    <VCard tag="Steps">
      <div class="stack">
        <VSteps v-model="current" :steps="steps" clickable />
        <div class="row">
          <VButton size="sm" :disabled="current === 0" @click="current--">Précédent</VButton>
          <VButton size="sm" variant="primary" :disabled="current === steps.length - 1" @click="current++">Suivant</VButton>
        </div>
      </div>
    </VCard>

    <div class="grid">
      <VCard tag="Avatars">
        <div class="row">
          <VAvatar name="Corentyn Dev" status="ok" />
          <VAvatar name="Verdex Bot" :size="44" status="warn" />
          <VAvatar name="AB" square :size="44" />
          <VAvatar src="https://invalid.example/x.png" name="Fallback" :size="44" />
        </div>
      </VCard>

      <VCard tag="Carousel">
        <VCarousel :items="slides" :autoplay="2600">
          <template #default="{ item, index }">
            <div class="slide" :style="{ background: item as string }">Slide {{ index + 1 }}</div>
          </template>
        </VCarousel>
      </VCard>
    </div>

    <VCard tag="Expansion">
      <div class="stack">
        <VExpansionPanel v-model="panel1" title="Qu'est-ce que Verdex UI ?" icon="①">
          Une bibliothèque de composants cohérente, multi-framework, signée Verdex.
        </VExpansionPanel>
        <VExpansionPanel v-model="panel2" title="Comment l'installer ?" icon="②">
          <code>npx @verdex/cli init</code> puis choisissez votre framework.
        </VExpansionPanel>
      </div>
    </VCard>

    <VCard tag="Empty state">
      <VEmptyState icon="🗂" title="Aucun projet" description="Créez votre premier projet pour démarrer le monitoring.">
        <VButton variant="primary">Nouveau projet</VButton>
      </VEmptyState>
    </VCard>
  </div>
</template>

<style scoped>
.stack { display: flex; flex-direction: column; gap: 20px; }
.grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; align-items: start; }
.row { display: flex; align-items: center; gap: 12px; flex-wrap: wrap; }
.slide {
  display: grid;
  place-items: center;
  height: 150px;
  color: var(--vx-ink);
  font-family: var(--vx-font-mono);
  font-size: 18px;
}
@media (max-width: 760px) { .grid { grid-template-columns: 1fr; } }
</style>
