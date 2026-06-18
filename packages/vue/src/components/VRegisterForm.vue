<script setup lang="ts">
import VAuthCard from './VAuthCard.vue'
import VInput from './VInput.vue'
import VButton from './VButton.vue'
import VCheckbox from './VCheckbox.vue'
import VDivider from './VDivider.vue'
import { useForm } from '../composables/useForm'
import { required, email as emailRule, minLength } from '../validators'

/** Formulaire d'inscription. Émet `submit` avec les valeurs validées. */
const props = withDefaults(
  defineProps<{
    title?: string
    subtitle?: string
    loading?: boolean
    error?: string
    /** Exige l'acceptation des conditions. */
    requireTerms?: boolean
  }>(),
  { title: 'Créer un compte', subtitle: 'Rejoignez votre espace Verdex.', requireTerms: true },
)

const emit = defineEmits<{
  submit: [values: { name: string; email: string; password: string }]
}>()

const terms = defineModel<boolean>('terms', { default: false })
const termsError = defineModel<string>('termsError', { default: '' })

// La correspondance des mots de passe est vérifiée dans onSubmit (référencer `values`
// dans son propre schéma casserait l'inférence de types).
const { values, errors, validate } = useForm({
  name: { value: '', rules: [required()] },
  email: { value: '', rules: [required(), emailRule()] },
  password: { value: '', rules: [required(), minLength(8)] },
  confirm: { value: '', rules: [required()] },
})

function onSubmit(e?: Event) {
  e?.preventDefault()
  const ok = validate()
  const match = values.password === values.confirm
  if (!match) errors.confirm = 'Les mots de passe diffèrent.'
  const termsOk = terms.value || !props.requireTerms
  termsError.value = termsOk ? '' : 'Vous devez accepter les conditions.'
  if (ok && match && termsOk) {
    emit('submit', { name: values.name, email: values.email, password: values.password })
  }
}
</script>

<template>
  <VAuthCard :title="title" :subtitle="subtitle" :error="error">
    <form class="vx-authform" @submit="onSubmit">
      <VInput v-model="values.name" label="Nom" autocomplete="name" :error="errors.name" />
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
        autocomplete="new-password"
        hint="8 caractères minimum"
        :error="errors.password"
      />
      <VInput
        v-model="values.confirm"
        label="Confirmation"
        type="password"
        autocomplete="new-password"
        :error="errors.confirm"
      />
      <div v-if="requireTerms" class="vx-authform__terms">
        <VCheckbox v-model="terms">
          <slot name="terms">J'accepte les conditions d'utilisation.</slot>
        </VCheckbox>
        <p v-if="termsError" class="vx-authform__termserr">{{ termsError }}</p>
      </div>
      <VButton type="submit" variant="primary" block :loading="loading">Créer le compte</VButton>

      <template v-if="$slots.oauth">
        <VDivider label="ou" />
        <div class="vx-authform__oauth"><slot name="oauth" /></div>
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
.vx-authform__terms {
  font-size: 12.5px;
}
.vx-authform__termserr {
  margin: 6px 0 0;
  font-size: 11px;
  color: var(--vx-err);
}
.vx-authform__oauth {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>
