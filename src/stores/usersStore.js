import { userRepo } from "../database/userRepo"

let users = []
let initialized = false
let loading = false
const listeners = new Set()

function notify() {
  for (const listener of listeners) {
    listener()
  }
}

async function refresh() {
  if (loading) return
  loading = true

  const data = await userRepo.getAll()
  users = data
  loading = false
  notify()
}

function subscribe(listener) {
  listeners.add(listener)

  if (!initialized) {
    initialized = true
    void refresh()
  }

  return () => {
    listeners.delete(listener)
  }
}

function getSnapshot() {
  return users
}

export const usersStore = {
  subscribe,
  getSnapshot,
  refresh
}
