import { onBeforeUnmount, onMounted } from 'vue'

/**
 * Reveals marked descendants once as they enter the viewport. Elements remain
 * visible by default, so unsupported browsers and reduced-motion users never
 * depend on JavaScript for content visibility.
 */
export function useScrollReveal(rootRef, selector = '[data-scroll-reveal]') {
  let intersectionObserver
  let mutationObserver

  onMounted(() => {
    const root = rootRef.value
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (!root || reduceMotion || !('IntersectionObserver' in window)) return

    const observed = new WeakSet()

    intersectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        entry.target.classList.remove('reveal-pending')
        entry.target.classList.add('reveal-visible')
        intersectionObserver.unobserve(entry.target)
      })
    }, { threshold: 0.08, rootMargin: '0px 0px -6% 0px' })

    const observeNode = (node) => {
      if (!(node instanceof Element)) return
      const targets = []
      if (node.matches(selector)) targets.push(node)
      targets.push(...node.querySelectorAll(selector))

      targets.forEach((target) => {
        if (observed.has(target)) return
        observed.add(target)
        target.classList.add('reveal-pending')
        intersectionObserver.observe(target)
      })
    }

    observeNode(root)
    mutationObserver = new MutationObserver((records) => {
      records.forEach((record) => record.addedNodes.forEach(observeNode))
    })
    mutationObserver.observe(root, { childList: true, subtree: true })
  })

  onBeforeUnmount(() => {
    intersectionObserver?.disconnect()
    mutationObserver?.disconnect()
  })
}
