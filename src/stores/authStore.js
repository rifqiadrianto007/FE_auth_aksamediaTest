import { authRepo } from "../database/authRepo"

let snapshot = {
  user: null,
  loading: true
}

let initialized = false
let initPromise = null
const listeners = new Set()

function notify() {
  for (const listener of listeners) {
    listener()
  }
}

function updateSnapshot(nextUser, nextLoading) {
  if (snapshot.user === nextUser && snapshot.loading === nextLoading) return
  snapshot = { user: nextUser, loading: nextLoading }
  notify()
}

async function init() {
  if (initPromise) return initPromise

  initPromise = authRepo.getCurrentUser().then((currentUser) => {
    updateSnapshot(currentUser || null, false)
  })

  return initPromise
}

function subscribe(listener) {
  listeners.add(listener)

  if (!initialized) {
    initialized = true
    void init()
  }

  return () => {
    listeners.delete(listener)
  }
}

function getSnapshot() {
  return snapshot
}

function setUser(nextUser) {
  updateSnapshot(nextUser, snapshot.loading)
}

function setLoading(nextLoading) {
  updateSnapshot(snapshot.user, nextLoading)
}

export const authStore = {
  subscribe,
  getSnapshot,
  setUser,
  setLoading
}
