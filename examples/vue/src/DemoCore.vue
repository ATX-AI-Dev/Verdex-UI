<script setup lang="ts">
import { ref } from 'vue'
import {
  VButton,
  VIconButton,
  VInput,
  VCard,
  VChip,
  VBadge,
  VTabs,
  VText,
  VAlert,
  VSkeleton,
  type TabItem,
} from '@verdex/vue'

const email = ref('')
const password = ref('x')
const loading = ref(false)
function fakeDeploy() {
  loading.value = true
  setTimeout(() => (loading.value = false), 1400)
}

const tabs: TabItem[] = [
  { id: 'overview', label: 'Aperçu' },
  { id: 'logs', label: 'Logs' },
  { id: 'settings', label: 'Réglages' },
]
const tab = ref('overview')
const showAlert = ref(true)
</script>

<template>
  <div class="grid">
    <VCard tag="Buttons">
      <div class="row">
        <VButton variant="primary" :loading="loading" @click="fakeDeploy">Déployer</VButton>
        <VButton>Secondaire</VButton>
        <VButton variant="ghost">Ghost</VButton>
        <VButton variant="primary" size="sm">Petit</VButton>
        <VButton disabled>Off</VButton>
        <VIconButton label="Réglages">⚙</VIconButton>
        <VBadge :content="3"><VIconButton label="Notifications">🔔</VIconButton></VBadge>
      </div>
    </VCard>

    <VCard tag="Inputs">
      <div class="stack">
        <VInput v-model="email" label="Email" placeholder="you@verdex.io">
          <template #icon>@</template>
        </VInput>
        <VInput
          v-model="password"
          label="Mot de passe"
          type="password"
          :error="password.length < 8 ? 'Au moins 8 caractères.' : ''"
          hint="8 caractères minimum"
        />
      </div>
    </VCard>

    <VCard tag="Status">
      <div class="stack">
        <div class="row">
          <VChip kind="ok">En ligne</VChip>
          <VChip kind="warn">Dégradé</VChip>
          <VChip kind="err">Hors-ligne</VChip>
          <VChip kind="info">Info</VChip>
          <VChip :dot="false">neutre</VChip>
        </div>
        <VAlert v-if="showAlert" kind="success" title="Déploiement réussi" dismissible @close="showAlert = false">
          La version 0.1.0 est en production.
        </VAlert>
        <VAlert kind="warn">Certificat TLS expire dans 7 jours.</VAlert>
      </div>
    </VCard>

    <VCard bar-title="~/verdex/run.log">
      <div class="stack">
        <VTabs v-model="tab" :items="tabs" />
        <VText mono size="sm" muted>Onglet actif : {{ tab }}</VText>
        <VSkeleton :lines="3" />
      </div>
    </VCard>
  </div>
</template>

<style scoped>
.grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
.row { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; }
.stack { display: flex; flex-direction: column; gap: 12px; }
@media (max-width: 760px) { .grid { grid-template-columns: 1fr; } }
</style>
