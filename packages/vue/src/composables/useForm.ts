import { computed, reactive } from 'vue'
import type { ValidationRule } from '../validators'

interface FieldConfig<T = unknown> {
  /** Valeur initiale. */
  value: T
  /** Règles de validation (évaluées dans l'ordre, on s'arrête à la première erreur). */
  rules?: ValidationRule<T>[]
}

type Schema = Record<string, FieldConfig>
type Values<S extends Schema> = { [K in keyof S]: S[K]['value'] }
type Errors<S extends Schema> = Partial<Record<keyof S, string>>

/**
 * Mini-gestionnaire de formulaire : valeurs réactives, erreurs et soumission.
 * S'intègre aux composants via leur prop `error` (VInput, VSelect, …).
 *
 * ```ts
 * const { values, errors, handleSubmit } = useForm({
 *   email: { value: '', rules: [required(), email()] },
 * })
 * const onSubmit = handleSubmit((v) => console.log(v))
 * ```
 */
export function useForm<S extends Schema>(schema: S) {
  const initial = {} as Values<S>
  const rulesMap = {} as Record<keyof S, ValidationRule[]>
  for (const key in schema) {
    initial[key] = schema[key].value as Values<S>[typeof key]
    rulesMap[key] = (schema[key].rules ?? []) as ValidationRule[]
  }

  const values = reactive({ ...initial }) as Values<S>
  const errors = reactive({}) as Errors<S>

  function validateField(name: keyof S): boolean {
    for (const rule of rulesMap[name]) {
      const result = rule(values[name])
      if (result !== true) {
        errors[name] = result
        return false
      }
    }
    delete errors[name]
    return true
  }

  function validate(): boolean {
    let ok = true
    for (const key in rulesMap) {
      if (!validateField(key)) ok = false
    }
    return ok
  }

  function reset(): void {
    Object.assign(values, initial)
    for (const key in errors) delete errors[key]
  }

  const isValid = computed(() => Object.keys(errors).length === 0)

  function handleSubmit(onValid: (values: Values<S>) => void | Promise<void>) {
    return (e?: Event) => {
      e?.preventDefault?.()
      if (validate()) return onValid({ ...values })
    }
  }

  return { values, errors, isValid, validate, validateField, reset, handleSubmit }
}
