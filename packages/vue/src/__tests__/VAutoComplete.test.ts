import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import VAutoComplete from '../components/VAutoComplete.vue'

describe('VAutoComplete.vue', () => {
  const options = [
    { value: 'apple', label: 'Apple' },
    { value: 'banana', label: 'Banana' },
    { value: 'cherry', label: 'Cherry' }
  ]

  it('should render and filter suggestions based on input', async () => {
    const wrapper = mount(VAutoComplete, {
      props: {
        options,
        modelValue: ''
      }
    })

    const input = wrapper.find('input')
    expect(input.exists()).toBe(true)

    // Focus input to open menu
    await input.trigger('focus')
    expect(wrapper.find('.vx-ac__menu').isVisible()).toBe(true)

    // Type query to filter
    await input.setValue('ap')
    await input.trigger('input')
    
    const matchedOptions = wrapper.findAll('.vx-ac__option')
    expect(matchedOptions.length).toBe(1)
    expect(matchedOptions[0].text()).toBe('Apple')
  })

  it('should emit select event and select option when clicked', async () => {
    const wrapper = mount(VAutoComplete, {
      props: {
        options,
        modelValue: ''
      }
    })

    const input = wrapper.find('input')
    await input.trigger('focus')

    const firstOption = wrapper.findAll('.vx-ac__option')[0]
    await firstOption.trigger('mousedown')

    expect(wrapper.emitted('select')).toBeTruthy()
    expect(wrapper.emitted('select')![0]).toEqual([{ value: 'apple', label: 'Apple' }])
    expect(wrapper.emitted('update:modelValue')![0]).toEqual(['Apple'])
  })

  it('should select with keyboard arrow keys and Enter', async () => {
    const wrapper = mount(VAutoComplete, {
      props: {
        options,
        modelValue: ''
      }
    })

    const input = wrapper.find('input')
    await input.trigger('focus')

    // Arrow down to first option
    await input.trigger('keydown', { key: 'ArrowDown' })
    expect(wrapper.find('.vx-ac__option.is-active').text()).toBe('Apple')

    // Arrow down to second option
    await input.trigger('keydown', { key: 'ArrowDown' })
    expect(wrapper.find('.vx-ac__option.is-active').text()).toBe('Banana')

    // Press Enter to select
    await input.trigger('keydown', { key: 'Enter' })
    expect(wrapper.emitted('select')).toBeTruthy()
    expect(wrapper.emitted('select')![0]).toEqual([{ value: 'banana', label: 'Banana' }])
  })
})
