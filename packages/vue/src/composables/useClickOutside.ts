import { onBeforeUnmount, onMounted, type Ref } from 'vue'

/** Appelle `handler` lors d'un clic en dehors de l'élément référencé. */
export function useClickOutside(el: Ref<HTMLElement | undefined>, handler: () => void) {
  function onPointer(e: PointerEvent) {
    const target = e.target as Node
    if (el.value && !el.value.contains(target)) handler()
  }
  onMounted(() => document.addEventListener('pointerdown', onPointer, true))
  onBeforeUnmount(() => document.removeEventListener('pointerdown', onPointer, true))
}
