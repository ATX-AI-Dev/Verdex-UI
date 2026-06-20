import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { defineComponent, ref, nextTick } from 'vue'
import { useScrollLock, __resetForTesting } from '../composables/useScrollLock'

const TestComponent = defineComponent({
  props: {
    active: {
      type: Boolean,
      required: true
    }
  },
  setup(props) {
    const activeRef = ref(props.active)
    useScrollLock(activeRef)
    return { activeRef }
  },
  template: `<div>Scroll Lock Test</div>`
})

describe('useScrollLock', () => {
  beforeEach(() => {
    __resetForTesting()
    document.body.style.overflow = ''
  })

  it('should lock body scroll when active is true', async () => {
    const wrapper = mount(TestComponent, {
      props: { active: true }
    })

    expect(document.body.style.overflow).toBe('hidden')
    
    // Deactivating scroll lock
    await wrapper.setProps({ active: false })
    wrapper.vm.activeRef = false
    await nextTick()
    
    expect(document.body.style.overflow).toBe('')
    wrapper.unmount()
  })

  it('should support nested/multiple locks', async () => {
    const w1 = mount(TestComponent, { props: { active: true } })
    expect(document.body.style.overflow).toBe('hidden')

    const w2 = mount(TestComponent, { props: { active: true } })
    expect(document.body.style.overflow).toBe('hidden')

    w1.unmount()
    // It should still be locked because w2 is still active
    expect(document.body.style.overflow).toBe('hidden')

    w2.unmount()
    // Now it should be unlocked since both are unmounted/inactive
    expect(document.body.style.overflow).toBe('')
  })
})
