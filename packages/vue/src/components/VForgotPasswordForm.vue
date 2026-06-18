<script setup lang="ts">
import VAuthCard from './VAuthCard.vue'
import VInput from './VInput.vue'
import VButton from './VButton.vue'
import VAlert from './VAlert.vue'
import { useForm } from '../composables/useForm'
import { required, email as emailRule } from '../validators'

/** Formulaire « mot de passe oublié ». Émet `submit` avec l'email. */
withDefaults(
  defineProps<{
    title?: string
    subtitle?: string
    loading?: boolean
    error?: string
    /** Message de succès (lien envoyé). */
    sent?: boolean
  }>(),
  {
    title: 'Mot de passe oublié',
    subtitle: 'Recevez un lien de réinitialisation par email.',
  },
)

const emit = defineEmits<{ submit: [values: { email: string }] }>()
const { values, errors, handleSubmit } = useForm({
  email: { value: '', rules: [required(), emailRule()] },
})
const onSubmit = handleSubmit((v) => emit('submit', v))
</script>

<template>
  <VAuthCard :title="title" :subtitle="subtitle" :error="error">
    <VAlert v-if="sent" kind="success" style="margin-bottom: 14px">
      Si un compte existe, un email vient d'être envoyé.
    </VAlert>
    <form v-else class="vx-authform" @submit="onSubmit">
      <VInput
        v-model="values.email"
        label="Email"
        type="email"
        autocomplete="email"
        placeholder="you@verdex.io"
        :error="errors.email"
      />
      <VButton type="submit" variant="primary" block :loading="loading">Envoyer le lien</VButton>
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
