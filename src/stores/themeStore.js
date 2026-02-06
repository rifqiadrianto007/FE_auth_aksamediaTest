import { themeRepo } from "../database/themeRepo"

let snapshot = { theme: "system" }
let initialized = false
let mediaQuery = null
let mediaListener = null
const listeners = new Set()

function notify() {
  for (const listener of listeners) {
    listener()
  }
}

function applyTheme(mode) {
  const root = document.documentElement
  root.classList.remove("dark")

  if (mode === "dark") {
    root.classList.add("dark")
    return
  }

  if (mode === "light") {
    return
  }

  if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
    root.classList.add("dark")
  }
}

function updateSnapshot(mode) {
  if (snapshot.theme === mode) return
  snapshot = { theme: mode }
  notify()
}

async function init() {
  const saved = await themeRepo.getTheme()
  updateSnapshot(saved)
  applyTheme(saved)
}

function ensureMediaListener() {
  if (mediaQuery) return
  mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")

  mediaListener = () => {
    if (snapshot.theme === "system") {
      applyTheme("system")
    }
  }

  mediaQuery.addEventListener("change", mediaListener)
}

function cleanupMediaListener() {
  if (!mediaQuery || !mediaListener) return
  mediaQuery.removeEventListener("change", mediaListener)
  mediaQuery = null
  mediaListener = null
}

function subscribe(listener) {
  listeners.add(listener)

  if (!initialized) {
    initialized = true
    void init()
    ensureMediaListener()
  }

  return () => {
    listeners.delete(listener)
    if (listeners.size === 0) {
      cleanupMediaListener()
    }
  }
}

function getSnapshot() {
  return snapshot
}

async function changeTheme(mode) {
  updateSnapshot(mode)
  applyTheme(mode)
  await themeRepo.setTheme(mode)
}

export const themeStore = {
  subscribe,
  getSnapshot,
  changeTheme
}
