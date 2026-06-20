import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import VLoginForm from '../components/VLoginForm.vue'

describe('VLoginForm.vue', () => {
  it('should render form fields, title, and subtitle', () => {
    const wrapper = mount(VLoginForm, {
      props: {
        title: 'Custom Title',
        subtitle: 'Custom Subtitle'
      }
    })

    expect(wrapper.text()).toContain('Custom Title')
    expect(wrapper.text()).toContain('Custom Subtitle')
    expect(wrapper.find('input[type="email"]').exists()).toBe(true)
    expect(wrapper.find('input[type="password"]').exists()).toBe(true)
  })

  it('should not emit submit if values are invalid', async () => {
    const wrapper = mount(VLoginForm)

    const form = wrapper.find('form')
    await form.trigger('submit')

    expect(wrapper.emitted('submit')).toBeFalsy()
  })

  it('should emit submit when form is valid', async () => {
    const wrapper = mount(VLoginForm)

    const emailInput = wrapper.find('input[type="email"]')
    const passwordInput = wrapper.find('input[type="password"]')

    await emailInput.setValue('test@example.com')
    await passwordInput.setValue('secure-password')

    const form = wrapper.find('form')
    await form.trigger('submit')

    expect(wrapper.emitted('submit')).toBeTruthy()
    expect(wrapper.emitted('submit')![0][0]).toEqual({
      email: 'test@example.com',
      password: 'secure-password',
      remember: false
    })
  })

  it('should display error message when server error is passed', () => {
    const wrapper = mount(VLoginForm, {
      props: {
        error: 'Invalid credentials'
      }
    })

    expect(wrapper.text()).toContain('Invalid credentials')
  })

  it('should show loading spinner and disable button when loading', () => {
    const wrapper = mount(VLoginForm, {
      props: {
        loading: true
      }
    })

    const button = wrapper.find('button[type="submit"]')
    expect(button.attributes('disabled')).toBeDefined()
    expect(wrapper.find('.vx-btn__spinner').exists()).toBe(true)
  })
})
