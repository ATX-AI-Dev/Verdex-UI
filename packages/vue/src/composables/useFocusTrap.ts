import { watch, nextTick, type Ref } from 'vue'

const FOCUSABLE =
  'a[href],button:not([disabled]),textarea:not([disabled]),input:not([disabled]),select:not([disabled]),[tabindex]:not([tabindex="-1"])'

/**
 * Piège le focus clavier dans `container` tant que `active` est vrai.
 * Restaure le focus précédent à la fermeture.
 */
export function useFocusTrap(container: Ref<HTMLElement | undefined>, active: Ref<boolean>) {
  let previouslyFocused: HTMLElement | null = null

  function focusables(): HTMLElement[] {
    if (!container.value) return []
    return Array.from(container.value.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
      (el) => el.offsetParent !== null || el === document.activeElement,
    )
  }

  function onKeydown(e: KeyboardEvent) {
    if (e.key !== 'Tab') return
    const items = focusables()
    if (items.length === 0) {
      e.preventDefault()
      container.value?.focus()
      return
    }
    const first = items[0]
    const last = items[items.length - 1]
    const activeEl = document.activeElement as HTMLElement
    if (e.shiftKey && (activeEl === first || !container.value?.contains(activeEl))) {
      e.preventDefault()
      last.focus()
    } else if (!e.shiftKey && activeEl === last) {
      e.preventDefault()
      first.focus()
    }
  }

  watch(active, async (on) => {
    if (typeof document === 'undefined') return
    if (on) {
      previouslyFocused = document.activeElement as HTMLElement
      document.addEventListener('keydown', onKeydown, true)
      await nextTick()
      const items = focusables()
      ;(items[0] ?? container.value)?.focus()
    } else {
      document.removeEventListener('keydown', onKeydown, true)
      previouslyFocused?.focus?.()
      previouslyFocused = null
    }
  })
}
