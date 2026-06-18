<script setup lang="ts">
import { ref } from 'vue'
import {
  VCard,
  VInput,
  VCheckbox,
  VRadioGroup,
  VSwitch,
  VTextarea,
  VSelect,
  VAutoComplete,
  VCalendar,
  VButton,
  VText,
  VAlert,
  useForm,
  required,
  email,
  minLength,
  sameAs,
  type SelectOption,
} from '@verdex/vue'

// Contrôles simples
const terms = ref(false)
const features = ref<string[]>(['logs'])
const plan = ref<string | number>('pro')
const notifications = ref(true)
const bio = ref('')

const planOptions: SelectOption[] = [
  { value: 'free', label: 'Free' },
  { value: 'pro', label: 'Pro' },
  { value: 'team', label: 'Team' },
  { value: 'entreprise', label: 'Entreprise', disabled: true },
]

const region = ref('')
const regions = ['Paris', 'Lyon', 'Marseille', 'Bordeaux', 'Lille', 'Toulouse', 'Nantes']

const date = ref('')

// Formulaire validé
const { values, errors, handleSubmit, reset } = useForm({
  email: { value: '', rules: [required(), email()] },
  password: { value: '', rules: [required(), minLength(8)] },
  confirm: { value: '', rules: [required(), sameAs(() => values.password, 'Les mots de passe diffèrent.')] },
})
const submitted = ref(false)
const onSubmit = handleSubmit(() => {
  submitted.value = true
  setTimeout(() => (submitted.value = false), 2500)
})
</script>

<template>
  <div class="grid">
    <VCard tag="Choix">
      <div class="stack">
        <VRadioGroup
          v-model="plan"
          label="Formule"
          :options="planOptions"
          inline
        />
        <VCheckbox v-model="features" value="logs" label="Logs centralisés" />
        <VCheckbox v-model="features" value="alerts" label="Alertes temps réel" />
        <VCheckbox v-model="features" value="audit" label="Audit de sécurité" />
        <VSwitch v-model="notifications" label="Notifications par email" />
        <VText mono size="sm" muted>plan={{ plan }} · features=[{{ features.join(', ') }}] · notif={{ notifications }}</VText>
      </div>
    </VCard>

    <VCard tag="Select & autocomplete">
      <div class="stack">
        <VSelect v-model="plan" label="Formule" :options="planOptions" clearable hint="Liste déroulante accessible" />
        <VAutoComplete
          v-model="region"
          label="Région"
          :options="regions"
          placeholder="Tapez une ville…"
          hint="Suggestions filtrées"
        />
        <VTextarea v-model="bio" label="Notes" placeholder="Une description…" :rows="3" />
      </div>
    </VCard>

    <VCard tag="Calendrier">
      <div class="stack">
        <VCalendar v-model="date" />
        <VText mono size="sm" muted>date = {{ date || '—' }}</VText>
      </div>
    </VCard>

    <VCard tag="Validation (useForm)">
      <form class="stack" @submit="onSubmit">
        <VInput v-model="values.email" label="Email" :error="errors.email" placeholder="you@verdex.io" />
        <VInput v-model="values.password" label="Mot de passe" type="password" :error="errors.password" />
        <VInput v-model="values.confirm" label="Confirmation" type="password" :error="errors.confirm" />
        <VAlert v-if="submitted" kind="success">Formulaire valide, soumis ✓</VAlert>
        <div class="row">
          <VButton variant="primary" type="submit">Valider</VButton>
          <VButton type="button" @click="reset">Réinitialiser</VButton>
        </div>
      </form>
    </VCard>
  </div>
</template>

<style scoped>
.grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; align-items: start; }
.row { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; }
.stack { display: flex; flex-direction: column; gap: 12px; }
@media (max-width: 760px) { .grid { grid-template-columns: 1fr; } }
</style>
