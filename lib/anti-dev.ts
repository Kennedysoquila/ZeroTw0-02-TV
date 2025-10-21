// Anti-developer tools and anti-tamperscript protection
export function initializeAntiDevProtection() {
  document.addEventListener("keydown", (e) => {
    if (
      e.key === "F12" ||
      (e.ctrlKey && e.shiftKey && e.key === "I") ||
      (e.ctrlKey && e.shiftKey && e.key === "J") ||
      (e.ctrlKey && e.shiftKey && e.key === "C") ||
      (e.ctrlKey && e.shiftKey && e.key === "K")
    ) {
      e.preventDefault()
      e.stopPropagation()
      autoStartSite()
    }
  })

  document.addEventListener("contextmenu", (e) => {
    e.preventDefault()
    autoStartSite()
  })

  const devtools = { open: false, orientation: null }
  const threshold = 160

  setInterval(() => {
    if (window.outerHeight - window.innerHeight > threshold || window.outerWidth - window.innerWidth > threshold) {
      if (!devtools.open) {
        devtools.open = true
        autoStartSite()
      }
    } else {
      devtools.open = false
    }
  }, 500)

  const unsafeWindow = window["unsafeWindow"] || window
  const GM = window["GM"] || {}
  const GM_getValue = GM["GM_getValue"] || (() => {})

  if (typeof unsafeWindow !== "undefined" || typeof GM !== "undefined" || typeof GM_getValue !== "undefined") {
    console.warn("Tamperscript detected and blocked")
    autoStartSite()
  }

  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.type === "childList") {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeName === "SCRIPT" && node.src && node.src.includes("tamper")) {
            node.remove()
            autoStartSite()
          }
        })
      }
    })
  })

  observer.observe(document.documentElement, {
    childList: true,
    subtree: true,
  })
}

function autoStartSite() {
  const videoElement = document.querySelector("video") as HTMLVideoElement
  if (videoElement) {
    videoElement.play().catch(() => {
      // Silently fail if autoplay is blocked
    })
  }
}
