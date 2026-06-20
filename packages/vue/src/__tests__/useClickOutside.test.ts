import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { defineComponent, ref } from 'vue'
import { useClickOutside } from '../composables/useClickOutside'

const TestComponent = defineComponent({
  setup() {
    const elRef = ref<HTMLElement>()
    const clickOutsideCalled = ref(0)
    useClickOutside(elRef, () => {
      clickOutsideCalled.value++
    })
    return { elRef, clickOutsideCalled }
  },
  template: `
    <div>
      <div ref="elRef" class="inside">Inside</div>
      <div class="outside">Outside</div>
    </div>
  `
})

describe('useClickOutside', () => {
  it('should call handler when clicking outside', async () => {
    const wrapper = mount(TestComponent, { attachTo: document.body })
    
    // Clicking inside the ref'd element
    const insideEl = wrapper.find('.inside').element
    const insideEvent = new MouseEvent('pointerdown', { bubbles: true })
    Object.defineProperty(insideEvent, 'target', { value: insideEl, enumerable: true })
    document.dispatchEvent(insideEvent)
    expect(wrapper.vm.clickOutsideCalled).toBe(0)

    // Clicking outside the ref'd element
    const outsideEl = wrapper.find('.outside').element
    const outsideEvent = new MouseEvent('pointerdown', { bubbles: true })
    Object.defineProperty(outsideEvent, 'target', { value: outsideEl, enumerable: true })
    document.dispatchEvent(outsideEvent)
    expect(wrapper.vm.clickOutsideCalled).toBe(1)

    wrapper.unmount()
  })
})
