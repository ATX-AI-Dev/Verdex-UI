import { describe, it, expect } from 'vitest'
import { useForm } from '../composables/useForm'
import { required, email } from '../validators'

describe('useForm', () => {
  it('should initialize values and errors', () => {
    const { values, errors, isValid, isDirty } = useForm({
      email: { value: '', rules: [required(), email()] },
      username: { value: 'user1' },
    })

    expect(values.email).toBe('')
    expect(values.username).toBe('user1')
    expect(errors.email).toBeUndefined()
    expect(isDirty.value).toBe(false)
    // isValid is false initially because it is pristine (not dirty)
    expect(isValid.value).toBe(false)
  })

  it('should validate form and change dirty and valid states', () => {
    const { values, errors, isValid, isDirty, validate } = useForm({
      email: { value: 'invalid', rules: [required(), email('invalid email')] },
    })

    const result = validate()
    expect(result).toBe(false)
    expect(errors.email).toBe('invalid email')
    expect(isDirty.value).toBe(true)
    expect(isValid.value).toBe(false)

    values.email = 'valid@example.com'
    const result2 = validate()
    expect(result2).toBe(true)
    expect(errors.email).toBeUndefined()
    expect(isDirty.value).toBe(true)
    expect(isValid.value).toBe(true)
  })

  it('should validate a single field using validateField', () => {
    const { values, errors, validateField } = useForm({
      email: { value: '', rules: [required('required')] },
    })

    const result = validateField('email')
    expect(result).toBe(false)
    expect(errors.email).toBe('required')

    values.email = 'something'
    const result2 = validateField('email')
    expect(result2).toBe(true)
    expect(errors.email).toBeUndefined()
  })

  it('should reset state on reset', () => {
    const { values, errors, isDirty, isValid, validate, reset } = useForm({
      email: { value: '', rules: [required()] },
    })

    validate()
    expect(isDirty.value).toBe(true)

    reset()
    expect(values.email).toBe('')
    expect(errors.email).toBeUndefined()
    expect(isDirty.value).toBe(false)
    expect(isValid.value).toBe(false)
  })

  it('should handle submission on submit', async () => {
    let submittedValues: any = null
    const { handleSubmit } = useForm({
      name: { value: 'Ludo', rules: [required()] },
    })

    const onSubmit = handleSubmit((v) => {
      submittedValues = v
    })

    onSubmit()
    expect(submittedValues).toEqual({ name: 'Ludo' })
  })
})
