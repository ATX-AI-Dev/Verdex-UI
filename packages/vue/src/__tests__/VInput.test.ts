import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import VInput from '../components/VInput.vue'

describe('VInput.vue', () => {
  it('should render standard props', () => {
    const wrapper = mount(VInput, {
      props: {
        label: 'Name',
        placeholder: 'Enter name',
        type: 'text'
      }
    })

    expect(wrapper.find('label').text()).toBe('Name')
    const input = wrapper.find('input')
    expect(input.attributes('placeholder')).toBe('Enter name')
    expect(input.attributes('type')).toBe('text')
  })

  it('should update model value on input', async () => {
    const wrapper = mount(VInput, {
      props: {
        modelValue: ''
      }
    })

    const input = wrapper.find('input')
    await input.setValue('test value')
    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')![0]).toEqual(['test value'])
  })

  it('should support accessibility features: aria-label and aria-invalid', () => {
    const wrapper = mount(VInput, {
      props: {
        ariaLabel: 'Accessible Label',
        error: 'Required field'
      }
    })

    const input = wrapper.find('input')
    expect(input.attributes('aria-label')).toBe('Accessible Label')
    expect(input.attributes('aria-invalid')).toBe('true')
    expect(wrapper.find('.vx-field__hint--error').text()).toBe('Required field')
  })

  it('should render icon slot', () => {
    const wrapper = mount(VInput, {
      slots: {
        icon: '<span class="icon-slot">🔍</span>'
      }
    })

    expect(wrapper.find('.icon-slot').exists()).toBe(true)
    expect(wrapper.find('.vx-field__wrap--icon').exists()).toBe(true)
  })
})
