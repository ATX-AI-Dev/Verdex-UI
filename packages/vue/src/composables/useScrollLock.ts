import { watch, onBeforeUnmount, type Ref } from 'vue'

let lockCount = 0
let previousOverflow = ''

function lock() {
  if (typeof document === 'undefined') return
  if (lockCount === 0) {
    previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
  }
  lockCount++
}

function unlock() {
  if (typeof document === 'undefined') return
  lockCount = Math.max(0, lockCount - 1)
  if (lockCount === 0) document.body.style.overflow = previousOverflow
}

/** Bloque le scroll du `<body>` tant que `active` est vrai. Gère l'imbrication. */
export function useScrollLock(active: Ref<boolean>) {
  let locked = false
  function apply(on: boolean) {
    if (on && !locked) {
      locked = true
      lock()
    } else if (!on && locked) {
      locked = false
      unlock()
    }
  }
  watch(active, apply, { immediate: true })
  onBeforeUnmount(() => apply(false))
}
