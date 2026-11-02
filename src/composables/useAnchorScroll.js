import { onBeforeUnmount, onMounted } from 'vue'

const SCROLL_DURATION = 780

export function useAnchorScroll(rootRef) {
  let frameId = 0
  let activeRoot
  let originalScrollBehavior
  let motionPreference

  function removeInterruptListeners() {
    window.removeEventListener('wheel', cancel, true)
    window.removeEventListener('touchstart', cancel, true)
    window.removeEventListener('pointerdown', cancel, true)
    window.removeEventListener('keydown', cancel, true)
    motionPreference?.removeEventListener('change', handleMotionPreferenceChange)
    motionPreference = undefined
  }

  function restoreScrollBehavior() {
    if (!activeRoot) return
    activeRoot.style.scrollBehavior = originalScrollBehavior
    activeRoot = undefined
  }

  function cancel() {
    if (frameId) cancelAnimationFrame(frameId)
    frameId = 0
    removeInterruptListeners()
    restoreScrollBehavior()
  }

  function handleMotionPreferenceChange(event) {
    if (event.matches) cancel()
  }

  function handleClick(event) {
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return

    const link = event.target.closest('a[href]')
    if (!link || link.target === '_blank' || link.hasAttribute('download')) return

    const url = new URL(link.href, window.location.href)
    if (url.origin !== window.location.origin || url.pathname !== window.location.pathname || url.search !== window.location.search || !url.hash) return

    const target = document.getElementById(decodeURIComponent(url.hash.slice(1)))
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (!target || preference.matches) return

    event.preventDefault()
    cancel()

    if (window.location.hash !== url.hash) window.history.pushState(null, '', url)

    const scrollMargin = Number.parseFloat(window.getComputedStyle(target).scrollMarginTop) || 0
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight
    const destination = Math.max(0, Math.min(window.scrollY + target.getBoundingClientRect().top - scrollMargin, maxScroll))
    const start = window.scrollY
    const distance = destination - start

    if (Math.abs(distance) < 1) return

    activeRoot = document.documentElement
    originalScrollBehavior = activeRoot.style.scrollBehavior
    activeRoot.style.scrollBehavior = 'auto'
    motionPreference = preference
    motionPreference.addEventListener('change', handleMotionPreferenceChange)
    window.addEventListener('wheel', cancel, true)
    window.addEventListener('touchstart', cancel, true)
    window.addEventListener('pointerdown', cancel, true)
    window.addEventListener('keydown', cancel, true)

    const startedAt = performance.now()
    const step = (now) => {
      const progress = Math.min((now - startedAt) / SCROLL_DURATION, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      window.scrollTo(0, start + distance * eased)

      if (progress < 1) frameId = requestAnimationFrame(step)
      else cancel()
    }

    frameId = requestAnimationFrame(step)
  }

  onMounted(() => rootRef.value?.addEventListener('click', handleClick, true))
  onBeforeUnmount(() => {
    rootRef.value?.removeEventListener('click', handleClick, true)
    cancel()
  })
}
