<script setup lang="ts">
import VAuthCard from './VAuthCard.vue'
import VInput from './VInput.vue'
import VButton from './VButton.vue'
import VCheckbox from './VCheckbox.vue'
import VDivider from './VDivider.vue'
import { useForm } from '../composables/useForm'
import { required, email as emailRule } from '../validators'

/** Formulaire de connexion. Émet `submit` avec les identifiants. */
withDefaults(
  defineProps<{
    title?: string
    subtitle?: string
    /** Soumission en cours (désactive + spinner). */
    loading?: boolean
    /** Erreur serveur. */
    error?: string
  }>(),
  { title: 'Connexion', subtitle: 'Accédez à votre espace Verdex.' },
)

const emit = defineEmits<{ submit: [values: { email: string; password: string; remember: boolean }] }>()

const remember = defineModel<boolean>('remember', { default: false })
const { values, errors, handleSubmit } = useForm({
  email: { value: '', rules: [required(), emailRule()] },
  password: { value: '', rules: [required()] },
})
const onSubmit = handleSubmit((v) => emit('submit', { ...v, remember: remember.value }))
</script>

<template>
  <VAuthCard :title="title" :subtitle="subtitle" :error="error">
    <form class="vx-authform" @submit="onSubmit">
      <VInput
        v-model="values.email"
        label="Email"
        type="email"
        autocomplete="email"
        placeholder="you@verdex.io"
        :error="errors.email"
      />
      <VInput
        v-model="values.password"
        label="Mot de passe"
        type="password"
        autocomplete="current-password"
        :error="errors.password"
      />
      <div class="vx-authform__row">
        <VCheckbox v-model="remember" label="Se souvenir" />
        <slot name="forgot" />
      </div>
      <VButton type="submit" variant="primary" block :loading="loading">Se connecter</VButton>

      <template v-if="$slots.oauth">
        <VDivider label="ou" />
        <div class="vx-authform__oauth">
          <slot name="oauth" />
        </div>
      </template>
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
.vx-authform__row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  font-size: 12.5px;
}
.vx-authform__oauth {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>
