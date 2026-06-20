import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import VSelect from '../components/VSelect.vue'

describe('VSelect.vue', () => {
  const options = [
    { value: 'fr', label: 'French' },
    { value: 'en', label: 'English' }
  ]

  it('should render trigger-wrap, trigger, and select options', async () => {
    const wrapper = mount(VSelect, {
      props: {
        options,
        label: 'Language',
        placeholder: 'Select a language',
        modelValue: 'fr'
      }
    })

    expect(wrapper.find('label').text()).toBe('Language')
    expect(wrapper.find('.vx-select__value').text()).toBe('French')
  })

  it('should verify valid DOM structure for the clear button (Finding #1)', async () => {
    const wrapper = mount(VSelect, {
      props: {
        options,
        modelValue: 'fr',
        clearable: true
      }
    })

    const triggerWrap = wrapper.find('.vx-select__trigger-wrap')
    expect(triggerWrap.exists()).toBe(true)

    const triggerBtn = wrapper.find('.vx-select__trigger')
    const clearBtn = wrapper.find('.vx-select__clear')
    expect(triggerBtn.exists()).toBe(true)
    expect(clearBtn.exists()).toBe(true)

    // DOM Structure check: clear button is a sibling of the trigger button, not nested inside it!
    expect(triggerBtn.find('.vx-select__clear').exists()).toBe(false)
    expect(triggerWrap.find('.vx-select__clear').exists()).toBe(true)
    expect(triggerWrap.find('.vx-select__trigger').exists()).toBe(true)
  })

  it('should open dropdown and choose option', async () => {
    const wrapper = mount(VSelect, {
      props: {
        options,
        modelValue: undefined
      }
    })

    const trigger = wrapper.find('.vx-select__trigger')
    await trigger.trigger('click')

    const menu = wrapper.find('.vx-select__menu')
    expect(menu.attributes('style')).not.toContain('display: none')

    const secondOption = wrapper.findAll('.vx-select__option')[1]
    expect(secondOption.text()).toBe('English')
    await secondOption.trigger('click')
    await wrapper.vm.$nextTick()

    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')![0]).toEqual(['en'])
    expect(menu.attributes('style')).toContain('display: none')
  })

  it('should clear selection when clear is clicked', async () => {
    const wrapper = mount(VSelect, {
      props: {
        options,
        modelValue: 'fr',
        clearable: true
      }
    })

    const clearBtn = wrapper.find('.vx-select__clear')
    await clearBtn.trigger('click')
    expect(wrapper.emitted('update:modelValue')).toBeTruthy()
    expect(wrapper.emitted('update:modelValue')![0]).toEqual([undefined])
  })
})
