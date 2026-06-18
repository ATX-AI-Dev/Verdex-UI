<script setup lang="ts">
import { computed } from 'vue'
import VAuthCard from './VAuthCard.vue'
import VInput from './VInput.vue'
import VButton from './VButton.vue'
import { useForm } from '../composables/useForm'
import { required, minLength } from '../validators'

/** Formulaire de réinitialisation du mot de passe. Émet `submit` avec le nouveau mot de passe. */
const props = withDefaults(
  defineProps<{
    title?: string
    subtitle?: string
    loading?: boolean
    error?: string
    /** Longueur minimale. */
    minLength?: number
  }>(),
  {
    title: 'Nouveau mot de passe',
    subtitle: 'Choisissez un mot de passe sûr.',
    minLength: 8,
  },
)

const emit = defineEmits<{ submit: [values: { password: string }] }>()

const min = computed(() => props.minLength)
// La règle de correspondance est vérifiée dans onSubmit (référencer `values` dans
// son propre schéma casserait l'inférence de types).
const { values, errors, validate } = useForm({
  password: { value: '', rules: [required(), minLength(props.minLength)] },
  confirm: { value: '', rules: [required()] },
})
function onSubmit(e?: Event) {
  e?.preventDefault()
  const ok = validate()
  const match = values.password === values.confirm
  if (!match) errors.confirm = 'Les mots de passe diffèrent.'
  if (ok && match) emit('submit', { password: values.password })
}
</script>

<template>
  <VAuthCard :title="title" :subtitle="subtitle" :error="error">
    <form class="vx-authform" @submit="onSubmit">
      <VInput
        v-model="values.password"
        label="Nouveau mot de passe"
        type="password"
        autocomplete="new-password"
        :hint="`${min} caractères minimum`"
        :error="errors.password"
      />
      <VInput
        v-model="values.confirm"
        label="Confirmation"
        type="password"
        autocomplete="new-password"
        :error="errors.confirm"
      />
      <VButton type="submit" variant="primary" block :loading="loading">Réinitialiser</VButton>
    </form>

    <template v-if="$slots.footer" #footer>
      <slot name="footer" />
    </template>
  </VAuthCard>
</template>

<style scoped>
.vx-authform {
  display: flex;
  flex-direction: column;
  gap: 14px;
}
</style>
